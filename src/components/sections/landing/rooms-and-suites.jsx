import React from 'react'
import { roomsData } from "@/constants/landing.js";
import {GoDotFill} from "react-icons/go";
import cn from "@/utility/class-names.js";
import {Link} from "react-router";

const RoomsAndSuites = () => {
    return (
        <div className={"landing-section-container"} id={"rooms"}>
            <p className={"landing-section-tag"}>Accomodation</p>
            <p className={"landing-section-title"}>Rooms & Suites</p>
            <p className={"landing-section-description"}>Each of our meticulously designed accommodations combines elegant aesthetics with uncompromising comfort, creating a perfect sanctuary for relaxation and rejuvenation.</p>
            <div className={"flex flex-col gap-14 mt-8"}>
                {roomsData.map((roomData, index)=>(
                    <RoomCard roomData={roomData} key={index} direction={index % 2 == 0 ? "left" : "right"} />
                ))}
            </div>
        </div>
    )
}

const RoomCard = ({roomData, direction})=>{
    return (
        <div className={"landing-card-container"}>
            <div className={"landing-card-image-container"}>
                <img src={roomData.image} className={"landing-card-image"} />
            </div>
            <div className={cn("landing-card-details-container", direction === "right" && "lg:row-start-1" )}>
                <div className={"landing-card-details-subcontainer"}>
                    <p className={"landing-card-tag"}>{roomData.price}</p>
                    <p className={"landing-card-title"}>{roomData.title}</p>
                    <p className={"landing-card-description"}>{roomData.description}</p>
                    <div className={"mt-1 flex flex-wrap gap-x-4 gap-y-1 max-w-lg"}>
                        {roomData.features.map((feature, index)=>(
                            <div className={"flex gap-2 items-center"} key={index}>
                                <GoDotFill className={"fill-accent"} />
                                <p className={"font-primary text-article text-lg max-md:text-base"}>{feature}</p>
                            </div>
                        ))}
                    </div>
                    <Link to={"/booking"} className={"landing-card-button"}>Book Now</Link>
                </div>
            </div>
        </div>
    )
}
export default RoomsAndSuites
