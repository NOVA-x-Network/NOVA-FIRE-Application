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
import firebaseApp from "../components/firebaseConfig.js"
import "firebase/auth"
import "firebase/firestore";
let db = firebaseApp.firestore()
const firebaseAppAuth = firebaseApp.auth()
var myStyles

const App = () => {
    const [activeStep, setActiveStep] = useState(1);
    const [gotAuthStatus, setAuthStatus] = useState(false)
    const [userStatus, setUserStatus] = useState(null)
    const [windowWidth, setWindowWidth] = useState(window.innerWidth)
    if (windowWidth >= 780) {
        myStyles = makeStyles(() => ({
            paper: {
                width: `${95}vw`,
                height: `${93}vh`,
                background: `white`,
                marginTop: `${0}vh`,
                marginLeft: `${2.5}vw`,
                marginRight: `${2.5}vw`,
                fontFamily: "poppins",
                borderRadius: "15px 15px 15px 15px",
                boxShadow: "0px 5px 12px #ADE0DD"
            },
            first: {
                width: `${10}%`,
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
                fontSize: `16pt`,
                display: `inline-block`
            },
        }));
    }
    else {
        myStyles = makeStyles(() => ({
            paper: {
                height: `${93}vh`,
                background: `#fff`,
                marginTop: `${1.5}em`,
                marginLeft: `${8}em`,
                fontFamily: "poppins"
            },
            first: {
                width: `${10}%`,
                height: `${93}vh`,
                background: `#1A6F4C`,

            },
            item: {
                marginTop: `${1.5}em`,
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
                marginLeft: `${0.8}em`,
                fontSize: `16pt`,
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
        firebaseAppAuth.onAuthStateChanged((user) => {
            if (user) {
                db.collection("submissions").doc(user.email).get()
                    .then((snapshot)=> {
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
                                    isFirstNation: ""
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
                        setUserStatus(true)
                    })
            }
            else {
                window.location = "/login"
                return (<div></div>)
            }
            setAuthStatus(true)
        })
    })
    if (userStatus && gotAuthStatus) {
        return (
            <>
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
                                        <Typography className={classes.stepname}  >Survey Questions </Typography>
                                    </ListItem>

                                    <ListItem className={classes.item} onClick={() => setActiveStep(5)}>
                                        <Box size="small" style={activeStep === 5 ? { background: `#1A6F4C` } : { background: `#BFEDEA` }} className={classes.Box} />
                                        <Typography className={classes.stepname}>Upload Documents</Typography>
                                    </ListItem >


                                    <ListItem className={classes.item} onClick={() => setActiveStep(6)}>
                                        <Box size="small" style={activeStep === 6 ? { background: `#1A6F4C` } : { background: `#BFEDEA` }} className={classes.Box} />
                                        <Typography className={classes.stepname} > Review and Submit</Typography>
                                    </ListItem>
                                </List>

                                <Button
                                    style={{ display:"flex", alignItems:"center", width:"20vw"}}
                                    id="exitButton"
                                    onClick={() => {
                                        setTimeout(() => {
                                            window.location = "/"
                                        },300)
                                    }}
                                >Save and Exit <CloseIcon style={{paddingTop: "10px"}}/></Button>
                                <Typography style={{ marginTop: "30px", color: `white` }}>Tip: Clicking "Back", "Continue", or each of the above section labels automatically saves your work. </Typography>
                                <Typography style={{ marginTop: "30px", color: `white`}}>Note: Every time you change your answers after submitting, you will have to reverify and resubmit them. </Typography>
                            </Container>
                        </Grid>

                        <Grid item xs={9}>
                            <Container className={classes.contain}>


                                    {activeStep === 1 ? <Description /> : null}
                                    {activeStep === 2 ? <BasicInformation /> : null}
                                    {activeStep === 3 ? <LongResponses /> : null}
                                    {activeStep === 4 ? <Survey /> : null}
                                    {activeStep === 5 ? <Upload /> : null}
                                    {activeStep === 6 ? <Review />: null}
                                    
                                {
                                    activeStep > 1
                                        ? <Button variant="contained" style={{
                                            background: `#1A6F4C`,
                                            position: "relative",
                                            color: `#fff`,
                                            top: "30px",
                                            width: `200px`,
                                            height: `${30}px`,
                                            marginLeft: `${4}vw`,
                                            fontFamily: `poppins`,
                                            borderRadius: `${2}em`,
                                            fontSize: `${14}pt`,
                                            paddingTop: `20px`
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
                                    activeStep < 2
                                        ? <Button variant="contained" style={{
                                            background: `#1A6F4C`,
                                            position: "relative",
                                            color: `#fff`,
                                            top: "30px",
                                            width: `200px`,
                                            height: `${30}px`,
                                            marginLeft: `${4}vw`,
                                            fontFamily: `poppins`,
                                            borderRadius: `${2}em`,
                                            fontSize: `${14}pt`,
                                            paddingTop: `20px`,
                                            visibility:"hidden"
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
                                            width: `200px`,
                                            height: `${30}px`,
                                            marginLeft: `${40}vw`,
                                            fontSize: `${14}pt`,
                                            borderRadius: `${2}em`,
                                            fontFamily: `poppins`,
                                            paddingTop: `20px`
                                        }}
                                            onClick={handleNext}
                                            form={activeStep.toString()}
                                        >
                                            Continue
                                        </Button>
                                        :null
                                }
                                
                                {
                                    activeStep > 5 ?
                                        <Button variant="contained" style={{
                                            background: `#1A6F4C`,
                                            position: "relative",
                                            color: `#fff`,
                                            width: `200px`,
                                            height: `${30}px`,
                                            marginLeft: `${40}vw`,
                                            fontSize: `${14}pt`,
                                            borderRadius: `${2}em`,
                                            fontFamily: `poppins`,
                                            paddingTop: `20px`,
                                            visibility:"hidden"
                                        }}
                                            onClick={handleNext}
                                            form={activeStep.toString()}
                                        >
                                            Continue
                                        </Button>
                                        : null
                                }
                                
                            </Container>
                        </Grid>

                    </Grid>
                </Paper>

            </>
        )
    }
    return(<div></div>)
}

export default App;