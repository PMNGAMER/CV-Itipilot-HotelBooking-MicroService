import { createContext, useContext, useState, useEffect} from "react";
import axios from "axios";
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
    const [authUser, setAuthUser] = useState(null);
    const [userDataFetch, setUserData] = useState([]);
    useEffect(() => {
        const fetchAuthUser = async () => {
            try {
                const token = getCookie('usertoken');
                const response = await axios.post(`http://localhost:4800/verify`, { token });
                console.log('Authentication response:', response.data);
                setAuthUser(response.data);
            } catch (error) {
                console.error('Authentication error:', error);
                setAuthUser(null);
            }
        };
        if(!authUser){
            fetchAuthUser();
        }
    }, []);
    useEffect(() => {
        const getUserData = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`http://localhost:4500/users/${authUser.userId}`);
                console.log(response);
                setUserData(response.data);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };
        if(authUser){
            getUserData();
        }
    }, [authUser]);
    return <AuthContext.Provider value={{ userDataFetch }}>{children}</AuthContext.Provider>;
};
