import '../../src/App.css';
import {useEffect} from "react";
import background from "../assets/background.jpg";
import bubble from "../assets/bubble.svg";
import glow from "../assets/glow.png";

export default function Landing() {
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      window.location.replace("/home");
    }

    document.addEventListener("mousemove", (event) => {
      const mouseX = Math.floor(((event.clientX / window.innerWidth) * 100));
      const mouseY = Math.floor(((event.clientY / window.innerHeight) * 100));
      document.getElementById("MouseGlow").style.opacity = "0.05";
      document.getElementById("MouseGlow").style.left = mouseX + "vw";
      document.getElementById("MouseGlow").style.top = mouseY + "vh";
    });
  }, []);

  return (
    <div>
      <div className="LandingBackground" style={{backgroundImage: `url(${background})`,}}></div>
      <img id="MouseGlow" src={glow} alt=""/>
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
      <p className="HelpText"><a className="WhiteLink" href="/support">Support</a>&nbsp;&nbsp;•&nbsp;&nbsp;&copy; 2025 <a href="https://noahsausen.github.io" className="WhiteLink">Noah Sausen</a></p>

    </div>
  );
}