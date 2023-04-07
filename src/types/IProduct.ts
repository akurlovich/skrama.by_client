export interface IProduct {
  name: string,
  price: number,
  rating: number,
  count: number,
  views: number,
  coverImage: string,
  typeID: string,
  brandID: string,
}

export interface IProductPriceUpdate {
  id: string,
  price?: number,
  views?: number,
}