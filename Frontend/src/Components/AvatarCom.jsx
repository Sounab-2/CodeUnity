import React from 'react';
import Avatar from 'react-avatar';
import { useFirebase } from '../Context/FirebaseContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus, faBars, faSignOut } from '@fortawesome/free-solid-svg-icons';


const AvatarCom = () => {
    const { user, signoutUser } = useFirebase();
    if (!user) {
        return null; // Or handle the case when user is null
    }
    return (
        <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button"> <Avatar name={user.displayName} className="dropdown" size="50" round={true} color={Avatar.getRandomColor('sitebase', ['red', 'green', 'blue'])} textSizeRatio={0.8} src={user.photoURL || ''} /></div>
            <ul tabIndex={0} className="dropdown-content z-[1] menu p-6 shadow  rounded-box w-auto bg-primary-content flex flex-col gap-6">
                <li className=' flex justify-center  flex-col text-left'>
                    <span>{user.displayName}</span>
                    <span> {user.email}</span>
                </li>
                <hr />
                <li><button className=' btn bg-primary text-white' onClick={signoutUser}>Log out <FontAwesomeIcon icon={faSignOut} /></button></li>
            </ul>
        </div>
    );
}

export default AvatarCom;
