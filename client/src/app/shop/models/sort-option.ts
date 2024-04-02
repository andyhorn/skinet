export interface ProductsSortOption {
  name: string;
  value: string;
}

export const sortOptions: ProductsSortOption[] = [
  { name: 'Alphabetical', value: 'name' },
  { name: 'Price: Low to High', value: 'priceAsc' },
  { name: 'Price: High to Low', value: 'priceDesc' },
];