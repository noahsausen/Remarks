import '../App.css';
import sendIcon from '../assets/send.svg';
import axios from "axios";

export default function Send(author) {
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
      <input id="PostContent" type="text" placeholder="What's on your mind today..." enterKeyHint="send" onKeyUp={(e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          SendPost();
        }
      }}/>
      <button><img src={sendIcon} alt="send" onClick={SendPost}></img></button>
    </div>
  );
}