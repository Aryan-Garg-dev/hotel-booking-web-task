import React, {useEffect, useState} from 'react';
import NavLayout from "@/layouts/nav-layout.jsx";
import { slideShowImages } from "@/constants/landing.js";
import RoomsAndSuites from "@/components/sections/landing/rooms-and-suites.jsx";
import Dining from "@/components/sections/landing/dining.jsx";
import Facilities from "@/components/sections/landing/facitlies.jsx";
import { FaChevronRight } from "react-icons/fa";
import {Link} from "react-router";

const Landing = () => {
    const [slideshowIndex, setSlideShowIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setSlideShowIndex((prevIndex) => (prevIndex + 1) % slideShowImages.length);
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    return (
        <NavLayout>
            <div className={"page relative"}>

                <div className={"relative size-full pt-10 max-md:pt-5"}>
                    <div className={"font-display text-accent-darker w-full text-center text-5xl max-md:text-4xl max-sm:text-3xl leading-16 max-md:leading-12 max-md:leading-10 mb-6 px-6"}>Experience luxury like never before.</div>
                    <div className={"px-10 max-md:px-5"}>
                        <img
                            src={String(slideShowImages[slideshowIndex])}
                            className="w-full h-full max-h-screen object-cover rounded-t-2xl"
                        />
                    </div>
                    <div className={"bg-accent-darkest p-10 max-md:px-6 flex flex-col items-center gap-1"}>
                        <div className={"flex gap-5 justify-center items-center"}>
                            <hr className={"w-[max(30px,60px)] h-0.5 bg-white"} />
                            <h1 className={"font-cursive text-4xl max-md:text-3xl text-white text-center"}>Lume Hotels & Resorts</h1>
                            <hr className={"w-[max(30px,60px)] h-0.5 bg-white"} />
                        </div>
                        <p className={"font-primary text-amber-50 text-lg max-md:text-base max-w-[1000px] text-center"}>Welcome to Lume Hotels & Resorts—where luxury meets legacy. Born from a passion for timeless hospitality, Lume is more than just a place to stay; it’s a destination where elegance, comfort, and unforgettable experiences come together. From breathtaking landscapes to personalized service, every detail is designed to craft moments that linger long after your journey ends. Your story begins here.</p>
                    </div>
                </div>
                <RoomsAndSuites />
                <Dining />
                <Facilities />
                <div className={"w-full flex justify-center my-2 mb-10"} id={"book-now"}>
                    <Link to={"/booking"} className={"flex gap-1 group items-center bg-white p-1 px-4 py-1.5 rounded-md bg-gradient-to-br from-accent to-accent-darkest hover:bg-light/20 shadow-md active:shadow-none active:translate-y-0.5 hover:scale-105 active:scale-100 select-none  transition duration-200 ease-in-out"}>
                        <div className={"text-xl no-underline hover:no-underline text-white hover:text-white nav-link tracking-tight"}>Book Now</div>
                        <FaChevronRight className={"text-white group-hover:translate-x-1 transition duration-300 ease-in-out size-4"} />
                    </Link>
                </div>
            </div>
        </NavLayout>
    )
}
export default Landing
