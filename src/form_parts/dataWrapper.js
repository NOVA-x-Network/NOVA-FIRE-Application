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
                email:''
            }
        }

        componentDidMount() {
            firebaseAppAuth.onAuthStateChanged((user) => {
                db.collection("submissions").doc(user.email).get()
                    .then((snapshot) => {
                        this.setState({answers:snapshot.data()[formSection], email:user.email})
                    })
            })
        }

        render() {
            if (this.state.answers) {
                return (
                    <Component answers={this.state.answers} email={this.state.email} />)
            }
            return (<div style={{display:"flex", alignItems:"center", justifyContent:"center", height:"75vh"}}>
                <img src={loadingIcon} width="200px" height="200px" className="loading"/>
            </div>)
        }
    }
}
export default getData