import { io } from "socket.io-client";

export let socket;

export const initiateSocketConnection = (user) => {
  socket = io("http://localhost:6001", {
    auth: {
      token: user && user,
    },
  });
};

export const disconnectSocket = () => {
  if (socket) socket.disconnect();
};
