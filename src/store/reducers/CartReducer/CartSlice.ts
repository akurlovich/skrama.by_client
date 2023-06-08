import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICartItem } from '../../../types/ICartItem';

interface ICartSliceState {
  totalPrice: number;
  items: ICartItem[];
};

const initialState: ICartSliceState = {
  totalPrice: 0,
  items: [] as ICartItem[],
};

const cartSlice = createSlice({
  name: 'CART',
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<ICartItem>) {
      const findItem = state.items.find((obj: ICartItem) => obj.id === action.payload.id);
      if (findItem) {
        findItem.count++;
        localStorage.setItem('cart', JSON.stringify(state.items));
      } else {
        state.items.push({
          ...action.payload,
          // count: 1,
        });
        localStorage.setItem('cart', JSON.stringify(state.items));
      }
      // state.items.push(action.payload);
      // state.totalPrice += action.payload.price;
      state.totalPrice += action.payload.price * action.payload.count;
    },
    
    minusItem(state, action: PayloadAction<{id:string, price: number}>) {
      const findItem = state.items.find((obj: ICartItem) => obj.id === action.payload.id);
      if (findItem) {
        findItem.count--;
        state.totalPrice -= action.payload.price;
        localStorage.setItem('cart', JSON.stringify(state.items));
      }
      
    },
    removeItem(state, action: PayloadAction<{id:string, price: number}>) {
      state.items = state.items.filter((obj: ICartItem) => obj.id !== action.payload.id);
      state.totalPrice -= action.payload.price;
      localStorage.setItem('cart', JSON.stringify(state.items));
      // if (state.totalPrice === 0) {
      //   clearItems();
      // }
      if (!state.items.length) {
        state.totalPrice = 0;
        clearItems();
      }
    },
    clearItems(state) {
      state.items = [];
      state.totalPrice = 0;
      localStorage.removeItem('cart');
    },
  },
});

export const { addItem, removeItem, clearItems, minusItem } =
  cartSlice.actions;

export default cartSlice.reducer;
