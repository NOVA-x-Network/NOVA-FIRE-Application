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
                    <li style={{ color: `#323865`, fontFamily: `poppins`, fontWeight: `bold`}}>Developing Technologies to Reduce Food Waste in Ontario</li>
                    <Typography
                        align="left"
                    >
                        60% of food waste in Ontario is sent to landfills. 7.1 metric tonnes and 31 billion dollars 
                        worth of food is wasted in the province each year. Data governance, waste management tools and 
                        general education have been helping combat this rising source of environmental and economic damage.  
                        This stream will focus on the creation of a technology to reduce the impact and amount of food  
                        waste in the community.

                    </Typography>
                    <li style={{ color: `#323865`, fontFamily: `poppins`, fontWeight: `bold`}}>Developing technologies to make recreation more accessible for individuals living with a disability</li>
                    <Typography
                        align="left"
                    >
                            Historically, orthopedic technology has had a focus on the rehabilitation of injured or 
                            disabled people. Basic needs have been addressed to better the quality of life of such 
                            individuals, and recreational desires have been deemed secondary. However, because of 
                            technology, participation barriers are being lifted for different vulnerable groups 
                            around the world. Specifically, technology plays a key role in making recreation more 
                            accessible for individuals who are living with a disability. This stream explores the 
                            various existing literature on rehabilitation technology, and explores the ways in which 
                            this research can be expanded to include modes of recreation for individuals with disabilities. 
                    </Typography>
                    <li style={{ color: `#323865`, fontFamily: `poppins`, fontWeight: `bold`}}>Examining the impacts of voluntourism in non-Western nations</li>
                    <Typography
                        align="left"
                    >
                        Volunteer tourism, or voluntourism, is an increasingly popular form of travel that has gained quite a 
                        bit of attention in the world of academia over the last few years, and the motivations of volunteer 
                        tourists have been examined. From this, it seems that there are quite a few negative implications of 
                        volunteer tourism on the communities that are being toured due to gentrification and an overall 
                        neglect of the desires of locals. This stream analyzes the disruption of local economies and 
                        lifestyles that occurs when volunteers, who are mainly from the West (USA, Canada, Europe, Australia) 
                        visit or settle down in the global south. In the end you will launch an information campaign to present 
                        your findings using a variety of media
                    </Typography>
                    <li style={{ color: `#323865`, fontFamily: `poppins`, fontWeight: `bold`}}>Studying the effects that technology has on socialization/ the age of digital socialization</li>
                    <Typography
                        align="left"
                    >
                        In the last couple of decades, rapidly evolving technology has shifted the way we socialize. 
                        Digital platforms have allowed people to communicate from anywhere in the world, making our society 
                        more connected than ever. However, in some cases, the artificial nature of online interactions may 
                        lead to feeling isolated and overwhelmed. It is important to research how the age of digital 
                        socialization impacts mental health, cultural norms, and social development in adolescents. 
                        This becomes more relevant when considering how Covid-19 has limited socialization to digital 
                        platforms. This stream will design and conduct a qualitative study and use existing research papers 
                        to develop a research report that will be published on NOVA’s website.
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
