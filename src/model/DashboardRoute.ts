import SubRoute from "./SubRoute.ts";

interface DashboardRoute {
    _id: string;
    route: string;
    path: string;
    icon: string;
    position: number;
    roles: string[];
    role: string;
    subRoutes: SubRoute[];
    createdAt: Date;
}

export default DashboardRoute;