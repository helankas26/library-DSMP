import {RouteObject} from "react-router/dist/lib/context";

import AdmissionList from "../components/admission/AdmissionList.tsx";

const admissionRoutes: RouteObject[] = [
    {index: true, element: <AdmissionList/>}
];

export default admissionRoutes;