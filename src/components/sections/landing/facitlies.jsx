import React from "react";
import { PiSwimmingPoolDuotone } from "react-icons/pi";
import { IoWifi } from "react-icons/io5";
import { MdRoomService, MdFitnessCenter } from "react-icons/md";
import { FaSpa } from "react-icons/fa6";
import { PiSecurityCameraDuotone } from "react-icons/pi";
import {facilitiesData} from "@/constants/landing.js";

const Facilities = () => {
    return (
        <div className={"landing-section-container"} id={"facilities"}>
            <p className={"landing-section-tag"}>Exceptional Services</p>
            <p className={"landing-section-title"}>Amenities & Facilities</p>
            <p className={"landing-section-description"}>We offer a comprehensive range of services and facilities designed to enhance your stay and provide the ultimate luxury experience.</p>
            <div className={"grid grid-cols-3 max-lg:grid-cols-2 max-sm:grid-cols-1 gap-6 mt-8"}>
                {facilitiesData.map((facilityDetail, index)=>(
                    <FacilityCard facilityDetail={facilityDetail} key={index} />
                ))}
            </div>
        </div>
    )
}

const FacilityCard = ({facilityDetail})=>(
    <div className={"bg-gradient-to-br from-light/40 via-light/60 to-light p-5 rounded-xl flex flex-col gap-2.5 sm:max-w-sm max-sm:w-full px-5 shadow-sm hover:shadow-md hover:scale-105 hover:-translate-y-1 transition-transform duration-150 ease-in-out"}>
        <div className={"p-3 rounded-full bg-white w-fit shadow-sm"}>
            {serviceIcon(facilityDetail.type)}
        </div>
        <div className={"flex flex-col max-w-sm mt-2"}>
            <p className={"font-primary text-2xl font-bold text-accent-darkest"}>{facilityDetail.title}</p>
            <p className={"font-primary flex flex-lg"}>{facilityDetail.description}</p>
        </div>
    </div>
)

const serviceIcon = (facilityType)=>{
    switch(facilityType){
        case "pool": return <PiSwimmingPoolDuotone size={20} className={"text-accent-darkest"} />;
        case "wifi": return <IoWifi size={20} className={"text-accent-darkest"} />;
        case "room": return <MdRoomService size={20} className={"text-accent-darkest"} />;
        case "fitness": return <MdFitnessCenter size={20} className={"text-accent-darkest"} />;
        case "spa": return <FaSpa size={20} className={"text-accent-darkest"} />;
        case "security": return <PiSecurityCameraDuotone size={20} className={"text-accent-darkest"} />;
        default: return null;

    }
}

export default Facilities;