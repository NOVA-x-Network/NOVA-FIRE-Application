import React from "react";
import { makeStyles, Container, Typography} from "@material-ui/core";
const Description = () => {
    let descriptionStyles = makeStyles({
        body: {
            color: `#323865`,
            fontFamily: `poppins`,
            '& h5': {
                fontWeight: 900,
                marginTop:"30px"
            },
            '& span': {
                fontWeight:"bold"
            }
        }
    })
    let classes=descriptionStyles()
    return (
        <>
            <Container maxWidth="md" style={{ marginLeft: `${-15}em`, width: `${60}vw`, overflowY: `scroll`, height: `${75}vh` }} className={classes.body}>
                <Typography
                    align="left"
                >
                    Thank you for applying to participate in NOVA's FIRE (Fellowship for
                    Innovation, Research, and Education) Program. This application is due
                    <span> Monday, October 12, 2020</span>. All fields on each section of the application are <span>mandatory</span> unless they're explicitly stated to be optional. 
        </Typography>

                <Typography
                    variant="h5"
                >
                    About the NOVA x Network:
        </Typography>
                <Typography
                    align="left"
                >
                    The NOVA x Network helps youth develop a dynamic mindset towards STEM
                    through the fusion of disciplines and ethical literacy. Our goal is to
                    see more integration between STEM & non-STEM fields through diversity
                    in projects, jobs, and other endeavours.
        </Typography>
                <Typography
                    variant="h5"
                >
                    The NOVA FIRE Program:
        </Typography>
                <Typography
                    align="left"
                >
                    The NOVA Fellowship for Innovation, Research and Education (FIRE)
                    Program is a five-month virtual fellowship for high school students.
                    The program follow's NOVA's mission of integrating STEM and non-STEM
                    research and applying it towards real-life issues that require an
                    interdisciplinary and creative mindset to solve. The research prompts
                    for this year's fellowship are:
        </Typography>
                <ol>
                    <li style={{ color: `#323865`, fontFamily: `poppins`, }}>The effectiveness of music therapy on dementia patients</li>
                    <li style={{ color: `#323865`, fontFamily: `poppins`, }}> Water crisis in First Nation Reserves in Canada</li>
                    <li style={{ color: `#323865`, fontFamily: `poppins`, }}> Effectiveness of standardized testing internationally</li>
                    <li style={{ color: `#323865`, fontFamily: `poppins`, }}>Improve the efficiency of production and distribution of all food and agriculture products</li>
                </ol>
                <Typography
                    align="left"
                >
                    Students will be working in teams of five to six from November 2020 to March 2021 to research and complete tasks related to one of the above topics. We have broken up our topics into 2 streams:
                    Research & Development
                    Research & Publication
                    The former involves building a project following your research that can be technical or non technical, and includes topics 1 & 2. The latter involves writing a report that will be published on NOVA's website and includes topics 3 & 4. Each team will have 5 - 6 members for a total of 20 - 24 students accepted. As this is our pilot year of the program, we want to work with a tight-knit group of students to properly develop our program curriculum.
<Typography
                        variant="h5"
                    >
                        Who is eligible to apply:
 </Typography>
All Ontario high school students (grades 9 to 12) are eligible to apply for the fellowship. If you are an out-of-province international student interested in applying to the program, please keep an eye out for next year!
</Typography>
            </Container>
        </>
    );
};

export default Description;
