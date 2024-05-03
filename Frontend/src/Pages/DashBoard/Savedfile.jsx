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
      try {
        const userId = user?.uid;
        const workspace = await axiosInstance.post('/api/v1/project/savedWorkspace',{userId});
        console.log(workspace);
        // setWorkspaces(workspace);
        
 // Assuming the response contains the workspace data
      } catch (error) {
        console.error('Error fetching workspaces:', error);
      }
    };

    fetchWorkspaces();
  }, [user]);

  return (
    <div className="p-4 pt-20 min-h-screen lg:ml-64">
      Savedfile
      <p>
      {workspaces.displayName}
      </p>
    
      {/* You can use the 'workspaces' state here to render the data */}
    </div>
  );
}

export default Savedfile;
