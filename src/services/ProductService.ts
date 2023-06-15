import { AxiosResponse } from "axios";
import serverApi from "../http";
import { IProduct, IProductPriceUpdate } from "../types/IProduct";
import { IProductNew } from "../types/IProductNew";
import { IProductResponse, IProductResponseAll } from "../types/IProductResponse";
// import { IProduct, IProductUpdate } from "../types/IProduct";
// import { IProductResponse } from "../types/IProductResponse";

export default class ProductService {
  static async addProduct(product: FormData): Promise<AxiosResponse<IProductResponse>> {
    return serverApi.post<IProductResponse>('/product', product);
  };

  static async getProducts(typeID = '', page = 1, limit = 1000): Promise<AxiosResponse<IProductResponseAll>> {
    return serverApi.get<IProductResponseAll>(`/products?typeID=${typeID}&page=${page}&limit=${limit}`);
  };

  static async getProductsByType(typeID: string): Promise<AxiosResponse<IProductResponse>> {
    return serverApi.get<IProductResponse>(`/products/${typeID}`);
  };

  static async getProductByID(id: string): Promise<AxiosResponse<IProductResponse>> {
    return serverApi.get<IProductResponse>(`/product/${id}`);
  };

  static async deleteProductByID(id: string): Promise<AxiosResponse<IProductResponse>> {
    return serverApi.delete<IProductResponse>(`/product/${id}`);
  };

  static async updateProductPriceByID(data: IProductPriceUpdate): Promise<AxiosResponse<IProductResponse>> {
    if (data.price) {
      return serverApi.put<IProductResponse>(`/product/${data.id}`, {price: data.price});
    } else {
      return serverApi.put<IProductResponse>(`/product/${data.id}`, {views: data.views});
    }
  };
}