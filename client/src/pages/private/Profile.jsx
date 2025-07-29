import '../../App.css';
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import {useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import Loading from "../../components/Loading";
import { formatDistanceToNow } from 'date-fns';
// import Send from "../../components/Send";

export default function Profile() {
  const { username } = useParams();
  var decoded;
  const [user, setUser] = useState("");
  async function verifyToken() {
    document.getElementById("LoadingBackground").style.display = "flex";
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        window.location.replace("/");
      }
      const res = await axios.post("https://remarks-server.vercel.app/auth/verify", {token: token});
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
      localStorage.removeItem("token");
      window.location.replace("/");
      window.location.reload();
    }
  }

  function generateRelativeDate(timestamp) {
    try {
      let relativeDate = formatDistanceToNow(timestamp, {addSuffix: true});
      if (relativeDate === "less than a minute ago") {
        relativeDate = "just now";
      }
      return relativeDate;
    } catch (error) {
      return "old";
    }
  }

  async function UpdateFeed() {
    console.log("Update Feed");
    try {
      const res = await axios.post("https://remarks-server.vercel.app/post/getusers", {author: user.username});
      console.log(res.data);
      document.getElementById("Feed").innerHTML = "";
      res.data.posts.forEach((post) => {
        let postDiv = document.createElement("div");
        postDiv.className = "Post";
        postDiv.innerHTML = `
          <div>
          <h3>${post.author}</h3>
          <h10>${generateRelativeDate(post.timestamp)}</h10>
          </div>
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
      <h1 className="HomeHeading">{username}'s Posts</h1>
      {/*<p className="HomeSubheading">Let's get you caught up.</p>*/}
      <Feed/>
      {/*<Send author={user.username}/>*/}
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