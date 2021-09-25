import React from 'react';
import { withFormik } from "formik";
import { withStyles, Container } from "@material-ui/core";
import "firebase/firestore"
import "firebase/auth"
import firebaseApp from "../components/firebaseConfig.js"
import getData from "./dataWrapper.js"
let db = firebaseApp.firestore()
class SurveyBody extends React.Component {
    constructor(props) {
        super(props)
    }

    componentWillUnmount() {
        const {values} = this.props
        this.props.unmountHandler(values)
    }

    componentDidMount() {
        const { values } = this.props

        let checkBoxes = document.querySelectorAll('input[type=checkbox]')

        checkBoxes.forEach((checkBox) => {
            if (values[checkBox.name].includes(checkBox.value)) {
                checkBox.checked=true
            }
        })

    }

    render() {
        const {
            values,
            touched,
            errors,
            classes,
            changeHandler
        } = this.props
        const formikHandleChange = this.props.handleChange
        return (
            <Container style={{ height: "75vh", overflowY: "scroll", width: "65vw", marginLeft: "2vw" }}>
                <form className={classes.form} id="4">
                    <h2>Question 1: How'd you hear about the NOVA FIRE Fellowship?</h2>
                    <label htmlFor="instagram">NOVA's instagram page</label>
                    <input
                        type="checkbox"
                        id="instagram"
                        name="surveyQuestion1"
                        onChange={(e) => {changeHandler(e, formikHandleChange)}}
                        value="NOVA Instagram"
                    />
                    <br />
                    <label htmlFor="linkedin">NOVA's LinkedIn</label>
                    <input
                        type="checkbox"
                        id="linkedin"
                        name="surveyQuestion1"
                        onChange={(e) => {changeHandler(e, formikHandleChange)}}
                        value="NOVA LinkedIn"
                    />
                    <br />
                    <label htmlFor="friend">A friend</label>
                    <input
                        type="checkbox"
                        id="friend"
                        name="surveyQuestion1"
                        onChange={(e) => {changeHandler(e, formikHandleChange)}}
                        value="Friend"
                    />
                    <br />
                    <label htmlFor="website">NOVA's Website</label>
                    <input
                        type="checkbox"
                        id="website"
                        name="surveyQuestion1"
                        onChange={(e) => {changeHandler(e, formikHandleChange)}}
                        value="NOVA Website"
                    />
                    <br />
                    <label htmlFor="execPost">A post by one of NOVA's executives</label>
                    <input
                        type="checkbox"
                        id="execPost"
                        name="surveyQuestion1"
                        onChange={(e) => {changeHandler(e, formikHandleChange)}}
                        value="Executive Post"
                    />
                    <br />
                    <label htmlFor="otherInstagram">An instagram page that isn't NOVA's</label>
                    <input
                        type="checkbox"
                        id="otherInstagram"
                        name="surveyQuestion1"
                        onChange={(e) => {changeHandler(e, formikHandleChange)}}
                        value="Other Org Instagram"
                    />
                    <br /><br/>
                    <label htmlFor="other">Other:</label>
                    <input
                        type="text"
                        id="other"
                        name="surveyQuestion1Other"
                        onChange={(e) => {changeHandler(e, formikHandleChange)}}
                        value={values.surveyQuestion1Other}
                        maxlength="60"
                    />
                    <br /><br/>
                    {touched.surveyQuestion1 && errors.surveyQuestion1 ? (
                        <div>{errors.surveyQuestion1}</div>
                    ) : null}
                    <h2>Question 2: How'd you hear about the NOVA x Network?</h2>
                    <label htmlFor="instagram">NOVA's instagram page</label>
                    <input
                        type="checkbox"
                        id="instagram2"
                        name="surveyQuestion2"
                        onChange={(e) => {changeHandler(e, formikHandleChange)}}
                        value="NOVA Instagram"
                    />
                    <br />
                    <label htmlFor="linkedin">NOVA's LinkedIn</label>
                    <input
                        type="checkbox"
                        id="linkedin2"
                        name="surveyQuestion2"
                        onChange={(e) => {changeHandler(e, formikHandleChange)}}
                        value="NOVA LinkedIn"
                    />
                    <br />
                    <label htmlFor="friend">A friend</label>
                    <input
                        type="checkbox"
                        id="friend2"
                        name="surveyQuestion2"
                        onChange={(e) => {changeHandler(e, formikHandleChange)}}
                        value="Friend"
                    />
                    <br />
                    <label htmlFor="website">NOVA's Website</label>
                    <input
                        type="checkbox"
                        id="website2"
                        name="surveyQuestion2"
                        onChange={(e) => {changeHandler(e, formikHandleChange)}}
                        value="NOVA Website"
                    />
                    <br />
                    <label htmlFor="execPost">A post by one of NOVA's executives</label>
                    <input
                        type="checkbox"
                        id="execPost2"
                        name="surveyQuestion2"
                        onChange={(e) => {changeHandler(e, formikHandleChange)}}
                        value="Executive Post"

                    />
                    <br />
                    <label htmlFor="otherInstagram">An instagram page that isn't NOVA's</label>
                    <input
                        type="checkbox"
                        id="otherInstagram2"
                        name="surveyQuestion2"
                        onChange={(e) => {changeHandler(e, formikHandleChange)}}
                        value="Other Org Instagram"
                    />
                    <br /><br/>
                    <label htmlFor="other">Other:</label>
                    <input
                        type="text"
                        id="other2"
                        name="surveyQuestion2Other"
                        onChange={(e) => {changeHandler(e, formikHandleChange)}}
                        value={values.surveyQuestion2Other}
                        maxlength="60"
                    /><br/>
                    <br />
                    {touched.surveyQuestion2 && errors.surveyQuestion2 ? (
                        <div>{errors.surveyQuestion2}</div>
                    ) : null}
                    <h2>Question 3: Anything else you want us to know? (Optional)</h2>
                    <br />
                    <textarea
                        id="surveyQuestion3"
                        name="surveyQuestion3"
                        onChange={(e) => {changeHandler(e, formikHandleChange)}}
                        value={values.surveyQuestion3}
                        style={{ width: "40vw" }}
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
            width: "20vw",
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

const SurveyBodyWithFormik = withFormik({
    mapPropsToValues: (props) => (props.answers),
})(StyledSurvey)

const Survey = getData("survey", SurveyBodyWithFormik)

export default Survey