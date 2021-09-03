import React from 'react';
import { withFormik } from "formik";
import { makeStyles, Container } from "@material-ui/core";
import "firebase/firestore"
import "firebase/auth"
import firebaseApp from "../components/firebaseConfig.js"
let db = firebaseApp.firestore()
const firebaseAppAuth = firebaseApp.auth();
const SurveyBody = props => {
    console.log(props)
    const {
        values,
        handleChange,
        handleSubmit,
        touched,
        errors,
        saveOnChange
    } = props
    console.log(values)
    const formStyle = makeStyles(() => ({
        form: {
            '& *': {
                fontFamily: `poppins`,
            },
            '& label': {
                display: "inline-block",
                width:"250px",
            },
            '& input': {
                display: "inline-block",
            },
            '& input[type=text]': {
                display: "inline-block",
                backgroundColor: "white",
                color: "black",
                border:"2px solid black"
            },
        }
    }))
    const classes = formStyle();
    function isFieldChecked(question, value) {
        console.log(values)
        try {
            console.log(values[`surveyQuestion${question}`].includes(value))
            if (values[`surveyQuestion${question}`].includes(value)) {
                return true
            }
        }
        catch {
            ;
        }
    }
    return (
        <Container style={{ height: "75vh", overflowY:"scroll", width:"50vw", marginLeft:"-8vw"}}>
            <form onSubmit={handleSubmit} className={classes.form} id="4">
                <h2>Question 1: How'd you hear about the NOVA FIRE Fellowship?</h2>
                <br />
                <label htmlFor="instagram">NOVA's instagram page</label>
                <input
                    type="checkbox"
                    id="instagram"
                    name="surveyQuestion1"
                    onChange={(e)=>{handleChange(e); saveOnChange(e, values)}}
                    value="NOVA Instagram"
                    defaultChecked={isFieldChecked(1, "NOVA Instagram")}
                />
                <br />
                <label htmlFor="linkedin">NOVA's LinkedIn</label>
                <input
                    type="checkbox"
                    id="linkedin"
                    name="surveyQuestion1"
                    onChange={(e)=>{handleChange(e); saveOnChange(e, values)}}
                    value="NOVA LinkedIn"
                    defaultChecked={isFieldChecked(1, "NOVA LinkedIn")}
                />
                <br />
                <label htmlFor="friend">A friend</label>
                <input
                    type="checkbox"
                    id="friend"
                    name="surveyQuestion1"
                    onChange={(e)=>{handleChange(e); saveOnChange(e, values)}}
                    value="Friend"
                    defaultChecked={isFieldChecked(1, "Friend")}
                />
                <br />
                <label htmlFor="website">NOVA's Website</label>
                <input
                    type="checkbox"
                    id="website"
                    name="surveyQuestion1"
                    onChange={(e)=>{handleChange(e); saveOnChange(e, values)}}
                    value="NOVA Website"
                    defaultChecked={isFieldChecked(1, "NOVA Website")}
                />
                <br />
                <label htmlFor="execPost">A post by one of NOVA's executives</label>
                <input
                    type="checkbox"
                    id="execPost"
                    name="surveyQuestion1"
                    onChange={(e)=>{handleChange(e); saveOnChange(e, values)}}
                    value="Executive Post"
                    defaultChecked={isFieldChecked(1, "Executive Post")}
                />
                <br />
                <label htmlFor="otherInstagram">An instagram page that isn't NOVA's</label>
                <input
                    type="checkbox"
                    id="otherInstagram"
                    name="surveyQuestion1"
                    onChange={(e)=>{handleChange(e); saveOnChange(e, values)}}
                    value="Other Org Instagram"
                    defaultChecked={isFieldChecked(1, "Other Org Instagram")}
                />
                <br />
                <label htmlFor="other">Other:</label>
                <input
                    type="text"
                    id="other"
                    name="surveyQuestion1Other"
                    onChange={(e) => { handleChange(e); saveOnChange(e, values) }}
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
                    onChange={(e)=>{handleChange(e); saveOnChange(e, values)}}
                    value="NOVA Instagram"
                    defaultChecked={isFieldChecked(2, "NOVA Instagram")}
                />
                <br />
                <label htmlFor="linkedin">NOVA's LinkedIn</label>
                <input
                    type="checkbox"
                    id="linkedin2"
                    name="surveyQuestion2"
                    onChange={(e)=>{handleChange(e); saveOnChange(e, values)}}
                    value="NOVA LinkedIn"
                    defaultChecked={isFieldChecked(2, "NOVA LinkedIn")}
                />
                <br />
                <label htmlFor="friend">A friend</label>
                <input
                    type="checkbox"
                    id="friend2"
                    name="surveyQuestion2"
                    onChange={(e)=>{handleChange(e); saveOnChange(e, values)}}
                    value="Friend"
                    defaultChecked={isFieldChecked(2, "Friend")}
                />
                <br />
                <label htmlFor="website">NOVA's Website</label>
                <input
                    type="checkbox"
                    id="website2"
                    name="surveyQuestion2"
                    onChange={(e)=>{handleChange(e); saveOnChange(e, values)}}
                    value="NOVA Website"
                    defaultChecked={isFieldChecked(2, "NOVA Website")} onChange={(e)=>{handleChange(e); saveOnChange(e, values)}}
                />
                <br />
                <label htmlFor="execPost">A post by one of NOVA's executives</label>
                <input
                    type="checkbox"
                    id="execPost2"
                    name="surveyQuestion2"
                    onChange={(e)=>{handleChange(e); saveOnChange(e, values)}}
                    value="Executive Post"
                    defaultChecked={isFieldChecked(2, "Executive Post")}

                />
                <br />
                <label htmlFor="otherInstagram">An instagram page that isn't NOVA's</label>
                <input
                    type="checkbox"
                    id="otherInstagram2"
                    name="surveyQuestion2"
                    onChange={(e)=>{handleChange(e); saveOnChange(e, values)}}
                    value="Other Org Instagram"
                    defaultChecked={isFieldChecked(2, "Other Org Instagram")}
                />
                <br />
                <label htmlFor="other">Other:</label>
                <input
                    type="text"
                    id="other2"
                    name="surveyQuestion2Other"
                    onChange={(e) => { handleChange(e); saveOnChange(e, values) }}
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
                    onChange={(e)=>{handleChange(e); saveOnChange(e, values)}}
                    value={values.surveyQuestion3}
                    style={{width:"40vw", height:"200px"}}
                />
                <br />
                {touched.surveyQuestion3 && errors.surveyQuestion3 ? (
                    <div>{errors.surveyQuestion3}</div>
                ) : null}
            </form>
        </Container>
    )
}
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

                    //This checks if the user is moving to the survey page for the first time or not. 
                    //If it is, it defines the JSON attributes for the form fields. If you don't do this
                    //it breaks because the code (saveOnChange) that saves the data as the user inputs their responses 
                    //is supposed to push the responses into an array and throws an error if there is no array and it is undefined.

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
        })(SurveyBody)
        return (
            <SurveyBodyWithFormik saveOnChange={(event, responses) => {
                console.log("changed")
                if (event.target.id != "other" && event.target.id != "other2" && event.target.id!="surveyQuestion3") {
                    let checked = event.target.checked
                    if (checked) {
                        responses[event.target.name].push(event.target.value)
                    }
                    else {
                        let index = responses[event.target.name].indexOf(event.target.value)
                        responses[event.target.name].splice(index, 1)
                    }
                }
                else {
                    responses[event.target.name] = event.target.value
                }
                db.collection("submissions").doc(this.state.email).set({survey:responses}, { merge: true })
            }}>
            </SurveyBodyWithFormik>
            )
    }
}
export default Survey