using Core.Entities;
using Infrastructure.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
  [ApiController]
  [Route("api/[controller]")]
  public class ProductsController(StoreContext context) : ControllerBase
  {
    [HttpGet]
    public async Task<ActionResult<List<Product>>> GetProducts()
    {
      var products = await context.Products.ToListAsync();
      return products;
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Product>> GetProduct(int id)
    {
      var product = await context.Products.FindAsync(id);
      return product;
    }
  }
}