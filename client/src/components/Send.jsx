import '../App.css';
import sendIcon from '../assets/send.svg';
import {useEffect} from "react";
import axios from "axios";

export default function Send(author) {
  async function SendPost() {
    try {
      const content = document.getElementById('PostContent').value;
      document.getElementById('PostContent').value = "";
      const data = {
        author: author.author,
        content: content,
      };
      console.log(data);
      await axios.post("http://localhost:24/post/send", data);
    } catch (error) {
      alert(error);
    }
  }

  return (
    <div className="Send">
      <input id="PostContent" type="text" placeholder="What's on your mind today..."/>
      <button><img src={sendIcon} alt="send" onClick={SendPost}></img></button>
    </div>
  );
}