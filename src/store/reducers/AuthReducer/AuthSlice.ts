import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../../../types/IUser";
import { checkAuth, loginUser, logoutUser, registerUser, updateUserIsBlocked, updateUserProfileImage } from "./AuthActionCreatores";

interface IResponseData {
  user: IUser,
  role: string,
};

interface IAuthState {
  user: IUser,
  isLoading: boolean,
  isAuth: boolean,
  role: string,
  error: string,
  isAdminAuth: boolean,
};

const initialState: IAuthState = {
  user: {} as IUser,
  isLoading: true,
  isAuth: false,
  role: '',
  error: '',
  isAdminAuth: false,
};

export const authSlice = createSlice({
  name: 'AUTH',
  initialState,
  reducers: {
    removeRigisterUserError(state) {
      state.error = '';
    },
    setAuthAdmin(state) {
      state.isAdminAuth = true;
      // state.error = 'Wrong admin auth!';
      // if (action.payload === 'skrama@tut.by') {
        // localStorage.setItem('token', 'skrama@tut.by');
      //   state.isAdminAuth = true;
      // } else {
      //   state.isAdminAuth = false;
      // }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action: PayloadAction<IResponseData>) => {
          state.isLoading = false;
          state.isAuth = true;
          state.error = '';
          state.user = action.payload.user;
          state.role = action.payload.role;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuth = false;
        state.error = action.payload as string
      });

  },
});

export const {
  removeRigisterUserError,
  setAuthAdmin,
} = authSlice.actions;

export default authSlice.reducer;