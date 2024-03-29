using Core.Entities;
using Core.Interfaces;
using Infrastructure.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
  [ApiController]
  [Route("api/[controller]")]
  public class ProductsController(IProductRepository _productRepository) : ControllerBase
  {
    [HttpGet]
    public async Task<ActionResult<List<Product>>> GetProducts()
    {
      var products = await _productRepository.GetProductsAsync();
      return Ok(products);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Product>> GetProduct(int id)
    {
      var product = await _productRepository.GetProductByIdAsync(id);
      return Ok(product);
    }
  }
}