import withFirebaseAuth from 'react-with-firebase-auth';
import firebase from 'firebase/app';
import 'firebase/auth';
import firebaseConfig from './firebaseConfig';

import './App.css';
import React from 'react';

const firebaseApp = firebase.initializeApp(firebaseConfig);

const firebaseAppAuth = firebaseApp.auth();
const providers = {
  googleProvider: new firebase.auth.GoogleAuthProvider(),
};

class App extends React.Component {
  signInWithUsernameAndPassword = () => {
    firebaseAppAuth
      .signInWithEmailAndPassword(this.state.username, this.state.password)
      .then((user) => {
        this.setState({ message: 'Welcome!' });
      })
      .catch((error) =>
        this.setState({
          message: 'Error signing in with password and username!',
        })
      );
  };

  onChangeHandler = (event) => {
    const { name, value } = event.currentTarget;

    if (name === 'username') {
      this.setState({ username: value });
    } else if (name === 'password') {
      this.setState({ password: value });
    }
  };

  state = {
    message: null,
    username: '',
    password: '',
  };

  render() {
    const { user, signOut, signInWithGoogle } = this.props;

    return (
      <div className="main">
        <header className="App-header">
          {this.state.message !== null && <div>{this.state.message}</div>}
          {user ? <p>Hello, {user.displayName}</p> : <p>Please sign in</p>}
          {user ? (
            <button onClick={signOut}>Sign out</button>
          ) : (
            <div>
              <input
                id="username"
                value={this.state.username}
                type="text"
                name="username"
                placeholder="Username"
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
              <button onClick={this.signInWithUsernameAndPassword}>
                Log in
              </button>
              <p>or</p>
              <button
                onClick={() => {
                  signInWithGoogle();

                  this.setState({ message: null });
                }}
              >
                Sign in with Google
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
})(App);
