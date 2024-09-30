import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faComments, faSmile } from '@fortawesome/free-solid-svg-icons';
import { useParams } from 'react-router-dom';
import { useFirebase } from '../Context/FirebaseContext';
import AvatarCom from './AvatarCom';
import { axiosInstance } from '../../utils';
import EmojiPicker from 'emoji-picker-react';

const ChatUi = ({ socketRef }) => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [showEmojiPicker, setShowEmojiPicker] = useState(false); // State for controlling emoji picker visibility
    const { meetingId } = useParams();
    const { user } = useFirebase();

    // Function to send a message
    const sendMessage = async (e) => {
        const senderName = user.displayName;
        const senderAvatar = user.photoURL;
        e.preventDefault();
        if (message.trim() !== '') {
            socketRef.current.emit('message', { text: message, meetingId, sender: senderName, senderPhoto: senderAvatar });
            setMessages(prevMessages => [...prevMessages, { text: message, sentByUser: true, sender: senderName, senderPhoto: senderAvatar }]);

            try {
                const response = await axiosInstance.post('/api/v1/project/savechat', {
                    meetingId,
                    message,
                    username: senderName,
                    userId: user?.uid,
                    photoUrl: senderAvatar
                });
                console.log(response.data.workSpace.chat);
                setMessage('');
            } catch (e) {
                console.log('Error sending message', e);
            }
        }
    };

    // Function to handle incoming messages
    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await axiosInstance.post(`/api/v1/project/getchat/${meetingId}`);
                const fetchedMessages = response.data.workSpace.chat;
                console.log(fetchedMessages);
            } catch (error) {
                console.error('Error fetching messages:', error);
            }
        };

        if (socketRef.current) {
            socketRef.current.off('received-message');

            socketRef.current.on('received-message', ({ text, sender, senderPhoto }) => {
                fetchMessages();

                if (!isDrawerOpen) {
                    setUnreadCount(prevCount => prevCount + 1);
                }
                setMessages(prevMessages => [...prevMessages, { text, sender, senderPhoto }]);
            });
        }
    }, [socketRef.current]);

    const getCurrentTime = () => {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const currentTime = `${hours}:${minutes}`;
        return currentTime;
    };

    const toggleDrawer = () => {
        if (isDrawerOpen) {
            setUnreadCount(0);
        }
        setIsDrawerOpen(prevState => !prevState);
    };

    useEffect(() => {
        const chatContainer = document.querySelector('.chat-container');
        if (chatContainer) {
            chatContainer.scrollTop = chatContainer.scrollHeight;
        }
    }, [messages]);

    const currentTime = getCurrentTime();

    // Function to handle emoji click
    const handleEmojiClick = (emojiData, event) => {
        const { emoji } = emojiData;
        setMessage(prevMessage => prevMessage + emoji);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
          sendMessage(e);
        }
      };

    return (
        <div className="drawer drawer-end relative z-50 w-full">
            <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
                {/* Chat button */}
                <label htmlFor="my-drawer-4" className="drawer-button btn btn-primary" onClick={toggleDrawer}>
                    <span className='text-2xl'><FontAwesomeIcon icon={faComments} /></span>
                    {unreadCount > 0 && <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full px-2">{unreadCount}</span>}
                </label>
            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
                <div className='min-h-screen w-1/3 p-5 bg-base-300 relative z-50'>

                    {/* Chat messages */}
                    <div className=''></div>
                    <div className='h-[600px] overflow-y-auto chat-container p-5'>
                        {messages.map((msg, index) => (
                            <div key={index} className={`chat ${msg.sentByUser ? 'chat-end' : 'chat-start'}`}>
                                <div className="chat-image avatar">
                                    <div className="w-10 rounded-full">
                                        <img alt="Avatar" src={msg.senderPhoto} />
                                    </div>
                                </div>
                                <div className="chat-header">
                                    {msg.sentByUser ? 'you' : msg.sender}
                                </div>
                                <div className={`chat-bubble ${msg.sentByUser ? 'chat-bubble-primary' : 'chat-bubble-info'}`}>{msg.text}</div>
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
                            onKeyDown={handleKeyDown}
                        />
                        <button onClick={() => setShowEmojiPicker(!showEmojiPicker)} className="btn">
                            <FontAwesomeIcon icon={faSmile} className='text-2xl' />
                        </button>
                        {showEmojiPicker && (
                            <div className="absolute bottom-16 right-4 z-50">
                                <EmojiPicker onEmojiClick={handleEmojiClick} theme='dark' />
                            </div>
                        )}
                        <button className='btn' onClick={sendMessage}>Send <FontAwesomeIcon icon={faPaperPlane} /></button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatUi;
