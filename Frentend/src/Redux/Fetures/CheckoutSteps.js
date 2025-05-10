import { createSlice, } from "@reduxjs/toolkit";

const CheckoutSteps = createSlice({
    name: "steps",
    initialState: 0,
    reducers: {
        currentSteps: (state, actions) =>actions.payload
    }
});

export const {currentSteps} = CheckoutSteps.actions;
export default CheckoutSteps.reducer