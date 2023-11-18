export interface Product {
  gtin: String;
  brandName: String;
  stock: String;
  category: String;
  color: String;
  name: String;
  image: String;
  price: any;
  createdAt: Date,
  updatedAt: Date
}

export interface PaginationMetadata {
  page: number,
  total: number,
  pageCount: 0
}