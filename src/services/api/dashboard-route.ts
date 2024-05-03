import AxiosInstance from "../../config/axios-instance.ts";
import HttpResponse from "../../utils/http-response.ts";
import DashboardRoute from "../../model/DashboardRoute.ts";


const DASHBOARD_ROUTES: string = '/dashboard-routes';

const findAllDashboardRoutes = async () => {
    return await AxiosInstance.get<HttpResponse<DashboardRoute[]>>(DASHBOARD_ROUTES);
}

const findAllDashboardRoutesByAuthUser = async () => {
    return await AxiosInstance.get<HttpResponse<DashboardRoute[]>>(`${DASHBOARD_ROUTES}/auth`);
}

const createDashboardRoute = async (dashboardRoute: DashboardRoute) => {
    return await AxiosInstance.post<HttpResponse<DashboardRoute>>(DASHBOARD_ROUTES, {dashboardRoute});
}

const findDashboardRouteById = async (id: string) => {
    return await AxiosInstance.get<HttpResponse<DashboardRoute>>(`${DASHBOARD_ROUTES}/${id}`);
}

const updateDashboardRoute = async (id: string, dashboardRoute: DashboardRoute) => {
    return await AxiosInstance.patch<HttpResponse<DashboardRoute>>(`${DASHBOARD_ROUTES}/${id}`, {dashboardRoute});
}

const deleteDashboardRoute = async (id: string) => {
    return await AxiosInstance.delete<{ id: string }>(`${DASHBOARD_ROUTES}/${id}`);
}

export default {
    findAllDashboardRoutes,
    findAllDashboardRoutesByAuthUser,
    createDashboardRoute,
    findDashboardRouteById,
    updateDashboardRoute,
    deleteDashboardRoute
};
