import React, {useEffect, useRef, createContext, useContext} from 'react'
import Lenis from '@studio-freight/lenis';

const ScrollContext = createContext(undefined);

const AnimateScrollProvider = ({ children }) => {
    const lenis = useRef(null);
    useEffect(() => {
        lenis.current = new Lenis({
            duration: 1,
            easing: (t) => 1 - Math.pow(1 - t, 3),
            smooth: true,
            smoothTouch: true,
            lerp: 0.1,
        })
        const animate = (time) => {
            lenis.current.raf(time);
            requestAnimationFrame(animate);
        };
        requestAnimationFrame(animate);
        return () => {
            lenis.current.destroy();
        };

    }, []);

    const scrollToSection = (id, { duration=  1, offset = -50 }) => {
        if (!id) return;
        const element = document.getElementById(id);
        if (element) lenis.current.scrollTo(element, {offset, duration});
    };

    return (
        <ScrollContext.Provider value={{scrollTo: scrollToSection}}>
            {children}
        </ScrollContext.Provider>
    )
}

export const useAnimateScroll = ()=>{
    const scrollContext = useContext(ScrollContext);
    if (scrollContext === undefined){
        console.error("useAnimateScroll must be within a AnimateScrollProvider")
    }
    return scrollContext.scrollTo;
}

export const scrollTo = (id)=>{
    const targetForm = document.getElementById(id);
    if (targetForm) {
        const yOffset = -50;
        const y = targetForm.getBoundingClientRect().top + window.scrollY + yOffset;
        window.scrollTo({ top: y, behavior: "smooth" });
    }
}

export default AnimateScrollProvider;
