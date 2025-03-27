import React, {useState} from 'react'
import Modal from "@/components/base/modal.jsx";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import {AiOutlineClose} from "react-icons/ai";
import {useAuth} from "@/hooks/use-auth.jsx";

const Signin = () => {
    const { user, login, logout, isLoggedIn, isSigninOpen: isOpen, closeSigninModal: closeModal } = useAuth();
    const [auth, setAuth] = useState({
        phNum: user.phNum,
        fullName: user.fullName,
        password: ""
    })
    const clearState = ()=>setAuth({ phNum: "", fullName: "", password: "" });
    const [showPassword, setShowPassword] = useState(false);

    const toggleShowPassword = ()=>setShowPassword(prev=>!prev);

    const handleInput = (e, field)=>{
        switch(field){
            case "phNum": setAuth(prev=>({ ...prev, phNum: e.target.value })); break;
            case "fullName": setAuth(prev=>({ ...prev, fullName: e.target.value })); break;
            case "password": setAuth(prev=>({ ...prev, password: e.target.value })); break;
            default: return;
        }
    }

    // Validations
    // Minimum Password Length 6 Characters (at least one lowercase letter, one uppercase, one digit, one special symbol)
    // Minimum phNUm Length 10 numbers
    // Minimum fullName Length 3 Characters

    const validatePassword = (password)=>{
        const safePasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/
        return safePasswordRegex.test(password);
    }

    const validatePhoneNumber = (phNum) => {
        const safePhoneNumber = /^\d{10}$/
        return safePhoneNumber.test(phNum);
    }

    // TODO: feedback message for inputs
    const handleLogin = ()=>{
        if (
            !auth ||
            auth.fullName.trim().length < 3 ||
            !validatePhoneNumber(auth.phNum) ||
            !validatePassword(auth.password)
        ) return alert(`
1. Fullname can be less than 3 characters long.
2. Phone number must be a valid.
3. Password must have atleast 1 lowercase letter, 1 uppercase letter, one digit, and one special symbol (@$!%*?&) and atleast 6 characters long.
        `);
        login({...auth});
        setAuth(prev => ({...prev, password: "" }));
        alert("Logged in Successfull!!!");
    }

    const handleLogout = ()=>{
        clearState();
        logout();
        alert("Logged out successfully!!!")
    }

    const handleCancel = ()=>{
        clearState();
        closeModal();
    }

    if (!isOpen) return null;

    return (
        <Modal isOpen={isOpen} className={"flex justify-center pt-10 max-md:pt-6"} onClose={closeModal}>
            <div className={"h-fit relative bg-neutral-100 flex flex-col gap-3 p-6 sm:min-w-sm min-w-[320px] rounded-md border-2 border-accent shadow shadow-accent-darkest"}>
                <div className={"p-1 absolute right-4 top-4"} onClick={closeModal}><AiOutlineClose className={"fill-accent-darker"} /></div>
                <div className={"flex flex-col"}>
                    <div className={"font-primary text-2xl tracking-tight text-accent-darker"}>User Details</div>
                    <div className={"font-primary text-base tracking-tight text-accent-darker/80"}>Fill in your details.</div>
                </div>
                <hr className={"h-[2px] text-accent-darker/75"} />
                <div className={"flex flex-col justify-center-center gap-3"}>
                    <div className={"input-container"}>
                        <label htmlFor={"auth-fullName"} className={"input-label"}>Full name:</label>
                        <input
                            id={"auth-fullName"}
                            type={"text"}
                            onChange={e=>handleInput(e, "fullName")}
                            value={auth.fullName}
                            placeholder={"John Doe"}
                            className={"input"}
                            autoComplete={"name"}
                        />
                    </div>
                    <div className={"input-container"}>
                        <label htmlFor={"auth-phone-number"} className={"input-label"}>Phone number:</label>
                        <input
                            id={"auth-phone-number"}
                            type={"tel"}
                            onChange={e=>handleInput(e, "phNum")}
                            value={auth.phNum}
                            placeholder={"9999999999"}
                            maxLength={10}
                            className={"input"}
                            autoComplete={"tel"}
                        />
                    </div>
                    <div className={"input-container"}>
                        <label htmlFor={"auth-password"} className={"input-label"}>Password</label>
                        <div className={"relative w-full h-full"}>
                            <input
                                id={"auth-password"}
                                type={showPassword ? "text" : "password"}
                                onChange={e=>handleInput(e, "password")}
                                value={auth.password}
                                placeholder={"******"}
                                className={"input w-full pr-10"}
                            />
                            <div className={"absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"} onClick={toggleShowPassword}>
                                {showPassword ? (
                                    <FaRegEyeSlash className={"fill-accent hover:fill-accent-darker"} />
                                ) : (
                                    <FaRegEye className={"fill-accent hover:fill-accent-darker"} />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <div className={"flex items-center gap-2 mt-3 max-sm:flex-col"}>
                    <button
                        onClick={handleLogin}
                        className={"w-full button button-primary"}
                    >{isLoggedIn ? "Edit Profile" : "Login"}</button>
                    <button
                        onClick={() => isLoggedIn ? handleLogout() : handleCancel()}
                        className={"w-full button button-outline"}
                    >
                        {isLoggedIn ? "Logout" : "Cancel"}
                    </button>
                </div>
            </div>
        </Modal>
    )
}
export default Signin;
