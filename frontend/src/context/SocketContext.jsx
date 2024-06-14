import { createContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import axios from "axios";
export const SocketContext = createContext();
export const SocketContextProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("http://localhost:4800/userdataclient"); // Assuming this route exists on your backend server
        setUserData(response.data); // Assuming the token is returned in the response data
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserData();
  }, []);
  const currentUser  = userData;
  const [socket, setSocket] = useState(null);
  useEffect(() => {
    setSocket(io("http://localhost:4900"));
  }, []);
  useEffect(() => {
  currentUser && socket?.emit("newUser", currentUser._id);
  }, [currentUser, socket]);
  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};
