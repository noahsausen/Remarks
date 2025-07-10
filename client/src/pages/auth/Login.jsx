import '../../App.css';
import axios from 'axios';
import Loading from '../../components/Loading';

export default function Login() {
  return (
    <div className="LogIn">
      <h1>Log In</h1>
      <LoginForm/>
      <p>Don't have an account? <a className="WhiteLink" href="/signup">Sign Up</a></p>
      <Loading/>
    </div>
  );
}

function LoginForm() {
  async function sendLoginRq(evt) {
    evt.preventDefault();

    document.getElementById("LoadingBackground").style.display = "flex";

    const form = evt.target;
    const formData = new FormData(form);

    const data = Object.fromEntries(formData.entries());

    try {
      const res= await axios.post("https://remarks-server-fuju.onrender.com/auth/login", data);
      document.getElementById("LoadingBackground").style.display = "none";
      // alert("Logged in successfully!");
      const token = res.data.token;
      if (token) {
        localStorage.setItem("token", token);
      }
      window.location.replace("/home");
    } catch (error) {
      document.getElementById("LoadingBackground").style.display = "none";
      alert(error);
    }
  }

  return (
      <form className="AuthWindow" onSubmit={sendLoginRq}>
        <label>username</label>
        <input type="username" name="username" placeholder="" required/>
        <label>password</label>
        <input type="password" name="password" placeholder="" required/>
        <button type="submit">Log In</button>
      </form>
  );
}