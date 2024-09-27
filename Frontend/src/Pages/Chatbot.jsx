import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

// const socket = io(import.meta.env.REACT_APP_BACKEND_URL, {
//   transports: ['websocket', 'polling'],
//   withCredentials: true,
// });

const Chatbot = ({socket}) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [avatar, setAvatar] = useState('');
  const [loading, setLoading] = useState(false);



  useEffect(() => {
    // setAvatar(user.imageUrl);

    // Listen for bot responses from the server
    socket?.current?.on('botResponse', (response) => {
      setMessages((prev) => [...prev, { sender: 'bot', text: response }]);
      setLoading(false);
    });

    // Clean up when the component is unmounted
    return () => {
      socket?.current?.off('botResponse');
    };
  }, [socket.current]);

  const handleSendMessage = () => {
    if (!input.trim()) return;

    const userMessage = { text: input, sender: 'user' };
    setMessages([...messages, userMessage]);
    socket?.current?.emit('userMessage', userMessage);

    setInput('');
    setLoading(true);
  };

  const renderMessages = () => {
    return messages.map((message, index) => (
      <div key={index} className="flex items-center">
        {
          message.sender === 'user' ? (
            <>
              <div className="chat chat-end m-5 w-full">
                <div className="chat-bubble bg-[#b3cde0] text-black"> {message.text}</div>
              </div>
              <img
                src={avatar}
                alt="User Avatar"
                className="w-10 h-10 rounded-full mr-2"
              />
            </>
          ) : (
            <>
              <img
                src="/bot.jpg"
                alt="Bot Avatar"
                className="w-10 h-10 rounded-full mr-2"
              />
              <div className="chat chat-start">
                <div className="chat-bubble bg-[#dde8e7] text-black"> {message.text}</div>
              </div>
            </>
          )
        }
      </div>
    ));
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
        <>
        <div className="p-4 overflow-y-auto" style={{ height: '570px' , width: '970px'}}>
          {messages.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full">
              <img
                src="/bot.jpg"
                alt="Bot Avatar"
                className="w-24 h-24 rounded-full mb-4"
              />
              <p className="text-lg font-medium text-gray-600">Hello, how can I help you?</p>
            </div>
          )}
          {renderMessages()}
          {loading && (
            <div className="flex items-center">
              <img
                src="/bot.jpg"
                alt="Bot Avatar"
                className="w-10 h-10 rounded-full mr-2"
              />
              <div className="flex flex-row gap-2">
                <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce"></div>
                <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:-.3s]"></div>
                <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:-.5s]"></div>
              </div>
            </div>
          )}
        </div>
        <div className="p-2 px-6 flex gap-2">
          <input
            type="text"
            aria-label="Message input"
            className="text-white flex-grow p-2 px-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message..."
          />
          <button
            onClick={handleSendMessage}
            className="ml-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-600"
            aria-label="Send message"
          >
            Send
          </button>
        </div>
        </>
  );
};

export default Chatbot;
