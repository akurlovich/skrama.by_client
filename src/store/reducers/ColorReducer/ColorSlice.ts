import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProductColorResponse } from "../../../types/IProductColor";
import { addProductColor, getProductColorsByProductID, getProductColorsByTypeID } from "./ColorActionCreaters";

interface IColorsState {
  color: IProductColorResponse;
  colorsByType: IProductColorResponse[];
  colorsByProduct: IProductColorResponse[];
  isLoading: boolean,
  error: string,
};

const initialState: IColorsState = {
  color: {} as IProductColorResponse,
  colorsByType: [],
  colorsByProduct: [],
  isLoading: false,
  error: '',
};

export const colorsSlice = createSlice({
  name: 'COLORS',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(addProductColor.pending, (state) => {
      state.isLoading = true;
      })
      .addCase(addProductColor.fulfilled, (state, action: PayloadAction<IProductColorResponse>) => {
        state.isLoading = false;
        state.color = action.payload;
        state.error = '';
      })
      .addCase(addProductColor.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    builder
      .addCase(getProductColorsByProductID.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProductColorsByProductID.fulfilled, (state, action: PayloadAction<IProductColorResponse[]>) => {
        state.isLoading = false;
        state.colorsByProduct = action.payload;
        state.error = '';
      })
      .addCase(getProductColorsByProductID.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    builder
      .addCase(getProductColorsByTypeID.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProductColorsByTypeID.fulfilled, (state, action: PayloadAction<IProductColorResponse[]>) => {
        state.isLoading = false;
        state.colorsByProduct = action.payload;
        state.error = '';
      })
      .addCase(getProductColorsByTypeID.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
    
  },
});

export default colorsSlice.reducer;