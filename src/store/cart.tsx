import { createSlice } from "@reduxjs/toolkit";

interface CartItem {
    productId: string;
    quantity: number;
}

interface CartState {
    items: CartItem[];
    statusTab: boolean;
    totalPriice:number;
}

const initialState: CartState = {
    items: localStorage.getItem("carts") ? JSON.parse(localStorage.getItem("carts")!) : [],
    statusTab: false,
    totalPriice:0,
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart(state, action) {
            const { productId, quantity } = action.payload;
            const indexProductId = (state.items).findIndex(item => item.productId === productId);
            if (indexProductId >= 0) {
                state.items[indexProductId].quantity += quantity;
                
            } else {
                state.items.push({ productId, quantity });
            }
            localStorage.setItem("carts", JSON.stringify(state.items));
        },
        changeQuantity(state, action) {
            const { productId, quantity } = action.payload;
            const indexProductId = (state.items).findIndex(item => item.productId === productId);
            if (quantity > 0) {
                state.items[indexProductId].quantity = quantity;
            } else {
                state.items = (state.items).filter(item => item.productId !== productId);
            }
            localStorage.setItem("carts", JSON.stringify(state.items));
        },
        toggleStatusTab(state) {
            if (state.statusTab === false) {
                state.statusTab = true;
            } else {
                state.statusTab = false;
            }
        },
        deleteItem(state, action) {
            const { productId } = action.payload;
            const findProductId = (state.items).findIndex(item => item.productId === productId);
            if (findProductId !== -1) {
                state.items.splice(findProductId, 1)
                const localStorageData = localStorage.getItem("carts");
                const Localstorage = localStorageData ? JSON.parse(localStorageData) : [];
                Localstorage.splice(findProductId, 1)
                localStorage.setItem("carts", JSON.stringify(Localstorage));

            }
        }
    }
})
export const { addToCart, changeQuantity, toggleStatusTab, deleteItem } = cartSlice.actions;
export default cartSlice.reducer;