import SubRoute from "./SubRoute.ts";

interface DashboardRoute {
    id: string;
    route: string;
    path: string;
    icon: string;
    position: number;
    role: string;
    subRoutes: SubRoute[];
    createdAt: Date;
}

export default DashboardRoute;