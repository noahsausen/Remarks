import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Signup from "./pages/auth/Signup";
import Login from "./pages/auth/Login";
import Landing from "./pages/Landing";
import Home from "./pages/private/Home";
import Profile from "./pages/private/Profile";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>s
      <Routes>
        <Route path="/" element={<App/>}>
          <Route index element={<Landing/>}/>
          <Route path="signup" element={<Signup/>} />
          <Route path="login" element={<Login/>} />
          <Route path="home" element={<Home/>} />
          <Route path="user/:username" element={<Profile/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
