import React, { useEffect, useRef, useState } from 'react';
import { Editor } from "@monaco-editor/react";
import { useParams } from 'react-router-dom';
import { CODE_SNIPPETS } from '../constants';
import { executeCode } from '../api';
import { initializeSocket } from '../socket';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay,faFolderPlus , faComments} from '@fortawesome/free-solid-svg-icons';


const EditorComponent = () => {
    const [theme, setTheme] = useState('vs-dark');
    const editorRef = useRef(null);
    const [value, setValue] = useState('');
    const [language, setLanguage] = useState('python');
    const [output, setOutput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const { meetingId } = useParams();
    const socketRef = useRef(null);
    const [isDrawerOpen, setIsDrawerOpen] = useState(true);



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
            }
        };

        initSocket();

        // Proper cleanup to remove listeners
        return () => {
            if (socketRef.current) {
                socketRef.current.off('userJoined');
                socketRef.current.off('code-sync');
            }
        };
    }, [meetingId]);

    const handleCodeChange = (newValue) => {
        setValue(newValue);
        if (socketRef.current) {
            socketRef.current.emit('code-change', { value: newValue, meetingId });
        }
    };

    const onMount = (editor) => {
        editorRef.current = editor;
        editor.focus();
    };

    const toggleTheme = () => {
        setTheme((prevTheme) => prevTheme === 'vs-dark' ? 'vs-white' : 'vs-dark');
    };

    const onSelectLanguage = (newLanguage) => {
        setLanguage(newLanguage);
        setValue(CODE_SNIPPETS[newLanguage]);
    };

    const runCode = async () => {
        const sourcecode = editorRef.current.getValue();
        if (!sourcecode) return;

        try {
            setIsLoading(true);
            const { run: result } = await executeCode(language, sourcecode, inputValue);
            setOutput(result.output);
            result.stderr ? setIsError(true) : setIsError(false);
        } catch (error) {
            console.log(error);
        }
        finally {
            setIsLoading(false);
        }
    };

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };
    const toggleDrawer = () => {
        setIsDrawerOpen(!isDrawerOpen);
    };

    return (
        <>
            <div className="drawer min-h-screen absolute top-4 left-10 w-1/2 ">
                <input id="my-drawer" type="checkbox" className="drawer-toggle" checked={isDrawerOpen} onChange={toggleDrawer} />
                <div className="drawer-content w-1/2">

                    <label className="btn btn-circle swap swap-rotate" htmlFor='my-drawer'>

                        <input type="checkbox" />

                        <svg className={isDrawerOpen ? "swap-on fill-current" : "swap-off fill-current"} xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 512 512"><path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" /></svg>

                        <svg className={isDrawerOpen ? "swap-off fill-current" : "swap-on fill-current"} xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 512 512"><polygon points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" /></svg>
                    </label>
                </div>
                <div className={`drawer-side mt-20 ${isDrawerOpen ? 'open' : 'closed'}`}>
                    <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay" onClick={toggleDrawer}></label>
                    <ul className="menu p-4 w-72 min-h-full bg-base-200 text-base-content">
                        {/* Sidebar content here */}
                        <li><a>Sidebar Item 1</a></li>
                        <li><a>Sidebar Item 2</a></li>
                    </ul>
                </div>
            </div>


            <div className={`flex p-4 h-auto  ${isDrawerOpen ? 'w-4/5 ml-72' : 'w-full'}`}>

                {/* Input section */}
                <div className=" pr-3 relative z-30 w-1/2 ">

                    <div className="navbar bg-base-300 rounded-box flex justify-between ">
                        <div>
                            <button className=' btn bg-primary text-secondary-content hover:bg-base-100 hover:text-base-content text-sm flex'>
                                create a file
                                {/* <span><FontAwesomeIcon icon={faFolderPlus} /></span> */}
                            </button>
                        </div>
                        <div className="flex px-2 lg:flex-none">
                            <ul className="menu menu-vertical lg:menu-horizontal bg-base-200 rounded-box">
                                <li><button
                                    className={language === 'javascript' ? 'font-bold text-blue-500' : ''}
                                    onClick={() => onSelectLanguage('javascript')}>
                                    Javascript
                                </button></li>
                                <li><button
                                    className={language === 'python' ? 'font-bold text-blue-500' : ''}
                                    onClick={() => onSelectLanguage('python')}>
                                    Python
                                </button></li>
                                <li><button
                                    className={language === 'java' ? 'font-bold text-blue-500' : ''}
                                    onClick={() => onSelectLanguage('java')}>
                                    Java
                                </button></li>
                                <li><button
                                    className={language === 'cpp' ? 'font-bold text-blue-500' : ''}
                                    onClick={() => onSelectLanguage('cpp')}>
                                    C++
                                </button></li>
                            </ul>
                        </div>
                        <div className="flex justify-end flex-1 px-2">
                            <div className="flex items-stretch gap-3">
                                <button className=' btn bg-primary text-secondary-content hover:bg-base-100 hover:text-base-content'>
                                    save
                                </button>
                                <label className="flex cursor-pointer gap-2 my-3">
                                    <input type="checkbox" className="toggle theme-controller" onClick={toggleTheme} />
                                </label>

                            </div>
                        </div>
                    </div>
                    <Editor
                        height="85vh"
                        theme={theme}
                        onMount={onMount}
                        defaultLanguage={language}
                        defaultValue='print("Hello World")'
                        value={value}
                        onChange={handleCodeChange}
                    />
                </div>

                {/* output section */}
                <div className='w-1/2 pl-3 relative z-30 bg-base-200 rounded-lg'>
                    <div className='bg-black-200 rounded-md p-4 h-full flex flex-col justify-between'>
                        <div className=' flex items-center bg-base-300 rounded-md h-20 justify-between p-9'>
                            <h2 className="text-2xl font-extrabold mb-4 ">Output</h2>

                            <button className="btn btn-outline  btn-success" onClick={runCode} disabled={isLoading}>
                                {isLoading ? 'Running...' : 'Run'}
                                <span><FontAwesomeIcon icon={faPlay} /></span>

                            </button>

                        </div>
                        {/*                         
                        <input
                            type="text"
                            className="border border-gray-300 p-2 w-full mb-4"
                            placeholder="Enter input..."
                            value={inputValue}
                            onChange={handleInputChange}
                        /> */}

                        <textarea
                            className="flex-1 border border-gray-300 p-2"
                            placeholder="Output will appear here..."
                            value={output || ''}  // Ensure it's never null
                            readOnly
                            style={{ color: isError ? 'red' : 'inherit' }}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}

export default EditorComponent;
