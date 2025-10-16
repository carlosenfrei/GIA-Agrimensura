import { configureStore } from '@reduxjs/toolkit'
import instrumentalReducer from './slices/instrumentalSlice.js'
import cartReducer from './slices/cartSlice.js'
import userReducer from './slices/userSlice.js'

export const roomStore = configureStore({
    reducer: {
        instrumentalReducer,
        cartReducer,
        userReducer,
    },
})