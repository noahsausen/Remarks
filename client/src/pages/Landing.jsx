import '../../src/App.css';
import {useEffect} from "react";

export default function Landing() {
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      window.location.replace("/home");
    }
  }, []);

  return (
    <div className="Landing">
      <h1>Welcome to Remarks.</h1>
      <h2><a className="WhiteLink" href="/signup">Sign Up</a> or <a className="WhiteLink" href="/login">Log In</a>
        <br/>to continue.</h2>
      <p className="HelpText">Need help or have feedback?<br/>Contact <a className="WhiteLink" href="mailto:noahsausen@gmail.com" target="_blank" rel="noopener noreferrer">noahsausen@gmail.com</a>.</p>
    </div>
  );
}