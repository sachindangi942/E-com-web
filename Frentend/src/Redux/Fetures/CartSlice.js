import { createSlice } from "@reduxjs/toolkit";

const CartSlice = createSlice({
    name: "cart",
    initialState: {
        Product: [],
        Details: []
    },
    reducers: {
        addToCart: ((state, actions) => {
            state.Product.push(actions.payload);
        }),
        removeFromCart: ((state, actions) => {
            state.Product = state.Product.filter(
                (Product) => Product._id !== actions.payload
            )
        }),
        clearCart: ((state) => {
            state.Product = []
        }),

        Details: ((state, actions) => {
            state.Details = actions.payload
        }),
    }
})

export default CartSlice.reducer
export const { addToCart, removeFromCart, clearCart,Details } = CartSlice.actions