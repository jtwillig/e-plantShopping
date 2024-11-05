import { createSlice } from '@reduxjs/toolkit';
const calculateTotalQuantity = (items) => items.reduce(
  (totalQuantity, item) => totalQuantity + item.quantity,
  0 /* initialQuantity */
);
export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Initialize items as an empty array
    totalQuantity: 0,
  },
  reducers: {
    addItem: (state, action) => {
      const { name, image, cost } = action.payload;
      const { items } = state;
      const existingItem = items.find(item => item.name === name);
      if (existingItem) {
        existingItem.quantity++;
      } else {
        items.push({ name, image, cost, quantity: 1 });
      }
      state.totalQuantity = calculateTotalQuantity(items);
    },
    removeItem: (state, action) => {
      state.items = state.items.filter(item => item.name !== action.payload);
      state.totalQuantity = calculateTotalQuantity(state.items);
    },
    updateQuantity: (state, action) => {
      const { name, quantity } = action.payload;
      const itemToUpdate = state.items.find(item => item.name === name);
      if (itemToUpdate) {
        itemToUpdate.quantity = quantity;
      }
      state.totalQuantity = calculateTotalQuantity(state.items);
    },
  },
});

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

export default CartSlice.reducer;
