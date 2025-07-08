import './App.css';
import {Outlet} from "react-router";

document.body.style.background = 'hsl(0, 0%, 5%)';

export default function App() {
  return (
    <div className="App">
      <nav className="NavBar">
        <a href="/"><h1>Remarks</h1></a>
      </nav>
      <Outlet/>
    </div>
  );
}