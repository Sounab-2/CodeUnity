
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faComments } from '@fortawesome/free-solid-svg-icons';
import { useParams } from 'react-router-dom';
import { useFirebase } from '../Context/FirebaseContext';
import AvatarCom from './AvatarCom';

const ChatUi = ({ socketRef }) => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const { meetingId } = useParams();
    const { user } = useFirebase();

    // Function to send a message
    const sendMessage = (e) => {
        const senderName = user.displayName;
        const senderAvatar = user.photoURL;
        e.preventDefault();
        if (message.trim() !== '') {
            socketRef.current.emit('message', { text: message, meetingId, sender: senderName, senderPhoto: senderAvatar });
            setMessages(prevMessages => [...prevMessages, { text: message, sentByUser: true, sender: senderName, senderPhoto: senderAvatar }]);
            setMessage('');
        }
    };

    // Function to handle incoming messages
    useEffect(() => {
        if (socketRef.current) {
            socketRef.current.off('received-message');

            socketRef.current.on('received-message', ({ text, sender, senderPhoto }) => {
                setMessages(prevMessages => [...prevMessages, { text, sender, senderPhoto }]);
                // console.log(text);
                // console.log(sender);
                // console.log(senderPhoto);
            });
        }
    }, []);

    const getCurrentTime = () => {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const currentTime = `${hours}:${minutes}`;
        return currentTime;
    };


    useEffect(() => {
        const chatContainer = document.querySelector('.chat-container');
        if (chatContainer) {
            chatContainer.scrollTop = chatContainer.scrollHeight;
        }
    }, [messages]);

    const currentTime = getCurrentTime();


    return (
        <div className="drawer drawer-end relative z-50 w-full">
            <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
                {/* Chat button */}
                <label htmlFor="my-drawer-4" className="drawer-button btn btn-primary">
                    <span className='text-2xl'><FontAwesomeIcon icon={faComments} /></span>
                </label>
            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
                <div className='min-h-screen w-1/3 p-5 bg-base-300 relative z-50'>

                    {/* Chat messages */}
                    <div className='h-[600px] overflow-y-auto chat-container'>
                        {messages.map((msg, index) => (
                            <div key={index} className={`chat ${msg.sentByUser ? 'chat-end' : 'chat-start'}`}>
                                <div className="chat-image avatar">
                                    <div className="w-10 rounded-full">
                                        <img alt="Avatar" src={msg.senderPhoto} />
                                    </div>
                                </div>
                                <div className="chat-header">
                                    {msg.sentByUser ? 'you' : msg.sender}
                                    {/* <time className="text-xs opacity-50">{currentTime}</time> */}
                                </div>
                                <div className={`chat-bubble  ${msg.sentByUser ? 'chat-bubble-primary' : 'chat-bubble-info'}`}>{msg.text}</div>
                            </div>
                        ))}



                    </div>

                    {/* Message input */}
                    <div className='sticky bottom-0 flex gap-4 justify-center items-center mt-8 w-full h-10'>
                        <input
                            type="text"
                            placeholder="Type here"
                            className="input input-bordered input-error w-full max-w-xs"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                        />
                        <button className='btn' onClick={(e) => sendMessage(e)}>Send <FontAwesomeIcon icon={faPaperPlane} /></button>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default ChatUi;



