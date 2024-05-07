import React, { useEffect, useState } from 'react';
import { axiosInstance } from '../../../utils/index';
import { useFirebase } from '../../Context/FirebaseContext';
import { Link } from 'react-router-dom';
import Avatar from 'react-avatar';

const Savedfile = () => {
  const { user } = useFirebase();
  const [workspaces, setWorkspaces] = useState([]);
  console.log(user);
  // console.log(user?.uid);
  // const 

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
        console.log(workspacesData);
      } catch (error) {
        console.error('Error fetching workspaces:', error);
      }
    };

    fetchWorkspaces();
  }, [user]);



  return (
    <div className="p-16 pt-20 min-h-screen lg:ml-64  flex flex-wrap gap-10  ">

      {workspaces.map((workspace) => (
        <Link to={`/editor/${workspace._id}`} class="relative flex w-80 flex-col rounded-xl bg-base-300 shadow-lg shadow-primary bg-clip-border   broder-2 h-96 mt-11 ">
          <div className="relative mx-4 -mt-6 h-56  rounded-xl bg-blue-gray-500 bg-clip-border text-white shadow-lg shadow-blue-gray-500/40 bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center flex-col gap-4">

            <div className="avatar-group -space-x-6 rtl:space-x-reverse  flex h-full justify-center gap-0">
              <h1 className='left-28  relative top-8 font-extrabold text-xl'>Host</h1>
              {workspace.team.map((member, index) => (
                <div key={index} className='  flex justify-center items-center flex-col -mt-4 '>
                  {member.id === workspace.host && (
                    <div className=' flex items-center justify-center gap-1'>
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


                  {index === 0 && <p className=' mt-4 font-extrabold text-xl'>Other team member:</p>}
                  {member.id != workspace.host && (
                    // <div className="avatar-group -space-x-6 rtl:space-x-reverse">
                    <div className='flex relative top-20 right-24'>
                      <Avatar
                        name={member.username}
                        className="dropdown"
                        size="50"
                        round={true}
                        color={Avatar.getRandomColor('sitebase', ['red', 'green'])}
                        textSizeRatio={0.8}
                        src={member.photoUrl || ''}
                      />

                      {/* <h1>{member.username}</h1> */}
                    </div>

                  )}


                </div>
              ))}

            </div>
          </div>
          <div class="p-6 flex flex-col gap-5">
            <h5 class="mb-2 block font-sans  leading-snug tracking-normal text-blue-gray-900 antialiased font-extrabold text-2xl">
              {workspace.name}
            </h5>
            <p class=" font-sans text-lg font-semibold leading-relaxed text-inherit antialiased flex gap-3  ">
              Language used :
              <span className=' bg-primary rounded-md p-1 text-primary-content'>{workspace.language}</span>
            </p>
          </div>

        </Link>

      ))}
    </div>

  );
}

export default Savedfile;
