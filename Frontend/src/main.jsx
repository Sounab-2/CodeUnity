import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import App from './App.jsx'
import { store } from '../store.js'
import './index.css'
import { FirebaseProvider } from './Context/FirebaseContext.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
 <Provider store={store}>
  <FirebaseProvider>
 <React.StrictMode>
    <App />
  </React.StrictMode>
  </FirebaseProvider>
  </Provider>
)

