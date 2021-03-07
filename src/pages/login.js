import React from "react";
import withFirebaseAuth from "react-with-firebase-auth";
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "../components/firebaseConfig";

const firebaseApp = firebase.initializeApp(firebaseConfig);
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
        });
      })
      .catch((error) =>
        this.setState({
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

  render() {
    const { user, signOut, signInWithGoogle } = this.props;

    return (
      <div className="main">
        <header className="App-header">
          {this.state.message !== null && <div>{this.state.message}</div>}
          {user ? (
            <p>Hello, {user.displayName || this.state.displayName}</p>
          ) : (
            <p>Sign in</p>
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

              <button
                onClick={() => {
                  this.sendPasswordResetEmail(prompt("Email address:"));
                }}
              >
                Forgot password
              </button>
            </div>
          )}
        </header>
      </div>
    );
  }
}

export default withFirebaseAuth({
  providers,
  firebaseAppAuth,
})(Login);
