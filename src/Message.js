import React from "react"
import{
Radio,
RadioGroup,
FormControlLabel ,
FormControl ,
FormLabel,
TextareaAutosize
} from "@material-ui/core"

const Message = () => {
    const [value, setValue] = React.useState('String');
    const handleChange = (event) => {
      setValue(event.target.value);
    };
return(
    <>
    <TextareaAutosize></TextareaAutosize>



<FormControl component="fieldset">
      <FormLabel component="legend">How Did You Hear About Us</FormLabel>
      <RadioGroup aria-label="gender" name="gender1" value={value} onChange={handleChange}>
        <FormControlLabel value="Facebook" control={<Radio />} label="Facebook" />
        <FormControlLabel value="Twitter" control={<Radio />} label="Twitter" />
        <FormControlLabel value="Google" control={<Radio />} label="Google" />
        <FormControlLabel value="Other" control={<Radio />} label="Other" />
      </RadioGroup>
    </FormControl>
    </>
)
}

export default Message;