import clsx from "clsx";
import { twMerge } from "tailwind-merge";

const cn = (...classes) => {
    return twMerge(clsx(...classes));
}

export default cn;