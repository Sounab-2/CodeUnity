
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faComments } from '@fortawesome/free-solid-svg-icons';
import { useParams } from 'react-router-dom';

const ChatUi = ({ socketRef }) => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const { meetingId } = useParams();

    // Function to send a message
    const sendMessage = (e) => {
        e.preventDefault();
        if (message.trim() !== '') {
            socketRef.current.emit('message', { text: message, meetingId });
            setMessages(prevMessages => [...prevMessages, { text: message, sentByUser: true }]);
            setMessage('');
        }
    };

    // Function to handle incoming messages
    useEffect(() => {
        if (socketRef.current) {
            // Remove the event listener before adding it again
            socketRef.current.off('received-message');
    
            socketRef.current.on('received-message', (text) => {
                // Update the messages state with the received message
                setMessages(prevMessages => [...prevMessages, { text }]);
                console.log(text);
            });
        }
    }, []);

    useEffect(() => {
        const chatContainer = document.querySelector('.chat-container');
        if (chatContainer) {
            chatContainer.scrollTop = chatContainer.scrollHeight;
        }
    }, [messages]);

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
                                        <img alt="Avatar" src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                                    </div>
                                </div>
                                <div className="chat-bubble">{msg.text}</div>
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



