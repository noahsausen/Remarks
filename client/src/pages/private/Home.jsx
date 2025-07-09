import '../../App.css';
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import {useEffect, useState} from "react";
import Send from "../../components/Send";


export default function Home() {
  var decoded;
  const [user, setUser] = useState("");
  async function verifyToken() {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        window.location.replace("/");
      }
      const res = await axios.post("http://localhost:24/auth/verify", {token: token});
      if (res.data.valid) {
        decoded = jwtDecode(token);
        setUser(decoded.user);
      } else {
        window.location.replace("/");
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    verifyToken();
  });


  return (
    <div className="Home">
      <h1 className="HomeHeading">Welcome, {user.username}.</h1>
      <p className="HomeSubheading">Let's get you caught up.</p>
      {/*<Feed/>*/}
      <Send author={user.username}/>
    </div>
  );
}

// function Feed() {
//   async function UpdateFeed() {
//     useEffect(() => {
//       verifyToken();
//     })
//   }
//
//
//
//   return (
//     <div className="Feed">
//
//     </div>
//   );
// }
