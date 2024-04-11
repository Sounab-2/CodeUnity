import React from 'react';
import { SideBox, DashNav } from '../../Components';
import { Link ,useNavigate } from 'react-router-dom';
import { Route, Routes } from "react-router-dom";
import MainDashBoard from './MainDashBoard'
import NewProject from './Newproject'
import Savedfile from './Savedfile'
import Stats from './Stats'
import { useFirebase } from '../../Context/FirebaseContext';
import { useEffect } from 'react';


const Dashboard = () => {

    const { user } = useFirebase();
    const navigate = useNavigate(); 

    useEffect(() => {
        if (!user) {
            navigate('/signin');
        }
    }, [user, navigate]);


    return (
        

        <>
            <DashNav />
            <SideBox />

            <Routes>
                <Route path='/' element={<MainDashBoard />} />
                <Route path='newproject' element={<NewProject />} />
                <Route path='saved' element={<Savedfile />} />
                <Route path='stats' element={<Stats />} />
              
            </Routes>

        </>
    );
}

export default Dashboard;
