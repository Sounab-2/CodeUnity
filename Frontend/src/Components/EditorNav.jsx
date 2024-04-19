import React from 'react';
import Themetoggler from './Themetoggler';
import ChatUi from './ChatUi';
const EditorNav = () => {
  return (
    <div className=' bg-base-300 w-full h-20 pl-28 flex items-center justify-evenly'>
        <div className=' w-1/2 border-2'>

        </div>
        <div className=' flex justify-between gap-6 '>
        <Themetoggler/>
        <ChatUi/>
        </div>
    </div>
  );
}

export default EditorNav;
