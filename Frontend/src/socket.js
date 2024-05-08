import io from 'socket.io-client';

const SOCKET_URL = 'https://collaborative-editor-s89a.onrender.com'; 

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
