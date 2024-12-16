import { createBrowserRouter } from "react-router-dom";
import Home from "../page/home";

export const root = createBrowserRouter([
    {
        path:"/",
        element:<Home/>
    }
])