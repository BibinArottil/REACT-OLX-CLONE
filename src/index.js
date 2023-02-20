import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {FirebaseContext} from './store/FirebaseContext'
import Context from './store/FirebaseContext'
import  firebase from 'firebase/compat/app'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
//   <React.StrictMode>
    <FirebaseContext.Provider value={{firebase}}>
        <Context>
            <App />
        </Context>
    </FirebaseContext.Provider>
//   </React.StrictMode> 
);