import '../../../src/App.css';

export default function Signup() {
  return (
    <div className="SignUp">
      <h1>Sign Up</h1>
      <RegisterForm/>
      <p>Already have an account? <a className="WhiteLink" href="/login">Log In</a></p>
    </div>
  );
}

function RegisterForm() {
  return (
      <form className="AuthWindow">
        <label>username</label>
        <input type="username" name="username" placeholder="" required/>
        <label>email</label>
        <input type="email" name="email" placeholder="" required/>
        <label>password</label>
        <input type="password" name="password" placeholder="" required/>
        <label>confirm password</label>
        <input type="password" name="password-confirm" placeholder="" required/>
        <button type="submit">Sign Up</button>
      </form>
  );
}