// src/utils/socket.js
import { io } from "socket.io-client";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const socket = io(API_BASE_URL, {
    reconnection: true,
    reconnectionAttempts: 5,
    reconnectionDelay: 3000,
});

export default socket;
