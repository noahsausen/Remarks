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
        <div>
          <a className="LandingButton" href="/login">Log In</a>
          <a className="LandingButton" href="/signup">Sign Up</a>
        </div>
      </div>
      <p className="HelpText"><a className="WhiteLink" href="/support">Support</a></p>
    </div>
  );
}