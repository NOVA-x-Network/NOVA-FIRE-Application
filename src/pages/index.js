import * as React from "react"
import nova_logo_cropped from "../images/cropped-NOVA-logo-1.png"
import nova_front_art from "../images/NovaHomepageClipArt.png"
// markup
const IndexPage = () => {
	let width = window.innerWidth
	console.log(width)
	var introTextWidth
	var introTextFont
	var frontBannerWidth
	var frontBannerHeight
	var frontBannerImageWidth
	var frontBannerImageHeight
	var cornerImageHeight
	var cornerImageWidth
	if (width >= 1025) {
		introTextFont = "2vh"
		introTextWidth = "510px"
		frontBannerHeight = "40vh"
		frontBannerImageHeight = "30vh"
		frontBannerWidth = "60vw"
		frontBannerImageWidth = "22vw"
		cornerImageHeight = "8vh"
		cornerImageWidth="16vh"
	}
	else {
		introTextFont = "1.5vh"
		introTextWidth="180px"
		frontBannerHeight = "20vh"
		frontBannerImageHeight = "10vh"
		frontBannerWidth = "90vw"
		frontBannerImageWidth = "25w"
		cornerImageHeight = "4vh"
		cornerImageWidth="8vh"
    }
	console.log(introTextWidth)
	return (<div>
				<div style={{display:"flex", flex:1}}>
					<img src={nova_logo_cropped} style={{ height: cornerImageHeight, width: cornerImageWidth, marginLeft:"8px", marginTop:"8px" }} />
				</div>
				<div style={{ display: "flex", flex: 9, flexDirection: "column", alignItems:"center", marginTop:"12px"}}>
					<div style={{ background: "linear-gradient(90deg, rgba(17,8,153,1) 0%, rgba(25,180,103,1) 97%)", display:"flex",justifyContent:"left", width:frontBannerWidth, borderRadius:"20px", height:frontBannerHeight, alignItems:"center"}}>
				<div style={{ display: "flex", flexDirection: "column", marginLeft: "25px",}}>
					<p style={{ fontFamily: "arial", lineHeight: `1.4`, color: "white", fontSize: introTextFont, textAlign: "left", width: introTextWidth}}>
						NOVA FIRE (Fellowship in Innovation, Research, and Education) is a
						5 month-long intensive fellowship program for high school students.
						Our fellows will participate in primary and secondary interdisciplinary
						research in 1 of our 4 topics. They will be given the opportunity to either
						develop a hands-on project, or a written report for publication, based on their findings
						and analysis. Students will have a chance to work in teams of 5-6.
						NOVA will be accepting a maximum of 24 students into our program.
				</p>
					<form method="get" action="https://novaxnetwork.com/fellowship/">
						<button type="submit">Learn more</button>
					</form>
				</div>
				<div style={{ display: "flex", justifyContent: "center", flex:"auto"}}>
					<img src={nova_front_art} style={{ width: frontBannerImageWidth, height: frontBannerImageHeight, marginRight: "0px" }} />
				</div>
					</div>
					<div style={{ display: "flex", alignItems: "center", flexDirection: "column" }}>
						<p style={{ fontSize: "6vh", fontWeight: "bold", fontFamily: "arial", marginBottom:"15px"}}>
								NOVA Fellowship Applications are now open!
						</p>
						<br />
						<div style={{display:"flex", flexDirection:"row"}}>
							<div className="gradient-button-border" onClick={() => { window.location = "./signup" }}>
								<div>
									<p style={{ color: "#07024e", fontFamily: "arial", fontWeight: "bold" }}>Apply Now!</p>
								</div>
							</div>
							<div className="gradient-button-border" onClick={() => { window.location = "./login" }}>
								<div >
									<p style={{ color: "#07024e", fontFamily: "arial", fontWeight: "bold" }}>Continue your application</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
  )
}

export default IndexPage
