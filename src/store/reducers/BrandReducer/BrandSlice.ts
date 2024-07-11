import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IBrandResponse } from "../../../types/IBrandResponse";
import { addBrand, getBrandByID, getBrands } from "./BrandActionCreators";

interface IBrandState {
  brand: IBrandResponse,
  brands: IBrandResponse[],
  isLoading: boolean,
  error: string,
};

const initialState: IBrandState = {
  brand: {} as IBrandResponse,
  brands: [],
  isLoading: false,
  error: '',
};

export const brandSlice = createSlice({
  name: 'BRAND',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(addBrand.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addBrand.fulfilled, (state, action: PayloadAction<IBrandResponse>) => {
        state.isLoading = false;
        state.brand = action.payload;
        state.error = '';
      })
      .addCase(addBrand.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    builder
      .addCase(getBrands.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBrands.fulfilled, (state, action: PayloadAction<IBrandResponse[]>) => {
        state.isLoading = false;
        state.brands = action.payload;
        state.error = '';
      })
      .addCase(getBrands.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
    
    builder
      .addCase(getBrandByID.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBrandByID.fulfilled, (state, action: PayloadAction<IBrandResponse>) => {
        state.isLoading = false;
        state.brand = action.payload;
        state.error = '';
      })
      .addCase(getBrandByID.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

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
  },
});

export default brandSlice.reducer;