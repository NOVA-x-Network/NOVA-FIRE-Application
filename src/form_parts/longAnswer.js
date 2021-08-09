import React from 'react';
import { useFormik }  from "formik";
import { makeStyles, Container} from "@material-ui/core";
const LongResponses = () => {
    const formStyle = makeStyles(() => ({
        form: {
            '& textarea': {
                height: "300px",
                width:"600px",
                display: "block",
                marginBottom:"10px"
            },
            '& textarea + div': {
                marginBottom: "50px",
                color:"red"
            },
            '& *': {
                fontFamily: `poppins`,
            },
            '& label': {
                fontSize:"30px"
            }
        }
    }))
    const validate = values => {
        const errors = {};
        console.log(values.Q1.trim().split(/\s+/).length)
        if (!values.Q1) {
            errors.Q1 = 'Required';
        } else if (values.Q1.trim().split(/\s+/).length >500) {
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
            errors.Q4= 'Answer must be 300 words long or less';
        }


        return errors;
    };
    const responseFields = useFormik({
        initialValues: {
            Q1: "",
            Q2: "",
            Q3: "",
            Q4:"",
        },
        validate,
        onSubmit: values => {
            alert(JSON.stringify(values, null, 2));
        },
    })
    const classes = formStyle();
    return(
        <Container style={{ height: "75vh", overflowY: "scroll" }}>
            <form onSubmit={responseFields.handleSubmit} className={classes.form}>
            <label htmlFor="Q1">Question 1:</label>
            <textarea
                id="Q1"
                name="Q1"
                onChange={responseFields.handleChange}
                value={responseFields.values.Q1}
            />
            {responseFields.touched.Q1 && responseFields.errors.Q1 ? (
                <div>{responseFields.errors.Q1}</div>
            ) : null}
            <label htmlFor="Q2">Question 2:</label>
            <textarea
                id="Q2"
                name="Q2" 
                onChange={responseFields.handleChange}
                value={responseFields.values.Q2}
            />
            {responseFields.touched.Q2 && responseFields.errors.Q2 ? (
                <div>{responseFields.errors.Q2}</div>
            ) : null}
            <label htmlFor="Q3">Question 3:</label>
            <textarea
                id="Q3"
                name="Q3"
                onChange={responseFields.handleChange}
                value={responseFields.values.Q3}
            />
            {responseFields.touched.Q3 && responseFields.errors.Q3 ? (
                <div>{responseFields.errors.Q3}</div>
            ) : null}
            <label htmlFor="Q4">Question 4</label>
            <textarea
                id="Q4"
                name="Q4"
                onChange={responseFields.handleChange}
                value={responseFields.values.Q4}
            />
            {responseFields.touched.Q4 && responseFields.errors.Q4 ? (
                <div>{responseFields.errors.Q4}</div>
            ) : null}
            <button type="submit">Submit</button>
            </form>
            </Container>
        )
}
export default LongResponses