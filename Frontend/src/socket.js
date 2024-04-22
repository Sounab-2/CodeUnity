import io from 'socket.io-client';

const SOCKET_URL = 'http://localhost:8000'; 

const options = {
    reconnection: true,               
    reconnectionAttempts: Infinity, 
    transports: ['websocket'], 
    autoConnect: true
};

export const initializeSocket = async () => {
    const socket = io(SOCKET_URL, options);
    return socket;
};
