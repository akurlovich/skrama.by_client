import { createAsyncThunk } from "@reduxjs/toolkit";
import ProductColorService from "../../../services/ProductColorService";

export const addProductColor = createAsyncThunk(
  'COLORS/addProductColor',
  async (color: FormData, {rejectWithValue}) => {
    try {
      return await (await ProductColorService.addProductColor(color)).data;
    } catch (error: any) {
      return rejectWithValue(error.message)
    }
  }
);

export const getProductColorsByProductID = createAsyncThunk(
  'COLORS/getProductColorsByProductID',
  async (productID: string, {rejectWithValue}) => {
    try {
      return await (await ProductColorService.getProductColorsByProductID(productID)).data;
      
    } catch (error: any) {
      return rejectWithValue(error.message)
    }
  }
);

export const getProductColorsByTypeID = createAsyncThunk(
  'COLORS/getProductColorsByTypeID',
  async (typeID: string, {rejectWithValue}) => {
    try {
      return await (await ProductColorService.getProductColorsByTypeID(typeID)).data;
      
    } catch (error: any) {
      return rejectWithValue(error.message)
    }
  }
);