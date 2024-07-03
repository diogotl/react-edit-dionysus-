import { createBrowserRouter } from "react-router-dom";

import { Events } from "./events";
import { AppLayout } from "./app-layout";
import { Attendees } from "./attendees";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <AppLayout />,
        children: [
            {
                path: "/events/:slug/attendees",
                element: <Attendees />,
            },
            {
                path: "/events",
                element: <Events />,
            },
        ],
    },
]);
