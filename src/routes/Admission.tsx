import {RouteObject} from "react-router/dist/lib/context";
import Admission from "../pages/Admission.tsx";

const admissionRoutes: RouteObject[] = [
    {index: true, element: <Admission/>},
];

export default admissionRoutes;