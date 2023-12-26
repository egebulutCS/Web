import React, { useContext } from 'react';
import Header from './Header';
import { Navigate } from 'react-router-dom';
import { UserContext } from './UserContext';

export default function Landing() {
    const { user } = useContext(UserContext);
        if(user) {
            <Navigate to='/home'/> 
        }

    return(
        <div className="page">
            <Header/>
           <h3>This is the public landing page</h3> 
        </div>
    )
}