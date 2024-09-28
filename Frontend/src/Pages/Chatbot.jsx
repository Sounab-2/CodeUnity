import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { coldarkDark, twilight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useFirebase } from '../Context/FirebaseContext';


// const socket = io(import.meta.env.REACT_APP_BACKEND_URL, {
//   transports: ['websocket', 'polling'],
//   withCredentials: true,
// });

const Chatbot = ({socket}) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [avatar, setAvatar] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const {user}=useFirebase();


  useEffect(() => {
    setAvatar(user?.photoURL);

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
                <div className="chat-bubble bg-[#dde8e7] text-black"> {renderMarkdown(message.text)}</div>
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

 const renderMarkdown = (text) => {
  return (
    <ReactMarkdown
      components={{
        code({ node, inline, className, children, ...props }) {
          const language = className?.replace(/language-/, '') || '';
          return (
            <div className="relative mb-4">
              <div className="flex justify-between items-start">
                
                <CopyToClipboard text={String(children)} onCopy={() => {
                    navigator.clipboard.writeText(String(children));
                    setCopied(true);
                    setTimeout(() => setCopied(false), 2000);
                  }}>
                  <div className="cursor-pointer mr-2 relative">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-blue-500 hover:text-blue-700"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3a1 1 0 011-1h10a1 1 0 011 1v10a1 1 0 01-1 1h-4m-2 0v4a1 1 0 01-1 1H5a1 1 0 01-1-1V9a1 1 0 011-1h4a1 1 0 011 1v4z" />
                    </svg>
                    {copied && (
                      <span className="absolute left-0 top-8 text-sm text-green-500 bg-gray-300 rounded-md px-2 py-1 z-10">
                        Copied!
                      </span>
                    )}
                  </div>
                </CopyToClipboard>
                
               
                <SyntaxHighlighter
                  style={twilight}
                  language={language}
                  {...props}
                  className="code-snippet"
                  customStyle={{
                    maxHeight: '1000px',
                    width: '100%',
                    overflow: 'auto',
                    borderRadius: '8px',
                  }}
                >
                  {String(children).replace(/\n$/, '')}
                </SyntaxHighlighter>
              </div>
            </div>
          );
        },
      }}
    >
      {text}
    </ReactMarkdown>
  );
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
