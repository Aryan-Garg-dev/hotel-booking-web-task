import React from 'react'
import NavLayout from "@/layouts/nav-layout.jsx";
import {notFound} from "@/assets/index.js";

const NotFound = () => {
    return (
        <NavLayout>
            <div className={"w-full h-full min-h-[80vh] flex-center p-5  bg-gradient-to-b from-white via-background/40 to-background/20"}>
                <img src={notFound} alt={"Page-not-found"} className={"max-h-[600px]"} />
            </div>
        </NavLayout>
    )
}
export default NotFound
