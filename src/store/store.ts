import {configureStore} from "@reduxjs/toolkit";

import dashboardRouteReducer from './dashboard-route/dashboard-route-slice.ts';
import subRouteReducer from './dashboard-route/sub-route-slice.ts';

export const store = configureStore({
    reducer: {
        dashboardRoutes: dashboardRouteReducer,
        subRoutes: subRouteReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;