import React, { useRef } from 'react';
import{Editor} from "@monaco-editor/react";
import { useState } from 'react';
import { CODE_SNIPPETS } from '../constants';
import { executeCode } from '../api';


const EDtor = () => {
    const [theme, setTheme] = useState('vs-white'); 
    const editorRef = useRef();
    const [value, setValue] = useState('');
    const [language, setLanguage] = useState('python');
    const [output, setOutput] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const {isError, setIsError} = useState(false);
    const [inputValue, setInputValue] = useState('');

    const onMount = (editor) => {
        editorRef.current=editor;
        editor.focus();
    };

    const toggleTheme = () => {
        const newTheme = theme === 'vs-white' ? 'vs-dark' : 'vs-white';
        setTheme(newTheme);
  };

  const onSelectLanguage=(language)=>{
    setLanguage(language);
    setValue(CODE_SNIPPETS[language]);
    console.log(language);
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
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4"/></svg>
                <input type="checkbox" value="synthwave" className="toggle theme-controller" onClick={toggleTheme}/>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
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
        onChange={(value)=>setValue(value)}
      />
      
    </div>


        <div className='w-1/2 pl-3'>
            <div className='bg-black-200 rounded-md p-4 h-full flex flex-col justify-between'>
                <h2 className="text-xl font-semibold mb-4">Output:</h2>
                <button className="btn btn-outline btn-success" onClick={runCode} disabled={isLoading}>
                    {isLoading? 'Running...': 'Run'}
                </button>
                <input
              type="text"
              className="border border-gray-300 p-2 w-full mb-4"
              placeholder="Enter input..."
              value={inputValue}
              onChange={handleInputChange}
            />
                <div className="flex-1 border border-gray-300 p-2" style={{color: isError? 'red' :'inherit'}}>
                    {output? output: 'Click "Run Code" to see the result'}
                 </div>

            </div>
            
        </div>
    </div>

    
  );
}

export default EDtor;