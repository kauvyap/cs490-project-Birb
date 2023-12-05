import React, {useState} from 'react';
import {useGoogleLogin} from '@react-oauth/google';

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
        <button style={{background: 'blue', color: 'white'}}onClick={() => login()}>Sign in with google</button>
    </div>
  );
}

export default GoogleOauth;
