import React, {useLayoutEffect, useState} from "react";
import { useNavigate } from "react-router";
function Homepage(){
  const navigate = useNavigate();
  const [username, setUsername] = useState(null)

  useLayoutEffect(() => {
      console.log(localStorage.getItem("token"));
      fetch("http://localhost:5000/api/auth/getUsername", {
        headers: {
          "x-access-token": localStorage.getItem("token")
        }
      })
      .then(res => res.json())
      .then(data => data.isLoggedIn ? setUsername(data.username): navigate('/login'))
      .catch((err) => alert(err))
    }, [navigate])

  return (
      <div style={{'background-color': '#F5F7F9', 'min-height': '94%'}}>
          <p>
              This is the homepage for {username}!
          </p>
      </div>
  )
    
}
export default Homepage;