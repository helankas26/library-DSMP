import dashboardRouteService from "../../services/api/dashboard-route.ts";
import {setDashboardRoutes, clearDashboardRoutes} from './dashboard-route-slice.ts'

export const loadDashboardRoutes = () => {
    return async (dispatch: any) => {
        try {
            const response = await dashboardRouteService.findAllDashboardRoutesByAuthUser();
            dispatch(setDashboardRoutes(response.data.dashboardRoutes));
        } catch (error) {
            dispatch(clearDashboardRoutes());
        }
    };
};