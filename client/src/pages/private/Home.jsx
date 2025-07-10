import '../../App.css';
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import {useEffect, useState} from "react";
import Send from "../../components/Send";
import Loading from "../../components/Loading";


export default function Home() {
  var decoded;
  const [user, setUser] = useState("");
  async function verifyToken() {
    document.getElementById("LoadingBackground").style.display = "flex";
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        window.location.replace("/");
      }
      const res = await axios.post("https://remarks-server-fuju.onrender.com/auth/verify", {token: token});
      if (res.data.valid) {
        decoded = jwtDecode(token);
        setUser(decoded.user);
      } else {
        localStorage.removeItem("token");
        window.location.replace("/");
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function UpdateFeed() {
    try {
      const res = await axios.get("https://remarks-server-fuju.onrender.com/post/getall");
      document.getElementById("Feed").innerHTML = "";
      res.data.posts.forEach((post) => {
        let postDiv = document.createElement("div");
        postDiv.className = "Post";
        postDiv.innerHTML = `
          <h3>${post.author}</h3>
          <p>${post.content}</p>
        `;
        document.getElementById("Feed").prepend(postDiv);
      })
    } catch (error) {
      console.log(error);
    }
    document.getElementById("LoadingBackground").style.display = "none";
  }

  useEffect(() => {
    verifyToken();
    UpdateFeed();
  }, []);


  return (
    <div className="Home">
      <h1 className="HomeHeading">Welcome, {user.username}.</h1>
      <p className="HomeSubheading">Let's get you caught up.</p>
      <Feed/>
      <Send author={user.username}/>
      <Loading/>
    </div>
  );
}

function Feed() {
  return (
    <div id="Feed">
    </div>
  );
}
