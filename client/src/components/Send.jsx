import '../App.css';
import sendIcon from '../assets/send.svg';
import newPostIcon from '../assets/post.svg';
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
  }, []);

  async function SendPost() {
    document.getElementById("LoadingBackground").style.display = "flex";
    try {
      const content = document.getElementById('PostContent').value;
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
        <input id="PostContent" type="text" placeholder="New Post" autoComplete="off" enterKeyHint="send" onKeyUp={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            SendPost();
          }
        }}/>
      </div>
      <button id="SendButton"><img id="SendButtonImage" src={sendIcon} alt="send" onClick={SendPost}></img></button>
    </div>
  );
}