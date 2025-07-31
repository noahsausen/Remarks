import '../../src/App.css';
import {useEffect} from "react";
import background from "../assets/background.jpg";

export default function Landing() {
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      window.location.replace("/home");
    }
  }, []);

  return (
    <div>
      <div className="LandingBackground" style={{backgroundImage: `url(${background})`,}}></div>
      <div className="Landing">
        <div>
          <h1>Welcome to Remarks</h1>
          <p>The future of social media is here.</p>
        </div>
        <span>
          <a className="LandingButton" href="/login">Log In</a>
          <a className="LandingButton" href="/signup">Sign Up</a>
        </span>
        <p className="HelpText">Need help or have feedback?<br/>Contact <a className="WhiteLink" href="mailto:noahsausen@gmail.com" target="_blank" rel="noopener noreferrer">noahsausen@gmail.com</a>.</p>
      </div>
    </div>
  );
}