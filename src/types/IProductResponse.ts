export interface IProductResponse {
  _id: string,
  name: string,
  price: number,
  rating: number,
  count: number,
  views: number,
  coverImage: string,
  typeID: string,
  brandID: string,
};

export interface IProductResponseAll {
  products: IProductResponse[],
  maxRecords: number,
};