import React from 'react'
import {
    description,
    quickLinks,
    ourProperties, contactDetails, copyrightText, otherLinks,
    // otherLinks
} from "@/constants/footer.js"
import { FaTwitter, FaInstagram, FaFacebook, FaLinkedin } from "react-icons/fa";
import {Link} from "react-router";

const Footer = () => {
    return (
        <div className={"w-full bg-accent-darkest p-5 flex flex-col gap-2 pt-10 max-md:pt-6"} id={"footer"}>
            <div className={"grid grid-cols-4 max-lg:grid-cols-3 max-md:grid-cols-1 place-content-around items-start place-items-center gap-5"}>
                <DescriptionCard />
                <div className={"col-span-3 max-lg:col-span-2 w-full h-full grid grid-cols-3 place-content-center items-start place-items-center max-lg:grid-cols-2 max-md:grid-cols-1 gap-6 md:px-20"}>
                    <QuickLinks />
                    <OurProperties />
                    <ContactDetails />
                </div>
            </div>
            <hr className={"h-0.5 bg-white/50 my-5 mx-auto w-full"} />
            <div className={"flex flex-col items-center"}>
                <p className={"text-center footer-item"}>{copyrightText}</p>
                <div className={"flex gap-5 flex-wrap"}>
                    {otherLinks.map(link=>(
                        <p className={"font-primary text-neutral-300 hover:underline underline-offset-2 decoration-neutral-300 cursor-pointer select-none"} key={link}>{link}</p>
                    ))}
                </div>
            </div>
        </div>
    )
}

const ContactDetails = ()=>(
    <div className={"w-full flex flex-col justify-center gap-4"}>
        <div className={"footer-card-title"}>Contact</div>
        <div className={"flex flex-col justify-center items-start gap-1"}>
            {contactDetails.address.map(text=>(
                <p key={text} className={"footer-item"}>{text}</p>
            ))}
            <a href={`tel:${contactDetails.phNo}`} className={"footer-link"}>{contactDetails.phNo}</a>
            <a href={`mailto:${contactDetails.site}`} className={"footer-link"}>{contactDetails.site}</a>

        </div>
    </div>
)

const QuickLinks = ()=> {
    return (
        <div className={"w-full flex flex-col justify-center gap-4"}>
            <div className={"footer-card-title"}>Quick Links</div>
            <div className={"flex flex-col justify-center items-start gap-1"}>
                {quickLinks.map(link => (
                    <Link className={"footer-link"} key={link.title} to={`/#${link.id}`}>{link.title}</Link>
                ))}
            </div>
        </div>
    )
}

const OurProperties = ()=>(
    <div className={"w-full flex flex-col justify-center gap-4"}>
        <div className={"footer-card-title"}>Our Properties</div>
        <div className={"flex flex-col justify-center items-start gap-1"}>
            {ourProperties.map(property=>(
                <a className={"footer-link"} key={property.city}>{property.city}</a>
            ))}
        </div>
    </div>
)

const DescriptionCard = ()=>(
    <div className={"w-full flex flex-col justify-center gap-4"}>
        <div className={"flex flex-col justify-center gap-1.5"}>
            <p className={"font-cursive text-5xl text-white"}>Lume</p>
            <p className={"font-primary text-lg text- max-w-sm text-neutral-300"}>{description.content}</p>
        </div>
        <div className={"flex gap-2"}>
            {Object.entries(description.socials).map(([variant, link])=>(
                <Social variant={variant} link={link} key={variant} />
            ))}
        </div>
    </div>
)

const socialIcon = (variant)=>{
    switch(variant){
        case "twitter": return <FaTwitter size={20} className={"fill-neutral-200"} />;
        case "instagram": return <FaInstagram size={20} className={"fill-neutral-200"} />;
        case "facebook": return <FaFacebook size={20} className={"fill-neutral-200"} />;
        case "linkedin": return <FaLinkedin size={20} className={"fill-neutral-200"} />;
        default: return null;
    }
}

const Social = ({ variant, link })=>{
    return (
        <a className={"bg-article p-2.5 rounded-full flex justify-center items-center hover:scale-125 transition-transform ease-in-out duration-150 hover:shadow-md active:scale-100 active:shadow-none"} href={link}>
            {socialIcon(variant)}
        </a>
    )
}


export default Footer
