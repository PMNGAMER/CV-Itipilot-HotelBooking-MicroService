import { createContext, useContext, useState, useEffect } from "react";
import iaxios from "../axiosSetUp";

export const AuthContext = createContext();

export const useAuthContext = () => {
    return useContext(AuthContext);
};


export const AuthContextProvider = ({ children }) => {
    const [userDataFetch, setUserDataFetch] = useState(null); // Use null to distinguish between initial load and no data

    useEffect(() => {
        const getUserData = async () => {
            try {
                const response = await iaxios.get(`http://localhost:4800/users`,
            );
                setUserDataFetch(response.data);
            } catch (error) {
                console.log("Error fetching user data:", error);
                // Handle error state, e.g., redirect to login page or display an error message
                setUserDataFetch(null); // Reset state or handle appropriately
            }
        };

        getUserData();
    }, []); // Only run this effect when token changes

    console.log(userDataFetch);

    return (
        <AuthContext.Provider value={{ userDataFetch }}>
            {children}
        </AuthContext.Provider>
    );
};
