import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import App from './App.jsx'
import { store } from '../store.js'
import './index.css'
import { FirebaseProvider } from './Context/FirebaseContext.jsx'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.createRoot(document.getElementById('root')).render(
 <Provider store={store}>
  <FirebaseProvider>
    <App />
    <ToastContainer position='top-center' autoClose={2000} />
  </FirebaseProvider>
  </Provider>
)

