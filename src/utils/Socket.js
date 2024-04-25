import { io } from "socket.io-client";


export let socket;

export function initializeSocket() {
    socket = new io(`${process.env.REACT_APP_SOCKET_URL}`);

    socket.on("connect", () => {
        console.log("Connected to server");
    });

    return socket;
}