import React, { useState, useEffect } from 'react';
import { withFormik } from "formik";
import { withStyles, Container } from "@material-ui/core";
import "firebase/firestore"
import "firebase/auth"
import firebaseApp from "../components/firebaseConfig.js"
let db = firebaseApp.firestore()
const firebaseAppAuth = firebaseApp.auth();
class SurveyBody extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            saved: true,
        }
        this.saveCheck = this.saveCheck.bind(this)
    }
    saveCheck(event) {
        if (!this.state.saved) {
            return event.returnValue = "Are you sure you want to leave? You have unsaved data."
        }
    }
    componentWillUnmount() {
        window.removeEventListener('beforeunload', this.saveCheck)
        const { values, email } = this.props
        if (email) {
            db.collection("submissions").doc(email).set({ 'survey':values }, { merge: true })
        }
    }
    componentDidMount() {
        const { values } = this.props

        document.getElementById("exitButton").addEventListener('click', () => {
            this.setState({ saved: true })
            const { values, email } = this.props
            if (email) {
                db.collection("submissions").doc(email).set({ 'survey': values }, { merge: true })
            }
        })

        let checkBoxes = document.querySelectorAll('input[type=checkbox]')

        checkBoxes.forEach((checkBox) => {
            if (values[checkBox.name].includes(checkBox.value)) {
                checkBox.checked=true
            }
        })

        window.addEventListener('beforeunload', this.saveCheck)
    }
    render() {
        const {
            values,
            handleChange,
            touched,
            errors,
            classes
        } = this.props
        return (
            <Container style={{ height: "75vh", overflowY: "scroll", width: "50vw", marginLeft: "-8vw" }}>
                <form className={classes.form} id="4">
                    <h2>Question 1: How'd you hear about the NOVA FIRE Fellowship?</h2>
                    <br />
                    <label htmlFor="instagram">NOVA's instagram page</label>
                    <input
                        type="checkbox"
                        id="instagram"
                        name="surveyQuestion1"
                        onChange={(e) => { handleChange(e); this.setState({saved:false})}}
                        onChange={(e) => { handleChange(e); this.setState({saved:false})}}
                        value="NOVA Instagram"
                    />
                    <br />
                    <label htmlFor="linkedin">NOVA's LinkedIn</label>
                    <input
                        type="checkbox"
                        id="linkedin"
                        name="surveyQuestion1"
                        onChange={(e) => { handleChange(e); this.setState({saved:false})}}
                        value="NOVA LinkedIn"
                    />
                    <br />
                    <label htmlFor="friend">A friend</label>
                    <input
                        type="checkbox"
                        id="friend"
                        name="surveyQuestion1"
                        onChange={(e) => { handleChange(e); this.setState({saved:false})}}
                        value="Friend"
                    />
                    <br />
                    <label htmlFor="website">NOVA's Website</label>
                    <input
                        type="checkbox"
                        id="website"
                        name="surveyQuestion1"
                        onChange={(e) => { handleChange(e); this.setState({saved:false})}}
                        value="NOVA Website"
                    />
                    <br />
                    <label htmlFor="execPost">A post by one of NOVA's executives</label>
                    <input
                        type="checkbox"
                        id="execPost"
                        name="surveyQuestion1"
                        onChange={(e) => { handleChange(e); this.setState({saved:false})}}
                        value="Executive Post"
                    />
                    <br />
                    <label htmlFor="otherInstagram">An instagram page that isn't NOVA's</label>
                    <input
                        type="checkbox"
                        id="otherInstagram"
                        name="surveyQuestion1"
                        onChange={(e) => { handleChange(e); this.setState({saved:false})}}
                        value="Other Org Instagram"
                    />
                    <br />
                    <label htmlFor="other">Other:</label>
                    <input
                        type="text"
                        id="other"
                        name="surveyQuestion1Other"
                        onChange={(e) => { handleChange(e); this.setState({saved:false})}}
                        value={values.surveyQuestion1Other}
                    />
                    <br />
                    {touched.surveyQuestion1 && errors.surveyQuestion1 ? (
                        <div>{errors.surveyQuestion1}</div>
                    ) : null}
                    <h2>Question 2: How'd you hear about the NOVA x Network?</h2>
                    <br />
                    <label htmlFor="instagram">NOVA's instagram page</label>
                    <input
                        type="checkbox"
                        id="instagram2"
                        name="surveyQuestion2"
                        onChange={(e) => { handleChange(e); this.setState({saved:false})}}
                        value="NOVA Instagram"
                    />
                    <br />
                    <label htmlFor="linkedin">NOVA's LinkedIn</label>
                    <input
                        type="checkbox"
                        id="linkedin2"
                        name="surveyQuestion2"
                        onChange={(e) => { handleChange(e); this.setState({saved:false})}}
                        value="NOVA LinkedIn"
                    />
                    <br />
                    <label htmlFor="friend">A friend</label>
                    <input
                        type="checkbox"
                        id="friend2"
                        name="surveyQuestion2"
                        onChange={(e) => { handleChange(e); this.setState({saved:false})}}
                        value="Friend"
                    />
                    <br />
                    <label htmlFor="website">NOVA's Website</label>
                    <input
                        type="checkbox"
                        id="website2"
                        name="surveyQuestion2"
                        onChange={(e) => { handleChange(e); this.setState({saved:false})}}
                        value="NOVA Website"
                    />
                    <br />
                    <label htmlFor="execPost">A post by one of NOVA's executives</label>
                    <input
                        type="checkbox"
                        id="execPost2"
                        name="surveyQuestion2"
                        onChange={(e) => { handleChange(e); this.setState({saved:false})}}
                        value="Executive Post"

                    />
                    <br />
                    <label htmlFor="otherInstagram">An instagram page that isn't NOVA's</label>
                    <input
                        type="checkbox"
                        id="otherInstagram2"
                        name="surveyQuestion2"
                        onChange={(e) => { handleChange(e); this.setState({saved:false})}}
                        value="Other Org Instagram"
                    />
                    <br />
                    <label htmlFor="other">Other:</label>
                    <input
                        type="text"
                        id="other2"
                        name="surveyQuestion2Other"
                        onChange={(e) => { handleChange(e); this.setState({saved:false})}}
                        value={values.surveyQuestion2Other}
                    />
                    <br />
                    {touched.surveyQuestion2 && errors.surveyQuestion2 ? (
                        <div>{errors.surveyQuestion2}</div>
                    ) : null}
                    <h2>Question 3: Anything else you want us to know? (Optional)</h2>
                    <br />
                    <textarea
                        id="surveyQuestion3"
                        name="surveyQuestion3"
                        onChange={(e) => { handleChange(e); this.setState({saved:false})}}
                        value={values.surveyQuestion3}
                        style={{ width: "40vw", height: "200px" }}
                    />
                    <br />
                    {touched.surveyQuestion3 && errors.surveyQuestion3 ? (
                        <div>{errors.surveyQuestion3}</div>
                    ) : null}
                </form>
            </Container>
        )
    }
}
const StyledSurvey = withStyles({
    form: {
        '& *': {
            fontFamily: `poppins`,
        },
        '& label': {
            display: "inline-block",
            width: "250px",
        },
        '& input': {
            display: "inline-block",
        },
        '& input[type=text]': {
            display: "inline-block",
            backgroundColor: "white",
            color: "black",
            border: "2px solid black"
        },
    }
})(SurveyBody)

class Survey extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            answers: { surveyQuestion1: [], surveyQuestion1Other:'', surveyQuestion2: [], surveyQuestion2Other:'', surveyQuestion3: '' }
        }
    }
    componentDidMount() {
        const user = firebaseAppAuth.currentUser
            console.log("hello")
            db.collection("submissions").doc(user.email).get()
                .then((snapshot) => {

                    if (JSON.stringify(snapshot.data().survey) !== '{}') {
                        console.log(snapshot.data())
                        this.setState({ answers: snapshot.data().survey, email:user.email })
                    }
                    else {
                        db.collection("submissions").doc(user.email).set({ 'survey':this.state.answers }, { merge: true })
                        this.setState({email:user.email})
                    }
                })
    }
    render() {
        const SurveyBodyWithFormik = withFormik({
                mapPropsToValues: () => (this.state.answers),
        })(StyledSurvey)
        return (
            <SurveyBodyWithFormik email={this.state.email}>
            </SurveyBodyWithFormik>
            )
    }
}
export default Survey