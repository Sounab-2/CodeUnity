import React, { useEffect, useState } from 'react';
import { axiosInstance } from '../../../utils/index';
import { useFirebase } from '../../Context/FirebaseContext';

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
    <div className="p-4 pt-20 min-h-screen lg:ml-64">
      <div className=' flex flex-wrap gap-6 w-full  p-5'>
        {workspaces.map((workspace) => (
          <div className=' w-64  h-40  rounded-lg flex justify-center items-center text-primary  font-extrabold  border-2' key={workspace._id}>{workspace.name}</div>
        ))}
      </div>



      {/* You can use the 'workspaces' state here to render the data */}
    </div>
  );
}

export default Savedfile;
