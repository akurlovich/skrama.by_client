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
  extraReducers: {
    [addProductColor.pending.type]: (state) => {
      state.isLoading = true;
    },
    [addProductColor.fulfilled.type]: (state, action: PayloadAction<IProductColorResponse>) => {
      state.isLoading = false;
      state.color = action.payload;
      state.error = '';
    },
    [addProductColor.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [getProductColorsByProductID.pending.type]: (state) => {
      state.isLoading = true;
    },
    [getProductColorsByProductID.fulfilled.type]: (state, action: PayloadAction<IProductColorResponse[]>) => {
      console.log('slicer');
      state.isLoading = false;
      state.colorsByProduct = action.payload;
      state.error = '';
    },
    [getProductColorsByProductID.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [getProductColorsByTypeID.pending.type]: (state) => {
      state.isLoading = true;
    },
    [getProductColorsByTypeID.fulfilled.type]: (state, action: PayloadAction<IProductColorResponse[]>) => {
      state.isLoading = false;
      state.colorsByType = action.payload;
      state.error = '';
    },
    [getProductColorsByTypeID.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    
  }
});

export default colorsSlice.reducer;