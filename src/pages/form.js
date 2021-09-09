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
const myStyles = makeStyles(() => ({
    paper: {
        width: `${85}%`,
        height: `${93}vh`,
        background: `#fff`,
        marginTop: `${1.5}em`,
        marginLeft: `${8}em`,
        overflow: `hidden`,
        fontFamily:"poppins"
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
        fontSize: `${1}em`,
        display: `inline-block`
    },
}));


const App = ()=> {
    const classes = myStyles();
    const [activeStep, setActiveStep] = useState(1);
    const [gotAuthStatus, setAuthStatus] = useState(false)
    const [userStatus, setUserStatus] = useState(null)
    const [formData, setFormData] = useState({})
    const [email, setEmail] = useState('')
    const handleNext = () => {
        setActiveStep(activeStep + 1)
    }

    const handlePrev = () => {
        setActiveStep(activeStep - 1)
    }

    const getFormSectionData = (data) => {
        setFormData(data)
    }

    useEffect(() => {
        firebaseAppAuth.onAuthStateChanged((user) => {
            if (user) {
                setEmail(user.email)
                db.collection("submissions").doc(user.email).get()
                    .then((snapshot)=> {
                        if (typeof snapshot.data() === 'undefined') {
                            db.collection("submissions").doc(user.email).set({ basicInfo: {}, longAnswer: {}, survey: {}, files: {}, applicationStatus:"Incomplete" })
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
                <style>{"body {background-color: #bfbaba; overflow:hidden;}"}</style>
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
                                    id="exitButton"
                                    style={{
                                        background: `#fff`,
                                        color: `#1A6F4C`,
                                        width: `${90}%`,
                                        height: `${25}px`,
                                        marginTop: `${1}em`,
                                        marginLeft: `${1}em`,
                                        fontSize: `${1}em`,
                                        borderRadius: `${0.5}em`,
                                        fontFamily: `poppins`,
                                        fontWeight: 900,
                                    }}
                                    onClick={() => {
                                        setTimeout(() => {
                                            window.location = "/"
                                        },300)
                                    }}
                                >Save and Exit <CloseIcon /></Button>
                                <Typography style={{ marginTop: "30px" }}>Tip: Clicking "Back", "Continue", or each of the above section labels automatically saves your work. </Typography>
                                <Typography style={{ marginTop: "30px" }}>Note: Every time you change your answers after submitting, you will have to reverify and resubmit them. </Typography>
                            </Container>
                        </Grid>

                        <Grid item xs={9}>
                            <Container className={classes.contain} maxWidth="sm">


                                <Container>
                                    {activeStep === 1 ? <Description /> : null}
                                    {activeStep === 2 ? <BasicInformation sendDataToFormParent={getFormSectionData}/> : null}
                                    {activeStep === 3 ? <LongResponses /> : null}
                                    {activeStep === 4 ? <Survey /> : null}
                                    {activeStep === 5 ? <Upload /> : null}
                                    {activeStep === 6 ? <Review />: null}


                                </Container>
                                {
                                    activeStep < 6 ?
                                        <Button variant="contained" style={{
                                            background: `#1A6F4C`,
                                            color: `#fff`,
                                            width: `${32}%`,
                                            height: `${30}px`,
                                            marginTop: `${2}em`,
                                            marginLeft: `${38}em`,
                                            fontSize: `${0.8}em`,
                                            borderRadius: `${0.5}em`,
                                            fontFamily: `poppins`,
                                            fontWeight: 900
                                        }}
                                            onClick={handleNext}
                                            form={activeStep.toString()}
                                        >
                                            Continue
                                        </Button>
                                        :null
                                        }
                                {
                                    activeStep > 1
                                        ? <Button variant="contained" style={{
                                            background: `#1A6F4C`,
                                            color: `#fff`,
                                            width: `${32}%`,
                                            height: `${30}px`,
                                            marginTop: `${-4}em`,
                                            fontFamily: `poppins`,
                                            fontSize: `${0.8}em`,
                                            fontWeight: 900
                                        }}
                                            onClick={handlePrev}
                                            form={activeStep.toString()}
                                        >
                                            Back
                                        </Button>
                                        :
                                        null
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