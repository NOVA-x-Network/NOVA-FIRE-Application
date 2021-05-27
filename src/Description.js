import React from "react";
import { Typography, Container } from "@material-ui/core";

const Description = () => {
  return (
    <>
      <Container maxWidth="sm" style={{marginLeft:`${-5}em`,width:`${55}vw`,overflowY:`scroll`,height:`${70}vh`}}>
        <Typography
          variant="p"
          style={{ color: `#323865`, fontFamily: `poppins` }}
        >
          Thank you for applying to participate in NOVA’s FIRE (Fellowship for
          Innovation, Research, and Education) Program. This application is due
          Monday, October 12, 2020, and must be uploaded to our Dropbox folder
          here: https://www.dropbox.com/request/4DSbWU1eYvTJTZWOGd6O. Note that
          we also require that you submit your transcript/most recent report
          card (for gr 9s) along with your application.
        </Typography>

        <Typography
          variant="h5"
          style={{ color: `#323865`, fontWeight: 900, fontFamily: `poppins` ,}}
        >
          About the NOVA x Network:
        </Typography>
        <Typography
          variant="p"
          style={{ color: `#323865`, fontFamily: `poppins`,}}
        >
          The NOVA x Network helps youth develop a dynamic mindset towards STEM
          through the fusion of disciplines and ethical literacy. Our goal is to
          see more integration between STEM & non-STEM fields through diversity
          in projects, jobs, and other endeavours.
        </Typography>
        <Typography
          variant="h5"
          style={{ color: `#323865`, fontWeight: 900, fontFamily: `poppins`,  }}
        >
          The NOVA FIRE Program:
        </Typography>
        <Typography
          variant="p"
          style={{ color: `#323865`, fontFamily: `poppins` , }}
        >
          The NOVA Fellowship for Innovation, Research and Education (FIRE)
          Program is a five-month virtual fellowship for high school students.
          The program follow’s NOVA’s mission of integrating STEM and non-STEM
          research and applying it towards real-life issues that require an
          interdisciplinary and creative mindset to solve. The research prompts
          for this year’s fellowship are:
        </Typography>
        <ol>
        <li  style={{ color: `#323865`, fontFamily: `poppins` , }}>The effectiveness of music therapy on dementia patients</li>
        <li  style={{ color: `#323865`, fontFamily: `poppins` , }}> Water crisis in First Nation Reserves in Canada</li>
        <li  style={{ color: `#323865`, fontFamily: `poppins` , }}> Effectiveness of standardized testing internationally</li> </ol>
      </Container>
    </>
  );
};

export default Description;
