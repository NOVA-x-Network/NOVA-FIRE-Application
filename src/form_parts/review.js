import React, { useState, useEffect } from 'react';
import {
    TextField,
    Box,
    Typography,
    makeStyles,
} from "@material-ui/core";
import firebaseApp from "../components/firebaseConfig.js"
import "firebase/firestore"
import "firebase/auth"
let db = firebaseApp.firestore()
const firebaseAppAuth = firebaseApp.auth();
const Review = () => {
    let [errorMsgs, setErrorMsgs] = useState([])
    let reviewStyle = makeStyles(() => ({
        body: {
            '& p': {
                color: 'red',
                fontFamily: `poppins`
            }
        }
    }))
    const classes=reviewStyle()
    return (
        <div style={{ height: "75vh", display: "flex", width: "65vw", flexDirection: "column", alignItems: "center" }} className={classes.body}>
            <button onClick={() => {
                let errorMsgsCopy = []
                firebaseAppAuth.onAuthStateChanged((user) => {
                    db.collection("submissions").doc(user.email).get()
                        .then((snapshot) => {
                            Object.keys(snapshot.data()).forEach((category) => {
                                let appSection = snapshot.data()[category]
                                console.log(category)
                                let mandatoryFields = []
                                let section = ""
                                let verified = true
                                switch (category) {
                                    case 'basicInfo':
                                        mandatoryFields = ['grade', 'city', 'firstName', 'lastName', 'isFirstNation', 'laptopAndInternetAccess', 'householdIncome', 'school']
                                        section = "Personal Information"
                                        break
                                    case 'longAnswer':
                                        console.log('longaswer')
                                        section = "Creative Responses"
                                        mandatoryFields = ['longQuestion1', 'longQuestion2', 'longQuestion3', 'longQuestion4']
                                        mandatoryFields.forEach((field) => {
                                            try {
                                                if (appSection[field].trim().split(/\s+/).length > 500 && field == 'longQuestion1') {
                                                    verified = false
                                                    console.log("too long")
                                                    errorMsgsCopy.push(<p>Error! Your answer for question {field[field.length - 1]} for the Creative Responses section was too long</p>)
                                                }
                                                else if (appSection[field].trim().split(/\s+/).length > 300) {
                                                    verified = false
                                                    console.log("too long")
                                                    errorMsgsCopy.push(<p>Error! Your answer for question {field[field.length - 1]} for the Creative Responses section was too long</p>)
                                                }
                                            }
                                            catch {
                                                ;
                                            }
                                        })
                                        break
                                    case 'survey':
                                        section = "Survey"
                                        mandatoryFields = ['surveyQuestion1', 'surveyQuestion2']
                                        if (appSection['surveyQuestion1Other']) {
                                            appSection['surveyQuestion1'].push(appSection['surveyQuestion1Other'])
                                        }
                                        if (appSection['surveyQuestion2Other']) {
                                            appSection['surveyQuestion2'].push(appSection['surveyQuestion2Other'])
                                        }
                                        console.log(appSection['surveyQuestion1'])
                                        break
                                    case 'files':
                                        section = "Upload Documents"
                                        if (Object.keys(appSection).length < 2) {
                                            errorMsgsCopy.push(<p>Error! You haven't uploaded enough files for the Upload Documents section.</p>)
                                        }
                                }
                                if (JSON.stringify(appSection) == '{}') {
                                    verified = false
                                }
                                console.log(mandatoryFields)
                                mandatoryFields.every((field) => {
                                    console.log(field)
                                    if (!appSection[field] || appSection[field].length == 0) {
                                        console.log(appSection)
                                        verified = false
                                        errorMsgsCopy.push(<p>Error! You're missing mandatory resposnes from the {section} section.</p>)
                                        return false
                                    }
                                    return true
                                })
                                console.log(verified)
                            })
                            if (errorMsgsCopy.length == 0) {
                                errorMsgsCopy.push(<p style={{ color: "green" }}>"Good job! You've successfully completed the application. Your answers have been submitted."</p>)
                                firebaseAppAuth.onAuthStateChanged((user) => {
                                    db.collection("submissions").doc(user.email).update({ 'applicationStatus': "Complete" })
                                })
                            }
                            else {
                                db.collection("submissions").doc(user.email).update({ 'applicationStatus': "Incomplete" })
                            }
                            setErrorMsgs(errorMsgsCopy)
                        })
                })
            }}
                style={{marginBottom:"25px"}}
            > Verify and Submit </button>
            <Typography style={{color:"black"}}>Click on the button to check if all your answers are valid and if you've completed all the necessary parts of the application.
                Until the application deadline of (insert date), you can still edit your application after submitting it.</Typography>
            {errorMsgs}
            </div>)
}
export default Review