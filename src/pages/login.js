import React from "react";
import getFirebase from "../components/firebaseConfig.js"
import logo from '../images/novaLogo.png';
import "firebase/auth"
class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            message: null,
            email: "",
            password: "",
            displayName: "",
            gotAuthStatus: false,
            user: '',
            firebaseAppAuth: {},
            provider: {}
        };

        this.sendPasswordResetEmail = this.sendPasswordResetEmail.bind(this);
    }

    signInWithEmailAndPassword = () => {
        this.state.firebaseAppAuth
            .signInWithEmailAndPassword(this.state.email, this.state.password)
            .then((user) => {
                this.setState({
                    message: "Welcome!",
                    displayName: user.user.displayName,
                    gotAuthStatus: true
                });
            })
            .catch((error) =>
                this.setState({
                    gotAuthStatus: true,
                    message: "Error signing in with password and email!",
                })
            );
    };

    sendPasswordResetEmail = (emailAddress) => {
        this.state.firebaseAppAuth
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
            return ((<div></div>))
        }
        return (
            <div className="main">
                <div className="loginLeft">
                    <center><img src={logo} /></center>
                    <p>
                        NOVA FIRE (Fellowship in Innovation, Research, and Education) is a 5 month-long intensive fellowship program for high school students. Our fellows will participate in primary and secondary interdisciplinary research in 1 of our 4 topics. They will be given the opportunity to either develop a hands-on project, or a written report for publication, based on their findings and analysis. Students will have a chance to work in teams of 5-6. NOVA will be accepting a maximum of 24 students into our program. A full timeline, list of topics, and speakers can be found at <br /><br />
                        <b><a href="https://novaxnetwork.com/fellowship/">https://novaxnetwork.com/fellowship/. </a></b>
                    </p>
                </div>
                <div className="loginRight"><center>
                    <header className="App-header">
                        {this.state.message !== null && <div>{this.state.message}</div>}
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
                                    this.state.firebaseAppAuth.signInWithPopup(this.state.provider);

                                    this.setState({ message: null });
                                }}
                            >
                                Sign in with Google
                            </button>

                            <button style={{ marginTop: "10px" }}
                                onClick={() => {
                                    this.sendPasswordResetEmail(prompt("Email address:"));
                                }}
                            >
                                Forgot password
                            </button>
                            <p>Don't have an account yet? <a href="/signup"><b><u>Sign up.</u></b></a></p>
                        </div>
                    </header>
                </center></div>
            </div>
        );
    }
}

export default Login;
