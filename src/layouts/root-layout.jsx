import React from 'react'
import {Outlet, ScrollRestoration} from "react-router";
import AnimateScrollProvider from "@/hooks/use-animate-scroll.jsx";
import {AuthProvider} from "@/hooks/use-auth.jsx";

const RootLayout = () => {
    return (
        <AuthProvider>
            <AnimateScrollProvider>
                {/*<ScrollRestoration />*/}
                <Outlet />
            </AnimateScrollProvider>
        </AuthProvider>
    )
}

export default RootLayout
