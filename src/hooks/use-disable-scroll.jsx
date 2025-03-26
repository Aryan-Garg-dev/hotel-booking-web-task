import { useEffect } from "react";

const useDisableScroll = (disable) => {
    useEffect(() => {
        if (disable) {
            const scrollY = window.scrollY;
            document.body.style.overflow = "hidden";
            document.body.style.position = "fixed";
            document.body.style.width = "100%";
            document.body.style.top = `-${scrollY}px`;

            return () => {
                document.body.style.overflow = "";
                document.body.style.position = "";
                document.body.style.width = "";
                window.scrollTo(0, scrollY);
            };
        }
    }, [disable]);
};

export default useDisableScroll;
