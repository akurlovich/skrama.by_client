import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../../../types/IUser";
import { fetchUsers } from "./ActionCreators";

interface IUserState {
  users: IUser[],
  isLoading: boolean,
  isAuth: boolean,
  error: string,
}

const initialState: IUserState = {
  users: [],
  isLoading: true,
  isAuth: true,
  error: '',
}

export const userSlice = createSlice({
  name: 'USER',
  initialState,
  reducers: {
    
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<IUser[]>) => {
        state.isLoading = false;
        state.error = '';
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  }
})

export default userSlice.reducer;