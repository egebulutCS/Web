import React, { useContext } from 'react';
import { Route, Navigate } from 'react-router-dom';
import { UserContext } from './UserContext';
import Loading from './Loading'; 


export default function PrivateRoute(props) {   
    const { user, isLoading } = useContext(UserContext); 
    console.log(user, isLoading);

    const { component: Component,
        ...rest } = props;

      if(isLoading) {
          return <Loading/>
        }

      if(user){
        return ( <Route {...rest} render={(props) => (<Component {...props}/>)}/>)
        } else {
          return <Navigate to='/login'/> 
        }

}