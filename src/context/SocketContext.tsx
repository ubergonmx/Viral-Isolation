import { createContext, useContext } from "react";
import io, { Socket } from "socket.io-client";

// const socket = io('http://localhost:3000', { transports: ['websocket'] });
const socket = io();
socket.on("connect", () => {
  console.log("Connected to server");
});

const SocketContext = createContext<Socket | null>(null);

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  return <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>;
};

export const useSocket = () => {
  const socket = useContext(SocketContext);
  if (!socket) {
    throw new Error("Socket not found");
  }
  return socket;
};
