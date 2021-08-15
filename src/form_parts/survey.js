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
        errors
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
                    onChange={handleChange}
                    value="NOVA Instagram"
                    defaultChecked={isFieldChecked(1, "NOVA Instagram")}
                />
                <br />
                <label htmlFor="linkedin">NOVA's LinkedIn</label>
                <input
                    type="checkbox"
                    id="linkedin"
                    name="surveyQuestion1"
                    onChange={handleChange}
                    value="NOVA LinkedIn"
                    defaultChecked={isFieldChecked(1, "NOVA LinkedIn")}
                />
                <br />
                <label htmlFor="friend">A friend</label>
                <input
                    type="checkbox"
                    id="friend"
                    name="surveyQuestion1"
                    onChange={handleChange}
                    value="Friend"
                    defaultChecked={isFieldChecked(1, "Friend")}
                />
                <br />
                <label htmlFor="website">NOVA's Website</label>
                <input
                    type="checkbox"
                    id="website"
                    name="surveyQuestion1"
                    onChange={handleChange}
                    value="NOVA Website"
                    defaultChecked={isFieldChecked(1, "NOVA Website")}
                />
                <br />
                <label htmlFor="execPost">A post by one of NOVA's executives</label>
                <input
                    type="checkbox"
                    id="execPost"
                    name="surveyQuestion1"
                    onChange={handleChange}
                    value="Executive Post"
                    defaultChecked={isFieldChecked(1, "Executive Post")}
                />
                <br />
                <label htmlFor="otherInstagram">An instagram page that isn't NOVA's</label>
                <input
                    type="checkbox"
                    id="otherInstagram"
                    name="surveyQuestion1"
                    onChange={handleChange}
                    value="Other Org Instagram"
                    defaultChecked={isFieldChecked(1, "Other Org Instagram")}
                />
                <br />
                <label htmlFor="other">Other:</label>
                <input
                    type="text"
                    id="other"
                    name="surveyQuestion1"
                    onChange={handleChange}
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
                    onChange={handleChange}
                    value="NOVA Instagram"
                    defaultChecked={isFieldChecked(2, "NOVA Instagram")}
                />
                <br />
                <label htmlFor="linkedin">NOVA's LinkedIn</label>
                <input
                    type="checkbox"
                    id="linkedin2"
                    name="surveyQuestion2"
                    onChange={handleChange}
                    value="NOVA LinkedIn"
                    defaultChecked={isFieldChecked(2, "NOVA LinkedIn")}
                />
                <br />
                <label htmlFor="friend">A friend</label>
                <input
                    type="checkbox"
                    id="friend2"
                    name="surveyQuestion2"
                    onChange={handleChange}
                    value="Friend"
                    defaultChecked={isFieldChecked(2, "Friend")}
                />
                <br />
                <label htmlFor="website">NOVA's Website</label>
                <input
                    type="checkbox"
                    id="website2"
                    name="surveyQuestion2"
                    onChange={handleChange}
                    value="NOVA Website"
                    defaultChecked={isFieldChecked(2, "NOVA Website")}
                />
                <br />
                <label htmlFor="execPost">A post by one of NOVA's executives</label>
                <input
                    type="checkbox"
                    id="execPost2"
                    name="surveyQuestion2"
                    onChange={handleChange}
                    value="Executive Post"
                    defaultChecked={isFieldChecked(2, "Executive Post")}

                />
                <br />
                <label htmlFor="otherInstagram">An instagram page that isn't NOVA's</label>
                <input
                    type="checkbox"
                    id="otherInstagram2"
                    name="surveyQuestion2"
                    onChange={handleChange}
                    value="Other Org Instagram"
                    defaultChecked={isFieldChecked(2, "Other Org Instagram")}
                />
                <br />
                <label htmlFor="other">Other:</label>
                <input
                    type="text"
                    id="other2"
                    name="surveyQuestion2"
                    onChange={handleChange}
                />
                <br />
                {touched.surveyQuestion2 && errors.surveyQuestion2 ? (
                    <div>{errors.surveyQuestion2}</div>
                ) : null}
                <h2>Question 3: Anything else you want us to know?</h2>
                <br />
                <textarea
                    id="surveyQuestion3"
                    name="surveyQuestion3"
                    onChange={handleChange}
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
        const user = firebaseAppAuth.currentUser
        console.log(user.email)
        this.state = {
            email: user.email,
            answers: { surveyQuestion1: [], surveyQuestion2: [], surveyQuestion3: '' }
        }
        if (user) {
            console.log("hello")
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/firebase.User
            db.collection("submissions").doc(user.email).get()
                .then((snapshot) => {
                    if (typeof snapshot.data() !== 'undefined') {
                        if (typeof snapshot.data().surveyQuestion1 !== 'undefined' || typeof snapshot.data().surveyQuestion2 !== 'undefined' || typeof snapshot.data().surveyQuestion3 !== 'undefined') {
                            console.log(snapshot.data())
                            this.setState({answers:snapshot.data()})
                        }
                    }
                })
            // ...
        }
    }
    render() {
        const SurveyBodyWithFormik = withFormik({
                mapPropsToValues: () => (this.state.answers),
                validate: values => {
                const errors = {};
                if (values.surveyQuestion1.length == 0) {
                    errors.surveyQuestion1 = 'Required';
                }
                if (values.surveyQuestion2 == 0) {
                    errors.surveyQuestion2 = 'Required';
                }
                if (values.surveyQuestion3 == 0) {
                    errors.surveyQuestion3 = 'Required';
                }

                return errors;
                },
                handleSubmit: (values) => {
                    db.collection("submissions").doc(this.state.email).set(values, { merge: true })
                },
        })(SurveyBody)
        return (
            <SurveyBodyWithFormik>
            </SurveyBodyWithFormik>
            )
    }
}
export default Survey