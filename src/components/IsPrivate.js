import React from 'react'
import { useContext } from 'react'
import { UserContext } from '../context/user.context'
import { Navigate } from 'react-router-dom'

function IsPrivate( { children } ) {
    const { loggedUser, isLoading } = useContext(UserContext);

    if (isLoading) {
      return <div>Loading</div>
    }
    

    if(!loggedUser) {
        return <Navigate to="/login" />
    } else {
        return children;
    }
  
}

export default IsPrivate;