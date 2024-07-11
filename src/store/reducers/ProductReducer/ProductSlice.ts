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
  extraReducers: (builder) => {
    builder
      .addCase(addProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addProduct.fulfilled, (state, action: PayloadAction<IProductResponse>) => {
        state.isLoading = false;
        state.product = action.payload;
        state.error = '';
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    builder
      .addCase(getProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProducts.fulfilled, (state, action: PayloadAction<IProductResponse[]>) => {
        // console.log('first', action.payload)
        state.isLoading = false;
        // console.log(action.payload)
        state.products = action.payload;
        // state.productsMaxRecords = action.payload.maxRecords;
        state.error = '';
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    builder
      .addCase(getProductsByType.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProductsByType.fulfilled, (state, action: PayloadAction<IProductResponse[]>) => {
        state.isLoading = false;
        state.products = action.payload;
        state.error = '';
      })
      .addCase(getProductsByType.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    builder
      .addCase(getProductByID.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProductByID.fulfilled, (state, action: PayloadAction<IProductResponse>) => {
        state.isLoading = false;
        state.product = action.payload;
        state.error = '';
      })
      .addCase(getProductByID.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    builder
      .addCase(getProductInfoByProductID.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProductInfoByProductID.fulfilled, (state, action: PayloadAction<IProductInfoResponse[]>) => {
        state.isLoading = false;
        state.productInfo = action.payload;
        state.error = '';
      })
      .addCase(getProductInfoByProductID.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    builder
      .addCase(getAllProductsInfo.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllProductsInfo.fulfilled, (state, action: PayloadAction<IProductInfoResponse[]>) => {
        state.isLoading = false;
        state.productsAllInfo = action.payload;
        state.error = '';
      })
      .addCase(getAllProductsInfo.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
//TODO  возможно вынести ProductInfo в отдельный reducer
    builder
      .addCase(getAllProductsInfoByTypeID.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllProductsInfoByTypeID.fulfilled, (state, action: PayloadAction<IProductInfoResponse[]>) => {
        state.isLoading = false;
        state.productsAllInfo = action.payload;
        state.error = '';
      })
      .addCase(getAllProductsInfoByTypeID.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    builder
      .addCase(addProductInfoType.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addProductInfoType.fulfilled, (state, action: PayloadAction<IProductInfoResponse>) => {
        state.isLoading = false;
        state.productInfoNewType = action.payload;
        state.error = '';
      })
      .addCase(addProductInfoType.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string
      });

    builder
      .addCase(deleteProductByID.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteProductByID.fulfilled, (state) => {
        state.isLoading = false;
        state.error = '';
      })
      .addCase(deleteProductByID.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    builder
      .addCase(updateProductPriceByID.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateProductPriceByID.fulfilled, (state) => {
        state.isLoading = false;
        state.error = '';
      })
      .addCase(updateProductPriceByID.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    builder
      .addCase(deleteProductInfos.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteProductInfos.fulfilled, (state) => {
        state.isLoading = false;
        state.error = '';
      })
      .addCase(deleteProductInfos.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })





    
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