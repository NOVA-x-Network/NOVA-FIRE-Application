import React from 'react';
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
import getData from "./dataWrapper.js"

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
        const canAttendGala = document.querySelectorAll("#canAttendGala")

        const selectCheck = (target) => {
            var x = 0;
            while (x < target.length) {
                target[x].style.background = "#fff";
                target[x].style.color = "#1A6F4C";
                x++
            }
        }

        console.log(grade[0])
        console.log(values)

        const setHandleSelect = (target) => {
            for (let i = 0; i < target.length; i++) {
                if (target[i].innerHTML == values[target[0].id]) {
                    target[i].style.background = "#1A6F4C";
                    target[i].style.color = "#fff";
                }
            }

            for (let i = 0; i < target.length; i++) {
                target[i].addEventListener("click", (e) => {
                    selectCheck(target)
                    e.target.style.background = "#1A6F4C";
                    e.target.style.color = "#fff";
                    values[target[0].id] = e.target.innerHTML
                    changeHandler(e, formikHandleChange, values)
                })
            }
        }

        setHandleSelect(grade)

        setHandleSelect(laptopAndInternetAccess)

        setHandleSelect(isFirstNation)

        setHandleSelect(householdIncome)

        setHandleSelect(canAttendGala)

    }
    componentWillUnmount() {
        this.props.unmountHandler(this.props.values)
    }
    render() {
        const genders = ['Male', 'Female', 'Prefer not to say', 'Other']
        const { values, classes, changeHandler } = this.props
        const formikHandleChange = this.props.handleChange
        return (
            <Container style={{ fontFamily: "poppins", marginLeft:"0vw"}}>
                <form style={{ overflowY: `scroll`, overflowX: `hidden`, marginLeft: `${2}vw`, overflowY: `scroll`, height: `75vh` }} id="2">
                    <Typography className={classes.heading}>Basic Information</Typography>
                    <Box style={{ display: `flex`, flexDirection: "row", flexWrap: "wrap", rowGap: "10px", columnGap: "10px"}}>
                                <TextField
                                    variant="outlined"
                                    type="text"
                                    size="small"
                                    onChange={(e) => {changeHandler(e, formikHandleChange, values)}}
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
                                    onChange={(e) => {changeHandler(e, formikHandleChange, values)}}
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
                                    onChange={(e) => {changeHandler(e, formikHandleChange, values)}}
                                    name="phoneNumber"
                                    id="phoneNumber"
                                    label="Phone Number"
                                    className={classes.text}
                                    value={values.phoneNumber || ''}
                                />
                            <TextField
                                variant="outlined"
                                type="text"
                                size="small"
                                onChange={(e) => {changeHandler(e, formikHandleChange, values)}}
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
                                onChange={(e) => { changeHandler(e, formikHandleChange, values) }}
                                name="regionalProgram"
                                id="regionalProgram"
                                label="Regional Program"
                                className={classes.text}
                                value={values.regionalProgram || ''}
                                inputProps={{ maxLength: 60 }}
                            />
                            <TextField
                                variant="outlined"
                                type="text"
                                size="small"
                                onChange={(e) => {changeHandler(e, formikHandleChange, values)}}
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
                                onChange={(e) => {changeHandler(e, formikHandleChange, values)}}
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
                    </Box>

                    <div style={{ display: `flex`, marginTop: `${2}em`, marginBottom: `${1}em`, overflow: `hidden` }}>
                        <Box style={{ display: `flex`, marginTop: `${1.6}em`, alignItems: "flex-start", flexDirection: "column" }}>
                            <Typography className={classes.heading}>Current Grade</Typography>
                            <Box className={classes.section}>
                                <Box className={classes.navigate} id="grade">9</Box>
                                <Box className={classes.navigate} id="grade" >10</Box>
                                <Box className={classes.navigate} id="grade">11</Box>
                                <Box className={classes.navigate} id="grade"> 12</Box>
                            </Box>
                        </Box>
                    </div>

                    <Box style={{ marginTop: `${2.5}em`, width: `${90}%`, display: "flex", alignItems: "flex-start", flexDirection: "column" }}>
                        <Typography className={classes.heading}>What is your household income?</Typography>

                        <Typography style={{ fontSize: `${0.8}em` }}>We ask for your household income to ensure that we are providing adequate opportunities to a variety of students from all SES backgrounds. We want to ensure equity and understand that extracurricular access can vary due to income, as opportunities are costly and often hard to find for low income students.</Typography>
                        <Box className={classes.section}>
                            <Box className={classes.step} id="householdIncome"> {'<$35000'} </Box>
                            <Box className={classes.step} id="householdIncome"> $35,000 - $55,000 </Box>
                            <Box className={classes.step} id="householdIncome">$55,000 - $75,000</Box>
                            <Box className={classes.step} id="householdIncome">$75,000 - $100,000</Box>
                            <Box className={classes.step} id="householdIncome">{'>$100,000'}</Box>
                        </Box>
                    </Box>

                    <div style={{ display: `flex`, marginTop: `${1}em`, marginBottom: `${1}em`, flexWrap: "wrap" }}>
                        <Box>
                            <Typography style={{ color: `#323865`, fontWeight: 600, fontSize: `${0.8}em`, width: "35vw"}}>Do you have access to a laptop and internet  that you can complete the program at home?</Typography>
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
                    <div style={{ display: `flex`, marginTop: `${1}em`, marginBottom: `${1}em`, flexWrap: "wrap" }}>
                        <Box>
                            <Typography style={{ color: `#323865`, fontWeight: 600, fontSize: `${0.8}em`, width: "35vw" }}>We are planning an in person final gala at the end of the fellowship that would take place
                                in downtown Toronto (Covid permitting). Would you be able to attend this event at the end of May?</Typography>
                        </Box>
                        <Box style={{ marginLeft: `5vw` }}>
                            <Box style={{ display: `flex` }}>
                                <Box className={classes.option} id="canAttendGala">
                                    Yes
                                </Box>
                                <Box className={classes.option} id="canAttendGala">
                                    No
                                </Box>
                            </Box>
                        </Box>
                    </div>

                    <div style={{ display: `flex`, marginTop: `${2}em`, marginBottom: `${1}em`, flexWrap:"wrap" }}>
                        <Box>
                            <Typography style={{ color: `#323865`, fontWeight: 600, fontSize: `${0.8}em`, width:"35vw"}}>Do you wish to self‑identify as an Indigenous person  in Canada, such as 
                                First Nation, Métis or Inuit?</Typography>
                        </Box>

                        <Box style={{ marginLeft: `5vw`}}>
                            <Box style={{ display: `flex` }}>
                                <Box className={classes.option} id="isFirstNation" name='isFirstNation'>Yes</Box>
                                <Box className={classes.option} id="isFirstNation" name='isFirstNation'>No</Box>
                            </Box>
                        </Box>
                    </div><br/>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                        <Typography className={classes.heading}>LinkedIn or Personal Portfolio (Optional)</Typography>
                        <TextField
                            variant="outlined"
                            type="text"
                            size="small"
                            onChange={(e) => {changeHandler(e, formikHandleChange, values)}}
                            name="address"
                            id="address"
                            label="Link"
                            className={classes.field}
                        />
                    </div><br/>
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
    section:{
        display: "flex",
        flexWrap: "wrap",
        rowGap: "15px",
        columnGap:"15px",
        justifyContent: "center",
        marginBottom: "20px",
        width:"100%"
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
        height: `auto`,
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
        width: `175px`,
        height: `auto`,
        borderRadius: `${10}px`,
        paddingTop: `${4}px`,
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
        height: `auto`,
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
