import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface ShoppingCartState {
    loading: boolean;
    error: string | null;
    items: any[];
}

const initialState: ShoppingCartState = {
    loading: true,
    error: null,
    items: []
}

// 获取购物车列表
export const getShoppingCart = createAsyncThunk(
    "shoppingCart/getShoppingCart",
    async (jwt: string, thunkAPI) => {
        const { data } = await axios.get(
            `http://123.56.149.216:8080/api/shoppingCart`,
            {
                headers: {
                    Authorization: `bearer ${jwt}`,
                }
            }
        );
        return data.shoppingCartItems;
    }
)

// 添加购物车信息
export const addShoppingCartItem = createAsyncThunk(
    "shoppingCart/addShoppingCartItem",
    async (parameters: { jwt: string, touristRouteId: string }, thunkAPI) => {
        const { data } = await axios.post(
            `http://123.56.149.216:8080/api/shoppingCart/items`,
            {
                touristRouteId: parameters.touristRouteId
            },
            {
                headers: {
                    Authorization: `bearer ${parameters.jwt}`
                }
            }
        );
        return data.shoppingCartItems;
    }
)

export const clearShoppingCartItem = createAsyncThunk(
    "shoppingCart/clearShoppingCartItem",
    async (parameters: { jwt: string; itemIds: number[] }, thunkAPI) => {
        return await axios.delete(
            `http://123.56.149.216:8080/api/shoppingCart/items/(${parameters.itemIds.join(
                ","
            )})`,
            {
                headers: {
                    Authorization: `bearer ${parameters.jwt}`,
                },
            }
        );
    }
)

export const checkout = createAsyncThunk(
    "shoppingCart/checkout",
    async(jwt: string, thunkAPI) => {
        const { data } = await axios.post(
            `http://123.56.149.216:8080/api/shoppingCart/checkout`,
            null,
            {
                headers: {
                    Authorization: `bearer ${jwt}`,
                }
            }
        )
        return data;
    }
)

export const shoppingCartSlice = createSlice({
    name: 'shoppingCart',
    initialState,
    reducers: {
    },
    extraReducers: {
        [getShoppingCart.pending.type]: (state) => {
            // return { ...state, loading: true }
            state.loading = true;
        },
        [getShoppingCart.fulfilled.type]: (state, action) => {
            state.items = action.payload;
            state.loading = false;
            state.error = null;
        },
        [getShoppingCart.rejected.type]: (state, action: PayloadAction<string | null>) => {
            state.loading = false;
            state.error = action.payload;
        },

        [addShoppingCartItem.pending.type]: (state) => {
            // return { ...state, loading: true }
            state.loading = true;
        },
        [addShoppingCartItem.fulfilled.type]: (state, action) => {
            state.items = action.payload;
            state.loading = false;
            state.error = null;
        },
        [addShoppingCartItem.rejected.type]: (state, action: PayloadAction<string | null>) => {
            state.loading = false;
            state.error = action.payload;
        },

        [clearShoppingCartItem.pending.type]: (state) => {
            // return { ...state, loading: true }
            state.loading = true;
        },
        [clearShoppingCartItem.fulfilled.type]: (state, action) => {
            state.items = [];
            state.loading = false;
            state.error = null;
        },
        [clearShoppingCartItem.rejected.type]: (state, action: PayloadAction<string | null>) => {
            state.loading = false;
            state.error = action.payload;
        },

        [checkout.pending.type]: (state) => {
            // return { ...state, loading: true }
            state.loading = true;
        },
        [checkout.fulfilled.type]: (state, action) => {
            state.items = [];
            state.loading = false;
            state.error = null;
        },
        [checkout.rejected.type]: (state, action: PayloadAction<string | null>) => {
            state.loading = false;
            state.error = action.payload;
        }
    }
})