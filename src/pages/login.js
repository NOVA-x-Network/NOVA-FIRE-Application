
import React from "react";
import withFirebaseAuth from "react-with-firebase-auth";
import "firebase/auth";
import firebase from "firebase/app";
import logo from '../images/novaLogo.png';
import firebaseApp from "../components/firebaseConfig.js"
const firebaseAppAuth = firebaseApp.auth();

const providers = {
  googleProvider: new firebase.auth.GoogleAuthProvider(),
};

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: null,
      email: "",
      password: "",
        displayName: "",
      gotAuthStatus:false,
    };

    this.sendPasswordResetEmail = this.sendPasswordResetEmail.bind(this);
  }

  signInWithEmailAndPassword = () => {
    firebaseAppAuth
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then((user) => {
        this.setState({
          message: "Welcome!",
            displayName: user.user.displayName,
          gotAuthStatus:true
        });
      })
      .catch((error) =>
          this.setState({
            gotAuthStatus:true,
          message: "Error signing in with password and email!",
        })
      );
  };

  sendPasswordResetEmail = (emailAddress) => {
    firebaseAppAuth
      .sendPasswordResetEmail(emailAddress)
      .then(function () {
        alert("Check your email for a link to reset your password.");
      })
      .catch(function (error) {
        alert("Unable to send a password reset link: " + error);
      });
  };

  onChangeHandler = (event) => {
    const { name, value } = event.currentTarget;

    if (name === "email") {
      this.setState({ email: value });
    } else if (name === "password") {
      this.setState({ password: value });
    }
  };
    componentDidUpdate() {
        if (!this.state.gotAuthStatus) {
            this.setState({ gotAuthStatus: true })
        }
    }
  render() {
      const { user, signOut, signInWithGoogle } = this.props;
      if (!this.state.gotAuthStatus) {
          return (<div></div>)
      }
      if (user) {
          window.location = "./form"
          return ((<div></div>))
      }
    return (
      <div className="main">
      <div className="loginLeft">
        <center><img src={logo}/></center>
        <p>
        NOVA FIRE (Fellowship in Innovation, Research, and Education) is a 5 month-long intensive fellowship program for high school students. Our fellows will participate in primary and secondary interdisciplinary research in 1 of our 4 topics. They will be given the opportunity to either develop a hands-on project, or a written report for publication, based on their findings and analysis. Students will have a chance to work in teams of 5-6. NOVA will be accepting a maximum of 24 students into our program. A full timeline, list of topics, and speakers can be found at <br/><br/>
          <b><a href="https://novaxnetwork.com/fellowship/">https://novaxnetwork.com/fellowship/. </a></b>
        </p>
      </div>
      <div className="loginRight"><center>
        <header className="App-header">
          {this.state.message !== null && <div>{this.state.message}</div>}
          {user ? (
            <p>Hello, {user.displayName || this.state.displayName}</p>
          ) : (
            <h1>Sign in</h1>
          )}
          {user ? (
            <button
              onClick={() => {
                signOut();
                this.setState({ message: null });
              }}
            >
              Sign out
            </button>
          ) : (
            <div>
              <input
                id="email"
                value={this.state.email}
                type="text"
                name="email"
                placeholder="Email"
                onChange={(event) => this.onChangeHandler(event)}
              />
              <input
                id="password"
                value={this.state.password}
                type="password"
                name="password"
                placeholder="Password"
                onChange={(event) => this.onChangeHandler(event)}
              />
              <button onClick={this.signInWithEmailAndPassword}>Log in</button>
              <p>or</p>
              <button
                onClick={() => {
                  signInWithGoogle();

                  this.setState({ message: null });
                }}
              >
                Sign in with Google
              </button>

                  <button style={{ marginTop:"10px"}}
                onClick={() => {
                  this.sendPasswordResetEmail(prompt("Email address:"));
                }}
              >
                Forgot password
              </button>
              <p>Don't have an account yet? <a href="signup"><b><u>Sign up.</u></b></a></p>
            </div>
          )}
        </header>
      </center></div>
      </div>
    );
  }
}

export default withFirebaseAuth({
  providers,
  firebaseAppAuth,
})(Login);
