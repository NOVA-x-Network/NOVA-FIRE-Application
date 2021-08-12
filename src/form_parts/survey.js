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
            },
            '& input[type=text]': {
                display: "inline-block",
                backgroundColor: "white",
                color: "black",
                border:"2px solid black"
            },
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
        <Container style={{ height: "75vh", overflowY:"scroll", width:"50vw", marginLeft:"-8vw"}}>
            <form onSubmit={responseFields.handleSubmit} className={classes.form}>
                <h2>Question 1: How'd you hear about the NOVA FIRE Fellowship?</h2>
                <br />
                <label htmlFor="instagram">NOVA's instagram page</label>
                <input
                    type="checkbox"
                    id="instagram"
                    name="Q1"
                    onChange={responseFields.handleChange}
                    value="NOVA Instagram"
                />
                <br />
                <label htmlFor="linkedin">NOVA's LinkedIn</label>
                <input
                    type="checkbox"
                    id="linkedin"
                    name="Q1"
                    onChange={responseFields.handleChange}
                    value="NOVA LinkedIn"
                />
                <br />
                <label htmlFor="friend">A friend</label>
                <input
                    type="checkbox"
                    id="friend"
                    name="Q1"
                    onChange={responseFields.handleChange}
                    value="Friend"
                />
                <br />
                <label htmlFor="website">NOVA's Website</label>
                <input
                    type="checkbox"
                    id="website"
                    name="Q1"
                    onChange={responseFields.handleChange}
                    value="NOVA Website"
                />
                <br />
                <label htmlFor="execPost">A post by one of NOVA's executives</label>
                <input
                    type="checkbox"
                    id="execPost"
                    name="Q1"
                    onChange={responseFields.handleChange}
                    value="Executive post"
                />
                <br />
                <label htmlFor="otherInstagram">An instagram page that isn't NOVA's</label>
                <input
                    type="checkbox"
                    id="otherInstagram"
                    name="Q1"
                    onChange={responseFields.handleChange}
                    value="Other Org Instagram"
                />
                <br />
                <label htmlFor="other">Other:</label>
                <input
                    type="text"
                    id="other"
                    name="Q1"
                    onChange={responseFields.handleChange}
                />
                <br />
                {responseFields.touched.Q1 && responseFields.errors.Q1 ? (
                    <div>{responseFields.errors.Q1}</div>
                ) : null}
                <h2>Question 2: How'd you hear about the NOVA x Network?</h2>
                <br />
                <label htmlFor="instagram">NOVA's instagram page</label>
                <input
                    type="checkbox"
                    id="instagram"
                    name="Q1"
                    onChange={responseFields.handleChange}
                    value="NOVA Instagram"
                />
                <br />
                <label htmlFor="linkedin">NOVA's LinkedIn</label>
                <input
                    type="checkbox"
                    id="linkedin"
                    name="Q1"
                    onChange={responseFields.handleChange}
                    value="NOVA LinkedIn"
                />
                <br />
                <label htmlFor="friend">A friend</label>
                <input
                    type="checkbox"
                    id="friend"
                    name="Q1"
                    onChange={responseFields.handleChange}
                    value="Friend"
                />
                <br />
                <label htmlFor="website">NOVA's Website</label>
                <input
                    type="checkbox"
                    id="website"
                    name="Q1"
                    onChange={responseFields.handleChange}
                    value="NOVA Website"
                />
                <br />
                <label htmlFor="execPost">A post by one of NOVA's executives</label>
                <input
                    type="checkbox"
                    id="execPost"
                    name="Q1"
                    onChange={responseFields.handleChange}
                    value="Executive post"
                />
                <br />
                <label htmlFor="otherInstagram">An instagram page that isn't NOVA's</label>
                <input
                    type="checkbox"
                    id="otherInstagram"
                    name="Q1"
                    onChange={responseFields.handleChange}
                    value="Other Org Instagram"
                />
                <br />
                <label htmlFor="other">Other:</label>
                <input
                    type="text"
                    id="other"
                    name="Q1"
                    onChange={responseFields.handleChange}
                />
                <br />
                {responseFields.touched.Q2 && responseFields.errors.Q2 ? (
                    <div>{responseFields.errors.Q2}</div>
                ) : null}
                <h2>Question 3: Anything else you want us to know?</h2>
                <br />
                <textarea
                    id="Q3"
                    name="Q3"
                    onChange={responseFields.handleChange}
                    style={{width:"40vw", height:"200px"}}
                />
                <br />
                {responseFields.touched.Q3 && responseFields.errors.Q3 ? (
                    <div>{responseFields.errors.Q3}</div>
                ) : null}
            </form>
        </Container>
    )
}
export default Survey