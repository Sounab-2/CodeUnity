// import React, { useState } from 'react';
// import { Form, Link ,useNavigate } from 'react-router-dom';
// import { FormInput, Submit } from '../../Components';
// import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup} from 'firebase/auth';
// import { useFirebase } from '../../Context/FirebaseContext';
// import {auth } from "../../firebase";
// import { useDispatch } from 'react-redux';
// import { setUsername } from '../../../features/userSlice';


// const Signin = () => {
//     const firebase=useFirebase()
//     const navigate = useNavigate();
//     const dispatch = useDispatch();

//     const[email,setEmail]=useState('');
//     const[password,setPassword]=useState('');
//     const[isButtonDisabled,setIsButtonDisabled]=useState(true)

//     const handleInputChange=(e)=>{
//         const{value,name}=e.target;
//         if(name==='email'){
//           setEmail(value);
//         }else if(name === 'password'){
//           setPassword(value)
//         }
//         setIsButtonDisabled(email===''|| password==='');
//     }

//     const handleSubmit=(e)=>{
//       e.preventDefault();
//       setEmail('');
//       setPassword('');

//       firebase.signInUserWithEmailAndPassword(email,password)
//       .then(()=>{
//         // i have to call for backend api endpoint
//         navigate('/');
//       })
//       .catch(()=>{
//         console.log('Something went wrong');
//       })

//       const user =  auth.currentUser;

//       if(user){
//         const {email,uid} = user;
//         console.log(user);
//         console.log(email,uid,displayName);
//         // dispatch(setUsername(displayName));
//       } 


//     }

//     const signinwithgoogle = () => {
//       firebase.signInUserWithGoogle()
//         .then((user) => {
//           console.log(user);
//           // here i have to call for backend api endpoint to login
//           navigate('/'); // Redirect to sign-in page
//         })
//         .catch((error) => {
//           console.error('Error signing up with Google:', error.message);
//         });
//     };


//   return (
//     <section className='h-full flex justify-center items-center flex-col gap-12 place-items-center bg-transparent'>
//      <h1 class="text-4xl md:text-6xl tracking-tight  font-bold text-transparent bg-clip-text bg-gradient-to-bl from-zinc-800 via-slate-200 to-zinc-900 h-20 ">Sign In</h1>
//      <div className='card w-1/3 bg-base-100 shadow-2xl flex flex-col gap-y-4' >
//       <div
//         className=' flex gap-2 flex-col'
//       >

//       <form onSubmit={handleSubmit}>
//         <FormInput
//           type='email'
//           label='Enter Your Email:'
//           name='email'
//           value={email}
//           onChange={handleInputChange}
//           placeholder="Enter your Email"
//         />
//         <FormInput
//           type='password'
//           label='password'
//           name='password'
//           value={password}
//           onChange={handleInputChange}
//           placeholder="Enter your password"
//         />
//         <div className=' mt-4 flex flex-col gap-3'>
//           <Submit text={'Log in'} disabled={isButtonDisabled}/>
//           <div class="flex items-center mb-2"><div class="w-full h-px bg-gray-600"></div><div class="text-center text-gray-500 px-5 text-sm font-bold">Or</div><div class="w-full h-px bg-gray-600"></div></div>
//         </div>
//           </form>
//           <button className=' btn 'onClick={signinwithgoogle}>
//             <span className=' flex gap-4 items-center'>
//               <img src="./google-color.svg" alt="" className=' w-6 h-6' />
//               <h1>Sign in with Google</h1>
//             </span>
//           </button>

//         </div>
//         <p className=' text-center'>
//           Not a member yet ? {' '}
//           <Link
//             to='/signup'
//             className=' ml-2 link link-hover link-primary capitalize'

//           >
//             signup
//           </Link>

//         </p>
        
//       </div>
//     </section>
//   );
// }

// export default Signin;








import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FormInput, Submit } from '../../Components';
import { useFirebase } from '../../Context/FirebaseContext';
import { useDispatch } from 'react-redux';
import { setUsername } from '../../../features/userSlice';

const Signin = () => {
  const firebase = useFirebase();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const handleInputChange = (e) => {
    const { value, name } = e.target;
    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
    setIsButtonDisabled(email === '' || password === '');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    firebase.signInUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        if (user) {
          console.log(user);
          dispatch(setUsername(user.displayName || user.email)); // Dispatch the username or email if displayName is not available
          navigate('/dashboard'); // Redirect to home page
        }
      })
      .catch((error) => {
        console.error('Something went wrong:', error.message);
      });
  };

  const signinwithgoogle = () => {
    firebase.signInUserWithGoogle()
      .then((result) => {
        const user = result.user;
        console.log(user);
        dispatch(setUsername(user.displayName)); // Again, dispatching the username
        navigate('/dashboard'); // Redirect to home page
      })
      .catch((error) => {
        console.error('Error signing in with Google:', error.message);
      });
  };

  return (
    <section className='h-full flex justify-center items-center flex-col gap-12 place-items-center bg-transparent'>
      <h1 className="text-4xl md:text-6xl tracking-tight font-bold text-transparent bg-clip-text bg-gradient-to-bl from-zinc-800 via-slate-200 to-zinc-900 h-20">Sign In</h1>
      <div className='card w-1/3 bg-base-100 shadow-2xl flex flex-col gap-y-4 p-10'>
        <div className='flex gap-2 flex-col'>
          <form onSubmit={handleSubmit}>
            <FormInput
              type='email'
              label='Enter Your Email:'
              name='email'
              value={email}
              onChange={handleInputChange}
              placeholder="Enter your Email"
            />
            <FormInput
              type='password'
              label='Password:'
              name='password'
              value={password}
              onChange={handleInputChange}
              placeholder="Enter your password"
            />
            <div className='mt-4 flex flex-col gap-3'>
              <Submit text={'Log in'} disabled={isButtonDisabled} />
              <div className="flex items-center mb-2">
                <div className="w-full h-px bg-gray-600"></div>
                <div className="text-center text-gray-500 px-5 text-sm font-bold">Or</div>
                <div className="w-full h-px bg-gray-600"></div>
              </div>
            </div>
          </form>
          <button className='btn' onClick={signinwithgoogle}>
            <span className='flex gap-4 items-center'>
              <img src="./google-color.svg" alt="" className='w-6 h-6' />
              <h1>Sign in with Google</h1>
            </span>
          </button>
        </div>
        <p className='text-center'>
          Not a member yet? {' '}
          <Link to='/signup' className='ml-2 link link-hover link-primary capitalize'>
            Sign up
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Signin;
