import '../../src/App.css';

export default function Support() {
  return (
    <div className="Support">
      <h1>Support</h1>
      <p>Due to the limited development time we have, many features have not been implemented yet.
        This is usually because the features require high security and extensive tasks that would have to be automated.</p>
      <p>Despite this, we understand that it may be necessary to make these changes.
        To facilitate this, we can manually make these changes if you contact support.</p>
      <p>Because these changes must be done with proper authorization, and depending on the request,
        we may ask for verification that you own the account you are requesting to make changes to.
        We will likely do this by confirming or verifying the information provided during sign up.</p>
      <h4>If you have any requests, including the following, please contact support:</h4>
      <ul>
        <li>Changing or forgot password</li>
        <li>Changing email or username (changing username may not be possible)</li>
        <li>Deleting an account</li>
        <li>Deleting or editing posts</li>
        <li>Reporting inappropriate and/or disorderly activity</li>
        <li>Suggestions, bug reports, and security vulnerabilities</li>
      </ul>
      <h4>To contact support, please email <a className="WhiteLink" href="mailto:noahsausen@gmail.com">noahsausen@gmail.com</a>.</h4>
    </div>
  );
}