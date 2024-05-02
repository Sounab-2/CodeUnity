import React, { useEffect } from 'react';
import AgoraRTC from 'agora-rtc-sdk-ng';
import { useParams } from 'react-router-dom';
import { useFirebase } from '../Context/FirebaseContext';
import { useSelector } from 'react-redux';
const Call = ({socketRef}) => {
  const {meetingId}=useParams();
  const appId = process.env.AGORA_APP_ID;
  const token=null;
  const { user, signoutUser } = useFirebase();
  const RTCId = user?.uid;
  let roomId = meetingId;
  // const teamMembers = useSelector(state=> state.meeting.team);
  // console.log(teamMembers);


  let audioTracks = {
    localAudioTracks:null,
    remoteAudioTracks:[]
  }

  let RTCclient;
  // let micMuted=false;

  const initRTC = async () =>{
    RTCclient = AgoraRTC.createClient({mode:'rtc' , codec:'vp8'});
    const response=await RTCclient.join(appId, roomId, token, RTCId);
  
    //2
    audioTracks.localAudioTracks = await AgoraRTC.createMicrophoneAudioTrack();
    // audioTracks.localAudioTracks.setMuted(micMuted);
    await RTCclient.publish(audioTracks.localAudioTracks);
    
    RTCclient.on('user-joined', handleUserJoined)
    RTCclient.on("user-published", handleUserPublished)
    RTCclient.on("user-left", handleUserLeft);
  };

  useEffect(() => {
    socketRef?.current?.on('incoming-call', () => {
      alert('A call has been initiated');
      document.getElementById('my_modal_3').showModal();
      initRTC();
      
    });
  }, []);

  const joinRoom = () => {
    document.getElementById('my_modal_3').showModal();
    initRTC();
    socketRef.current.emit('call',meetingId);

  }
  
  const leaveCall = () =>{
    audioTracks.localAudioTracks?.stop();
    audioTracks.localAudioTracks?.close();

    RTCclient?.unpublish();
    RTCclient?.leave();
    document.getElementById('my_modal_3').close();
  }

  let handleUserJoined = async (user) => {
    console.log('A new user joined',user);
  } 
  
  //3 
  let handleUserPublished = async (user, mediaType) => {
    
    await  RTCclient.subscribe(user, mediaType);
    
    //5
    if (mediaType == "audio"){
      audioTracks.remoteAudioTracks[user.uid] = [user.audioTrack]
      user.audioTrack.play();
    }
  }
  
  //6
  let handleUserLeft = async (user) => {
    delete audioTracks.remoteAudioTracks[user.uid]
    
  }

  // const toggleMute = async(e) => {
  //   if(micMuted){
  //     micMuted=false;
  //   }
  //   else{
  //     micMuted=true;
  //   }

  //   audioTracks.localAudioTracks.setMuted(micMuted);
  // }



  return (
    <>
      <button className=' btn bg-secondary text-primary-content hover:bg-base-100 hover:text-base-content' onClick={joinRoom}>Start a Call</button>
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          </form>
          <h3 className="text-2xl font-extrabold">In a call...............</h3>
          <p className="py-4 flex gap-12 mt-12">
            <button
            //  onClick={toggleMute}
             >
            <label className="swap border-2 h-16 w-20 rounded-lg">

              {/* this hidden checkbox controls the state */}
              <input type="checkbox" />

              {/* volume on icon */}
              <svg className="swap-on fill-current" xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24"><path d="M14,3.23V5.29C16.89,6.15 19,8.83 19,12C19,15.17 16.89,17.84 14,18.7V20.77C18,19.86 21,16.28 21,12C21,7.72 18,4.14 14,3.23M16.5,12C16.5,10.23 15.5,8.71 14,7.97V16C15.5,15.29 16.5,13.76 16.5,12M3,9V15H7L12,20V4L7,9H3Z" /></svg>

              {/* volume off icon */}
              <svg className="swap-off fill-current" xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24"><path d="M3,9H7L12,4V20L7,15H3V9M16.59,12L14,9.41L15.41,8L18,10.59L20.59,8L22,9.41L19.41,12L22,14.59L20.59,16L18,13.41L15.41,16L14,14.59L16.59,12Z" /></svg>

            </label>
            </button>

            <button className=' border-2 h-16 w-20 rounded-lg flex justify-center items-center' onClick={leaveCall}><img src="/images/end-call-icon.png" className=' w-12 h-12 ' alt="" /></button>
          </p>
        </div>
      </dialog>
    </>

  );
}

export default Call;
