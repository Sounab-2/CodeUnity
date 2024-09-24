import React, { useEffect, useState } from 'react';
import { axiosInstance } from '../../../utils/index';
import { useFirebase } from '../../Context/FirebaseContext';
import { Link } from 'react-router-dom';
import Avatar from 'react-avatar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const Savedfile = () => {
  const { user } = useFirebase();
  const [workspaces, setWorkspaces] = useState([]);

  useEffect(() => {
    const fetchWorkspaces = async () => {
      if (!user) {
        console.error('No user found');
        return;
      }

      try {
        const userId = user.uid;
        const response = await axiosInstance.post('/api/v1/project/savedWorkspace', { userId });
        const workspacesData = response.data.workspaces;
        setWorkspaces(workspacesData);
      } catch (error) {
        console.error('Error fetching workspaces:', error);
      }
    };

    fetchWorkspaces();
  }, [user]);

  const deleteWorkspace = async (workspaceId) => {
    try {
      await axiosInstance.delete(`/api/v1/project/deleteWorkspace/${workspaceId}`);
      const userId = user.uid;
      const response = await axiosInstance.post('/api/v1/project/savedWorkspace', { userId });
      const workspacesData = response.data.workspaces;
      setWorkspaces(workspacesData);
    } catch (error) {
      console.error('Error deleting workspace:', error);
    }
  };

  return (
    <div className="p-16 pt-20 min-h-screen lg:ml-64 flex flex-wrap gap-20">
      {workspaces.reverse().map((workspace) => (
        <div key={workspace._id} className="relative flex w-80 flex-col rounded-xl bg-base-300 shadow-lg shadow-primary bg-clip-border border-2 h-96 mt-11">
          <Link
            to={`/editor/${workspace._id}`}
            className="relative flex w-80 flex-col"
          >
            <div className="relative mx-4 -mt-6 h-56 rounded-xl bg-blue-gray-500 bg-clip-border text-white shadow-lg shadow-blue-gray-500/40 bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center flex-col gap-4">
              <div className="avatar-group -space-x-6 rtl:space-x-reverse flex h-full justify-center gap-0">
                <h1 className="left-28 relative top-8 font-extrabold text-xl">Host</h1>
                {workspace.team.map((member, index) => (
                  <div key={index} className="flex justify-center items-center flex-col -mt-4">
                    {member.id === workspace.host && (
                      <div className="flex items-center justify-center gap-1">
                        <Avatar
                          name={user.displayName}
                          className="dropdown"
                          size="50"
                          round={true}
                          color={Avatar.getRandomColor('sitebase', ['red', 'green'])}
                          textSizeRatio={0.8}
                          src={member.photoUrl || ''}
                        />
                        <h1>{member.username}</h1>
                      </div>
                    )}

                    {index === 0 && <p className="mt-4 font-extrabold text-xl">Other team member:</p>}
                    {member.id !== workspace.host && (
                      <div className="flex relative top-20 right-24">
                        <div className="relative group">
                          {/* Avatar */}
                          <Avatar
                            // name={member.username}
                            className="dropdown"
                            size="50"
                            round={true}
                            color={Avatar.getRandomColor('sitebase', ['red', 'green'])}
                            textSizeRatio={0.8}
                            src={member.photoUrl || ''}
                          />

                          {/* Tooltip below the avatar */}
                          <div
                            id="tooltip-dark"
                            role="tooltip"
                            className="absolute z-10 invisible group-hover:visible group-hover:opacity-100 bottom-[-40px] left-1/2 transform -translate-x-1/2 px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 transition-opacity duration-300 dark:bg-gray-700"
                          >
                            {member.username} {/* Display the username here */}

                            {/* Arrow pointing to the avatar */}
                            <div className="tooltip-arrow absolute top-[-6px] left-1/2 transform -translate-x-1/2 w-3 h-3 bg-gray-900 rotate-45 dark:bg-gray-700"></div>
                          </div>
                        </div>
                      </div>
                    )}

                  </div>
                ))}
              </div>
            </div>
          </Link>
          <div className="p-6 flex flex-col gap-5">
            <h5 className="mb-2 block font-sans leading-snug tracking-normal text-blue-gray-900 antialiased font-extrabold text-2xl">
              {workspace.name}
            </h5>
            <p className="font-sans text-lg font-semibold leading-relaxed text-inherit antialiased flex gap-3">
              Language used:
              <span className="bg-primary rounded-md p-1 text-primary-content">{workspace.language}</span>
            </p>
          </div>
          <button
            onClick={() => deleteWorkspace(workspace._id)}
            className="absolute bottom-4 right-4 text-red-500 hover:text-red-700"
          >
            <FontAwesomeIcon icon={faTrash} size="lg" />
          </button>
        </div>
      ))}
    </div>
  );
};

export default Savedfile;
