import React from 'react';
import { useFormik } from "formik";
import { makeStyles, Container } from "@material-ui/core";
const Survey = () => {
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
                marginLeft:"-350px",
        }
        }
    }))
    const validate = values => {
        const errors = {};
        if (values.Q1.length == 0) {
            errors.Q1 = 'Required';
        }
        if (values.Q2 == 0) {
            errors.Q2 = 'Required';
        } 
        if (values.Q3 == 0) {
            errors.Q3 = 'Required';
        } 

        return errors;
    };
    const responseFields = useFormik({
        initialValues: {
            Q1: [],
            Q2: [],
            Q3:[],
        },
        validate,
        onSubmit: values => {
            alert(JSON.stringify(values, null, 2));
        },
    })
    const classes = formStyle();
    return (
        <Container style={{ height: "75vh", overflowY:"scroll"}}>
            <form onSubmit={responseFields.handleSubmit} className={classes.form}>
                <h2>Question 1: How'd you hear about the NOVA FIRE Fellowship?</h2>
                <br />
                <label htmlFor="school">NOVA's instagram page</label>
                <input
                    type="checkbox"
                    id="school"
                    name="Q1"
                    onChange={responseFields.handleChange}
                    value="NOVA Instagram"
                />
                <br />
                <label htmlFor="kool">NOVA's LinkedIn</label>
                <input
                    type="checkbox"
                    id="kool"
                    name="Q1"
                    onChange={responseFields.handleChange}
                    value="NOVA LinkedIn"
                />
                <br />
                <label htmlFor="kool">A friend</label>
                <input
                    type="checkbox"
                    id="nool"
                    name="Q1"
                    onChange={responseFields.handleChange}
                    value="Friend"
                />
                <br />
                <label htmlFor="kool">NOVA's Website</label>
                <input
                    type="checkbox"
                    id="nool"
                    name="Q1"
                    onChange={responseFields.handleChange}
                    value="NOVA Website"
                />
                <br />
                <label htmlFor="kool">A post by one of NOVA's executives</label>
                <input
                    type="checkbox"
                    id="nool"
                    name="Q1"
                    onChange={responseFields.handleChange}
                    value="Executive post"
                />
                <br />
                <label htmlFor="kool">An instagram page that isn't NOVA's</label>
                <input
                    type="checkbox"
                    id="nool"
                    name="Q1"
                    onChange={responseFields.handleChange}
                    value="Other Org Instagram"
                />
                <br />
                <label htmlFor="kool">Other:</label>
                <input
                    type="checkbox"
                    id="nool"
                    name="Q1"
                    onChange={responseFields.handleChange}
                    value="Other"
                />
                <br />
                {responseFields.touched.Q1 && responseFields.errors.Q1 ? (
                    <div>{responseFields.errors.Q1}</div>
                ) : null}
                <h2>Question 2:</h2>
                <br />
                <input
                    type="checkbox"
                    id="Q2"
                    name="Q2"
                    onChange={responseFields.handleChange}
                />
                <br />
                {responseFields.touched.Q2 && responseFields.errors.Q2 ? (
                    <div>{responseFields.errors.Q2}</div>
                ) : null}
                <h2>Question 3:</h2>
                <br />
                <input
                    type="checkbox"
                    id="Q3"
                    name="Q3"
                    onChange={responseFields.handleChange}
                />
                <br />
                {responseFields.touched.Q3 && responseFields.errors.Q3 ? (
                    <div>{responseFields.errors.Q3}</div>
                ) : null}
                <button type="submit">Submit</button>
            </form>
        </Container>
    )
}
export default Survey