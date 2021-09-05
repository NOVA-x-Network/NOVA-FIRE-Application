import React, { useEffect } from 'react';
import {
    TextField,
    Box,
    Typography,
    makeStyles,
    Container,
    MenuItem,
} from "@material-ui/core";
import { withFormik } from "formik";
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


const BasicInformationBody = props => {
    const { values, email, handleChange } = props
    const classes = myStyles();
    const genders = ['Male', 'Female', 'Prefer not to say', 'Other']
    useEffect(() => {
        const grade = document.querySelectorAll("#grade");
        const householdIncome = document.querySelectorAll("#householdIncome");
        const laptopAndInternetAccess = document.querySelectorAll("#laptopAndInternetAccess");
        const isFirstNation = document.querySelectorAll("#isFirstNation");
        const selectCheck = (target) => {
            var x = 0;
            while (x < target.length) {
                target[x].style.background = "#fff";
                target[x].style.color = "#1A6F4C";
                x++
            }
        }
        for (let i = 0; i < grade.length; i++) {
            if (grade[i].innerHTML == values.grade) {
                grade[i].style.background = "#1A6F4C";
                grade[i].style.color = "#fff";
            }
        }

        for (let i = 0; i < householdIncome.length; i++) {
            if (householdIncome[i].innerHTML == values.householdIncome) {
                householdIncome[i].style.background = "#1A6F4C";
                householdIncome[i].style.color = "#fff";
            }
        }
        for (let i = 0; i < laptopAndInternetAccess.length; i++) {
            if (laptopAndInternetAccess[i].innerHTML == values.laptopAndInternetAccess) {
                laptopAndInternetAccess[i].style.background = "#1A6F4C";
                laptopAndInternetAccess[i].style.color = "#fff";
            }
        }

        for (let i = 0; i < isFirstNation.length; i++) {
            if (isFirstNation[i].innerHTML == values.isFirstNation) {
                isFirstNation[i].style.background = "#1A6F4C";
                isFirstNation[i].style.color = "#fff";
            }
        }

        for (let i = 0; i < grade.length; i++) {
            grade[i].addEventListener("click", (e) => {
                selectCheck(grade)
                e.target.style.background = "#1A6F4C";
                e.target.style.color = "#fff";
                values.grade = e.target.innerHTML
            })
        }

        for (let i = 0; i < householdIncome.length; i++) {
            householdIncome[i].addEventListener("click", (e) => {
                selectCheck(householdIncome)
                e.target.style.background = "#1A6F4C";
                e.target.style.color = "#fff";
                values.householdIncome = e.target.innerHTML
            })
        }
        for (let i = 0; i < laptopAndInternetAccess.length; i++) {
            laptopAndInternetAccess[i].addEventListener("click", (e) => {
                selectCheck(laptopAndInternetAccess)
                e.target.style.background = "#1A6F4C";
                e.target.style.color = "#fff";
                values.laptopAndInternetAccess = e.target.innerHTML
                console.log("values")
            })
        }

        for (let i = 0; i < isFirstNation.length; i++) {
            isFirstNation[i].addEventListener("click", (e) => {
                selectCheck(isFirstNation)
                e.target.style.background = "#1A6F4C";
                e.target.style.color = "#fff";
                values.isFirstNation = e.target.innerHTML

            })
        }
        return () => {
            if (email) {
                db.collection("submissions").doc(email).set({ 'basicInfo': values }, { merge: true })
            }
        }
    });
    console.log(values)
    return (
            <Container style={{ marginLeft: "-5vw", fontFamily:"poppins"}}>
                        <form style={{ overflowY: `scroll`, overflowX: `hidden`, margin: `${-0.5}em ${0}px ${0}px ${-9}em`, width: `${58}vw`, height: `${75}vh`, }} id="2">
                            <div style={{ display: `flex`, marginTop: `${1.5}em`,  alignItems:"flex-start", flexDirection:"column" }}>
                                <Typography className={classes.heading}>Basic Information</Typography>
                                <Box style={{ display: `flex`, flexDirection: "row" }}>
                                    <Box>
                                        <TextField
                                            variant="outlined"
                                            type="text"
                                            size="small"
                                            onChange={handleChange}
                                            name="firstName"
                                            id="firstName"
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
                                            onChange={handleChange}
                                            name="lastName"
                                            id="lastName"
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
                                            onChange={handleChange}
                                            name="phoneNumber"
                                            id="phoneNumber"
                                            label="Phone Number (Optional)"
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
                                        onChange={handleChange}
                                        name="school"
                                        id="school"
                                        label="School "
                                        className={classes.text}
                                        value={values.school || ''}
                                    />
                                </Box>
                                <Box style={{ marginLeft: `${2}em` }} >
                                    <TextField
                                        variant="outlined"
                                        type="text"
                                        size="small"
                                        onChange={handleChange}
                                        name="city"
                                        id="city"
                                        label="City"
                                        className={classes.text}
                                        value={values.city || ''}
                                    />
                                </Box>
                                <Box style={{ marginLeft: `${2}em` }} >
                                    <TextField
                                        variant="outlined"
                                        type="text"
                                        select
                                        size="small"
                                        onChange={handleChange}
                                        name="gender"
                                        id="gender"
                                        label="Gender"
                                        className={classes.text}
                                        value={values.gender|| ''}
                                    >
                                        {genders.map((gender) => (
                                            <MenuItem key={gender} value={gender} id="gender">
                                                {gender}
                                            </MenuItem>
                                            ))}
                                    </TextField>
                                </Box>
                            </div>

                            <div style={{ display: `flex`, marginTop: `${2}em`, marginBottom: `${1}em`, overflow: `hidden` }}>
                                <Box style={{ display: `flex`, marginTop: `${1.6}em`, alignItems:"flex-start", flexDirection:"column" }}>
                                    <Typography className={classes.heading}>Current Grade</Typography>
                                    <Box style={{ display: `flex`, flexDirection: "row" }}>
                                        <Box className={classes.navigate} id="grade">9</Box>
                                        <Box className={classes.navigate} id="grade" >10</Box>
                                        <Box className={classes.navigate} id="grade">11</Box>
                                        <Box className={classes.navigate} id="grade"> 12</Box>
                                    </Box>
                                </Box>
                            </div>

                            <Box style={{ marginTop: `${2.5}em`, width: `${90}%`, display:"flex", alignItems: "flex-start", flexDirection:"column" }}>
                                <Typography className={classes.heading}>What is your household income?</Typography>

                                <Typography style={{ fontSize: `${1}em`}}>We ask for your household income to ensure that we are providing adequate opportunities to multiple students across Ontario</Typography>
                                <Box style={{ display: `flex`, marginTop: `${1.5}em`, width:"100%" }}>
                                    <Box className={classes.step} id="householdIncome"> {'<$35000'} </Box>
                                    <Box className={classes.step} id="householdIncome"> $35,000 - $55,000 </Box>
                                    <Box className={classes.step} id="householdIncome">$55,000 - $75,000</Box>
                                    <Box className={classes.step} id="householdIncome"> $100,000+</Box>
                                </Box>
                            </Box>

                            <div style={{ display: `flex`, marginTop: `${1}em`, marginBottom: `${1}em` }}>
                                <Box style={{ marginLeft: `${2}em` }}>
                                    <Typography style={{ color: `#323865`, fontWeight: 600, fontSize: `${1}em` }}>Do you have access to a laptop and internet  that you can complete the <br /> program at home?</Typography>
                                </Box>
                                <Box style={{ marginLeft: `${2}em` }}>
                                    <Box style={{ display: `flex` }}>
                                <Box className={classes.option} id="laptopAndInternetAccess">
                                    Yes
                                </Box>
                                <Box className={classes.option} id="laptopAndInternetAccess">
                                    No
                                </Box>
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
                                        <Box className={classes.option} id="isFirstNation" name='isFirstNation'>Yes</Box>
                                        <Box className={classes.option} id="isFirstNation" name='isFirstNation'>No</Box>
                                    </Box>
                                </Box>
                            </div>
                            <div style={{ display: "flex", flexDirection:"column", alignItems:"flex-start" }}>
                                <Typography className={classes.heading}>LinkedIn or Personal Portfolio (Optional)</Typography>
                                <TextField
                                    variant="outlined"
                                    type="text"
                                    size="small"
                                    onChange={handleChange}
                                    name="address"
                                    id="address"
                                    label="Link to LinkedIn or Personal Portfolio"
                                    className={classes.field}
                                />
                            </div>
                        </form>
            </Container>
    )
}
class BasicInformation extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            answers: {
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
            },
            email: ''
        }
    }
    componentDidMount() {
        firebaseAppAuth.onAuthStateChanged((user) => {
            db.collection("submissions").doc(user.email).get()
                .then((snapshot) => {
                    if (JSON.stringify(snapshot.data().basicInfo) !== '{}') {
                        this.setState({ answers: snapshot.data().basicInfo })
                    }
                    this.setState({ email: user.email })
                })
        })
    }
    render() {
        const BasicInformationForm = withFormik({
            mapPropsToValues: () => (this.state.answers)
        })(BasicInformationBody)
        return (<BasicInformationForm
            email={this.state.email}>
        </BasicInformationForm>)
    }
}
            export default BasicInformation;
