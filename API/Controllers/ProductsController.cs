using API.DTOs;
using AutoMapper;
using Core.Entities;
using Core.Interfaces;
using Core.Specifications;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
  [ApiController]
  [Route("api/[controller]")]
  public class ProductsController(
    IGenericRepository<Product> _productRepository,
    IGenericRepository<ProductType> _productTypeRepository,
    IGenericRepository<ProductBrand> _productBrandRepository,
    IMapper _mapper
  ) : ControllerBase
  {
    [HttpGet]
    public async Task<ActionResult<IReadOnlyList<ProductToReturnDto>>> GetProducts()
    {
      var specification = new ProductsWithTypesAndBrandsSpecification();
      var products = await _productRepository.ListAsync(specification);

      return Ok(_mapper.Map<IReadOnlyList<Product>, IReadOnlyList<ProductToReturnDto>>(products));
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<ProductToReturnDto>> GetProduct(int id)
    {
      var specification = new ProductsWithTypesAndBrandsSpecification(id);
      var product = await _productRepository.GetEntityWithSpec(specification);

      return _mapper.Map<Product, ProductToReturnDto>(product);
    }

    [HttpGet("brands")]
    public async Task<ActionResult<List<ProductBrand>>> GetProductBrands()
    {
      var brands = await _productBrandRepository.GetAllAsync();
      return Ok(brands);
    }

    [HttpGet("types")]
    public async Task<ActionResult<List<ProductType>>> GetProductTypes()
    {
      var types = await _productTypeRepository.GetAllAsync();
      return Ok(types);
    }
  }
}