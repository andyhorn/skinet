using API.DTOs;
using AutoMapper;
using Core.Entities;
using Core.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
  public class BasketController(
    IBasketRepository basketRepository,
    IMapper mapper) : BaseApiController
  {
    [HttpGet]
    public async Task<ActionResult<CustomerBasketDto>> GetBasketById(string id)
    {
      var basket = await basketRepository.GetBasketAsync(id);
      var dto = mapper.Map<CustomerBasketDto>(basket ?? new CustomerBasket(id));

      return Ok(dto);
    }

    [HttpPost]
    public async Task<ActionResult<CustomerBasketDto>> UpdateBasket([FromBody] CustomerBasketDto dto)
    {
      var basket = mapper.Map<CustomerBasket>(dto);
      var updated = await basketRepository.UpdateBasketAsync(basket);

      return Ok(mapper.Map<CustomerBasketDto>(updated));
    }

    [HttpDelete]
    public async Task DeleteBasket(string id)
    {
      await basketRepository.DeleteBasketAsync(id);
    }
  }
}