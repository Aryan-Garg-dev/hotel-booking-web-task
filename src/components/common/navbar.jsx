import React from 'react'
import {useScrollTop} from "@/hooks/use-scroll-top.jsx";
import cn from "@/utility/class-names.js";
import {useAnimateScroll} from "@/hooks/use-animate-scroll.jsx";
import {Link} from "react-router";
import Signin from "@/components/modals/signin.jsx";
import {useAuth} from "@/hooks/use-auth.jsx";

const Navbar = () => {
    const scrolled = useScrollTop(50);
    const scrollTo = useAnimateScroll();
    const { isLoggedIn, user, openSigninModal: openModal } = useAuth();
    return (
        <div className={cn("w-full p-2 px-5 flex items-center fixed top-0 max-lg:justify-between z-[99999] bg-white/90", scrolled && "bg-white/80 shadow-sm")}>
            <Link to={"/"} className={"logo"}>Lume</Link>
            <div className={"flex flex-1 gap-5 justify-center max-lg:hidden"}>
                <Link to={"/#rooms"} className={"nav-link"} onClick={scrollTo.bind(null, "rooms")}>Rooms & Suites</Link>
                <Link to={"/#dining"} className={"nav-link"} onClick={scrollTo.bind(null, "dining")}>Dining</Link>
                <Link to={"/#facilities"} className={"nav-link"} onClick={scrollTo.bind(null, "facilities")}>Facilities</Link>
                <Link to={"/#footer"} className={"nav-link"} onClick={scrollTo.bind(null, "footer")}>Locations</Link>
                <Link to={"/#footer"} className={"nav-link"} onClick={scrollTo.bind(null, "footer")}>Contact</Link>
            </div>
            <div className={"flex gap-5 max-md:gap-3 items-center"}>
                <div onClick={openModal} className={"h-full"}>
                    {isLoggedIn ? (
                        <div className={"size-8 flex-center font-main text-lg cursor-pointer shadow-md rounded-full bg-accent/90 hover:bg-accent ring ring-light text-white"}>{user.fullName[0]}</div>
                    ) : (
                        <button className={"h-9 button button-outline flex-center"}>Sign In</button>
                    )}
                </div>
                <Link to={"/booking"} className={"h-9 button button-primary flex-center"}>Book Now</Link>
            </div>
            <Signin />
        </div>
    )
}


export default Navbar
