import React, {useEffect, useState} from 'react'
import NavLayout from "@/layouts/nav-layout.jsx";
import {useAuth} from "@/hooks/use-auth.jsx";
import {availableRooms, hotelLocations} from "@/constants/booking.js";
import cn from "@/utility/class-names.js";
import {scrollTo} from "@/hooks/use-animate-scroll.jsx";
import { FaCheck } from "react-icons/fa6";

import { IoIosExpand } from "react-icons/io";
import { IoWifiOutline } from "react-icons/io5";
import { IoIosPeople } from "react-icons/io";
import { PiBathtub } from "react-icons/pi";
import { IoMdTv } from "react-icons/io";
import { MdOutlineBrunchDining } from "react-icons/md";
import { useNavigate } from "react-router";

/*
* 1. Reservation Form
* 2. Room Selection
* 3. Booking details
* */

const forms = [
    "reservation-details-form",
    "room-selection-form",
    "confirm-booking-form"
]

const fd = (date)=>date.toISOString().split("T")[0];

const daysBetween = (startDate, endDate) => {
    const start = new Date(startDate), end = new Date(endDate);
    const diffTime = Math.abs(end - start);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

export const formatDate = (dateInput) => {
    let dateObj;

    if (dateInput instanceof Date) dateObj = dateInput;
    else if (typeof dateInput === "string") dateObj = new Date(dateInput);
    else return "Invalid date";

    return new Intl.DateTimeFormat('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    }).format(dateObj);
}

const Booking = () => {
    const [reservationDetails, setReservationDetails] = useState({
        hotelLocation: "",
        adults: 0,
        children: 0,
        checkInDate: "",
        checkOutDate: "",
    })

    const [formStage, setFormStage] = useState(0);


    const showNextForm = ()=>setFormStage(prev=>Math.min(prev + 1, 2));
    useEffect(()=>{
        scrollTo(forms[formStage]);
    }, [formStage]);

    const [selectedRoom, setSelectedRoom] = useState("");

    const clearState = ()=>{
        setReservationDetails({
            hotelLocation: "",
            adults: 0,
            children: 0,
            checkInDate: "",
            checkOutDate: "",
        });
        setSelectedRoom("");
        setFormStage(0);
    }

    return (
        <NavLayout>
            {/* Check for Availability */}

            <ReservationSection
                reservationDetails={reservationDetails}
                setReservationDetails={setReservationDetails}
                showNextForm={showNextForm}
            />
            {/* Select Room */}
            {formStage > 0 && (
                <RoomSelectionSection
                    reservationDetails={reservationDetails}
                    selectedRoom={selectedRoom}
                    setSelectedRoom={setSelectedRoom}
                    showNextForm={showNextForm}
                />
            )}
            {/* Confirm Booking and Checkout */}
            {formStage > 1 && (
                <ConfirmBookingSection
                    reservationDetails={reservationDetails}
                    selectedRoom={selectedRoom}
                    onConfirm={clearState}
                />
            )}
        </NavLayout>
    )
}

const ConfirmBookingSection = ({reservationDetails, selectedRoom, onConfirm})=>{
    return (
        <div className={"w-full min-h-[80vh] pb-10"} id={forms[2]}>
            <div className={"landing-section-container"}>
                <p className={"landing-section-tag"}>Booking Summary</p>
                <p className={"landing-section-title"}>Confirm Booking</p>
                <p className={"landing-section-description"}>Please review your booking details before confirming.</p>
            </div>
            <div className={"flex-center"}>
                <ConfirmBookingCard
                    reservationDetails={reservationDetails}
                    selectedRoom={selectedRoom}
                    onConfirm={onConfirm}
                />
            </div>
        </div>
    )
}

const ConfirmBookingCard = ({ reservationDetails, selectedRoom, onConfirm })=>{
    const roomDetails = availableRooms.find(room=>room.id === selectedRoom)
    const { user, isLoggedIn, openSignupModal } = useAuth();
    const navigate = useNavigate();
    const stayDuration = daysBetween(reservationDetails.checkOutDate, reservationDetails.checkInDate);
    const handleConfirmBooking = ()=>{
        if (!isLoggedIn) openSignupModal();
        navigate("/");
        alert("Booking successful!!!");
        onConfirm();
    }
    return (
        <div className={"w-full mx-5 max-w-xl rounded-xl flex flex-col shadow-sm shadow-light ring ring-accent-secondary"}>
            <div className={"w-full flex flex-col px-5 py-4 bg-gradient-to-br from-background/40 via-background/90 to-background/80 rounded-t-xl border-b-[1px] border-accent-darker/40"}>
                <div className={"text-2xl max-md:text-xl text-article tracking-tight font-primary"}>Booking Confirmation</div>
                <div className={"text-base max-md:text-sm text-article/80 tracking-tight font-primary"}>
                    You are about to book {roomDetails.title} at our {reservationDetails.hotelLocation} location.
                </div>
            </div>
            <div className={"flex flex-col py-2 px-5 font-main bg-background/10"}>
                <div className={"py-2 border-b border-article/40 flex justify-between px-2 text-sm"}>
                    <div className={"font-medium text-accent-darker"}>Full name</div>
                    <div className={"text-dark"}>{user.fullName}</div>
                </div>
                <div className={"py-2 border-b border-article/40 flex justify-between px-2 text-sm"}>
                    <div className={"font-medium text-accent-darker"}>Phone No.</div>
                    <div className={"text-dark"}>{user.phNum}</div>
                </div>
                <div className={"py-2 border-b border-article/40 flex justify-between px-2 text-sm"}>
                    <div className={"font-medium text-accent-darker"}>Location</div>
                    <div className={"text-dark"}>{reservationDetails.hotelLocation}</div>
                </div>
                <div className={"py-2 border-b border-article/40 flex justify-between px-2 text-sm"}>
                    <div className={"font-medium text-accent-darker"}>Room Type</div>
                    <div className={"text-dark"}>{roomDetails.title}</div>
                </div>
                <div className={"py-2 border-b border-article/40 flex justify-between px-2 text-sm"}>
                    <div className={"font-medium text-accent-darker"}>Check-in</div>
                    <div className={"text-dark"}>{formatDate(reservationDetails.checkInDate)}</div>
                </div>
                <div className={"py-2 border-b border-article/40 flex justify-between px-2 text-sm"}>
                    <div className={"font-medium text-accent-darker"}>Check-out</div>
                    <div className={"text-dark"}>{formatDate(reservationDetails.checkOutDate)}</div>
                </div>
                <div className={"py-2 border-b border-article/40 flex justify-between px-2 text-sm"}>
                    <div className={"font-medium text-accent-darker"}>Stay Duration</div>
                    <div className={"text-dark"}>{stayDuration} nights</div>
                </div>
                <div className={"py-2 flex justify-between px-2 text-sm"}>
                    <div className={"font-medium text-accent-darker"}>Room Rate</div>
                    <div className={"text-dark"}>₹{roomDetails.price}/night</div>
                </div>
            </div>
            <div className={"w-full flex justify-between items-center gap-2.5 max-md:flex-col px-5 py-4 bg-gradient-to-br from-background/40 via-background/90 to-background/80 rounded-b-xl border-t-[1px] border-accent-darker/40"}>
                <div className={"flex flex-col font-main text-article"}>
                    <div className={"max-md:text-sm font-medium"}>Total Price: ₹{roomDetails.price * stayDuration}</div>
                    <div className={"text-sm max-md:text-xs"}>Inclusive of all taxes and fees for {stayDuration} nights.</div>
                </div>
                <div className={"max-md:w-full"}>
                    <div className={"w-full text-center button button-primary"} onClick={handleConfirmBooking}>Confirm Booking</div>
                </div>
            </div>
        </div>
    )
}

const RoomSelectionSection = ({ reservationDetails, selectedRoom, setSelectedRoom, showNextForm })=>{
    const stay = {
        location: reservationDetails.hotelLocation,
        duration: daysBetween(reservationDetails.checkOutDate, reservationDetails.checkInDate)
    }
    return (
        <div className={"w-full min-h-[80vh] py-10 px-5 bg-gradient-to-b from-background/10 via-background/80 to-background/10"} id={forms[1]}>
            <div className={"landing-section-container"}>
                <p className={"landing-section-tag"}>Stay in Comfort</p>
                <p className={"landing-section-title"}>Available Rooms</p>
                <p className={"landing-section-description"}>Select from out available rooms in <span className={"text-primary"}>{stay.location}</span> for <span className={"text-primary"}>{stay.duration} nights</span></p>
            </div>
            <div className={"flex-center flex-col gap-8"}>
                {availableRooms.map(room=>(
                    <RoomCard
                        stay={stay}
                        roomDetails={room} key={room.id}
                        isSelected={room.id === selectedRoom}
                        selectRoom={()=>setSelectedRoom(room.id)}
                        showNextForm={showNextForm}
                    />
                ))}
            </div>
        </div>
    )
}

const RoomCard = ({ stay, roomDetails, isSelected, selectRoom, showNextForm })=>{
    const { isLoggedIn, openSignupModal } = useAuth();
    const handleRoomSelect = ()=>{
        if (!isLoggedIn) openSignupModal();
        selectRoom();
        showNextForm();
        scrollTo(forms[2]);
    }
    return (
        <div className={"w-full mx-5 max-w-5xl rounded-xl shadow-sm bg-white shadow-light flex max-md:flex-col hover:shadow-md hover:-translate-y-1 transition-transform duration-200 ease-in-out"}>
            <div className={"md:w-2/5"}>
                <img src={roomDetails.image} className={"md:rounded-l-xl max-md:rounded-t-xl object-cover h-full w-full max-md:max-h-80 max-sm:max-h-60"} />
            </div>
            <div className={"md:w-3/5 flex flex-col gap-3 rounded-r-xl"}>
                <div className={"w-full px-5 pt-5 max-md:pt-3 pb-3 bg-gradient-to-br from-light/30 via-light/60 to-light/50 border-b-[1px] border-accent-darker/40 md:rounded-tr-xl"}>
                    <div className={"flex flex-col"}>
                        <div className={"text-article font-primary text-2xl max-md:text-xl font-medium"}>{roomDetails.title}</div>
                        <div className={"text-article/80 font-primary text-base max-md:text-sm"}>{roomDetails.description}</div>
                    </div>
                </div>
                <div className={"flex justify-between gap-5 w-full px-5 pb-2"}>
                    <div>
                        <p className={"text-article text-sm font-main text-nowrap pb-0.5"}>Room Amenities</p>
                        {roomDetails.amenities.map((amenity, index)=>(
                            <div className={"flex gap-1.5 items-center font-main"} key={index}>
                                <FaCheck className={"size-2 text-accent-darkest"} />
                                <div className={"text-xs text-article"}>{amenity}</div>
                            </div>
                        ))}
                    </div>
                    <div className={"flex flex-1 md:flex-wrap max-md:flex-col max-md:items-end justify-end gap-4 gap-y-2 h-fit font-main pl-5"}>
                        <div className={"flex gap-1.5 items-center"}>
                            <IoIosExpand className={"size-4 text-accent-darkest"} />
                            <div className={"text-xs text-article text-nowrap"}>{roomDetails.size}</div>
                        </div>
                        <div className={"flex gap-1.5 items-center"}>
                            <IoIosPeople className={"size-4 text-accent-darkest"} />
                            <div className={"text-xs text-article text-nowrap"}>{roomDetails.capacity}</div>
                        </div>
                        <div className={"flex gap-1.5 items-center"}>
                            <IoWifiOutline className={"size-4 text-accent-darkest"} />
                            <div className={"text-xs text-article text-nowrap"}>High-Speed Wifi</div>
                        </div>
                        <div className={"flex gap-1.5 items-center"}>
                            <PiBathtub className={"size-4 text-accent-darkest"} />
                            <div className={"text-xs text-article text-nowrap"}>Luxury Bathroom</div>
                        </div>
                        <div className={"flex gap-1.5 items-center"}>
                            <IoMdTv className={"size-4 text-accent-darkest"} />
                            <div className={"text-xs text-article text-nowrap"}>Smart TV</div>
                        </div>
                        <div className={"flex gap-1.5 items-center"}>
                            <MdOutlineBrunchDining className={"size-4 text-accent-darkest"} />
                            <div className={"text-xs text-article text-nowrap"}>Dining Options</div>
                        </div>
                    </div>
                </div>
                <div className={"w-full px-5 pb-5 flex justify-between items-center"}>
                    <button className={cn("button h-9", isSelected ? "shadow-none button-primary" : "button-outline")} onClick={handleRoomSelect}>
                        {isSelected ? "Selected" : "Select Room"}
                    </button>
                    <div className={"flex flex-col items-end font-secondary"}>
                        <p className={"text-sm text-article/75"}><span className={"text-lg font-medium text-accent"}>₹{roomDetails.price}</span>/night</p>
                        <p className={"text-xs line-clamp-1 text-accent-darker/90"}>Total: ₹{roomDetails.price * stay.duration} for {stay.duration} nights </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

const ReservationSection = ({ reservationDetails, setReservationDetails, showNextForm})=>{
    return (
        <div className={"w-full min-h-[80vh] pb-10"} id={forms[0]}>
            <div className={"landing-section-container"}>
                <p className={"landing-section-tag"}>Your Luxury Stay</p>
                <p className={"landing-section-title"}>Book Your Stay</p>
                <p className={"landing-section-description"}>Select your preferred dates and location to find available rooms</p>
            </div>
            <div className={"flex-center"}>
                <ReservationCard reservationDetails={reservationDetails} setReservationDetails={setReservationDetails} showNextForm={showNextForm} />
            </div>
        </div>
    )
}

const ReservationCard = ({ reservationDetails, setReservationDetails, showNextForm })=>{
    const updateReservationDetails = (e, field)=>setReservationDetails(prev=>({...prev, [field]: e.target.value}))
    const { isLoggedIn, openSigninModal } = useAuth();
    const handleCheckForAvailability = ()=>{
        if (!isLoggedIn) openSigninModal();
        const { hotelLocation, adults, children, checkInDate, checkOutDate } = reservationDetails;
        if (
            hotelLocation.trim() === "" ||
            parseInt(adults) == 0 || (parseInt(adults) + parseInt(children) > 5) ||
            checkInDate == "" ||
            checkOutDate == "" ||
            new Date(checkInDate).getTime() < Date.now() ||
            new Date(checkOutDate).getTime() < new Date(checkInDate).getTime() ||
            daysBetween(checkOutDate, checkInDate) == 0
        ) return alert(`
Invalid Request
1.) Select a valid location.
2.) 1 Adult Minimum And Total of 5 people can stay in booking.
3.) Must enter a valid check-in and check-out date (Min 1 Night Stay).
        `);
        showNextForm();
        scrollTo(forms[1]);
    }

    return (
        <div className={"w-full mx-5 max-w-xl bg-gradient-to-br from-background/40 via-background/90 to-background/80 rounded-xl flex flex-col gap-4 py-5 shadow-sm shadow-light"}>
            <div className={"flex flex-col gap-0.5 px-5"}>
                <p className={"text-primary font-primary font-medium text-2xl tracking-tight"}>Reservation Details</p>
                <p className={"text-secondary/90 font-primary text-base tracking-tight"}>Complete the form below to check room availability.</p>
            </div>
            <hr className={"h-0.5 text-accent-darker/40"} />
            <div className={"flex flex-col gap-3.5 px-5"}>
                <div className={"flex justify-between gap-3 max-md:flex-col"}>
                    <div className={"w-full input-container"}>
                        <label className={"input-label"} htmlFor={"reservation-form-location"}>Hotel Location</label>
                        <select
                            id={"reservation-form-location"}
                            className={cn("max-md:w-full input", reservationDetails.hotelLocation === "" && "text-neutral-600")}
                            value={reservationDetails.hotelLocation}
                            onChange={e=>updateReservationDetails(e, "hotelLocation")}
                        >
                            <option selected className={"text-neutral-600"}>Choose a location</option>
                            {hotelLocations.map(location=>(
                                <option value={location} key= {location}>{location}</option>
                            ))}
                        </select>
                    </div>
                    <div className={"w-full flex justify-between gap-3"}>
                        <div className={"w-full input-container"}>
                            <label className={"input-label"} htmlFor={"reservation-form-adults"}>Adults</label>
                            <input  type={"number"} min={0} max={5} id={"reservation-form-adults"}
                                className={"input"} value={reservationDetails.adults}
                                onChange={e=>updateReservationDetails(e, "adults")}
                            />
                        </div>
                        <div className={"w-full input-container"}>
                            <label className={"input-label"} htmlFor={"reservation-form-children"}>Children</label>
                            <input  type={"number"} min={0} max={5} id={"reservation-form-children"}
                                    className={"input"} value={reservationDetails.children}
                                    onChange={e=>updateReservationDetails(e, "children")}
                            />
                        </div>
                    </div>
                </div>
                <div className={"w-full flex gap-3 justify-between max-md:flex-col"}>
                    <div className={"w-full input-container"}>
                        <label className={"input-label"} htmlFor={"reservation-form-checkIn"}>Check-in Date</label>
                        <input className={"max-md:w-full input"} type={"date"}
                               id={"reservation-form-checkIn"}
                               min={fd(new Date())} max={reservationDetails.checkOutDate}
                               value={reservationDetails.checkInDate}
                               onChange={e=>updateReservationDetails(e, "checkInDate")}
                        />
                    </div>
                    <div className={"w-full input-container"}>
                        <label className={"input-label"} htmlFor={"reservation-form-checkOut"}>Check-out Date</label>
                        <input className={"max-md:w-full input"} type={"date"}
                               id={"reservation-form-checkOut"}
                               min={reservationDetails.checkInDate}
                               value={reservationDetails.checkOutDate}
                               onChange={e=>updateReservationDetails(e, "checkOutDate")}
                        />
                    </div>
                </div>
            </div>
            <div className={"px-5 mt-3"}>
                <button className={"w-full h-10 shadow-sm button button-primary"} onClick={handleCheckForAvailability}>Search Available Rooms</button>
            </div>
        </div>
    )
}

export default Booking

