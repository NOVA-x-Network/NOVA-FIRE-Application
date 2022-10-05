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
            <Container className="descriptionText" style={{ marginLeft: `${2}vw`, width: `${65}vw`, overflowY: `scroll`, height: `75vh` }} className={classes.body}>
                <Typography
                    align="left"
                >
                    Thank you for applying to participate in NOVA's FIRE (Fellowship for
                    Innovation, Research, and Education) Program. This application is due
                    <span> Tuesday, November 30, 2021, at 11:59pm</span>. Note that we also require that you submit your <span>transcript/most recent report card</span> (for gr 9s) along with your application. 
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
                    The NOVA Fellowship for Innovation, Research and Education (FIRE) Program is a five-month online 
                    fellowship for high school students. The program follow’s NOVA’s mission of integrating STEM and 
                    non-STEM research and applying it towards real-life issues that require an interdisciplinary and 
                    creative mindset to solve. The research prompts for this year’s fellowship are:
                </Typography>
                <ol>
                    <li style={{ color: `#323865`, fontFamily: `poppins`, fontWeight: `bold`}}>Developing Technologies to Reduce Plastic Waste</li>
                    <Typography
                        align="left"
                    >
                        Canada throws away over 3 million tonnes of plastic waste every year. Only 9% of that is recycled. 
                        This group will research what the biggest bottle neck in this issue is, and develop tools for 
                        everyday households to reduce plastic waste. This may include a cheap household garbage sorter, 
                        or a campaign to better inform the public.

                    </Typography>
                    <li style={{ color: `#323865`, fontFamily: `poppins`, fontWeight: `bold`}}>Studying the Impact Meditation has on Memory</li>
                    <Typography
                        align="left"
                    >
                        Meditation is known to have many scientific benefits, namely improving mental health by 
                        helping with stress management. One of the more debated claims is whether or not meditation 
                        alone can improve memory and concentration. This group will conduct experiments and analyze 
                        the brain using an EEG headset to determine if meditating truly improves one's ability to
                        recall short term and long term memory. 
                    </Typography>
                    <li style={{ color: `#323865`, fontFamily: `poppins`, fontWeight: `bold`}}>Studying the different modes of learning, and what part of the brain is active during each one</li>
                    <Typography
                        align="left"
                    >
                        People have often been categorized by the type of learner they are, for example, visual, auditory, 
                        or sensory. This group will study whether there is basis to these claims, and if so, what part of 
                        the brain is active during each type of learning. They will then study if it is possible to train 
                        one's brain to be a certain type of learner
                    </Typography>
                    <li style={{ color: `#323865`, fontFamily: `poppins`, fontWeight: `bold`}}>Analyzing what Canada is doing to combat climate change</li>
                    <Typography
                        align="left"
                    >
                        Climate change is probably the most impending global issue we are currently facing. We are already 
                        seeing climate disasters leading to refugees and loss of habitat. This group will look into how climate 
                        change has impacted Canada, and what the government is doing to combat it. They will also put together 
                        suggestions for further improvement, and look at the economic impact of doing so.
                    </Typography>
                </ol>
                <Typography
                    variant="h5"
                >
                    Who is eligible to apply:
                </Typography>
                All Ontario high school students (grades 9 to 12) are eligible to apply for the fellowship.
            </Container>
        </>
    );
};

export default Description;
