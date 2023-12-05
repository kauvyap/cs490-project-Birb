import React, {useState} from 'react';
import {useGoogleLogin} from '@react-oauth/google';
import { IoLogoGoogle } from "react-icons/io5";
import { IconButton} from '@chakra-ui/react';

const GoogleOauth = (props) => {
    const user = props.user;
    const [data, setData] = useState(null);
    const login = useGoogleLogin({
        onSuccess: async tokenResponse => {
            console.log(tokenResponse);
            await fetch('http://localhost:5000/api/events/', {
                method: "PUT",
                body: JSON.stringify({
                    username: user,
                    access_token: tokenResponse.access_token
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            
            await fetch('http://localhost:5000/api/events/calendar/' + user)
                .then(res => res.json())
                .then(data => {setData(data)})
                .catch((err) => console.log(err));            
        },
        onError: error => console.log(error),
        scope: "https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/calendar.events",
    })
    console.log(data);

  return (
    <div>
        <IconButton marginRight={5} style={{ cursor: 'pointer' }} as={IoLogoGoogle} onClick={() => login()}></IconButton>
    </div>
  );
}

export default GoogleOauth;
