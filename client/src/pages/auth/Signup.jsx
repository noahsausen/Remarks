import '../../App.css';
import axios from 'axios';
import Loading from '../../components/Loading';

export default function Signup() {
  return (
    <div className="SignUp">
      <h1>Sign Up</h1>
      <SignupForm/>
      <p>Already have an account? <a className="WhiteLink" href="/login">Log In</a></p>
      <Loading/>
    </div>
  );
}

function SignupForm() {
  async function sendSignupRq(evt) {
    evt.preventDefault();

    document.getElementById("LoadingBackground").style.display = "flex";

    const form = evt.target;
    const formData = new FormData(form);

    const data = Object.fromEntries(formData.entries());

    if (data.password !== data.passwordConfirm) {
      alert("Passwords must match");
    } else if (data.password.length < 5) {
      alert("Password must be at least 5 characters");
    } else {
      try {
        await axios.post("http://localhost:24/auth/signup", data);
        document.getElementById("LoadingBackground").style.display = "none";
        alert("User created successfully!");
        // Auth and go to home
      } catch (error) {
        document.getElementById("LoadingBackground").style.display = "none";
        alert(error);
      }
    }
  }

  return (
      <form className="AuthWindow" onSubmit={sendSignupRq}>
        <label>username</label>
        <input type="username" name="username" placeholder="" required/>
        <label>email</label>
        <input type="email" name="email" placeholder="" required/>
        <label>password</label>
        <input type="password" name="password" placeholder="" required/>
        <label>confirm password</label>
        <input type="password" name="passwordConfirm" placeholder="" required/>
        <button type="submit">Sign Up</button>
      </form>
  );
}