import React, { useEffect, useState } from 'react';
import { SideBox, DashNav } from '../../Components';
import { Link ,useNavigate } from 'react-router-dom';
import { Route, Routes } from "react-router-dom";
import MainDashBoard from './MainDashBoard'
import NewProject from './Newproject'
import Savedfile from './Savedfile'
import Stats from './Stats'
import { useFirebase } from '../../Context/FirebaseContext';

const Dashboard = () => {
    const { user, loading } = useFirebase();
    const navigate = useNavigate(); 
    const [authReady, setAuthReady] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setAuthReady(true);
        }, 2000); 

        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (authReady && !loading && !user) {
            navigate('/signin');
        }
    }, [authReady, loading, user, navigate]);


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