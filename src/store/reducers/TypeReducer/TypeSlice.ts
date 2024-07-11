import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ITypeResponse } from "../../../types/ITypeResponse";
import { addType, getTypeByID, getTypes } from "./TypeActionCreators";
// import { ITypeResponse } from "../../../types/ITypeResponse";
// import { addType, getTypeByID, getTypes } from "./TypeActionCreators";

interface ITypeState {
  type: ITypeResponse,
  types: ITypeResponse[],
  isLoading: boolean,
  error: string,
};

const initialState: ITypeState = {
  type: {} as ITypeResponse,
  types: [],
  isLoading: false,
  error: '',
};

export const typeSlice = createSlice({
  name: 'TYPE',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(addType.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addType.fulfilled, (state, action: PayloadAction<ITypeResponse>) => {
        state.isLoading = false;
        state.type = action.payload;
        state.error = '';
      })
      .addCase(addType.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
      
    builder
      .addCase(getTypes.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTypes.fulfilled, (state, action: PayloadAction<ITypeResponse[]>) => {
        state.isLoading = false;
        state.types = action.payload;
        state.error = '';
      })
      .addCase(getTypes.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    builder
      .addCase(getTypeByID.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTypeByID.fulfilled, (state, action: PayloadAction<ITypeResponse>) => {
        state.isLoading = false;
        state.type = action.payload;
        state.error = '';
      })
      .addCase(getTypeByID.rejected, (state, action) => {
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
  }
});

export default typeSlice.reducer;