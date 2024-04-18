import React, { useEffect, useRef, useState } from 'react';
import { Editor } from "@monaco-editor/react";
import { useParams } from 'react-router-dom';
import { CODE_SNIPPETS } from '../constants';
import { executeCode } from '../api';
import { initializeSocket } from '../socket';

const EditorComponent = () => {
    const [theme, setTheme] = useState('vs-white');
    const editorRef = useRef(null);
    const [value, setValue] = useState('');
    const [language, setLanguage] = useState('python');
    const [output, setOutput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const { meetingId } = useParams();
    const socketRef = useRef(null);

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
        setTheme((prevTheme) => prevTheme === 'vs-white' ? 'vs-dark' : 'vs-white');
    };

    const onSelectLanguage = (newLanguage) => {
        setLanguage(newLanguage);
        setValue(CODE_SNIPPETS[newLanguage]);
    };

    const runCode = async() =>{
          const sourcecode = editorRef.current.getValue();
          if(!sourcecode) return;
      
          try {
              setIsLoading(true);
              const {run:result} = await executeCode(language,sourcecode,inputValue);
              setOutput(result.output);
              result.stderr? setIsError(true) : setIsError(false);
          } catch (error) {
              console.log(error);
          }
          finally{
              setIsLoading(false);
          }
        };

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    return (
        <div className="flex p-4 h-screen">
            <div className="w-1/2 pr-3">
                <div className="navbar bg-base-300 rounded-box">
                    <div className="flex-1 px-2 lg:flex-none">
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
                        <div className="flex items-stretch">
                            <label className="flex cursor-pointer gap-2 my-3">
                                <input type="checkbox" className="toggle theme-controller" onClick={toggleTheme} />
                                Toggle Theme
                            </label>
                        </div>
                    </div>
                </div>
                <Editor
                    height="90vh"
                    theme={theme}
                    onMount={onMount}
                    defaultLanguage={language}
                    defaultValue='print("Hello World")'
                    value={value}
                    onChange={handleCodeChange}
                />
            </div>
            <div className='w-1/2 pl-3'>
                <div className='bg-black-200 rounded-md p-4 h-full flex flex-col justify-between'>
                    <h2 className="text-xl font-semibold mb-4">Output:</h2>
                    <button className="btn btn-outline btn-success" onClick={runCode} disabled={isLoading}>
                        {isLoading ? 'Running...' : 'Run'}
                    </button>
                    <input
                        type="text"
                        className="border border-gray-300 p-2 w-full mb-4"
                        placeholder="Enter input..."
                        value={inputValue}
                        onChange={handleInputChange}
                    />
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
    );
}

export default EditorComponent;
