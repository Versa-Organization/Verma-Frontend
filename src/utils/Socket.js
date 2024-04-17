import { io } from "socket.io-client";


export let socket;

export function initializeSocket() {
    socket = new io('ws://localhost:3000');

    socket.on("connect", () => {
        console.log("Connected to server");
    });

    return socket;
}