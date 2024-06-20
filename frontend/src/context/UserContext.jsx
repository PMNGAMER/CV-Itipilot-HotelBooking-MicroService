import { createContext, useContext, useState, useEffect} from "react";
import iaxios from "../axiosSetUp";
export const AuthContext = createContext();
export const useAuthContext = () => {
	return useContext(AuthContext);
};
function getCookie(name) {
    const cookieRegex = new RegExp('(^|;\\s*)(' + name + ')=([^;]*)');
    const cookieMatch = document.cookie.match(cookieRegex);
    if (cookieMatch) {
        return decodeURIComponent(cookieMatch[3]);
    } else {
        return null;
    }
}
export const AuthContextProvider = ({ children }) => {
    const [userDataFetch, setUserData] = useState([]);
    useEffect(() => {
        const getUserData = async () => {
            setLoading(true);
            try {
                const response = await iaxios.get(`http://localhost:4800/users`,{
                  headers:{
                    Authorization:`Bearer ${getCookie('usertoken')}`
                  }
                });
                setUserData(response.data);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };
      getUserData();
    }, [getCookie('usertoken')]);
    return <AuthContext.Provider value={{ userDataFetch }}>{children}</AuthContext.Provider>;
};
