import './App.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import HomeLayout from "./layouts/Home.tsx";
import homeRoutes from "./routes/Home.tsx";

function App() {

    const router = createBrowserRouter([
        {
            path: '/',
            element: <HomeLayout/>,
            children: homeRoutes
        }
    ]);

    return (
        <>
            <RouterProvider router={router}/>
        </>
    )
}

export default App
