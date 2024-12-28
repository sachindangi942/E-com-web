import { createSlice } from "@reduxjs/toolkit";

const CartSlice = createSlice({
    name: "cart",
    initialState: {
        Product: []
    },
    reducers: {
        addToCart: ((state, actions) => {
            state.Product.push(actions.payload);
        }),
        removeFromCart:((state,actions)=>{
            state.Product = state.Product.filter(
                (Product)=>Product._id !== actions.payload
            )
        }),
    }
})

export default CartSlice.reducer
export const { addToCart,removeFromCart } = CartSlice.actions