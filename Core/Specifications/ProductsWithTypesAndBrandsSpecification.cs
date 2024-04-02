using System.Security.Cryptography.X509Certificates;
using Core.Entities;

namespace Core.Specifications
{
  public class ProductsWithTypesAndBrandsSpecification : BaseSpecification<Product>
  {
    public ProductsWithTypesAndBrandsSpecification(ProductSpecParams @params) :
      base(
        x => (string.IsNullOrEmpty(@params.Search) || x.Name.ToLower().Contains(@params.Search.ToLower())) &&
        (!@params.BrandId.HasValue || x.ProductBrandId == @params.BrandId) &&
        (!@params.TypeId.HasValue || x.ProductTypeId == @params.TypeId))
    {
      AddInclude(x => x.ProductBrand);
      AddInclude(x => x.ProductType);
      AddOrderBy(x => x.Name);
      ApplyPaging(@params.PageSize, @params.PageSize * (@params.PageIndex - 1));

      if (!string.IsNullOrEmpty(@params.Sort))
      {
        switch (@params.Sort)
        {
          case "priceAsc":
            AddOrderBy(p => p.Price);
            break;
          case "priceDesc":
            AddOrderByDescending(p => p.Price);
            break;
          default:
            AddOrderBy(p => p.Name);
            break;
        }
      }
    }

    public ProductsWithTypesAndBrandsSpecification(int id) : base(x => x.Id.Equals(id))
    {
      AddInclude(x => x.ProductBrand);
      AddInclude(x => x.ProductType);
    }
  }
}