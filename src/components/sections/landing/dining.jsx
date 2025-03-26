import React from 'react'
import {MdOutlineLocalDining} from "react-icons/md";
import { LuClock4 } from "react-icons/lu";
import {diningData} from "@/constants/landing.js";
import cn from "@/utility/class-names.js";

const Dining = () => {
    return (
        <div className={"landing-section-container bg-accent/10"} id={"dining"}>
            <p className={"landing-section-tag"}>Culinary Excellence</p>
            <p className={"landing-section-title"}>Fine Dining</p>
            <p className={"landing-section-description"}>Indulge in world-class cuisine crafted by our master chefs using the finest local and international ingredients, paired with an extensive selection of wines and spirits.</p>
            <div className={"flex flex-col gap-14 mt-8"}>
                {diningData.map((data, index)=>(
                    <DiningCard diningData={data} key={index} direction={index % 2 == 0 ? "left": "right"} />
                ))}
            </div>
        </div>
    )
}

const DiningCard = ({diningData, direction})=>{
    return (
        <div className={"landing-card-container"}>
            <div className={"landing-card-image-container"}>
                <img src={diningData.image} className={"landing-card-image"} />
            </div>
            <div className={cn("landing-card-details-container", direction === "right" && "lg:row-start-1" )}>
                <div className={"flex-center"}>
                    <div className={"landing-card-details-subcontainer"}>
                        <div className={"flex gap-2 items-center"}>
                            <MdOutlineLocalDining className={"fill-accent"} />
                            <p className={"landing-card-tag"}>{diningData.tag}</p>
                        </div>
                        <p className={"landing-card-title"}>{diningData.title}</p>
                        <p className={"landing-card-description"}>{diningData.description}</p>
                        <div className={"flex gap-2 items-center"}>
                            <LuClock4 className={"stroke-accent-darker"} size={18} />
                            <p className={"text-accent-darker font-primary text-lg max-w-lg mt-1"}>{diningData.timing}</p>
                        </div>
                        <button className={"landing-card-button"}>View Menu</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Dining
