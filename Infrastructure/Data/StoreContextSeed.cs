using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Text.Json;
using System.Threading.Tasks;
using Core.Entities;

namespace Infrastructure.Data
{
  public class StoreContextSeed
  {
    public static async Task SeedAsync(StoreContext context)
    {
      if (!context.ProductBrands.Any())
      {
        var brandsData = File.ReadAllText("../Infrastructure/SeedData/brands.json");
        var brands = JsonSerializer.Deserialize<List<ProductBrand>>(brandsData);

        await context.ProductBrands.AddRangeAsync(brands);
      }

      if (!context.ProductTypes.Any())
      {
        var typesData = File.ReadAllText("../Infrastructure/SeedData/types.json");
        var types = JsonSerializer.Deserialize<List<ProductType>>(typesData);

        await context.ProductTypes.AddRangeAsync(types);
      }

      if (!context.Products.Any())
      {
        var productsData = File.ReadAllText("../Infrastructure/SeedData/products.json");
        var products = JsonSerializer.Deserialize<List<Product>>(productsData);

        await context.Products.AddRangeAsync(products);
      }

      if (context.ChangeTracker.HasChanges())
      {
        await context.SaveChangesAsync();
      }
    }
  }
}