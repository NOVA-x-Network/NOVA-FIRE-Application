import React from 'react';
import withFirebaseAuth from 'react-with-firebase-auth';
import firebase from 'firebase/app';
import 'firebase/auth';
import firebaseConfig from './firebaseConfig';

var firebaseApp;

if (!firebase.apps.length) {
  firebaseApp = firebase.initializeApp(firebaseConfig);
} else {
  firebaseApp = firebase.app();
}

const firebaseAppAuth = firebaseApp.auth();

const providers = {
  googleProvider: new firebase.auth.GoogleAuthProvider(),
};

class Signup extends React.Component {
  signUpWithEmailAndPassword = () => {
    firebaseAppAuth
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then((userCredential) => {
        this.setState({ user: userCredential.user });
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
      });
  };

  onChangeHandler = (event) => {
    const { name, value } = event.currentTarget;

    if (name === 'email') {
      this.setState({ email: value });
    } else if (name === 'password') {
      this.setState({ password: value });
    }
  };

  state = {
    message: null,
    email: '',
    password: '',
    user: null,
  };

  render() {
    const { user, signOut, signInWithGoogle } = this.props;

    return (
      <div className="main">
        {this.state.user ? (
          <p>Welcome {this.state.user.displayName}</p>
        ) : (
          <div>
            <p>Sign up</p>

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
            <button onClick={this.signUpWithEmailAndPassword}>Sign up</button>

            <p>or</p>

            <button
              onClick={() => {
                signInWithGoogle();
                this.setState({ user: true });
              }}
            >
              Sign up with Google
            </button>
          </div>
        )}
      </div>
    );
  }
}

export default withFirebaseAuth({
  providers,
  firebaseAppAuth,
})(Signup);
