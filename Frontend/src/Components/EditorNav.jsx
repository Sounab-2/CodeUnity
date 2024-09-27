import React from 'react';
import Themetoggler from './Themetoggler';
import ChatUi from './ChatUi';
import Call from './Call';
import { useSelector } from 'react-redux';
import AIChat from './AiChat';

const EditorNav = ({socketRef}) => {
  const selectedTeam = useSelector(state => state.meeting.selectedTeam);
  return (
    <div className='bg-base-300 w-full h-20 pl-28 flex items-center justify-end gap-10 px-11'>

        {selectedTeam === 'team' && (
        <div className='flex justify-between gap-6'>
          <ChatUi socketRef={socketRef}/>
          {/* <Call socketRef={socketRef}/> */}
          
        </div>
      )}
       <AIChat socketRef={socketRef}/>
      {/* <Themetoggler/> */}
    </div>
  );
}

export default EditorNav;
