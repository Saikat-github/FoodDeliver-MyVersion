import { createSlice } from "@reduxjs/toolkit"
import { food_list } from "../assets/assets"

const initialState = {
    cartItems: {},
    showSignUp: false,
    totalAmt: 0,
    url: "http://localhost:4000",
    token: "",
    foodList: []
}

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            if (!state.cartItems[action.payload]) {
                state.cartItems = { ...state.cartItems, [action.payload]: 1 }
            } else {
                state.cartItems = { ...state.cartItems, [action.payload]: state.cartItems[action.payload] + 1 }
            }
            let amt = 0;
            for (const item in state.cartItems) {
                if (state.cartItems[item] > 0) {
                    let itemInfo = state.foodList.find((product) => product._id === item);
                    amt += itemInfo.price * state.cartItems[item];
                }
            }
            state.totalAmt = amt
        },
        removeFromCart: (state, action) => {
            state.cartItems = { ...state.cartItems, [action.payload]: state.cartItems[action.payload] - 1 };
            let amt = 0;
            for (const item in state.cartItems) {
                if (state.cartItems[item] > 0) {
                    let itemInfo = state.foodList.find((product) => product._id === item);
                    amt += itemInfo.price * state.cartItems[item];
                }
            }
            state.totalAmt = amt
        },
        setShowLogin: (state, action) => {
            state.showSignUp = !state.showSignUp;
        },
        setToken: (state, action) => {
            state.token = action.payload;
        },
        setFoodList: (state, action) => {
            state.foodList = action.payload;
        },
        setCartItems: (state, action) => {
            state.cartItems = action.payload;
            let amt = 0;
            for (const item in state.cartItems) {
                if (state.cartItems[item] > 0) {
                    let itemInfo = state.foodList.find((product) => product._id === item);
                    amt += itemInfo.price * state.cartItems[item];
                }
            }
            state.totalAmt = amt
        }
    }
})

export const { addToCart, removeFromCart, setShowLogin, setToken, setFoodList, setCartItems } = cartSlice.actions;

export default cartSlice.reducer;