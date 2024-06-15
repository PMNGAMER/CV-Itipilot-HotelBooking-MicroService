import { createContext, useEffect, useState, useContext } from "react";
import { io } from "socket.io-client";
import { UserContext } from "./UserContext"; // Import UserContext

export const SocketContext = createContext();
export const SocketContextProvider = ({ children }) => {
  const userData = useContext(UserContext);
  const tmp = userData.userData;  
  const currentUser = tmp.data;
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    setSocket(io("http://localhost:4900"));
  }, []);

  useEffect(() => {
    currentUser && socket?.emit("newUser", currentUser._id); // Use currentUser from UserContext
  }, [currentUser, socket]);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};
