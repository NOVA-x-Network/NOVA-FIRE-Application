import React, { useState, useEffect } from 'react';
import {
    Paper,
    makeStyles,
    Grid,
    Button,
    Container,
    Box,
    ListItem,
    List,
    Typography,
} from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';
import BasicInformation from "../form_parts/basicInfo.js";
import LongResponses from "../form_parts/longAnswer.js"
import Description from "../form_parts/description.js";
import Upload from "../form_parts/uploadDocs";
import Survey from "../form_parts/survey";
import Review from "../form_parts/review";
import getFirebase from "../components/firebaseConfig.js"
import "firebase/auth"
import "firebase/firestore";
import {Helmet} from "react-helmet"
var myStyles

const App = () => {
    const [activeStep, setActiveStep] = useState(1);
    const [gotAuthStatus, setAuthStatus] = useState(false)
    const [appStatus, setAppStatus] = useState(false)
    const [userStatus, setUserStatus] = useState(null)
    const [windowWidth, setWindowWidth] = useState(500)
    if (windowWidth >= 450) {
        myStyles = makeStyles(() => ({
            paper: {
                width: `${95}vw`,
                height: `${93}vh`,
                background: `white`,
                marginTop: `${1.4}vh`,
                fontFamily: "poppins",
                borderRadius: "15px 15px 15px 15px",
                boxShadow: "0px 5px 12px #ADE0DD"
            },
            first: {
                height: `${93}vh`,
                background: `#1A6F4C`,
                borderRadius: "15px 0px 0px 15px"

            },
            item: {
                marginTop: `${1}vw`,
                cursor: `pointer`
            },
            contain: {
                marginTop: `${40}px`,
                width: `100%`
            },

            Box: {
                width: `${8}px`,
                height: `${8}px`,
                background: `#BFEDEA`,
                border: `${7}px solid #BFEDEA`,
                borderRadius: `${50}px`,

            },
            stepname: {
                color: `#fff`,
                marginLeft: `${0.8}em`,
                fontSize: `1.5vw`,
                display: `inline-block`
            },
        }));
    }
    else {
        myStyles = makeStyles(() => ({
            paper: {
                height: `${93}vh`,
                width: `${100}vw`,
                background: `#fff`,
                marginTop: `${1.5}em`,
                fontFamily: "poppins"
            },
            first: {
                height: `${93}vh`,
                background: `#1A6F4C`,

            },
            item: {
                marginTop: `${0.45}em`,
                cursor: `pointer`
            },
            contain: {
                marginTop: `${2}em`,
                width:"100%"
            },

            Box: {
                width: `${8}px`,
                height: `${8}px`,
                background: `#BFEDEA`,
                border: `${7}px solid #BFEDEA`,
                borderRadius: `${50}px`,

            },
            stepname: {
                color: `#fff`,
                marginLeft: `${0.4}em`,
                fontSize: `8px`,
                display: `inline-block`
            },
        }));
    }
    let classes = myStyles()
    const handleNext = () => {
        setActiveStep(activeStep + 1)
    }

    const handlePrev = () => {
        setActiveStep(activeStep - 1)
    }

    useEffect(() => {
        window.addEventListener('resize', () => {
            setWindowWidth(window.innerWidth)
        })
        const app = import("firebase/app")
        setWindowWidth(window.innerWidth)
        Promise.all([app]).then(([firebase]) => {
            const firebaseApp = getFirebase(firebase)
            const firebaseAppAuth = firebaseApp.default.auth()
            const db = firebaseApp.default.firestore()
            firebaseAppAuth.onAuthStateChanged((user) => {
                if (user) {
                    db.collection("submissions").doc(user.email).get()
                        .then((snapshot) => {
                            if (typeof snapshot.data() === 'undefined') {
                                db.collection("submissions").doc(user.email).set({
                                    basicInfo: {
                                        firstName: "",
                                        lastName: "",
                                        school: "",
                                        phoneNumber: "",
                                        gender: "",
                                        city: "",
                                        grade: "",
                                        householdIncome: "",
                                        laptopAndInternetAccess: "",
                                        isFirstNation: "",
                                        canAttendGala: "",
                                        regionalProgram:"",
                                    },
                                    longAnswer: {
                                        longQuestion1: '',
                                        longQuestion2: '',
                                        longQuestion3: '',
                                        longQuestion4: ''
                                    },
                                    survey: {
                                        surveyQuestion1: [],
                                        surveyQuestion1Other: '',
                                        surveyQuestion2: [],
                                        surveyQuestion2Other: '',
                                        surveyQuestion3: ''
                                    },
                                    files: {},
                                    applicationStatus: "Incomplete"
                                })
                            }
                            db.collection("submissions").doc(user.email).onSnapshot((snapshot) => {
                                if (appStatus !== snapshot.data().applicationStatus && typeof snapshot.data() !== 'undefined') {
                                    setAppStatus(snapshot.data().applicationStatus)
                                }
                                else {
                                    setAppStatus("Incomplete")
                                }
                                setUserStatus(true)
                            })
                        })
                }
                else {
                    window.location = "/login"
                    return (<div></div>)
                }
                setAuthStatus(true)
            })
        })
    },[])
    if (userStatus && gotAuthStatus) {
        return (
            <div style={{display:"flex", flexDirection:"column", justifyContent:"space-between", alignItems:"center"}}>
                <Helmet>
                    <meta charSet="utf-8" />
                    <link rel="icon" href="../images/cropped-NOVA-logo-1.png" type="image/jpg"/>
                    <title>Application Form</title>
                </Helmet>
                <style>{"body {background-color: #D6F3F2; overflowX:hidden;}"}</style>
                <Paper className={classes.paper} elevation={10}>
                    <Grid container>
                        <Grid className={classes.first} item xs={3}>
                            <Container>
                                <List >
                                    <ListItem className={classes.item} onClick={() => setActiveStep(1)} >
                                        <Box style={activeStep === 1 ? { background: `#1A6F4C` } : { background: `#BFEDEA` }} size="small" className={classes.Box} />
                                        <Typography className={classes.stepname}  > Description</Typography>
                                    </ListItem>

                                    <ListItem className={classes.item} onClick={() => setActiveStep(2)}>
                                        <Box size="small" style={activeStep === 2 ? { background: `#1A6F4C` } : { background: `#BFEDEA` }} className={classes.Box} />
                                        <Typography className={classes.stepname}> Personal Information </Typography>
                                    </ListItem>

                                    <ListItem className={classes.item} onClick={() => setActiveStep(3)}>
                                        <Box size="small" style={activeStep === 3 ? { background: `#1A6F4C` } : { background: `#BFEDEA` }} className={classes.Box} />
                                        <Typography className={classes.stepname}  > Creative Responses</Typography>
                                    </ListItem >

                                    <ListItem className={classes.item} onClick={() => setActiveStep(4)}>
                                        <Box size="small" style={activeStep === 4 ? { background: `#1A6F4C` } : { background: `#BFEDEA` }} className={classes.Box} />
                                        <Typography className={classes.stepname}  >Upload Documents</Typography>
                                    </ListItem>

                                    <ListItem className={classes.item} onClick={() => setActiveStep(5)}>
                                        <Box size="small" style={activeStep === 5 ? { background: `#1A6F4C` } : { background: `#BFEDEA` }} className={classes.Box} />
                                        <Typography className={classes.stepname}>Survey Questions</Typography>
                                    </ListItem >


                                    <ListItem className={classes.item} onClick={() => setActiveStep(6)}>
                                        <Box size="small" style={activeStep === 6 ? { background: `#1A6F4C` } : { background: `#BFEDEA` }} className={classes.Box} />
                                        <Typography className={classes.stepname} > Review and Submit</Typography>
                                    </ListItem>
                                </List>

                                <div id="indexLogin" style={{ position: 'relative' }}>
                                    {appStatus ? <Typography style={{ color: "#ADE0DD",  fontSize: "calc(6px + 1vw)", margin:"20px"}}>Application Status: {appStatus}</Typography> : null}
                                </div>

                                <Button
                                    style={{ display: "flex", alignItems: "center", width: "15vw", fontSize:"calc(6px + 0.8vw)", flexWrap:"wrap"}}
                                    id="exitButton"
                                    onClick={() => {
                                        setTimeout(() => {
                                            window.location = "/"
                                        },300)
                                    }}
                                >Save and Exit <CloseIcon style={{ width: "1.4vw", height: "1.4vw" }} /></Button>
                                <Typography style={{ marginTop: "20px", color: `white`, fontSize:"calc(6px + 0.4vw)"}}>Tip: Clicking "Back", "Continue", or each of the above section labels automatically saves your work. </Typography>
                                <Typography style={{ marginTop: "20px", color: `white`, fontSize: "calc(6px + 0.4vw)"}}>Note: Every time you change your answers after submitting, you will have to reverify and resubmit them. </Typography>
                            </Container>
                        </Grid>

                        <Grid item xs={9}>
                            <Container className={classes.contain}>


                                    {activeStep === 1 ? <Description /> : null}
                                    {activeStep === 2 ? <BasicInformation /> : null}
                                    {activeStep === 3 ? <LongResponses /> : null}
                                    {activeStep === 4 ? <Upload />  : null}
                                    {activeStep === 5 ? <Survey /> : null}
                                    {activeStep === 6 ? <Review />: null}
                                    
                                {
                                    activeStep > 1
                                        ? <Button variant="contained" style={{
                                            background: `#1A6F4C`,
                                            position: "relative",
                                            color: `#fff`,
                                            top: "30px",
                                            width: `20vw`,
                                            height: `${30}px`,
                                            marginLeft: `${4}vw`,
                                            fontFamily: `poppins`,
                                            borderRadius: `${2}em`,
                                            fontSize: `${11}pt`,
                                            minWidth:"100px",
                                        }}
                                            onClick={handlePrev}
                                            form={activeStep.toString()}
                                        >
                                            Back
                                        </Button>
                                        :
                                        null
                                }

                                {
                                    activeStep < 6 ?
                                        <Button variant="contained" style={{
                                            background: `#1A6F4C`,
                                            position: "relative",
                                            color: `#fff`,
                                            width: `20vw`,
                                            height: `${30}px`,
                                            marginLeft: `${40}vw`,
                                            fontSize: `${11}pt`,
                                            borderRadius: `${2}em`,
                                            fontFamily: `poppins`,
                                            minWidth: "100px",
                                            padding:"0px 20px 0px 20px"
                                        }}
                                            onClick={handleNext}
                                            form={activeStep.toString()}
                                        >
                                            Continue
                                        </Button>
                                        :null
                                }
                               
                                
                            </Container>
                        </Grid>

                    </Grid>
                </Paper>
                <p style={{color: "#323865", fontSize: "calc(10px + 0.4vw)"}}>Have a question? Experiencing troubles with completing your application? Email us at <a href="mailto: novaxnetwork@gmail.com">novaxnetwork@gmail.com</a>.</p>
            </div>
        )
    }
    return(<div></div>)
}

export default App;