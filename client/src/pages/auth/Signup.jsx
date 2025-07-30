import '../../App.css';
import axios from 'axios';
import Loading from '../../components/Loading';
import {useEffect} from "react";

export default function Signup() {
  useEffect(() => {
    const username = document.getElementById("username");
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    const passwordConfirm = document.getElementById("passwordConfirm");
    const submitButton = document.getElementById("SubmitButton");

    submitButton.disabled = true;

    function onChange() {
      if (username.value.trim() !== "" && email.value.trim() !== "" && password.value.trim() !== "" && passwordConfirm.value.trim() !== "") {
        submitButton.classList.add("ready");
        submitButton.disabled = false;
      } else {
        submitButton.classList.remove("ready");
        submitButton.disabled = true;
      }
    }

    username.addEventListener('input', function() {
      onChange();
    });
    email.addEventListener('input', function() {
      onChange();
    });
    password.addEventListener('input', function() {
      onChange();
    });
    passwordConfirm.addEventListener('input', function() {
      onChange();
    });
  }, []);

  async function sendSignupRq(evt) {
    evt.preventDefault();

    document.getElementById("LoadingBackground").style.display = "flex";

    const data = {
      username: document.getElementById("username").value,
      email: document.getElementById("email").value,
      password: document.getElementById("password").value,
      passwordConfirm: document.getElementById("passwordConfirm").value,
    }

    if (data.password !== data.passwordConfirm) {
      document.getElementById("LoadingBackground").style.display = "none";
      alert("Passwords must match");
    } else if (data.password.length < 5) {
      document.getElementById("LoadingBackground").style.display = "none";
      alert("Password must be at least 5 characters");
    } else if (!(data.email.match(/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i))) {
      document.getElementById("LoadingBackground").style.display = "none";
      alert("Invalid email");
    } else {
      try {
        const res = await axios.post("https://remarks-server.vercel.app/auth/signup", data);
        const token = res.data.token;
        if (token) {
          localStorage.setItem("token", token);
        }
        document.getElementById("LoadingBackground").style.display = "none";
        window.location.replace("/login");
      } catch (error) {
        document.getElementById("LoadingBackground").style.display = "none";
        alert(error.response.data.message);
      }
    }
  }

  return (
    <div className="AuthWindow">
      <h1>Sign Up</h1>
      <div className="AuthFieldsGroup">
      <div className="AuthFields">
        <div><label>Username</label><input type="username" id="username" placeholder="" required/></div>
        <hr/>
        <div><label>Email</label><input type="email" id="email" placeholder="" required/></div>
      </div>
      <div className="AuthFields">
        <div><label>Password</label><input type="password" id="password" placeholder="" required/></div>
        <hr/>
        <div><label>Confirm</label><input type="password" id="passwordConfirm" placeholder="" required/></div>
      </div>
      </div>
      <button id="SubmitButton" onClick={sendSignupRq}>Sign Up</button>
      <p>Already have an account? <a className="WhiteLink" href="/login">Log In</a></p>
      <Loading/>
    </div>
  );
}