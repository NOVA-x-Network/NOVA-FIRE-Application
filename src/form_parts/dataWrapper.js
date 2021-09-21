import React from "react";
import firebaseApp from "../components/firebaseConfig.js"
import "firebase/firestore"
import "firebase/auth"
import loadingIcon from "../images/loadingIcon.png"
let db = firebaseApp.firestore()
const firebaseAppAuth = firebaseApp.auth();
function getData(formSection, Component) {
    return class extends React.Component {
        constructor(props) {
            super(props)
            this.state = {
                answers: '',
                email: '',
                saved:true,
            }
            this.saveCheck = this.saveCheck.bind(this)
            this.saveHandler = this.saveHandler.bind(this)
            this.changeHandler = this.changeHandler.bind(this)
            this.unmountHandler = this.unmountHandler.bind(this)
        }

        componentDidMount() {
            firebaseAppAuth.onAuthStateChanged((user) => {
                db.collection("submissions").doc(user.email).get()
                    .then((snapshot) => {
                        this.setState({answers:snapshot.data()[formSection], email:user.email})
                    })
            })
        }

        saveCheck(event) {
            return event.returnValue = "Are you sure you want to leave? You have unsaved data."
        }

        saveHandler(values) {
            window.removeEventListener('beforeunload', this.saveCheck)
            let email = this.state.email
            let section = {}
            section[formSection] = values
            db.collection("submissions").doc(email).set(section, { merge: true })
        }

        changeHandler(event, formikHandleChange) {
            let email = this.state.email
            formikHandleChange(event)

            if (this.state.saved) {
                db.collection("submissions").doc(email).set({ applicationStatus: "Incomplete" }, { merge: true })
            }

            this.setState({ saved: false })
            window.addEventListener('beforeunload', this.saveCheck)
            document.getElementById("exitButton").addEventListener('click', this.saveHandler)
        }

        unmountHandler(values) {
            window.removeEventListener('beforeunload', this.saveCheck)

            let email = this.state.email

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
            return (<div style={{display:"flex", alignItems:"center", justifyContent:"center", height:"75vh"}}>
                <img src={loadingIcon} style={{width:"20vw", height:"20vw"}} className="loading"/>
            </div>)
        }
    }
}
export default getData