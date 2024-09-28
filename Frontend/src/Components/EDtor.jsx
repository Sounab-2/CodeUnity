import React, { useEffect, useRef, useState } from 'react';
import { Editor } from "@monaco-editor/react";
import { useNavigate, useParams } from 'react-router-dom';
import { CODE_SNIPPETS } from '../constants';
import { executeCode } from '../api';
import { initializeSocket } from '../socket';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faFolderPlus, faComments, faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { axiosInstance } from '../../utils/index';
import { useSelector } from 'react-redux';
import { selectHostId, selectMeetingId, selectMeetingName } from '../../features/meetingSlice';
import Avatar from 'react-avatar';
import { useDispatch } from 'react-redux';
import { setTeam, setMeetingId, setMeetingName } from '../../features/meetingSlice';
import { useFirebase } from '../Context/FirebaseContext';
let isUserPresent = true;

const EditorComponent = ({ socketRef, value, setValue, language, setLanguage }) => {
    const [theme, setTheme] = useState('vs-dark');
    const editorRef = useRef(null);
    const selectedTeam = useSelector(state => state.meeting.selectedTeam);
    const [output, setOutput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [isDrawerOpen, setIsDrawerOpen] = useState(true);
    const [teamType, setTeamType] = useState('');
    const { meetingId } = useParams();
    const meetId = useSelector(selectMeetingId);
    const meetName = useSelector(selectMeetingName);
    const hostId = useSelector(selectHostId);
    const [copied, setCopied] = useState(false);
    const dispatch = useDispatch();
    const { user } = useFirebase();
    const userId = user?.uid;
    const username = user?.displayName;
    const navigate = useNavigate();
    const isHost = ((userId === hostId) || selectedTeam === 'solo');
    const teamMembers = useSelector(state => state.meeting.team);
    const [host,setHost]=useState('');
   

    const showTeamMembers = async () => {
        const response = await axiosInstance.post('/api/v1/project/showTeam', { roomId: meetingId });
        const { team, _id, name } = response.data.workspace;
        isUserPresent = team.some(member => member.id === userId);
        const type=response.data.workspace.type;
        setHost(response.data.workspace.host.id);
        setTeamType(type);
        if (!isUserPresent && type!=='solo') {
            navigate('/dashboard/newproject');
            return;
        }
        dispatch(setTeam(team));
        dispatch(setMeetingId(_id));
        dispatch(setMeetingName(name));
        
    }

    useEffect(() => {
        showTeamMembers();
    },[meetingId]);

    const setCode = async() => {
        const r2 = await axiosInstance.post('/api/v1/project/showTeam', {roomId:meetingId});
        setValue(r2.data.workspace.code[language]);
    }

    useEffect(() => {
        setCode();
    }, []);

    useEffect(() => {
        setCode();
    }, [language]);

    const removeTeamMembers = async (memberId) => {
        try {
            socketRef?.current?.emit('remove-user', { memberId, meetingId });
            const response = await axiosInstance.post('/api/v1/project/remove', { meetingId, userId: memberId });
        } catch (error) {
            console.log("Error removing team members", error);
        }
    };


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

    const onSelectLanguage = async (newLanguage) => {
        setLanguage(newLanguage);

        if (socketRef.current) {
            socketRef.current.emit('language-change', { lang: newLanguage, meetingId });
        }

        const response = await axiosInstance.post('/api/v1/project/language', {
            meetingId,
            language: newLanguage
        });
        setValue(response.data.workspace.code[newLanguage]);
    };

    const codeSave = async () => {   
        const response = await axiosInstance.post('/api/v1/project/save', {
            meetingId,
            code: value
        })

    };

    const runCode = async () => {
        const sourcecode = editorRef.current.getValue();
        if (!sourcecode) return;
        const r2 = await axiosInstance.post('/api/v1/project/save', {
            meetingId,
            code: sourcecode
        })

        setIsError(false);
        try {
            setIsLoading(true);
            const response = await axiosInstance.post('/api/v1/project/run', {
                code: sourcecode,
                input: '2',
                language: language
            });
            const output = response.data;
            setOutput(output);
            console.log(output);

        } catch (error) {
            if (language == 'python') {
                setOutput('An error occurred\n' + error.response.data.data);
            }
            else {
                setOutput('An error occurred\n' + error.response.data.data.cmd);
            }
        }
        finally {
            setIsLoading(false);

        }
    };

    // const handleInputChange = (e) => {
    //     setInputValue(e.target.value);
    // };

    const toggleDrawer = () => {
        setIsDrawerOpen(!isDrawerOpen);
    };
    const copyToClipboard = () => {
        navigator.clipboard.writeText(meetId ? meetId : 'No meeting ID set');
        setCopied(true);
        setTimeout(() => {
            setCopied(false);
        }, 2000);
    };


    const handleLeaveRoom = async () => {
        //     socketRef.current?.emit('user-left', { meetingId });
        //     socketRef.current?.off('userJoined');
        //     socketRef.current?.off('code-sync');
        try {
            socketRef.current.emit('userDisconnect', { userId, username, meetingId });
            socketRef.current?.disconnect();
            navigate('/dashboard');
        } catch (error) {
            console.log(error);
        }
    };
                                     
    const handleLeaveWorkspace = async () => {
        //     socketRef.current?.emit('user-left', { meetingId });
        //     socketRef.current?.off('userJoined');
        //     socketRef.current?.off('code-sync');
        try {
            const response = await axiosInstance.post('/api/v1/project/leaveWorkspace', { meetingId, userId });
            const { team } = response.data.workspace;
            if (response) {
                dispatch(setTeam(team));
                socketRef.current.emit('userDisconnect', { userId, meetingId })
                socketRef.current?.disconnect();
                navigate('/dashboard');
            }
        } catch (error) {
            console.log(error);
        }
    };



    return (
        <>
            <div className="drawer min-h-screen absolute top-4 left-10 lg:w-1/2 w-full overflow-y-auto ">
                <input id="my-drawer" type="checkbox" className="drawer-toggle" checked={isDrawerOpen} onChange={toggleDrawer} />
                <div className="drawer-content w-1/2 ">

                    <label className="btn btn-circle swap swap-rotate" htmlFor='my-drawer'>

                        <input type="checkbox" />

                        <svg className={isDrawerOpen ? "swap-on fill-current" : "swap-off fill-current"} xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 512 512"><path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" /></svg>

                        <svg className={isDrawerOpen ? "swap-off fill-current" : "swap-on fill-current"} xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 512 512"><polygon points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" /></svg>
                    </label>
                </div>
                <div className={`drawer-side mt-20 ${isDrawerOpen ? 'open' : 'closed'} `}>

                    <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay " onClick={toggleDrawer}></label>
                    <div className="menu  w-72  bg-base-200 text-base-content flex gap-4 h-full items-center ">
                        <div className=' overflow-y-auto h-2/3 p-1 overflow-x-hidden'>
                            {/* Sidebar content here */}
                            <div className=' '>
                                {teamType==='team' && (<li>

                                    <h1 className=' text-base-content font-bold text-base flex flex-col text-left w-64'>

                                        Meeting Id :
                                        <pre className=' text-base-content font-light text-xs'>(Share with your friends to invite them) </pre>
                                    </h1>


                                    <input type="text" value={meetId ? ` ${meetId}` : 'No meeting ID set'} readOnly className="input input-bordered input-primary w-64 text-sm" />
                                    <button
                                        className="absolute left-52  top-16 mt-2 text-center bg-transparent "
                                        onClick={copyToClipboard}
                                    >
                                        {copied ? (
                                            <div className="flex items-center justify-center h-full bg-transparent">
                                                <svg
                                                    className="w-3.5 h-3.5 text-blue-700 dark:text-blue-500 mr-1 bg-transparent"
                                                    aria-hidden="true"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 16 12"
                                                >
                                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5.917 5.724 10.5 15 1.5" />
                                                </svg>
                                                <span className="text-sm font-medium">Copied!</span>
                                            </div>
                                        ) : (
                                            <div className="flex items-center justify-center h-full">
                                                <svg
                                                    className="w-3.5 h-3.5"
                                                    aria-hidden="true"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="currentColor"
                                                    viewBox="0 0 18 20"
                                                >
                                                    <path d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2Zm-3 14H5a1 1 0 0 1 0-2h8a1 1 0 0 1 0 2Zm0-4H5a1 1 0 0 1 0-2h8a1 1 0 1 1 0 2Zm0-5H5a1 1 0 0 1 0-2h2V2h4v2h2a1 1 0 1 1 0 2Z" />
                                                </svg>

                                            </div>
                                        )}
                                    </button>
                                </li>)}
                                <h1 className=' text-base-content font-bold text-base flex flex-col items-center justify-center text-center mt-5 w-64'> Meeting Name :</h1>
                                <li><input type="text" value={meetName ? `${meetName}` : 'No meeting ID set'} readOnly className="input input-bordered input-primary w-64 text-xl mt-4"></input></li>
                            </div>

                            {/* <hr className=' mt-6' /> */}

                            <div className='  flex flex-col h-auto p-3 gap-3 mt-6 bg-base-300 '>
                                {
                                    teamMembers?.map(member => (

                                        <li className=' rounded-lg bg-base-100 flex flex-row items-center justify-center gap-1 p-3 '>
                                            <span>
                                                {/* <Avatar name={member.username} className="dropdown" size="40" round={true} color={Avatar.getRandomColor(['red', 'green', 'blue'])} textSizeRatio={0.8}  /> */}
                                                <Avatar name={member.username} className="dropdown" size="50" round={true} color={Avatar.getRandomColor(['red', 'green', 'blue'])} textSizeRatio={0.8} src={member.photoUrl || ''} />


                                            </span>
                                            <h1 className='flex gap-1 flex-wrap justify-center items-center'>
                                                <span>{member.username}</span>
                                                <span>
                                                    {member.id === userId && (
                                                        /* Content to render if member.id equals userId */
                                                        <span>(You)</span>
                                                    )}
                                                </span>

                                            </h1>
                                            {
                                                member.id === host && (

                                                    <span className=' font-bold tetx-lg text-green-600'>(Host)</span>

                                                )
                                            }
                                            {userId === host && member.id != userId && (
                                                <button className=' btn bg-red-600' onClick={() => removeTeamMembers(member.id)}>Remove<span className=' text-white text-lg'><FontAwesomeIcon icon={faCircleXmark} /></span></button>
                                            )}

                                        </li>
                                    ))
                                }

                            </div>


                        </div>

                        <div class="flex flex-col">
                            <div class="flex-1">
                                <li>
                                    <button class='btn bg-red-600 w-60' onClick={handleLeaveRoom}>Leave Room</button>
                                </li>
                            </div>

                            {teamType==='team' && (<div class="my-2 flex items-center">
                                <span class="block w-full border-t border-gray-300 my-4"></span>

                                <span class="mx-4">or</span>
                                <span class="block w-full border-t border-gray-300 my-4"></span>

                            </div>)}

                            {teamType==='team' && (<div class="flex-1">
                                <li>
                                    {/* Open the modal using document.getElementById('ID').showModal() method */}
                                    <button className="btn bg-red-600 w-60" onClick={() => document.getElementById('my_modal_1').showModal()}>Leave WorkSpace</button>
                                    <dialog id="my_modal_1" className="modal">
                                        <div className="modal-box absolute top-44 w-1/3 h-64  flex flex-col gap-0 overflow-hidden">
                                            <div className=" mt-4 flex justify-center items-center"><img src="/images/warning.png" className=' w-12 h-12'alt="" /></div>
                                            <div className='  flex flex-col justify-center items-center '>
                                                <h1 className=' font-extrabold text-2xl text-red-700 text-center '>Warning</h1>
                                                <p className=' text-center text-lg'>
                                                Once you exit this workspace, your code will be erased, and you won't be able to retrieve or access it again.
                                                </p>

                                            </div>
                                            <div className="modal-action  flex justify-center gap-6">
                                                <form method="dialog">
                                                    {/* if there is a button in form, it will close the modal */}
                                                    <button className="btn w-32 bg-primary text-white">Close</button>
                                                </form>

                                                <button class='btn bg-red-600 w-32' onClick={handleLeaveWorkspace}>Leave</button> 
                                            </div>
                                        </div>
                                    </dialog>
                                    {/* <button class='btn bg-red-600 w-60' onClick={handleLeave}>Leave WorkSpace</button> */}
                                </li>
                            </div>)}
                        </div>

                    </div>
                </div>
            </div>




            <div className={`flex p-4 h-auto min-h-fit  md:flex-row flex-col md:overflow-y-hidden overflow-y-auto  gap-4 ${isDrawerOpen ? 'w-4/5 ml-72' : 'w-full'}`}>

                {/* Input section */}
                <div className=" pr-3 relative z-30 md:w-1/2 w-full  ">

                    <div className="navbar bg-base-300 rounded-box flex justify-between ">

                        {/* <div>
                            <button className=' btn bg-primary text-secondary-content hover:bg-base-100 hover:text-base-content text-sm flex'>
                                create a file
                                {/* <span><FontAwesomeIcon icon={faFolderPlus} /></span> */}
                        {/* </button> */}
                        {/* </div>  */}

                        <div className="flex px-2 ">
                            <ul className="menu menu-horizontal bg-base-200 rounded-box">
                                {/* <li><button
                                    className={language === 'javascript' ? 'font-bold text-blue-500' : ''}
                                    onClick={() => onSelectLanguage('javascript')}
                                    disabled={!isHost}>
                                    Javascript
                                </button></li> */}
                                <li><button
                                    className={language === 'python' ? 'font-bold text-blue-500' : ''}
                                    onClick={() => onSelectLanguage('python')}
                                    disabled={!isHost}>
                                    Python
                                </button></li>
                                {/* <li><button
                                    className={language === 'java' ? 'font-bold text-blue-500' : ''}
                                    onClick={() => onSelectLanguage('java')}
                                    disabled={!isHost}>
                                    Java
                                </button></li> */}
                                <li><button
                                    className={language === 'cPlusPlus' ? 'font-bold text-blue-500' : ''}
                                    onClick={() => onSelectLanguage('cPlusPlus')}
                                    disabled={!isHost}>
                                    C++
                                </button></li>
                            </ul>
                        </div>
                        <div className="flex justify-end flex-1 px-2">
                            <div className="flex items-stretch gap-3">
                                <button onClick={codeSave} className=' btn bg-primary text-secondary-content hover:bg-base-100 hover:text-base-content'>
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
                        defaultValue={value}
                        value={value}
                        onChange={handleCodeChange}
                    />
                </div>

                {/* output section */}
                <div className='lg:w-1/2 pl-3 relative z-30 bg-base-200 rounded-lg w-full h-96 lg:h-screen'>
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
