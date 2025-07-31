import '../../src/App.css';
import {useEffect} from "react";
import background from "../assets/background.jpg";
import bubble from "../assets/bubble.svg";

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
        <div className="Lockup">
          <img src={bubble} alt="" />
          <h1>Remarks</h1>
          <p>Social media simplified</p>
        </div>
        <div>
          <a className="LandingButton" href="/login">Log In</a>
          <a className="LandingButton" href="/signup">Sign Up</a>
        </div>
        <p></p>
        <p></p>
      </div>
      <p className="HelpText"><a className="WhiteLink" href="/support">Support</a></p>
    </div>
  );
}