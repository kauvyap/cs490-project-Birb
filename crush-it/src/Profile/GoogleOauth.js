import React from 'react';
import {GoogleLogin} from '@react-oauth/google';

const GoogleOauth = () => {
    const responseMessage = (response => {
        console.log("response", response);
    })
    const errorMessage = (error => {
        console.log("oauth error", error);
    })

  return (
    <div>
        <GoogleLogin 
            onSuccess={responseMessage} 
            onError={errorMessage} 
        />
    </div>
  );
}

export default GoogleOauth;
