import React from 'react'
import Navbar from "@/components/common/navbar.jsx";
import Footer from "@/components/common/footer.jsx";
import { FaAnglesDown } from "react-icons/fa6";
import {useAnimateScroll} from "@/hooks/use-animate-scroll.jsx";

const NavLayout = ({children}) => {
    const scrollTo = useAnimateScroll();
    return (
        <div className={"relative"}>
            <Navbar />
            <main className={"pt-20 h-full min-h-screen w-full"}>
                {children}
            </main>
            <Footer />
            <div className={"fixed bottom-2 right-2 z-40"}>
                <a href={"#footer"} onClick={()=>scrollTo("footer", { duration: 1.5 })}>
                    <div className={"p-3 max-md:p-2.5 rounded-full bg-article/95 w-fit shadow-sm active:shadow-none active:translate-y-0.5 active:scale-95 select-none"}>
                        <FaAnglesDown className={"text-background size-5 max-md:size-[18px]"} />
                    </div>
                </a>
            </div>
        </div>
    )
}
export default NavLayout
