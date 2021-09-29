import React from "react";
import getFirebase from "../components/firebaseConfig.js"
import loadingIcon from "../images/loadingIcon.png"
import "firebase/firestore"
import "firebase/auth"
let db
let email
function getData(formSection, Component) {
    return class extends React.Component {
        constructor(props) {
            super(props)
            this.state = {
                answers: '',
                saved: true,
            }
            this.saveCheck = this.saveCheck.bind(this)
            this.saveHandler = this.saveHandler.bind(this)
            this.changeHandler = this.changeHandler.bind(this)
            this.unmountHandler = this.unmountHandler.bind(this)
        }

        componentDidMount() {
            const app = import("firebase/app")

            Promise.all([app]).then(([firebase]) => {
                const firebaseApp = getFirebase(firebase)
                const firebaseAppAuth = firebaseApp.default.auth()
                db= firebaseApp.default.firestore()

                firebaseAppAuth.onAuthStateChanged((user) => {
                    db.collection("submissions").doc(user.email).get()
                        .then((snapshot) => {
                            email = user.email
                            this.setState({ answers: snapshot.data()[formSection]})
                        })
                })
            })
        }

        saveCheck(event) {
            return event.returnValue = ""
        }

        saveHandler() {
            window.removeEventListener('beforeunload', this.saveCheck)
            let section = {}
            section[formSection] = this.state.answers
            db.collection("submissions").doc(email).set(section, { merge: true })
        }

        changeHandler(event, formikHandleChange, values) {
            let email = this.state.email
            formikHandleChange(event)

            if (this.state.saved) {
                db.collection("submissions").doc(email).set({ applicationStatus: "Incomplete" }, { merge: true })
            }

            this.setState({ saved: false, answers:values })
            window.addEventListener('beforeunload', this.saveCheck)
            document.getElementById("exitButton").addEventListener('click', this.saveHandler)
        }

        unmountHandler(values) {
            window.removeEventListener('beforeunload', this.saveCheck)

            if (email) {
                let section = {}
                section[formSection] = values
                db.collection("submissions").doc(email).set(section, { merge: true })
            }

            document.getElementById("exitButton").removeEventListener("click", this.saveHandler)
        }

        render() {
            if (this.state.answers) {
                return (
                    <Component answers={this.state.answers}
                        unmountHandler={this.unmountHandler}
                        changeHandler={this.changeHandler}
                    />)
            }
            return (<div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "75vh" }}>
                <img src={loadingIcon} style={{ width: "20vw", height: "20vw" }} className="loading" />
            </div>)
        }
    }
}
export default getData