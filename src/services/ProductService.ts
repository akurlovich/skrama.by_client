import { AxiosResponse } from "axios";
import serverApi from "../http";
import { IProduct, IProductPriceUpdate } from "../types/IProduct";
import { IProductNew } from "../types/IProductNew";
import { IProductResponse } from "../types/IProductResponse";
// import { IProduct, IProductUpdate } from "../types/IProduct";
// import { IProductResponse } from "../types/IProductResponse";

export default class ProductService {
  static async addProduct(product: FormData): Promise<AxiosResponse<IProductResponse>> {
    return serverApi.post<IProductResponse>('/product', product);
  };

  static async getProducts(): Promise<AxiosResponse<IProductResponse[]>> {
    return serverApi.get<IProductResponse[]>('/products');
  };

  static async getProductByID(id: string): Promise<AxiosResponse<IProductResponse>> {
    return serverApi.get<IProductResponse>(`/product/${id}`);
  };

  static async deleteProductByID(id: string): Promise<AxiosResponse<IProductResponse>> {
    return serverApi.delete<IProductResponse>(`/product/${id}`);
  };

  static async updateProductPriceByID(data: IProductPriceUpdate): Promise<AxiosResponse<IProductResponse>> {
    return serverApi.put<IProductResponse>(`/product/${data.id}`, {price: data.price});
  };
}