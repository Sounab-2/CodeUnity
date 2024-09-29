import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRobot } from '@fortawesome/free-solid-svg-icons';
import Chatbot from '../Pages/Chatbot';


const AiChat = ({ socketRef }) => {


    return (

        <div>

            <button className="btn bg-secondary-dark text-white" onClick={() => document.getElementById('my_modal_3').showModal()}>AI Chat<FontAwesomeIcon icon={faRobot} /></button>
            <dialog id="my_modal_3" className="modal">
                <div className="modal-box  min-h-fit min-w-fit" >
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <div className=' w-full'>
                        <Chatbot socket={socketRef}/>
                    </div>
                </div>
            </dialog>
        </div>
    );
}

export default AiChat;