import React, { useState, useEffect } from 'react';
import { Link , useNavigate } from 'react-router-dom';
import { auth } from '../../firebase';
import { axiosInstance } from '../../../utils/index';
import { useDispatch } from 'react-redux';
import { setMeetingId } from '../../../features/meetingSlice';

const Newproject = () => {
  const dispatch = useDispatch();
  const [step, setStep] = useState(1);
  const [selectedTeam, setSelectedTeam] = useState('');
  const [selectedWorkSpace, setSelectedWorkSpace] = useState('');
  const [code, setCode] = useState('');
  const [workspaceName, setWorkspaceName] = useState('');
  const [copied, setCopied] = useState(false);
  const [codeGenerated, setCodeGenerated] = useState(false);
  const [isDisabled, setIsButtonDisabled] = useState(true);
  const user= auth.currentUser;
  const navigate = useNavigate();
  const userId=user?.uid;


  useEffect(() => {
    if (!codeGenerated) {
      generateCode();
      setCodeGenerated(true);
    }
  }, [codeGenerated]);

  const handleTeamSelection = (option) => {
    setSelectedTeam(option);
    setStep(2);
  };

  const handleWorkSpaceSelection = (option) => {
    setSelectedWorkSpace(option);
   
    setStep(3);
  };

  const handleCodeChange = (event) => {
    setCode(event.target.value);
  };

  const handleFolderNameChange = (event) => {
    setFolderName(event.target.value);
  };

  const handleWorkspaceNameChange = (event) => {
    const name = event.target.value;
    setWorkspaceName(name);
    if (name.length >= 6) {
      setIsButtonDisabled(false); 
    } else {
      setIsButtonDisabled(true); 
    }
  };
  


  const handleSolo = async () => {
    const name = workspaceName;
    const fileName = 'topic'; 
    const language = 'python';

    const data = {
      name,
      fileName,
      language
    };

    try {
      console.log(userId);
      const response = await axiosInstance.post(`/api/v1/project/create/solo/${userId}`, {name,fileName,language});
      console.log(response);
      const meetingId = response.data.workspace._id;
      dispatch(setMeetingId(meetingId));
      console.log(meetingId);
      navigate(`/editor/${meetingId}`); 
    } catch (error) {
      console.error('Error creating workspace:', error.message);
      
    }
  };

  const handleNextStep = async () => {
    setStep(step + 1);
    const name = workspaceName;
    const fileName = 'topic'; 
    const language = 'python';

    const data = {
      name,
      fileName,
      language
    };

    try {
      console.log(userId);
      const response = await axiosInstance.post(`/api/v1/project/create/team/${userId}`, {name,fileName,language});
      // console.log(response);
      const meetingId = response.data.workspace._id;
      console.log(meetingId);
      navigate(`/editor/${meetingId}`);
    } catch (error) {
      console.error('Error creating workspace:', error.message);
      
    }

  };

  const joinTeam = async  () => {
    try{
      if(code){
        const response = await axiosInstance.post(`/api/v1/project/join/team/${userId}`, {meetingId:code});
        console.log(response);
        navigate(`/editor/${code}`);
      }
      else{
        console.log("Please enter a valid meeting id");
      }
      
    }
    catch{
      console.error('Error joining workspace:', error.message);
    }
    
  };

  const handleModalClose = () => {
    // Reset state
    setStep(1);
    setSelectedTeam('');
    setSelectedWorkSpace('');
    setCode('');
    setFolderName('');
    setWorkspaceName('');
  };

  const generateCode = () => {
    const randomCode = Math.floor(100000 + Math.random() * 900000);
    setCode(randomCode.toString());
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  

  return (
    <div className="p-4 pt-20 min-h-screen lg:ml-64 overflow-hidden flex flex-row justify-between">
      <div className=' w-1/2 flex justify-center items-center'>
        <button className="btn bg-primary text-white" onClick={() => document.getElementById('my_modal_3').showModal()}>Start Project</button>
        <dialog id="my_modal_3" className="modal">
          <div className="modal-box">
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={handleModalClose}>✕</button>
            </form>
            {step === 1 && (
              <div className=' flex flex-col gap-10'>
                <h3 className="font-bold text-lg">Choose an option</h3>
                <div className=' w-full flex gap-7'>
                  <button className="btn" onClick={() => handleTeamSelection('Team')}>Team</button>
                  <button className="btn" onClick={() => handleTeamSelection('Solo')}>Solo</button>
                </div>
              </div>
            )}
            {step === 2 && selectedTeam === 'Team' && (
              <div className=' flex flex-col gap-10'>
                <h3 className="font-bold text-lg">Select an option</h3>
                <button className="btn" onClick={() => handleWorkSpaceSelection('Create')}>Create a workSpace</button>
                <button className="btn" onClick={() => handleWorkSpaceSelection('Join')}>Join a work space</button>
              </div>
            )}

             {step === 2 && selectedTeam === 'Solo' &&  (
              <div className=' flex flex-col gap-6 p-10'>
           
           <div className=' flex flex-col gap-4'>
                
                <h3 className="font-bold text-lg">Create a Workspace</h3>

                <div className=' flex gap-3'>
                <input type="text" value={workspaceName} onChange={handleWorkspaceNameChange}  className="input input-bordered input-primary w-full max-w-xs" placeholder="workspace name" />
       
                </div>
              </div>
              
                <button disabled={isDisabled} className=' btn' onClick={handleSolo} >
                  
                  Open Editor
                
                  
                </button>

              </div>
            )}
            {step === 3 && selectedTeam === 'Team' && selectedWorkSpace === 'Create' && (
              <>
                <div className="flex flex-col gap-6">
                  <h3 className="font-bold text-lg">Workspace Details</h3>
                  <input type="text" value={workspaceName} onChange={handleWorkspaceNameChange} placeholder="Workspace Name" className="input input-bordered input-primary w-full max-w-xs" />
                  <button className="btn" onClick={handleNextStep} disabled={isDisabled}>Next</button>
                </div>
              </>
            )}
            {step === 3 && selectedTeam === 'Team' && selectedWorkSpace === 'Join' && (
              <div className=' flex flex-col gap-6'>
                <h3 className="font-bold text-lg">Paste the code or Ask friend a code</h3>
                <div className=' flex gap-4'>
                <input type="text"  onChange={handleCodeChange} className="input input-bordered input-primary w-full max-w-xs" />
                <button className="btn" onClick= {()=>joinTeam()}>Next</button>
                </div>
              </div>
            )}

            {step === 4 && selectedTeam === 'Team' && selectedWorkSpace === 'Join' && (
              <div className=' flex flex-col gap-10'>
                Your Profile
                <Link className=' btn' to='/editor'>Join</Link>
              </div>
            )}
            {step === 4 && selectedTeam === 'Team' && selectedWorkSpace === 'Create' && (
              <div className=' flex flex-col gap-5'>
                Your Profile
                <Link className=' btn' to='/editor'>Create the workSpace</Link>
              </div>
            )}

          </div>
        </dialog>
      </div>
      <div className='  h-full w-1/2 flex justify-center items-center'>
        <div class="absolute scale-0  left-1/2 md:scale-110 inset-0 m-auto w-2/4 h-2/4 md:w-96 md:h-96 rounded-full rotate-45 bg-gradient-to-r from-violet-100 to-purple-900 blur-3xl"></div>
        <img src="/images/woman.png" className=' w-full h-full  relative ' alt="" />
      </div>

    </div>
  );
}

export default Newproject;