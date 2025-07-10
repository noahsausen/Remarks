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
  })

  function LogoutUser() {
    localStorage.removeItem("token");
    window.location.replace("/");
    window.location.reload();
  }

  return (
    <div className="App">
      <nav className="NavBar">
        <a href="/"><h1>Remarks</h1></a>
        <div className="NavBarFiller"></div>
        <button id="Logout" onClick={LogoutUser}>Log Out</button>
      </nav>
      <Outlet/>
    </div>
  );
}