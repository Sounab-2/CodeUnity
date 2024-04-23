import React, { useState } from 'react';
import AvatarCom from './AvatarCom';

const EditorDrawer = () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const toggleDrawer = () => {
        setIsDrawerOpen(!isDrawerOpen);
    };

    return (
        <>
            <div className="drawer min-h-screen ">
                <input id="my-drawer" type="checkbox" className="drawer-toggle" checked={isDrawerOpen} onChange={toggleDrawer} />
                <div className="drawer-content">
                    {/* Page content here */}
                    <label className="btn btn-circle swap swap-rotate" htmlFor='my-drawer'>
                        {/* this hidden checkbox controls the state */}
                        <input type="checkbox" />
                        {/* hamburger icon */}
                        <svg className={isDrawerOpen ? "swap-on fill-current" : "swap-off fill-current"} xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 512 512"><path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" /></svg>
                        {/* close icon */}
                        <svg className={isDrawerOpen ? "swap-off fill-current" : "swap-on fill-current"} xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 512 512"><polygon points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" /></svg>
                    </label>
                </div>
                <div className={`drawer-side mt-20 ${isDrawerOpen ? 'open' : 'closed'}`}>
                    <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay" onClick={toggleDrawer}></label>
                    <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
                        {/* Sidebar content here */}
                        <li><a>Sidebar Item 1</a></li>
                        <li><a>Sidebar Item 2</a></li>
                    </ul>
                </div>
            </div>
        </>
    );
}

export default EditorDrawer;
