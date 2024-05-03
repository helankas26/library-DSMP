import {createSlice} from '@reduxjs/toolkit'
import type {PayloadAction} from '@reduxjs/toolkit'

import DashboardRoute from "../../model/DashboardRoute.ts";

const initialState: DashboardRoute[] = [];

export const dashboardRouteSlice = createSlice({
    name: 'dashboardRoutes',
    initialState: initialState,
    reducers: {
        setDashboardRoutes(state, action: PayloadAction<DashboardRoute[]>) {
            state.length = 0;
            state.push(...action.payload);
        },
        clearDashboardRoutes(state) {
            state.length = 0;
        }
    }
});

export const {setDashboardRoutes, clearDashboardRoutes} = dashboardRouteSlice.actions;
export default dashboardRouteSlice.reducer;