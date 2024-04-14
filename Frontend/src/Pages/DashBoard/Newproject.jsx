import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Newproject = () => {
  const [step, setStep] = useState(1);
  const [selectedTeam, setSelectedTeam] = useState('');
  const [selectedWorkSpace, setSelectedWorkSpace] = useState('');
  const [code, setCode] = useState('');
  const [folderName, setFolderName] = useState('');
  const [workspaceName, setWorkspaceName] = useState('');
  const [copied, setCopied] = useState(false);
  const [codeGenerated, setCodeGenerated] = useState(false);

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
    setWorkspaceName(event.target.value);
  };

  const handleNextStep = () => {
    setStep(step + 1);
  };

  const handleModalClose = () => {
    // Reset state
    setStep(1);
    setSelectedTeam('');
    setSelectedWorkSpace('');
    setCode('');
    setFolderName('');
    setWorkspaceName('');
    setCodeGenerated(false); // Reset code generation flag
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
            {step === 2 && selectedTeam === 'Solo' && (
              <div className=' flex flex-col gap-8'>
                
                <h3 className="font-bold text-lg">Create a folder</h3>

                <div className=' flex gap-3'>
                <input type="text" value={folderName} onChange={handleFolderNameChange}  className="input input-bordered input-primary w-full max-w-xs" />
                <button className="btn" onClick={handleNextStep}>Next</button>
                </div>
              </div>
            )}
             {step === 3 && selectedTeam === 'Solo' &&  (
              <div className=' flex flex-col gap-5 p-10'>
           
                <Link className=' btn' to='/editor'>Open Editor</Link>
              </div>
            )}
            {step === 3 && selectedTeam === 'Team' && selectedWorkSpace === 'Create' && (
              <>
                <div className="flex flex-col gap-6">
                  <h3 className="font-bold text-lg">Workspace Details</h3>
                  <input type="text" value={workspaceName} onChange={handleWorkspaceNameChange} placeholder="Workspace Name" className="input input-bordered input-primary w-full max-w-xs" />
                  <div className="relative">
                    <input type="text" value={code} readOnly className="input input-bordered input-primary w-full max-w-xs" />
                    <button
                      className="absolute top-0 right-40 w-16 h-full text-center text-gray-500 focus:outline-none"
                      onClick={copyToClipboard}
                    >
                      {copied ? (
                        <div className="flex items-center justify-center h-full">
                          <svg
                            className="w-3.5 h-3.5 text-blue-700 dark:text-blue-500 mr-1"
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
                  </div>


                  <button className="btn" onClick={handleNextStep}>Next</button>
                </div>
              </>
            )}
            {step === 3 && selectedTeam === 'Team' && selectedWorkSpace === 'Join' && (
              <div className=' flex flex-col gap-6'>
                <h3 className="font-bold text-lg">Paste the code or Ask friend a code</h3>
                <div className=' flex gap-4'>
                <input type="text"  onChange={handleCodeChange} className="input input-bordered input-primary w-full max-w-xs" />
                <button className="btn" onClick={handleNextStep}>Next</button>
                </div>
              </div>
            )}

            {step === 4 && selectedTeam === 'Team' && selectedWorkSpace === 'Create' && (
              <div className=' flex flex-col gap-4'>
                <h3 className="font-bold text-lg">Create a folder</h3>
                <div className=' flex gap-5'>
                <input type="text" value={folderName} onChange={handleFolderNameChange} className="input input-bordered input-primary w-full max-w-xs" />
                <button className="btn" onClick={handleNextStep}>Next</button>
                </div>
              </div>
            )}

            {step === 4 && selectedTeam === 'Team' && selectedWorkSpace === 'Join' && (
              <div className=' flex flex-col gap-10'>
                Your Profile
                <Link className=' btn' to='/editor'>Join</Link>
              </div>
            )}
            {step === 5 && selectedTeam === 'Team' && selectedWorkSpace === 'Create' && (
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