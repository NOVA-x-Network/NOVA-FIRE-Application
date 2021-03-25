import React,{useState} from 'react';
import {
  Paper,
   makeStyles,
  Grid,
  Button,
  Divider,
  Typography,
  Container,
  InputLabel,
  Box,
 Fab
} from "@material-ui/core";
import {Done} from "@material-ui/icons"
import Signup from "./Signup.js";
import Message from "./Message.js";
import Review from "./Review.js";

const useStyles = makeStyles(() => ({
  paper: {
    width: `${75}%`,
    height: `${90}vh`,
    background: `#fff`,
    marginTop: `${1.5}em`,
    marginLeft: `${8}em`,
    overflow:`hidden`,
  },
  first: {
    width: `${10}%`,
    height: `${90}vh`,
    background: `#0C75FF`,
   
  },
  text: {

    marginBottom:`${5}em`,
    marginLeft:`${1}em`
  },
  address: {
    marginTop:`${1}em`,
    height:`${7}em`
 
  },
  contain: {
    marginTop:`${2}em`
  },
  stepper: {
    Boxshadow:`${0}px ${0}px ${0}px #fff`,
    borderRadius:`${5}px`,
    height:`${20}px`,
    width:`${40}px`,
  },
  stepname: {
    marginTop:`${0.5}em`,
    marginLeft:`${0.5}em`
  }
}));
const App = () => {   
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(1);
  const handleNext = () => {
    setActiveStep(activeStep + 1)
  }
  const handlePrev = () => {
    setActiveStep(activeStep - 1)
  }
return (
<>
<style>{"body {background-color: #bfbaba; overflow:hidden;}"}</style>
<Paper className={classes.paper} elevation={10}>
<Grid container>
            <Grid className={classes.first} item xs={4}>

              </Grid>

              <Grid item xs={8}>
                <Container className={classes.contain} maxWidth="sm">
  <Box style={{display:`flex`,marginLeft:`${2}em`}}>
  <Box style={{display:`flex`,marginLeft:`${1}em`}}>
    <Fab className={classes.stepper} style={ activeStep >= 2 ? {background:`#ECF3FE`,color:`#0C75FF`}  :{background:`#0C75FF`,color:`#fff`}} size="small" disableRipple={true}>{activeStep >= 2 ? <Done/> : '1'}</Fab>
<Typography className={classes.stepname}>Sign Up</Typography>
</Box>
<Box style={{display:`flex`,marginLeft:`${1}em`}}>
<Fab className={classes.stepper} style={activeStep >= 2 ? activeStep >= 3  ? {background:`#ECF3FE`,color:`#0C75FF`}  : {background:`#0C75FF`,color:`#fff`} :null} size="small" disableRipple={true}> {activeStep >= 3 ? <Done/> : '2'}</Fab>
<Typography className={classes.stepname}>Message</Typography>
</Box>
<Box style={{display:`flex`,marginLeft:`${1}em`}}>
<Fab className={classes.stepper} style={activeStep >= 3 ? {background:`#0C75FF`,color:`#fff`}  : null} size="small" disableRipple={true}>{activeStep >= 4? <Done/> : '3'}</Fab>
<Typography className={classes.stepname}>Review</Typography>
</Box>
    </Box>
                  <Divider style={{marginTop:`${1}em`}}/>
                  <Container  style={{marginTop:`${2}em`}}>
                  <InputLabel shrink={true} style={{display:`block`}}>
       Step {activeStep}/3
        </InputLabel>
                <Typography variant="h5" style={{
                  color:`#02044A`,
                  fontWeight:900,
                }}> { activeStep === 1 ? "Sign Up" : null}{activeStep === 2   ?   "Message" :null} {activeStep === 3  ?   "Review" :null}</Typography>

      { activeStep === 1 ? <Signup increment={activeStep}/> : null}
      {  activeStep === 2    ? <Message/> : null}
      {  activeStep === 3   ?  <Review/>  : null}

     
</Container>
<Divider style={{marginTop:`${1}em`}}/>
<Button variant="contained" style={{
                background:`#0C75FF`,
                color:`#fff`,
                width:`${22}%`,
                height:`${42}px`,
                marginTop:`${1}em`,
                marginLeft:`${34}em`,
                fontSize:`${0.7}em`
                }} 
                onClick={handleNext}
                >
              {activeStep ===3 ? "Finish" :"Next Step"}  
              </Button>
{
activeStep > 1
            ?  <Button variant="contained" style={{
                background:`black`,
                color:`#fff`,
                width:`${22}%`,
                height:`${42}px`,
                marginTop:`${-6}em`,

                fontSize:`${0.7}em`
                }} 
                onClick={handlePrev}
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

export default App;