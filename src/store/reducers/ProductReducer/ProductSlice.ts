import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProductInfoResponse } from "../../../types/IProductInfoResponse";
// import { IBook } from "../../../types/IBook";
import { IProductResponse, IProductResponseAll } from "../../../types/IProductResponse";
import { addProduct, addProductInfoType, deleteProductByID, deleteProductInfos, getAllProductsInfo, getAllProductsInfoByTypeID, getProductByID, getProductInfoByProductID, getProducts, getProductsByType, updateProductPriceByID } from "./ProductActionCreators";
// import { IGenreResponse } from "../../../types/IGenreResponse";
// import { addBook, getAllGenres, getBookByID, getBooks, updateBookAmountByID } from "./ProductActionCreatores";

interface IProductState {
  product: IProductResponse,
  products: IProductResponse[],
  productInfo: IProductInfoResponse[],
  productInfoNewType: IProductInfoResponse,
  productsAllInfo: IProductInfoResponse[],
  isLoading: boolean,
  error: string,
  productsMaxRecords: number,
};

const initialState: IProductState = {
  product: {} as IProductResponse,
  products: [],
  productInfo: [],
  productInfoNewType: {} as IProductInfoResponse,
  productsAllInfo: [],
  isLoading: false,
  error: '',
  productsMaxRecords: 0,
};

export const productSlice = createSlice({
  name: 'PRODUCT',
  initialState,
  reducers: {

  },
  extraReducers: {
    [addProduct.pending.type]: (state) => {
      state.isLoading = true;
    },
    [addProduct.fulfilled.type]: (state, action: PayloadAction<IProductResponse>) => {
      state.isLoading = false;
      state.product = action.payload;
      state.error = '';
    },
    [addProduct.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [getProducts.pending.type]: (state) => {
      state.isLoading = true;
    },
    [getProducts.fulfilled.type]: (state, action: PayloadAction<IProductResponseAll>) => {
      state.isLoading = false;
      state.products = action.payload.products;
      state.productsMaxRecords = action.payload.maxRecords;
      state.error = '';
    },
    [getProducts.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [getProductsByType.pending.type]: (state) => {
      state.isLoading = true;
    },
    [getProductsByType.fulfilled.type]: (state, action: PayloadAction<IProductResponse[]>) => {
      state.isLoading = false;
      state.products = action.payload;
      state.error = '';
    },
    [getProductsByType.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [getProductByID.pending.type]: (state) => {
      state.isLoading = true;
    },
    [getProductByID.fulfilled.type]: (state, action: PayloadAction<IProductResponse>) => {
      state.isLoading = false;
      state.product = action.payload;
      state.error = '';
    },
    [getProductByID.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [getProductInfoByProductID.pending.type]: (state) => {
      state.isLoading = true;
    },
    [getProductInfoByProductID.fulfilled.type]: (state, action: PayloadAction<IProductInfoResponse[]>) => {
      state.isLoading = false;
      state.productInfo = action.payload;
      state.error = '';
    },
    [getProductInfoByProductID.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [getAllProductsInfo.pending.type]: (state) => {
      state.isLoading = true;
    },
    [getAllProductsInfo.fulfilled.type]: (state, action: PayloadAction<IProductInfoResponse[]>) => {
      state.isLoading = false;
      state.productsAllInfo = action.payload;
      state.error = '';
    },
    [getAllProductsInfo.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [getAllProductsInfoByTypeID.pending.type]: (state) => {
      state.isLoading = true;
    },
    [getAllProductsInfoByTypeID.fulfilled.type]: (state, action: PayloadAction<IProductInfoResponse[]>) => {
      state.isLoading = false;
      state.productsAllInfo = action.payload;
      state.error = '';
    },
    [getAllProductsInfoByTypeID.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [addProductInfoType.pending.type]: (state) => {
      state.isLoading = true;
    },
    [addProductInfoType.fulfilled.type]: (state, action: PayloadAction<IProductInfoResponse>) => {
      state.isLoading = false;
      state.productInfoNewType = action.payload;
      state.error = '';
    },
    [addProductInfoType.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [deleteProductByID.pending.type]: (state) => {
      state.isLoading = true;
    },
    [deleteProductByID.fulfilled.type]: (state) => {
      state.isLoading = false;
      state.error = '';
    },
    [deleteProductByID.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [updateProductPriceByID.pending.type]: (state) => {
      state.isLoading = true;
    },
    [updateProductPriceByID.fulfilled.type]: (state) => {
      state.isLoading = false;
      state.error = '';
    },
    [updateProductPriceByID.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [deleteProductInfos.pending.type]: (state) => {
      state.isLoading = true;
    },
    [deleteProductInfos.fulfilled.type]: (state) => {
      state.isLoading = false;
      state.error = '';
    },
    [deleteProductInfos.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    
    // [updateBookAmountByID.pending.type]: (state) => {
    //   state.isLoading = true;
    // },
    // [updateBookAmountByID.fulfilled.type]: (state, action: PayloadAction<IBookResponse>) => {
    //   state.isLoading = false;
    //   state.book = action.payload;
    //   state.error = '';
    // },
    // [updateBookAmountByID.rejected.type]: (state, action: PayloadAction<string>) => {
    //   state.isLoading = false;
    //   state.error = action.payload;
    // },
    // [getAllGenres.pending.type]: (state) => {
    //   state.isLoading = true;
    // },
    // [getAllGenres.fulfilled.type]: (state, action: PayloadAction<IGenreResponse[]>) => {
    //   state.isLoading = false;
    //   state.genres = action.payload;
    //   state.error = '';
    // },
    // [getAllGenres.rejected.type]: (state, action: PayloadAction<string>) => {
    //   state.isLoading = false;
    //   state.error = action.payload;
    // },
  }
});

export default productSlice.reducer;