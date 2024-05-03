import {createSlice} from '@reduxjs/toolkit'
import type {PayloadAction} from '@reduxjs/toolkit'

import SubRoute from "../../model/SubRoute.ts";

const initialState: SubRoute[] = [];

export const subRouteSlice = createSlice({
    name: 'subRoutes',
    initialState: initialState,
    reducers: {
        setSubRoutes(state, action: PayloadAction<SubRoute[]>) {
            state.length = 0;
            state.push(...action.payload);
        },
        clearSubRoutes(state) {
            state.length = 0;
        }
    }
});

export const {setSubRoutes, clearSubRoutes} = subRouteSlice.actions;
export default subRouteSlice.reducer;