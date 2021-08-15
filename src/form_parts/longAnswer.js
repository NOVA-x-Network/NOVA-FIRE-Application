import React from 'react';
import { withFormik }  from "formik";
import { makeStyles, Container } from "@material-ui/core";
import firebaseApp from "../components/firebaseConfig.js"
import "firebase/firestore"
import "firebase/auth"
import firebase from "firebase/app";
import withFirebaseAuth from "react-with-firebase-auth";
let db = firebaseApp.firestore()
const firebaseAppAuth = firebaseApp.auth();

class LongResponses extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            answers: {},
            email:''
        }
        firebaseAppAuth.onAuthStateChanged((user) => {
            if (user) {
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/firebase.User
                db.collection("submissions").doc(user.email).get()
                    .then((snapshot) => {
                        if (typeof snapshot.data() !== 'undefined') {
                            this.setState({ answers: snapshot.data() })
                        }
                        else {
                            this.setState({ answers: { longQuestion1: '', longQuestion2: '', longQuestion3: '', longQuestion4: '' } })
                        }
                        this.setState({email:user.email})
                    })
                db.collection("submissions").doc("WASD").get()
                    .then((snapshot) => {
                        console.log()
                    })
                // ...
            } else {
                // User is signed out
                // ...
            }
        });
    }

    render() {
        const AnswerForm = props => {
            const {
                values,
                touched,
                errors,
                handleChange,
                handleBlur,
                handleSubmit,
            } = props;
            const formStyle = makeStyles({
                form: {
                    '& textarea': {
                        height: "300px",
                        width: "600px",
                        display: "block",
                        marginBottom: "10px"
                    },
                    '& textarea + div': {
                        marginBottom: "50px",
                        color: "red"
                    },
                    '& *': {
                        fontFamily: `poppins`,
                    },
                    '& label': {
                        fontSize: "30px"
                    }
                }
            })
            const classes=formStyle()
            return (
                <form onSubmit={handleSubmit} className={classes.form} id="3">
                    <label htmlFor="longQuestion1">Question 1:</label>
                    <textarea
                        id="longQuestion1"
                        name="longQuestion1"
                        onChange={handleChange}
                        value={values.longQuestion1}
                    />
                    {touched.longQuestion1 && errors.longQuestion1 ? (
                        <div>{errors.longQuestion1}</div>
                    ) : null}
                    <label htmlFor="longQuestion2">Question 2:</label>
                    <textarea
                        id="longQuestion2"
                        name="longQuestion2"
                        onChange={handleChange}
                        value={values.longQuestion2}
                    />
                    {touched.longQuestion2 && errors.longQuestion2 ? (
                        <div>{errors.longQuestion2}</div>
                    ) : null}
                    <label htmlFor="longQuestion3">Question 3:</label>
                    <textarea
                        id="longQuestion3"
                        name="longQuestion3"
                        onChange={handleChange}
                        value={values.longQuestion3}
                    />
                    {touched.longQuestion3 && errors.longQuestion3 ? (
                        <div>{errors.longQuestion3}</div>
                    ) : null}
                    <label htmlFor="longQuestion4">Question 4</label>
                    <textarea
                        id="longQuestion4"
                        name="longQuestion4"
                        onChange={handleChange}
                        value={values.longQuestion4}
                    />
                    {touched.longQuestion4 && errors.longQuestion4 ? (
                        <div>{errors.longQuestion4}</div>
                    ) : null}
                </form>
            );
        };
        const AnswerFormWithFormik = withFormik({
            mapPropsToValues: () => (this.state.answers),

            // Custom sync validation
            validate: values => {
                const errors = {};
                console.log(values.longQuestion1.trim().split(/\s+/).length)
                if (!values.longQuestion1) {
                    errors.longQuestion1 = 'Required';
                } else if (values.longQuestion1.trim().split(/\s+/).length > 500) {
                    errors.longQuestion1 = 'Answer must be 500 words long or less';
                }
                if (!values.longQuestion2) {
                    errors.longQuestion2 = 'Required';
                } else if (values.longQuestion2.trim().split(/\s+/).length > 300) {
                    errors.longQuestion2 = 'Answer must be 300 words long or less';
                }
                if (!values.longQuestion3) {
                    errors.longQuestion3 = 'Required';
                } else if (values.longQuestion3.trim().split(/\s+/).length > 300) {
                    errors.longQuestion3 = 'Answer must be 300 words long or less';
                }
                if (!values.longQuestion4) {
                    errors.longQuestion4 = 'Required';
                } else if (values.longQuestion4.trim().split(/\s+/).length > 300) {
                    errors.longQuestion4 = 'Answer must be 300 words long or less';
                }

                return errors;
            },

            handleSubmit: (values, { setSubmitting }) => {
                db.collection("submissions").doc(this.state.email).set(values, { merge: true })
            },

            displayName: 'LongResponseForm',
        })(AnswerForm);
        return (
            <Container style={{ height: "75vh", overflowY: "scroll", width: "60vw", marginLeft: "-15vw" }}>
                <AnswerFormWithFormik>
                    </AnswerFormWithFormik>
                </Container>
        )
    }
}
export default LongResponses