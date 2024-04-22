import React from 'react';
import 'tailwindcss/tailwind.css';
import EDtor from '../../Components/EDtor';
import { EditorNav } from '../../Components';
import { useRef,useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { initializeSocket } from '../../socket';


const Editor = () => {
  const socketRef = useRef(null);
  const { meetingId } = useParams();

  useEffect(() => {
    const initSocket = async () => {
        if (!socketRef.current) {
            socketRef.current = await initializeSocket();
            socketRef.current.emit('joinRoom', meetingId);
            socketRef.current.on('userJoined', ({ userId }) => {
                console.log('A new user joined: ', userId);
            });

            socketRef.current.on('code-sync', (code) => {
                setValue(code);
            });

            socketRef.current.on('disconnect',()=>{
              console.log('socket disconnected');
            })
        }
    };

    initSocket();

    // Proper cleanup to remove listeners
    return () => {
        if (socketRef.current) {
            socketRef.current.off('userJoined');
            socketRef.current.off('code-sync');
            socketRef.current.disconnect();
        }
    };
}, [meetingId]);

  return (
    <section className=' max-h-screen overflow-hidden w-full'>
      <EditorNav socketRef={socketRef}/>
      <EDtor socketRef={socketRef}/>
    </section>
  );
}

export default Editor;