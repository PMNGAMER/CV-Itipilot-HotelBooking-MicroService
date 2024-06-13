import { createContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { getCookie } from "../cookie";
export const SocketContext = createContext();

export const SocketContextProvider = ({ children }) => {
  const currentUser  = getCookie('userData');
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
