
import React from 'react';
import {
  TextField,
  InputLabel,
  Box,
} from "@material-ui/core";
import { Formik } from "formik";
import * as Yup from "yup";


const SignupSchema = Yup.object().shape({
    email: Yup.string().email(`please input a valid email`).required("Required field"),
    name:Yup.string().min(3,"Required field"),
    address:Yup.string().min(5,"Required field"),
    date:Yup.string().required("Required field"),
  });


const Signup = ({increment}) => {
    return(
        <>
         <Formik
                  enableReinitialize
                    initialValues={{
                      name: "",
                      email: "",
                      address: "",
                      date:"",
                    }}
                    validationSchema={SignupSchema}
                    onSubmit={(Values) => increment + 1}
                  >
                        {({ handleSubmit, handleChange, errors }) => (
                             <form onSubmit={handleSubmit}>
    <div style={{display:`flex`,marginTop:`${1.5}em`}}>
  <Box>
<InputLabel shrink={true} style={{color:`#494A7D`}}>
          First Name
        </InputLabel>
<TextField
variant="outlined"
type="text"
size="small"
onChange={handleChange}
name="name"
id="name"
error={errors.name}
/>
</Box>

<Box style={{marginLeft:`${1}em`}}>
<InputLabel shrink={true} style={{color:`#494A7D`}}>
          Last Name
        </InputLabel>
<TextField
variant="outlined"
type="text"
size="small"
onChange={handleChange}
name="name"
id="name"
error={errors.name}
/>
</Box>
</div>

<div style={{display:`flex`,marginTop:`${1}em`,marginBottom:`${1}em`}}>
  <Box>
<InputLabel shrink={true} style={{color:`#494A7D`}}>
       Date of Birth
        </InputLabel>
<TextField
variant="outlined"
type="date"
size="small"
onChange={handleChange}
name="date"
id="date"
error={errors.date}
/>
</Box>

<Box  style={{marginLeft:`${2}em`}}>
<InputLabel shrink={true} style={{color:`#494A7D`}}>
       Email Address
        </InputLabel>
<TextField
variant="outlined"
type="email"
size="small"
onChange={handleChange}
name="email"
id="email"
error={errors.email}
/>
</Box>
</div>
<InputLabel shrink={true} style={{color:`#494A7D`}}>
      Address
        </InputLabel>
<TextField
variant="outlined"
type="text"
fullWidth={true}
size="small"
onChange={handleChange}
name="address"
id="address"
error={errors.address}
/>
</form>
 )}
</Formik>
</>
    )
}

export default Signup;