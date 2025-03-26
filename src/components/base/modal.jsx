import React from 'react'
import useDisableScroll from "@/hooks/use-disable-scroll.jsx";
import cn from "@/utility/class-names.js";

const Modal = ({onClose, children, isOpen, className}) => {
    useDisableScroll(isOpen);
    if (!isOpen) return null;
    return (
        <div
            className={cn("w-full h-full min-h-screen overflow-hidden fixed inset-0 z-50 bg-dark/80 overscroll-none", className)}
            onClick={onClose}
        >
            <div onClick={e=>e.stopPropagation()}>
                {children}
            </div>
        </div>
    )
}
export default Modal;
