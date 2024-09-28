import React from 'react';
import { useFirebase } from '../../Context/FirebaseContext';
import { Link } from 'react-router-dom';

const MainDashBoard = () => {
    const { user, signoutUser } = useFirebase();

    return (
        <div className="pt-28 min-h-screen lg:ml-64 flex flex-col gap-10 p-12">
            {/* Greeting Section */}
            <div className="bg-gradient-to-r from-textmain to-yellow-300 text-white font-bold text-3xl w-full rounded-md bg-teal-600 h-36 flex justify-left p-8 items-center flex-col gap-3 font-heading ">
                <h1 className="">Hello  <span className='animate-wave'>👋</span> ,
                    <span className=" text-white text-4xl font-extrabold animate-slide-in">{" "}{user?.displayName}</span>.
                </h1>
                <p className="text-base font-royal4">
                    Welcome to your Dashboard! Check what you can do today.
                </p>
            </div>
            <h1 className=' font-bold text-3xl font-heading text-white'>Check out Products : </h1>
            {/* Features Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Link to='/dashboard/chat' className='feature-card'>
                    <div className="p-8 bg-gradient-to-b from-info to-info-dark text-info-content rounded-lg shadow-md hover:shadow-lg transition">
                        <h2 className="text-2xl font-bold mb-4">AI Chat Facility</h2>
                        <p>Communicate with AI to resolve any doubt.</p>
                    </div>
                </Link>
                <Link to='/dashboard/workspace' className='feature-card'>
                    <div className="p-8 bg-gradient-to-b from-secondary to-secondary-dark text-secondary-content rounded-lg shadow-md hover:shadow-lg transition">
                        <h2 className="text-2xl font-bold mb-4">Saved Workspace</h2>
                        <p>Access your personalized workspace anytime.</p>
                    </div>
                </Link>
                <Link to='/dashboard/team' className='feature-card'>
                    <div className="p-8 bg-gradient-to-b from-accent to-accent-dark text-accent-content rounded-lg shadow-md hover:shadow-lg transition">
                        <h2 className="text-2xl font-bold mb-4">Team Collaboration</h2>
                        <p>Work together with your team on projects seamlessly.</p>
                    </div>
                </Link>

                <Link to='/dashboard/solo-options' className='feature-card'>
                    <div className="p-8 bg-gradient-to-b from-accent to-accent-dark text-accent-content rounded-lg shadow-md hover:shadow-lg transition">
                        <h2 className="text-2xl font-bold mb-4">Solo Options</h2>
                        <p>Work independently on your personal projects.</p>
                    </div>
                </Link>
                <Link to='/dashboard/languages' className='feature-card'>
                    <div className="p-8 bg-gradient-to-b from-info to-info-dark text-info-content rounded-lg shadow-md hover:shadow-lg transition">
                        <h2 className="text-2xl font-bold mb-4">Programming Languages</h2>
                        <p>Choose from multiple languages for your coding needs.</p>
                    </div>
                </Link>
                <Link to='/dashboard/help' className='feature-card'>
                    <div className="p-8 bg-gradient-to-b from-secondary to-secondary-dark text-secondary-content rounded-lg shadow-md hover:shadow-lg transition">
                        <h2 className="text-2xl font-bold mb-4">Help and Support</h2>
                        <p>Get assistance whenever you need it.uiuiuiiuiiuiuiui</p>
                    </div>
                </Link>



            </div>
        </div>
    );
};

export default MainDashBoard;
