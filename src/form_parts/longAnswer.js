import React, { useState, useEffect } from 'react';
import { withFormik }  from "formik";
import { makeStyles, Container } from "@material-ui/core";
import firebaseApp from "../components/firebaseConfig.js"
import "firebase/firestore"
let db = firebaseApp.firestore()
class LongResponses extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            answers: {}
        }
        db.collection("submissions").doc("IrHVrpGhkMjnNruxqo4A").get()
            .then((snapshot) => {
                this.setState({answers:snapshot.data()})
            })
    }
    render() {
        const MyForm = props => {
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
                <form onSubmit={handleSubmit} className={classes.form}>
                    <label htmlFor="Q1">Question 1:</label>
                    <textarea
                        id="Q1"
                        name="Q1"
                        onChange={handleChange}
                        value={values.Q1}
                    />
                    {touched.Q1 && errors.Q1 ? (
                        <div>{errors.Q1}</div>
                    ) : null}
                    <label htmlFor="Q2">Question 2:</label>
                    <textarea
                        id="Q2"
                        name="Q2"
                        onChange={handleChange}
                        value={values.Q2}
                    />
                    {touched.Q2 && errors.Q2 ? (
                        <div>{errors.Q2}</div>
                    ) : null}
                    <label htmlFor="Q3">Question 3:</label>
                    <textarea
                        id="Q3"
                        name="Q3"
                        onChange={handleChange}
                        value={values.Q3}
                    />
                    {touched.Q3 && errors.Q3 ? (
                        <div>{errors.Q3}</div>
                    ) : null}
                    <label htmlFor="Q4">Question 4</label>
                    <textarea
                        id="Q4"
                        name="Q4"
                        onChange={handleChange}
                        value={values.Q4}
                    />
                    {touched.Q4 && errors.Q4 ? (
                        <div>{errors.Q4}</div>
                    ) : null}
                    <button type="submit">Submit</button>
                </form>
            );
        };
        const MyEnhancedForm = withFormik({
            mapPropsToValues: () => (this.state.answers),

            // Custom sync validation
            validate: values => {
                const errors = {};
                console.log(values.Q1.trim().split(/\s+/).length)
                if (!values.Q1) {
                    errors.Q1 = 'Required';
                } else if (values.Q1.trim().split(/\s+/).length > 500) {
                    errors.Q1 = 'Answer must be 500 words long or less';
                }
                if (!values.Q2) {
                    errors.Q2 = 'Required';
                } else if (values.Q2.trim().split(/\s+/).length > 300) {
                    errors.Q2 = 'Answer must be 300 words long or less';
                }
                if (!values.Q3) {
                    errors.Q3 = 'Required';
                } else if (values.Q3.trim().split(/\s+/).length > 300) {
                    errors.Q3 = 'Answer must be 300 words long or less';
                }
                if (!values.Q4) {
                    errors.Q4 = 'Required';
                } else if (values.Q4.trim().split(/\s+/).length > 300) {
                    errors.Q4 = 'Answer must be 300 words long or less';
                }

                return errors;
            },

            handleSubmit: (values, { setSubmitting }) => {
                db.collection("submissions").doc("IrHVrpGhkMjnNruxqo4A").set(values)
            },

            displayName: 'LongResponseForm',
        })(MyForm);
        return (
            <Container style={{ height: "75vh", overflowY: "scroll", width: "60vw", marginLeft: "-15vw" }}>
                <MyEnhancedForm>
                    </MyEnhancedForm>
                </Container>
        )
    }
}
export default LongResponses