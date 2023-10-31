import React, {useLayoutEffect, useState} from "react";
function Homepage(){
    const [username, setUsername] = useState(null)

    useLayoutEffect(() => {
        console.log(localStorage.getItem("token"));
        fetch("http://localhost:5000/api/auth/getUsername", {
          headers: {
            "x-access-token": localStorage.getItem("token")
          }
        })
        .then(res => res.json())
        .then(data => data.isLoggedIn ? setUsername(data.username): null)
        .catch((err) => alert(err))
      }, [])

    return (
        <div style={{'background-color': '#F5F7F9', 'min-height': '94%'}}>
            <p>
                This is the homepage for now!
            </p>
        </div>
    )
    
}
export default Homepage;