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
  const [loading, setLoading] = useState(false);


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
        console.log(workspacesData);
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
  const handleWorkspaceClick = async (workspaceId) => {
    try {
      if (workspaceId) {
        setLoading(true); // Start loading when workspace is clicked
        const userId = user.uid;
        const response = await axiosInstance.post(`/api/v1/project/join/team/${userId}`, { meetingId: workspaceId, username: user?.displayName, photoUrl: user?.photoURL, status: 'online' });
        const { team } = response.data.workspace;
        console.log(team);
        dispatch(setTeam(team));
        // navigate(`/editor/${workspaceId}`);
        dispatch(setMeetingId(code));
        dispatch(setMeetingName(response.data.workspace.name));
        dispatch(setHostId(response.data.workspace.host));
      }
      else {
        console.log("Please enter a valid meeting id");
        setLoading(false);
      }

    }
    catch (error) {
      console.error('Error joining workspace:', error.message);
    }

  };

  return (
    <div className="p-16 pt-20 min-h-screen lg:ml-64 flex flex-wrap gap-20">
      {loading ? ( // Show loading spinner while fetching
        <div className="flex items-center justify-center w-full">
          loading....
        </div>
      ) : (

        workspaces.reverse().map((workspace) => (
          <div key={workspace._id} className="relative flex w-80 flex-col rounded-xl bg-base-300 shadow-lg shadow-primary bg-clip-border border-2 h-96 mt-11">
            <Link
              to={`/editor/${workspace._id}`}
              className="relative flex w-80 flex-col"
              onClick={() => handleWorkspaceClick(workspace._id)}
            >
              <div className="relative mx-4 -mt-6 h-56 rounded-xl bg-blue-gray-500 bg-clip-border text-white shadow-lg shadow-blue-gray-500/40 bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center flex-col gap-4">


                {workspace.type === 'solo' ? (
                  <div className="flex items-center justify-center flex-col">
                    <h1 className="font-extrabold text-xl">Host</h1>
                    <div className=' flex gap-4 justify-center items-center'>
                    <Avatar
                      name={user.displayName}
                      size="50"
                      round={true}
                      color={Avatar.getRandomColor('sitebase', ['red', 'green'])}
                      textSizeRatio={0.8}
                      src={workspace.host.photoUrl || ''}
                    />
                    <h2 className=' font-bold'>{user.displayName}</h2>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center">
                    <div className="flex flex-col items-center mb-4">
                      <h1 className="font-extrabold text-xl mb-2">Host</h1>

                      {workspace.team.map((member, index) => (
                        member.id === workspace.host.id && (
                          <div key={index} className="flex gap-3 items-center justify-center">
                            <Avatar
                              name={member.username}
                              size="50"
                              round={true}
                              color={Avatar.getRandomColor('sitebase', ['red', 'green'])}
                              textSizeRatio={0.8}
                              src={member.photoUrl || ''}
                            />
                            <h1 className="mt-2 font-bold text-lg">{member.username}</h1>
                          </div>

                        )
                      ))}

                    </div>

                    <div className="flex flex-col items-center">
                      <p className="font-extrabold text-xl mb-2">Other Team Members:</p>
                      <div className="flex  w-full justify-center items-center">
                        {workspace.team.map((member, index) => (
                          member.id !== workspace.host.id && (
                            <div key={index} className="relative group inline-block">
                              <div className="relative z-10" style={{ marginLeft: index === 0 ? '0' : '-20px' }}>
                                <Avatar
                                  size="50"
                                  round={true}
                                  color={Avatar.getRandomColor('sitebase', ['red', 'green'])}
                                  textSizeRatio={0.8}
                                  src={member.photoUrl || ''}
                                />
                              </div>

                              <div className="absolute z-10 invisible group-hover:visible opacity-0 group-hover:opacity-100 bottom-[-40px] left-2 -translate-x-1/2 px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm transition-opacity duration-300 dark:bg-gray-700">
                                {member.username}
                                <div className="tooltip-arrow absolute top-[-6px] left-[45%] transform -translate-x-1/2 w-3 h-3 bg-gray-900 rotate-45 dark:bg-gray-700"></div>
                              </div>
                            </div>

                          )
                        ))}
                      </div>
                    </div>
                  </div>
                )}
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
            <span className=' absolute bottom-4 left-4'>
              {workspace.type.toUpperCase()}
            </span>
          </div>
        ))

      )}
    </div>
  );
};

export default Savedfile;
