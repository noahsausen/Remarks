import '../App.css';
import sendIcon from '../assets/send.svg';
import newPostIcon from '../assets/post.svg';
import glow from "../assets/glow.png";
import axios from "axios";
import {useEffect} from "react";

export default function Send(author) {
  useEffect(() => {
    const postInputField = document.getElementById('PostContent');
    const sendButton = document.getElementById('SendButton');
    const sendButtonImage = document.getElementById('SendButtonImage');

    postInputField.addEventListener('input', function() {
      if (postInputField.value.trim() !== '') {
        sendButton.classList.add("active");
        sendButtonImage.classList.add("active");
      } else {
        sendButton.classList.remove("active");
        sendButtonImage.classList.remove("active");
      }
    });

    document.getElementById("NewPost").addEventListener("mousemove", (event) => {
      const mouseX = Math.floor(((event.clientX / window.innerWidth) * 100));
      const mouseY = Math.floor(((event.clientY / window.innerHeight) * 100));
      document.getElementById("MouseGlowSend").style.opacity = "0";
      document.getElementById("MouseGlowSend").style.left = mouseX + "vw";
    });

    document.getElementById("NewPost").addEventListener("mouseout", (event) => {
      document.getElementById("MouseGlowSend").style.opacity = "0";
    });
  }, []);

  async function SendPost() {
    document.getElementById("LoadingBackground").style.display = "flex";
    try {
      const content = document.getElementById('PostContent').value.trim();
      document.getElementById('PostContent').value = "";
      const data = {
        author: author.author,
        content: content,
      };
      await axios.post("https://remarks-server.vercel.app/post/send", data);
    } catch (error) {
      alert(error.response.data.message);
    }
    document.getElementById("LoadingBackground").style.display = "none";
    // const scrollPosition = document.documentElement.scrollTop || document.body.scrollTop;
    window.location.reload();
    // document.documentElement.scrollTop = document.body.scrollTop = scrollPosition;
  }

  return (
    <div className="Send">
      <div id="NewPost">
        <img id="NewPostIcon" src={newPostIcon} alt="send" onClick={SendPost}></img>
        <input id="PostContent" type="text" placeholder="New Post" enterKeyHint="send" onKeyUp={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            SendPost();
          }
        }}/>
        <img id="MouseGlowSend" src={glow} alt=""/>
      </div>
      <button id="SendButton"><img id="SendButtonImage" src={sendIcon} alt="send" onClick={SendPost}></img></button>
    </div>
  );
}