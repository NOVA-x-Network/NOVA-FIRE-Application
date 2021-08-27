import React, { useState, useEffect } from 'react';
import {
    TextField,
    Box,
    Typography,
    makeStyles,
    Container,
} from "@material-ui/core";
import { Formik } from "formik";
import * as Yup from "yup";
import firebaseApp from "../components/firebaseConfig.js";
import "firebase/firestore";
import "firebase/auth";
let db = firebaseApp.firestore()
const firebaseAppAuth = firebaseApp.auth();
const myStyles = makeStyles(() => ({
    text: {
        borderRadius: `${9}px`,
        width: `${15}em`,
        '& label.Mui-focused': {
            color: '#1A6F4C',
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: '#1A6F4C',
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: '#1A6F4C',
            },
            '&:hover fieldset': {
                borderColor: '#1A6F4C',
            },
            '&.Mui-focused fieldset': {
                borderColor: '#1A6F4C',
            },
        },
    },
    field: {
        borderRadius: `${9}px`,
        width: `${90}%`,
        marginTop: `${1.5}em`,
        '& label.Mui-focused': {
            color: '#1A6F4C',
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: '#1A6F4C',
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: '#1A6F4C',
            },
            '&:hover fieldset': {
                borderColor: '#1A6F4C',
            },
            '&.Mui-focused fieldset': {
                borderColor: '#1A6F4C',
            },
        },
    },
    navigate: {
        border: `${1}px solid #1A6F4C`,
        color: `#1A6F4C`,
        width: `${45}px`,
        height: `${25}px`,
        paddingTop: `${3}px`,
        borderRadius: `${8}px`,
        marginLeft: `${8}px`,
        textAlign: `center`,
        cursor: `pointer`,
    },
    heading: {
        color: `#323865`,
        fontWeight: 600,
        fontFamily: `poppins`,
        marginBottom: "10px",
        fontSize:"25px"
    },
    step: {
        border: `${1}px solid #1A6F4C`,
        color: `#1A6F4C`,
        width: `${100}%`,
        height: `${25}px`,
        borderRadius: `${10}px`,
        paddingTop: `${4}px`,
        marginLeft: `${8}px`,
        textAlign: `center`,
        cursor: `pointer`,
        fontSize: `${16}px`,
        fontFamily: `poppins`
    },
    option: {
        border: `${1}px solid #1A6F4C`,
        color: `#1A6F4C`,
        width: `${35}px`,
        height: `${20}px`,
        borderRadius: `${3}px`,
        margin: `${8}px`,
        textAlign: `center`,
        cursor: `pointer`,
        fontSize: `${13}px`,
        paddingTop: `${6}px`
    }
}));

const SignupSchema = Yup.object().shape({
    email: Yup.string().email(`please input a valid email`).required("Required field"),
    name: Yup.string().min(3, "Required field"),
    address: Yup.string().min(5, "Required field"),
    date: Yup.string().required("Required field"),
});


const BasicInformationForm = props => {
    const {saveOnChangeText, saveOnChangeSelect, answers, email}=props
    const classes = myStyles();
    const [value, setValue] = useState(9);
    const [internet, setInternet] = useState('Yes');
    const [indegious, setIndegious] = useState("Yes");
    const [Price, setPrice] = useState(">$35000");
    useEffect(() => {
        const id = document.querySelectorAll("#grade");
        const price = document.querySelectorAll("#householdIncome");
        const first = document.querySelectorAll("#laptopAndInternetAccess");
        const second = document.querySelectorAll("#isFirstNation");
        const tab = (target) => {
            var x = 0;
            while (x < target.length) {
                target[x].style.background = "#fff";
                target[x].style.color = "#1A6F4C";
                x++
            }
        }
        for (let i = 0; i < id.length; i++) {
            if (id[i].innerHTML == answers.grade) {
                id[i].style.background = "#1A6F4C";
                id[i].style.color = "#fff";
            }
        }

        for (let i = 0; i < price.length; i++) {
            if (price[i].innerHTML == answers.householdIncome) {
                price[i].style.background = "#1A6F4C";
                price[i].style.color = "#fff";
            }
        }
        for (let i = 0; i < first.length; i++) {
            if (first[i].innerHTML == answers.laptopAndInternetAccess) {
                first[i].style.background = "#1A6F4C";
                first[i].style.color = "#fff";
            }
        }

        for (let i = 0; i < second.length; i++) {
            if (second[i].innerHTML == answers.isFirstNation) {
                second[i].style.background = "#1A6F4C";
                second[i].style.color = "#fff";
            }
        }

        for (let i = 0; i < id.length; i++) {
            id[i].addEventListener("click", (e) => {
                tab(id)
                e.target.style.background = "#1A6F4C";
                e.target.style.color = "#fff";

            })
        }

        for (let i = 0; i < price.length; i++) {
            price[i].addEventListener("click", (e) => {
                tab(price)
                e.target.style.background = "#1A6F4C";
                e.target.style.color = "#fff";

            })
        }
        for (let i = 0; i < first.length; i++) {
            first[i].addEventListener("click", (e) => {
                tab(first)
                e.target.style.background = "#1A6F4C";
                e.target.style.color = "#fff";

            })
        }

        for (let i = 0; i < second.length; i++) {
            second[i].addEventListener("click", (e) => {
                tab(second)
                e.target.style.background = "#1A6F4C";
                e.target.style.color = "#fff";

            })
        }
    });

    console.log(email)
    return (
        <>

            <Container style={{ marginLeft: "-5vw", fontFamily:"poppins"}}>
                <Formik
                    enableReinitialize
                    initialValues={answers}
                    validationSchema={SignupSchema}
                >
                    {({ handleSubmit, handleChange, errors, values}) => (
                        <form style={{ overflowY: `scroll`, overflowX: `hidden`, margin: `${-0.5}em ${0}px ${0}px ${-9}em`, width: `${58}vw`, height: `${70}vh`, }} onSubmit={handleSubmit} id="2">
                            <div style={{ display: `flex`, marginTop: `${1.5}em`,  alignItems:"flex-start", flexDirection:"column" }}>
                                <Typography className={classes.heading}>Basic Information</Typography>
                                <Box style={{ display: `flex`, flexDirection: "row" }}>
                                    <Box>
                                        <TextField
                                            variant="outlined"
                                            type="text"
                                            size="small"
                                            onChange={(e)=>{handleChange(e); saveOnChangeText(e)}}
                                            name="firstName"
                                            id="firstName"
                                            error={errors.name}
                                            label="First Name"
                                            className={classes.text}
                                            value={values.firstName || ''}
                                        />
                                    </Box>
                                    <Box style={{ marginLeft: `${2}em` }}>
                                        <TextField
                                            variant="outlined"
                                            type="text"
                                            size="small"
                                             onChange={(e)=>{handleChange(e); saveOnChangeText(e)}}
                                            name="lastName"
                                            id="lastName"
                                            error={errors.name}
                                            label="Last Name"
                                            className={classes.text}
                                            value={values.lastName || ''}
                                        />
                                    </Box>

                                    <Box style={{ marginLeft: `${2}em` }}>
                                        <TextField
                                            variant="outlined"
                                            type="text"
                                            size="small"
                                             onChange={(e)=>{handleChange(e); saveOnChangeText(e)}}
                                            name="phoneNumber"
                                            id="phoneNumber"
                                            label="Phone Number (Optional)"
                                            error={errors.name}
                                            className={classes.text}
                                            value={values.phoneNumber || ''}
                                        />  
                                    </Box>
                                </Box>
                            </div>

                            <div style={{ display: `flex`, marginTop: `${2}em`, marginBottom: `${1}em` }}>
                                <Box>
                                    <TextField
                                        variant="outlined"
                                        type="text"
                                        size="small"
                                        onChange={(e)=>{handleChange(e); saveOnChangeText(e)}}
                                        name="school"
                                        id="school"
                                        label="School "
                                        error={errors.name}
                                        className={classes.text}
                                        value={values.school || ''}
                                    />
                                </Box>
                                <Box style={{ marginLeft: `${2}em` }} >
                                    <TextField
                                        variant="outlined"
                                        type="text"
                                        size="small"
                                         onChange={(e)=>{handleChange(e); saveOnChangeText(e)}}
                                        name="city"
                                        id="city"
                                        label="City"
                                        error={errors.name}
                                        className={classes.text}
                                        value={values.city || ''}
                                    />
                                </Box>
                            </div>

                            <div style={{ display: `flex`, marginTop: `${2}em`, marginBottom: `${1}em`, overflow: `hidden` }}>
                                <Box style={{ display: `flex`, marginTop: `${1.6}em`, alignItems:"flex-start", flexDirection:"column" }}>
                                    <Typography className={classes.heading}>Current Grade</Typography>
                                    <Box style={{ display: `flex`, flexDirection: "row" }}>
                                        <Box className={classes.navigate} id="grade" onClick={(e) => { saveOnChangeSelect(e) }} >9</Box>
                                        <Box className={classes.navigate} id="grade" onClick={(e) => { saveOnChangeSelect(e)  }}  >10</Box>
                                        <Box className={classes.navigate} id="grade" onClick={(e) => { saveOnChangeSelect(e)  }} >11</Box>
                                        <Box className={classes.navigate} id="grade" onClick={(e) => { saveOnChangeSelect(e)  }} > 12</Box>
                                    </Box>
                                </Box>
                            </div>

                            <Box style={{ marginTop: `${2.5}em`, width: `${90}%`, display:"flex", alignItems: "flex-start", flexDirection:"column" }}>
                                <Typography className={classes.heading}>What is your household income?</Typography>

                                <Typography style={{ fontSize: `${1}em`}}>We ask for your household income to ensure that we are providing adequate opportunities to multiple students across Ontario</Typography>
                                <Box style={{ display: `flex`, marginTop: `${1.5}em`, width:"100%" }}>
                                    <Box className={classes.step} id="householdIncome" onClick={(e) => { saveOnChangeSelect(e) }}> {Price} </Box>
                                    <Box className={classes.step} id="householdIncome" onClick={(e) => { saveOnChangeSelect(e) }}> $35,000 - $55,000 </Box>
                                    <Box className={classes.step} id="householdIncome" onClick={(e) => { saveOnChangeSelect(e) }}>$55,000 - $75,000</Box>
                                    <Box className={classes.step} id="householdIncome" onClick={(e) => { saveOnChangeSelect(e) }}> $100,000+</Box>
                                </Box>
                            </Box>

                            <div style={{ display: `flex`, marginTop: `${1}em`, marginBottom: `${1}em` }}>
                                <Box style={{ marginLeft: `${2}em` }}>
                                    <Typography style={{ color: `#323865`, fontWeight: 600, fontSize: `${1}em` }}>Do you have access to a laptop and internet  that you can complete the <br /> program at home?</Typography>
                                </Box>

                                <Box style={{ marginLeft: `${2}em` }}>
                                    <Box style={{ display: `flex` }}>
                                        <Box className={classes.option} id="laptopAndInternetAccess" onClick={(e) => { saveOnChangeSelect(e) }} >{internet}</Box>
                                        <Box className={classes.option} id="laptopAndInternetAccess" onClick={(e) => { saveOnChangeSelect(e) }}>No</Box>
                                    </Box>
                                </Box>
                            </div>

                            <div style={{ display: `flex`, marginTop: `${2}em`, marginBottom: `${1}em` }}>
                                <Box style={{ marginLeft: `${2}em` }}>
                                    <Typography style={{ color: `#323865`, fontWeight: 600, fontSize: `${1}em` }}>Do you wish to self‑identify as an Indigenous person  in Canada, such as <br />
First Nation, Métis or Inuit?</Typography>
                                </Box>

                                <Box style={{ marginLeft: `${1}em` }}>
                                    <Box style={{ display: `flex` }}>
                                        <Box className={classes.option} id="isFirstNation" onClick={(e) => { saveOnChangeSelect(e) }}>{indegious}</Box>
                                        <Box className={classes.option} id="isFirstNation" onClick={(e) => { saveOnChangeSelect(e) }}>No</Box>
                                    </Box>
                                </Box>
                            </div>
                            <div style={{ display: "flex", flexDirection:"column", alignItems:"flex-start" }}>
                                <Typography className={classes.heading}>LinkedIn or Personal Portfolio (Optional)</Typography>
                                <TextField
                                    variant="outlined"
                                    type="text"
                                    size="small"
                                    onChange={(e) => { handleChange(e); saveOnChangeText(e) }}
                                    name="address"
                                    id="address"
                                    label="Link to LinkedIn or Personal Portfolio"
                                    placeholder="e.g IB,AP,GHSM"
                                    error={errors.address}
                                    className={classes.field}
                                />
                            </div>
                        </form>
                    )}
                </Formik>
            </Container>
        </>
    )
}
class BasicInformation extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            answers: {
                firstName: "",
                lastName: "",
                school:"",
                phoneNumber: "",
                city: "",
                grade: "",
                householdIncome: "",
                laptopAndInternetAccess: "",
                isFirstNation: "",
            },
            email:''
        }
    }
    componentDidMount() {
        firebaseAppAuth.onAuthStateChanged((user) => {
            if (user) {
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/firebase.User
                db.collection("submissions").doc(user.email).get()
                    .then((snapshot) => {
                        if (typeof snapshot.data() !== 'undefined') {
                            this.setState({ answers: snapshot.data().basicInfo })
                        }
                        this.setState({ email: user.email })
                    })
                // ...
            } else {
                // User is signed out
                // ...
            }
        })
    }
    render() {
        return (<BasicInformationForm answers={this.state.answers} email={this.state.email}
            saveOnChangeText={(event) => {
                let field = event.target.id
                let value = event.target.value
                console.log(value)
                console.log(event.target.id)
                let mapValueToField = {}
                mapValueToField[field] = value
                db.collection("submissions").doc(this.state.email).set({ 'basicInfo': mapValueToField }, { merge: true })
            }}
            saveOnChangeSelect={(event) => {
                let field = event.target.id
                let value = event.target.innerHTML
                let mapValueToField = {}
                mapValueToField[field] = value
                db.collection("submissions").doc(this.state.email).set({ 'basicInfo': mapValueToField }, { merge: true })
                }}>
            </BasicInformationForm>)
     }
}
            export default BasicInformation;
