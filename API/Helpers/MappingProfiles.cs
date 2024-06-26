using API.DTOs;
using AutoMapper;
using Core.Entities;
using Core.Entities.Identity;

namespace API.Helpers
{
  public class MappingProfiles : Profile
  {
    public MappingProfiles()
    {
      CreateMap<Product, ProductToReturnDto>()
        .ForMember(x => x.ProductBrand, o => o.MapFrom(x => x.ProductBrand.Name))
        .ForMember(x => x.ProductType, o => o.MapFrom(x => x.ProductType.Name))
        .ForMember(x => x.PictureUrl, o => o.MapFrom<ProductUrlResolver>());

      CreateMap<Address, AddressDto>().ReverseMap();
      CreateMap<CustomerBasket, CustomerBasketDto>().ReverseMap();
      CreateMap<BasketItem, BasketItemDto>().ReverseMap();
    }
  }
}