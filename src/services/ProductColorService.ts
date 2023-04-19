import { AxiosResponse } from "axios";
import serverApi from "../http";
import { IProductColor, IProductColorResponse } from "../types/IProductColor";

export default class ProductInfoService {
  static async addProductColor(color: FormData): Promise<AxiosResponse<IProductColorResponse>> {
    return serverApi.post<IProductColorResponse>('/color', color);
  };

  static async getProductColorsByProductID(productID: string): Promise<AxiosResponse<IProductColorResponse[]>> {
    return serverApi.get<IProductColorResponse[]>(`/color/${productID}`);
  };

  // static async getProductInfoByID(id: string): Promise<AxiosResponse<IProductInfoResponse>> {
  //   return serverApi.get<IProductInfoResponse>(`/productinfo/${id}`);
  // };

  static async getAllProductColors(): Promise<AxiosResponse<IProductColorResponse[]>> {
    return serverApi.get<IProductColorResponse[]>(`/colors`);
  };

  static async getProductColorsByTypeID(typeID: string): Promise<AxiosResponse<IProductColorResponse>> {
    return serverApi.get<IProductColorResponse>(`/colors/${typeID}`);
  };


  // static async deleteProductInfos(id: string): Promise<AxiosResponse<IProductInfoResponse>> {
  //   return serverApi.delete<IProductInfoResponse>(`/productinfo/${id}`);
  // };

  // static async updateProductAmountByID(newProduct: IProductUpdate): Promise<AxiosResponse<IProductResponse>> {
  //   return serverApi.put<IProductResponse>(`/product`, newProduct);
  // };
}