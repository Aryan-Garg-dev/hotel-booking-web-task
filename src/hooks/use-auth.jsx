import React, { createContext, useContext, useEffect, useState, useMemo } from "react";

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
    const localStorageAuthKey = "lume-auth";

    const [credentials, setCredentials] = useState(() => {
        const storedData = localStorage.getItem(localStorageAuthKey);
        return storedData ? JSON.parse(storedData) : null;
    });
    const [isSigninOpen, setSigninOpen] = useState(false);

    const isLoggedIn = useMemo(() => credentials !== null, [credentials]);

    const openSigninModal = ()=>setSigninOpen(true);
    const closeSigninModal = ()=>setSigninOpen(false);

    const login = ({ phNum, fullName, password }) => {
        setCredentials({ phNum, fullName, password });
        setSigninOpen(false);
    };

    const logout = () => {
        setCredentials(null);
        setSigninOpen(false);
    };

    useEffect(() => {
        if (credentials) {
            localStorage.setItem(localStorageAuthKey, JSON.stringify(credentials));
        } else {
            localStorage.removeItem(localStorageAuthKey);
        }
    }, [credentials]);

    const authContext = {
        user: credentials || { fullName: "", phNum: "" },
        isLoggedIn,
        login,
        logout,
        isSigninOpen,
        openSigninModal,
        closeSigninModal,
    }

    return (
        <AuthContext.Provider value={authContext}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const authContext = useContext(AuthContext);
    if (authContext === undefined){
        console.error('useAuth must be used within a AuthProvider');
    }
    return authContext;
};
