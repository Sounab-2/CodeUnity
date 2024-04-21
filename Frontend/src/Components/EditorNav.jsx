import React from 'react';
import Themetoggler from './Themetoggler';
import ChatUi from './ChatUi';
import Call from './Call';
const EditorNav = () => {
  return (
    <div className=' bg-base-300 w-full h-20 pl-28 flex items-center justify-evenly'>
        <div className=' w-1/2 p-10 gap-4 flex'>
          <button className=' btn bg-base-100 text-base-content'>
            open White board
          </button>
          <button className=' btn bg-base-100 text-base-content'>
            open White board
          </button>
          <button className=' btn bg-base-100 text-base-content'>
            open White board
          </button>
          <button className=' btn bg-base-100 text-base-content'>
            Back to Dashboard
          </button>
        
        </div>
        <div className=' flex justify-between gap-6 '>
    
        <ChatUi/>
        <Call/>
        <Themetoggler/>
        </div>
    </div>
  );
}

export default EditorNav;
