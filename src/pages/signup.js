import React from "react";
import logo from '../images/novaLogo.png';
import getFirebase from "../components/firebaseConfig";
import "firebase/auth"
class Signup extends React.Component {
    signUpWithEmailAndPassword = () => {
        this.state.firebaseAppAuth
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

        if (name === "email") {
            this.setState({ email: value });
        } else if (name === "password") {
            this.setState({ password: value });
        }
    };

    state = {
        message: null,
        email: "",
        password: "",
        user: null,
        gotAuthStatus: false,
        user: '',
        firebaseAppAuth: {},
        provider: {}
    };
    componentDidMount() {
        const app = import("firebase/app")
        Promise.all([app]).then(([firebase]) => {
            const firebaseApp = getFirebase(firebase)

            const firebaseAppAuth = firebaseApp.default.auth();

            const provider = new firebase.default.auth.GoogleAuthProvider()

            firebaseAppAuth.onAuthStateChanged((user) => {
                this.setState({ user: user, firebaseAppAuth: firebaseAppAuth, provider: provider, gotAuthStatus: true })
            })
        })
    }
    render() {

        if (!this.state.gotAuthStatus) {
            return (<div></div>)
        }
        if (this.state.user) {
            window.location = "/form"
            return (<div></div>)
        }
        return (
            <div className="main">
                {this.state.user ? (
                    <p>Welcome {this.state.user.displayName}</p>
                ) : (
                    <>
                        <div className="loginLeft">
                            <center><img src={logo} /></center>
                            <p>
                                NOVA FIRE (Fellowship in Innovation, Research, and Education) is a 5 month-long intensive fellowship program for high school students. Our fellows will participate in primary and secondary interdisciplinary research in 1 of our 4 topics. They will be given the opportunity to either develop a hands-on project, or a written report for publication, based on their findings and analysis. Students will have a chance to work in teams of 5-6. NOVA will be accepting a maximum of 24 students into our program. A full timeline, list of topics, and speakers can be found at <br /><br />
                                <b><a href="https://novaxnetwork.com/fellowship/">https://novaxnetwork.com/fellowship/. </a></b>
                            </p>
                        </div>
                        <div className="loginRight"><center>
                            <h1>Create Account</h1>
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
                                    this.state.firebaseAppAuth.signInWithPopup(this.state.provider);
                                    this.setState({ user: true });
                                }}
                            >
                                Sign up with Google
                            </button>
                            <p>Already have an account? <a href="/login"><b><u>Sign in. </u></b></a></p></center>
                        </div>
                    </>
                )}
            </div>
        );
    }
}

export default Signup;
