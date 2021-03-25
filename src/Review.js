import React from "react"
import{
Container
} from "@material-ui/core"
import Signup from "./Signup.js";
import Message from "./Message.js";


const Review = () => {
return(
    <>
<Container style={{overflowY:`scroll`,height:`${45}vh`}}>
    <Signup/>
    <Message/>
</Container>
    </>
)
}

export default Review;