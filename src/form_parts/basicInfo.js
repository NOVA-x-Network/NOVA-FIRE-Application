import React, { useEffect, useState } from 'react';
import {
    TextField,
    Box,
    Typography,
    withStyles,
    Container,
    MenuItem,
    Input
} from "@material-ui/core";
import { withFormik } from "formik";
import firebaseApp from "../components/firebaseConfig.js";
import "firebase/firestore";
import "firebase/auth";
import getData from "./dataWrapper.js"
let db = firebaseApp.firestore()

class BasicInformationBody extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        const { values, changeHandler } = this.props

        function formikHandleChange(e) {
            return null
        }

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
                changeHandler(e, formikHandleChange)
            })
        }

        for (let i = 0; i < householdIncome.length; i++) {
            householdIncome[i].addEventListener("click", (e) => {
                selectCheck(householdIncome)
                e.target.style.background = "#1A6F4C";
                e.target.style.color = "#fff";
                values.householdIncome = e.target.innerHTML
                changeHandler(e, formikHandleChange)
            })
        }
        for (let i = 0; i < laptopAndInternetAccess.length; i++) {
            laptopAndInternetAccess[i].addEventListener("click", (e) => {
                selectCheck(laptopAndInternetAccess)
                e.target.style.background = "#1A6F4C";
                e.target.style.color = "#fff";
                values.laptopAndInternetAccess = e.target.innerHTML
                changeHandler(e, formikHandleChange)
            })
        }

        for (let i = 0; i < isFirstNation.length; i++) {
            isFirstNation[i].addEventListener("click", (e) => {
                selectCheck(isFirstNation)
                e.target.style.background = "#1A6F4C";
                e.target.style.color = "#fff";
                values.isFirstNation = e.target.innerHTML
                changeHandler(e, formikHandleChange)
            })
        }
    }
    componentWillUnmount() {
        this.props.unmountHandler(this.props.values)
    }
    render() {
        const genders = ['Male', 'Female', 'Prefer not to say', 'Other']
        const { values, classes, changeHandler } = this.props
        const formikHandleChange = this.props.handleChange
        return (
            <Container style={{ fontFamily: "poppins"}}>
                <form style={{ overflowY: `scroll`, overflowX: `hidden`, margin: `${0}em ${0}px ${0}px ${0}em`, width: `${58}vw`, height: `${75}vh`, }} id="2">
                    <div style={{ display: `flex`, marginTop: `${1.5}em`, alignItems: "flex-start", flexDirection: "column"}}>
                        <Typography className={classes.heading}>Basic Information</Typography>
                        <div style={{ width:"60vw"}}>
                                <TextField
                                    variant="outlined"
                                    type="text"
                                    size="small"
                                    onChange={(e) => {changeHandler(e, formikHandleChange)}}
                                    name="firstName"
                                    id="firstName"
                                    label="First Name"
                                    className={classes.text}
                                    value={values.firstName || ''}
                                    inputProps={{maxLength:30}}
                                />
                                <TextField
                                    variant="outlined"
                                    type="text"
                                    size="small"
                                    onChange={(e) => {changeHandler(e, formikHandleChange)}}
                                    name="lastName"
                                    id="lastName"
                                    label="Last Name"
                                    className={classes.text}
                                    value={values.lastName || ''}
                                    inputProps={{maxLength:30}}
                                />

                                <TextField
                                    variant="outlined"
                                    type="text"
                                    size="small"
                                    onChange={(e) => {changeHandler(e, formikHandleChange)}}
                                    name="phoneNumber"
                                    id="phoneNumber"
                                    label="Phone Number (Optional)"
                                    className={classes.text}
                                    value={values.phoneNumber || ''}
                                />
                        </div>
                    </div>

                    <div style={{marginTop: `${2}em`, marginBottom: `${1}em` }}>
                            <TextField
                                variant="outlined"
                                type="text"
                                size="small"
                                onChange={(e) => {changeHandler(e, formikHandleChange)}}
                                name="school"
                                id="school"
                                label="School "
                                className={classes.text}
                                value={values.school || ''}
                                inputProps={{ maxLength: 60 }}
                            />
                            <TextField
                                variant="outlined"
                                type="text"
                                size="small"
                                onChange={(e) => {changeHandler(e, formikHandleChange)}}
                                name="city"
                                id="city"
                                label="City"
                                className={classes.text}
                                value={values.city || ''}
                                inputProps={{ maxLength: 45 }}
                            />
                            <TextField
                                variant="outlined"
                                type="text"
                                select
                                size="small"
                                onChange={(e) => {changeHandler(e, formikHandleChange)}}
                                name="gender"
                                id="gender"
                                label="Gender"
                                className={classes.text}
                                value={values.gender || ''}
                            >
                                {genders.map((gender) => (
                                    <MenuItem key={gender} value={gender} id="gender">
                                        {gender}
                                    </MenuItem>
                                ))}
                            </TextField>
                    </div>

                    <div style={{ display: `flex`, marginTop: `${2}em`, marginBottom: `${1}em`, overflow: `hidden` }}>
                        <Box style={{ display: `flex`, marginTop: `${1.6}em`, alignItems: "flex-start", flexDirection: "column" }}>
                            <Typography className={classes.heading}>Current Grade</Typography>
                            <Box style={{ display: `flex`, flexDirection: "row" }}>
                                <Box className={classes.navigate} id="grade">9</Box>
                                <Box className={classes.navigate} id="grade" >10</Box>
                                <Box className={classes.navigate} id="grade">11</Box>
                                <Box className={classes.navigate} id="grade"> 12</Box>
                            </Box>
                        </Box>
                    </div>

                    <Box style={{ marginTop: `${2.5}em`, width: `${90}%`, display: "flex", alignItems: "flex-start", flexDirection: "column" }}>
                        <Typography className={classes.heading}>What is your household income?</Typography>

                        <Typography style={{ fontSize: `${1}em` }}>We ask for your household income to ensure that we are providing adequate opportunities to multiple students across Ontario</Typography>
                        <Box style={{ display: `flex`, marginTop: `${1.5}em`, width: "100%" }}>
                            <Box className={classes.step} id="householdIncome"> {'<$35000'} </Box>
                            <Box className={classes.step} id="householdIncome"> $35,000 - $55,000 </Box>
                            <Box className={classes.step} id="householdIncome">$55,000 - $75,000</Box>
                            <Box className={classes.step} id="householdIncome"> $100,000+</Box>
                        </Box>
                    </Box>

                    <div style={{ display: `flex`, marginTop: `${1}em`, marginBottom: `${1}em` }}>
                        <Box style={{ marginLeft: `${2}em` }}>
                            <Typography style={{ color: `#323865`, fontWeight: 600, fontSize: `${1}em`, width:"35vw" }}>Do you have access to a laptop and internet  that you can complete the program at home?</Typography>
                        </Box>
                        <Box style={{ marginLeft: `5vw` }}>
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
                            <Typography style={{ color: `#323865`, fontWeight: 600, fontSize: `${1}em`, width:"35vw"}}>Do you wish to self‑identify as an Indigenous person  in Canada, such as 
                                First Nation, Métis or Inuit?</Typography>
                        </Box>

                        <Box style={{ marginLeft: `5vw`}}>
                            <Box style={{ display: `flex` }}>
                                <Box className={classes.option} id="isFirstNation" name='isFirstNation'>Yes</Box>
                                <Box className={classes.option} id="isFirstNation" name='isFirstNation'>No</Box>
                            </Box>
                        </Box>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                        <Typography className={classes.heading}>LinkedIn or Personal Portfolio (Optional)</Typography>
                        <TextField
                            variant="outlined"
                            type="text"
                            size="small"
                            onChange={(e) => {changeHandler(e, formikHandleChange)}}
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
}


const BasicInformationForm = withFormik({
    mapPropsToValues: (props) => (props.answers)
})(BasicInformationBody)

const StyledBasicInfo = withStyles({
    text: {
        borderRadius: `${9}px`,
        width: `15vw`,
        marginLeft: "20px",
        marginTop: "20px",
        minWidth: "150px",
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
        fontSize: "25px"
    },
    step: {
        border: `${1}px solid #1A6F4C`,
        color: `#1A6F4C`,
        width: `${100}%`,
        height: `${25}px`,
        borderRadius: `${10}px`,
        paddingTop: `${4}px`,
        marginLeft: `${8}px`,
        cursor: `pointer`,
        fontSize: `calc(6px + 0.5vw)`,
        fontFamily: `poppins`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
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
})(BasicInformationForm)

const BasicInformation = getData("basicInfo", StyledBasicInfo)

export default BasicInformation
