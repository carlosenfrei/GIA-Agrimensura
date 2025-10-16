import { createSlice } from '@reduxjs/toolkit'

const cartSlice = createSlice({
    name: "cart",
    initialState:{
        cartItems:[],
        total:0,
        cartCount:0,
    },
    reducers:{
        addItem: (state, action)=>{
            const newItem = action.payload;
            state.cartItems.push(newItem);
            state.total = state.cartItems.length;
        },
        removeItem: (state, action)=>{
            const idToRemove = action.payload;
            state.cartItems = state.cartItems.filter((_, index) => index !== idToRemove);
            state.total = state.cartItems.length;
        },
        clearCart:(state) =>{
            state.cartItems=[]
            state.total= 0
        },
    },
})
export const selectCartItems = (state) => state.cartReducer.cartItems;
export const selectCartCount = (state) => state.cartReducer.cartItems.length;


export const { addItem, removeItem, clearCart} = cartSlice.actions;
export default cartSlice.reducer;