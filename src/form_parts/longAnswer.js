import React from 'react';
import { withFormik }  from "formik";
import { withStyles, Typography, Container } from "@material-ui/core";
import getData from "./dataWrapper.js"

class AnswerForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            saved: true,
            wordCount: {longQuestion1:0, longQuestion2:0, longQuestion3:0, longQuestion4:0}
        }
        this.wordCheck = this.wordCheck.bind(this)
    }

    componentDidMount() {

        const {
            values
        } = this.props

        let words = {}

        Object.keys(values).forEach((question) => {
            words[question] = values[question].trim().split(/\s+/).length
        })

        this.setState({ wordCount: words })
    }

    wordCheck(question) {

        let {
            values,
        } = this.props

        let words = this.state.wordCount

        words[question] = values[question].trim().split(/\s+/).length

        this.setState({ wordCount: words })
    }

    componentWillUnmount() {
        this.props.unmountHandler(this.props.values)
    }

    render() {

        const {
            values,
            errors,
            handleSubmit,
            classes,
            changeHandler,
        } = this.props;
        const formikHandleChange = this.props.handleChange
        return (
            <Container style={{ height: "75vh", overflowY: "scroll", width: "65vw", marginLeft: "2vw" }}>
                <form onSubmit={handleSubmit} className={classes.form} id="3">
                    <label htmlFor="longQuestion1">Question 1:
                        Of the 4 research topics that we have focused on for this term (go to the "Description" section for the list of topics) Choose one
                        that you are most interested in and describe why. Additionally, please <b>rank your topic choices </b> 1 to 4 in order of preference.
                        Include specific information you would like to research on, and a potential project that you could make from it
                    </label>
                    <textarea
                        id="longQuestion1"
                        name="longQuestion1"
                        onKeyUp={() => { this.wordCheck("longQuestion1") }}
                        onChange={(e) => {changeHandler(e, formikHandleChange, values)}}
                        value={values.longQuestion1}
                    />
                    <Typography align="left" > Word limit: 500</Typography>
                    <Typography align="left" > Word count: {this.state.wordCount.longQuestion1}</Typography>
                    {errors.longQuestion1 ? (
                        <div>{errors.longQuestion1}</div>
                    ) : null}
                    <label htmlFor="longQuestion2">Question 2: NOVA's program is very intensive and requires a time commitment of 5-8 hours a week to learn and work with your team.
                        How would you balance this commitment with your other activities and school?</label>
                    <textarea
                        id="longQuestion2"
                        name="longQuestion2"
                        onKeyUp={() => { this.wordCheck("longQuestion2") }}
                        onChange={(e) => {changeHandler(e, formikHandleChange, values)}}
                        value={values.longQuestion2}
                    />
                    <Typography align="left" > Word limit: 300</Typography>
                    <Typography align="left" > Word count: {this.state.wordCount.longQuestion2}</Typography>
                    {errors.longQuestion2 ? (
                        <div>{errors.longQuestion2}</div>
                    ) : null}
                    <label htmlFor="longQuestion3">Question 3: How will this program accelerate your own personal goals? Where do you see yourself after completing the program?</label>
                    <textarea
                        id="longQuestion3"
                        name="longQuestion3"
                        onKeyUp={() => { this.wordCheck("longQuestion3") }}
                        value={values.longQuestion3}
                        onChange={(e) => {changeHandler(e, formikHandleChange, values)}}
                    />
                    <Typography align="left" > Word limit:300</Typography>
                    <Typography align="left" > Word count: {this.state.wordCount.longQuestion3}</Typography>
                    {errors.longQuestion3 ? (
                        <div>{errors.longQuestion3}</div>
                    ) : null}
                    <label htmlFor="longQuestion4">Question 4: What resources would you like to have access to? What are your overall expectations of the NOVA FIRE program? </label>
                    <textarea
                        id="longQuestion4"
                        name="longQuestion4"
                        onKeyUp={() => { this.wordCheck("longQuestion4") }}
                        value={values.longQuestion4}
                        onChange={(e) => {changeHandler(e, formikHandleChange, values)}}
                    />
                    <Typography align="left" > Word limit: 300</Typography>
                    <Typography align="left" > Word count: {this.state.wordCount.longQuestion4}</Typography>
                    {errors.longQuestion4 ? (
                        <div>{errors.longQuestion4}</div>
                    ) : null}
                    </form>
                </Container>
        );
    }
};


const AnswerFormWithFormik = withFormik({
    mapPropsToValues: (props) => (props.answers),

    validateOnMount: true,

    validate: values => {
        const errors = {};

        console.log("validated")

        if (values.longQuestion1.trim().split(/\s+/).length > 500) {
            errors.longQuestion1 = 'Answer must be 500 words long or less';
        }

        if (values.longQuestion2.trim().split(/\s+/).length > 300) {
            errors.longQuestion2 = 'Answer must be 300 words long or less';
        }

        if (values.longQuestion3.trim().split(/\s+/).length > 300) {
            errors.longQuestion3 = 'Answer must be 300 words long or less';
        }

        if (values.longQuestion4.trim().split(/\s+/).length > 300) {
            errors.longQuestion4 = 'Answer must be 300 words long or less';
        }

        console.log(errors)
        return errors;
    },
    displayName: 'LongResponseForm',
})(AnswerForm);

const FormStyle = withStyles({
    form: {
        '& textarea': {
            height: "300px",
            width: "40vw",
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
        '& p': {
            marginBottom:"25px"
        },

        '& label': {
            fontSize: "18px"
        },

        '& div': {
            color: "red"
        }
    }
})(AnswerFormWithFormik)
const LongResponses = getData("longAnswer", FormStyle)
export default LongResponses