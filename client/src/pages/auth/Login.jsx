import '../../App.css';
import axios from 'axios';
import Loading from '../../components/Loading';
import {useEffect} from "react";

export default function Login() {
  useEffect(() => {
    const username = document.getElementById("username");
    const password = document.getElementById("password");
    const submitButton = document.getElementById("SubmitButton");

    submitButton.disabled = true;

    username.addEventListener('input', function() {
      if (username.value.trim() !== '' && password.value.trim() !== '') {
        submitButton.classList.add("ready");
        submitButton.disabled = false;
      } else {
        submitButton.classList.remove("ready");
        submitButton.disabled = true;
      }
    });

    password.addEventListener('input', function() {
      if (username.value.trim() !== '' && password.value.trim() !== '') {
        submitButton.classList.add("ready");
        submitButton.disabled = false;
      } else {
        submitButton.classList.remove("ready");
        submitButton.disabled = true;
      }
    });
  }, []);

  async function sendLoginRq(evt) {
    alert("sendLoginRq Triggered")
    evt.preventDefault();
    alert("sendLoginRq 2")
    document.getElementById("LoadingBackground").style.display = "flex";

    const data = {
      username: document.getElementById("username").value,
      password: document.getElementById("password").value,
    }

    try {
      const res= await axios.post("https://remarks-server.vercel.app/auth/login", data);
      // alert("Logged in successfully!");
      const token = res.data.token;
      if (token) {
        localStorage.setItem("token", token);
      }
      document.getElementById("LoadingBackground").style.display = "none";
      window.location.replace("/home");
    } catch (error) {
      document.getElementById("LoadingBackground").style.display = "none";
      alert(error.response.data.message);
    }
  }

  return (
    <div className="AuthWindow">
      <h1>Log In</h1>
      <div className="AuthFields">
        <div><label>Username</label><input type="username" id="username" placeholder="" onKeyUp={event => {
          if (event.key === "Enter") {
            document.getElementById("password").focus();
          }
        }} enterKeyHint="next" required/></div>
        <hr/>
        <div><label>Password</label><input type="password" id="password" placeholder="" onKeyUp={event => {
          if (document.getElementById("SubmitButton").disabled === false && event.key === "Enter") {
            sendLoginRq();
          }
        }} enterKeyHint="go" required/></div>
      </div>
      <button id="SubmitButton" onClick={sendLoginRq}>Log In</button>
      <p>Don't have an account? <a className="WhiteLink" href="/signup">Sign Up</a></p>
      <Loading/>
    </div>
  );
}