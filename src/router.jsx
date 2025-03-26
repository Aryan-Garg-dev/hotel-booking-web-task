import { createBrowserRouter } from "react-router";
import Landing from "@/pages/landing.jsx";
import Booking from "@/pages/booking.jsx";
import NotFound from "@/pages/not-found.jsx";
import RootLayout from "@/layouts/root-layout.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        children: [
            { index: true, element: <Landing /> },
            { path: "booking", element: <Booking /> },
            { path: "*", element: <NotFound /> }
        ]
    },
]);

export default router;