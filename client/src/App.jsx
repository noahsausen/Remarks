import './App.css';
import {Outlet} from "react-router";
import {useEffect} from "react";

export default function App() {
  useEffect(() => {
    document.documentElement.scrollTop = document.body.scrollTop = 0;
    const token = localStorage.getItem("token");
    if (token) {
      document.getElementById("Logout").style.display = "block";
    }

    window.addEventListener('scroll', function() {
      const myElement = document.getElementById('NavBarBackdrop');
      if (window.scrollY < 15) {
        myElement.classList.remove('scrolled');
      } else {
        myElement.classList.add('scrolled');
      }
    });
  }, []);

  function LogoutUser() {
    localStorage.removeItem("token");
    window.location.replace("/");
    window.location.reload();
  }

  return (
    <div className="App">
      <div id="NavBarBackdrop"></div>
      <nav id="NavBar">
        <h1><a href="/">Remarks</a></h1>
        <button id="Logout" onClick={LogoutUser}>Log Out</button>
      </nav>
      <Outlet/>
    </div>
  );
}