using System.Security.Claims;
using API.DTOs;
using API.Errors;
using API.Extensions;
using AutoMapper;
using Core.Entities.Identity;
using Core.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using StackExchange.Redis;

namespace API.Controllers
{
  public class AccountController(UserManager<AppUser> userManager,
    SignInManager<AppUser> signInManager,
    IMapper mapper,
    ITokenService tokenService) : BaseApiController
  {

    static private readonly string EmailInUseError = "Email address is in use";

    [Authorize]
    [HttpGet]
    public async Task<ActionResult<UserDto>> GetCurrentUser()
    {
      var email = User.FindFirstValue(ClaimTypes.Email);
      var user = await userManager.FindByEmailAsync(email);

      if (user == null)
      {
        return BadRequest(new ApiResponse(401));
      }

      return Ok(new UserDto()
      {
        DisplayName = user.DisplayName,
        Email = user.Email,
        Token = tokenService.CreateToken(user),
      });
    }

    [HttpGet("emailexists")]
    public async Task<ActionResult<bool>> CheckEmailExistsAsync([FromQuery] string email)
    {
      return await userManager.FindByEmailAsync(email) != null;
    }

    [Authorize]
    [HttpGet("address")]
    public async Task<ActionResult<AddressDto>> GetUserAddressAsync()
    {
      var user = await userManager.FindUserByClaimsPrincipalWithAddress(User);
      return mapper.Map<Address, AddressDto>(user.Address);
    }

    [Authorize]
    [HttpPut("address")]
    public async Task<ActionResult<AddressDto>> UpdateUserAddressAsync(AddressDto dto)
    {
      var user = await userManager.FindUserByClaimsPrincipalWithAddress(User);
      var address = mapper.Map<AddressDto, Address>(dto);

      user.Address = address;

      var result = await userManager.UpdateAsync(user);

      if (result.Succeeded)
      {
        return Ok(mapper.Map<Address, AddressDto>(user.Address));
      }

      return BadRequest("Problem updating user");
    }

    [HttpPost("login")]
    public async Task<ActionResult<UserDto>> LoginAsync([FromBody] LoginDto loginDto)
    {
      var user = await userManager.FindByEmailAsync(loginDto.Email);

      if (user == null)
      {
        return Unauthorized(new ApiResponse(401));
      }

      var result = await signInManager.CheckPasswordSignInAsync(user, loginDto.Password, false);

      if (!result.Succeeded)
      {
        return Unauthorized(new ApiResponse(401));
      }

      return Ok(new UserDto()
      {
        Email = user.Email,
        Token = tokenService.CreateToken(user),
        DisplayName = user.DisplayName,
      });
    }

    [HttpPost("register")]
    public async Task<ActionResult<UserDto>> Register([FromBody] RegisterDto dto)
    {
      if (CheckEmailExistsAsync(dto.Email).Result.Value)
      {
        return new BadRequestObjectResult(new ApiValidationErrorResponse()
        {
          Errors = new[] { EmailInUseError },
        });
      }

      var user = new AppUser()
      {
        DisplayName = dto.DisplayName,
        Email = dto.Email,
        UserName = dto.Email,
      };

      var result = await userManager.CreateAsync(user, dto.Password);

      if (!result.Succeeded)
      {
        return BadRequest(new ApiResponse(400));
      }

      return new UserDto()
      {
        DisplayName = dto.DisplayName,
        Token = tokenService.CreateToken(user),
        Email = dto.Email,
      };
    }
  }
}