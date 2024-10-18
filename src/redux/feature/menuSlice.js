import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";
import { createSlice } from "@reduxjs/toolkit";

export const fetchMenu = createAsyncThunk(
    'menu/fetchMenus',
    async(_, {rejectedWithValue}) => {
        try{
            const response = await axiosInstance.get(`/menus`);
            return response.data;
        } catch(e) {
            return rejectedWithValue(e.response.data);
        }
    }
)

const menuSlice = createSlice({
    name: 'menu',
    initialState: {
        menus: [],
        status: null,
        error: null,
    },
    extraReducers: (builder) => {
        builder
            .addCase(
                fetchMenu.fulfilled, (state, action) => {
                    state.menus = action.payload.data;
                    state.status = 'succeeded';
                    state.error = null
                }
            )
            .addMatcher(
                (action) => action.type.endsWith('/rejected'),
                (state, action) => {
                    state.error = action.payload;
                    state.status = 'failed'
                }
            )
    }
})

export default menuSlice.reducer;