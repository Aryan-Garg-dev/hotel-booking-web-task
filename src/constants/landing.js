import { images } from "@/assets"

export const slideShowImages = [
    images.coolSpace,
    images.amazingDining,
    images.amazingHall,
    images.amazingDining2,
    images.amazingPool
]

export const roomsData = [
    {
        title: "Deluxe Room",
        description: "Our elegant Deluxe Rooms offer a perfect blend of comfort and luxury with city or garden views, featuring premium bedding and a spacious marble bathroom.",
        price: "From ₹20,000 per night",
        image: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=2074",
        features: ["40sqm", "King Bed", "City View", "Marble Bathroom", "Smart TV"]
    },
    {
        title: "Executive Suite",
        description: "Expansive and sophisticated, our Executive Suites feature a separate living area, bedroom with premium amenities, and exclusive access to the Executive Lounge.",
        price: "From ₹30,000 per night",
        image: "https://images.unsplash.com/photo-1591088398332-8a7791972843?q=80&w=2074",
        features: ["65sqm", "King Bed", "Separate Living Area", "Executive Lounge Access", "Rain Shower"]
    },
    {
        title: "Presidential Suite",
        description: "The pinnacle of luxury, our Presidential Suite offers unparalleled elegance with breathtaking views, a private dining room, and personalized butler service.",
        price: "From ₹60,000 per night",
        image: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?q=80&w=2070",
        features: ["180sqm", "Master Bedroom", "Private Dining", "Butler Service", "Panoramic Views"]
    }
];


export const diningData = [
    {
        title: "The Grand Terrace",
        tag: "Fine Dining",
        description: "An all-day dining venue featuring international cuisine in an elegant setting with panoramic views.",
        timing: "6:30 AM - 11:00 PM",
        image: images.amazingDining
    },
    {
        title: "Azure",
        tag: "Seafood",
        description: "Our signature seafood restaurant offering the freshest catch prepared with Mediterranean influences.",
        timing: "6:00 PM - 10:30 PM",
        image: images.amazingDining2
    },
    {
        title: "The Jade Room",
        tag: "Asian Cuisine",
        description: "Experience authentic Asian flavors in a contemporary setting with theatrical open kitchens.",
        timing: "12:00 PM - 3:00 PM, 6:30 PM - 11:00 PM",
        image: images.amazingDining3
    }
]

export const facilitiesData = [
    {
        type: "pool",
        title: "Infinity Pool",
        description: "Enjoy our temperature-controlled infinity pool overlooking breathtaking views."
    },
    {
        type: "wifi",
        title: "High-Speed WiFi",
        description: "Stay connected with complimentary high-speed wireless internet throughout the property."
    },
    {
        type: "room",
        title: "24-Hour Room Service",
        description: "Indulge in fine dining from the comfort of your room, any time of day or night."
    },
    {
        type: "fitness",
        title: "Fitness Center",
        description: "Maintain your fitness routine in our state-of-the-art gym with personal trainers available."
    },
    {
        type: "spa",
        title: "Luxury Spa",
        description: "Rejuvenate your senses with our range of spa treatments and wellness therapies."
    },
    {
        type: "security",
        title: "24-Hour Security",
        description: "Rest assured with our discreet security team ensuring your safety around the clock."
    }
]