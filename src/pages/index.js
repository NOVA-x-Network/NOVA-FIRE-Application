import React, { useState, useEffect } from "react"
import nova_logo_cropped from "../images/cropped-NOVA-logo-1.png"
import nova_front_art from "../images/NovaHomepageClipArt.png"
import withFirebaseAuth from "react-with-firebase-auth"
import firebaseApp from "../components/firebaseConfig.js"
import firebase from "firebase/app";
import "firebase/firestore"
const firebaseAppAuth = firebaseApp.auth()
let db = firebaseApp.firestore()
const providers = {
	googleProvider: new firebase.auth.GoogleAuthProvider(),
};
// markup
const IndexPage = props => {
	const { user, signOut } = props
	const [appStatus, setAppStatus] = useState(false)
	const [windowWidth, setWindowWidth] = useState(window.innerWidth)
	console.log(windowWidth)
	const defaultComputerWidth = 2550
	var introTextWidth
	var introTextFont
	var frontBannerWidth
	var frontBannerHeight
	var frontBannerImageWidth
	var frontBannerImageHeight
	var cornerImageHeight
	var cornerImageWidth
	if (windowWidth >= 900) {
		introTextFont = "14pt"
		introTextWidth = "30vw"
		frontBannerHeight = "auto"
		frontBannerImageHeight = "30vh"
		frontBannerWidth = "90vw"
		frontBannerImageWidth = "22vw"
		cornerImageHeight = "auto"
		cornerImageWidth="8vw"
	}
	else {
		introTextFont = "14pt"
		introTextWidth ="40vw"
		frontBannerHeight = "auto"
		frontBannerImageHeight = "35vw"
		frontBannerWidth = "90vw"
		frontBannerImageWidth = "42vw"
		cornerImageHeight = "auuto"
		cornerImageWidth="8vw"
	}
	useEffect(() => {
		if (user) {
			db.collection("submissions").doc(user.email).get()
				.then((snapshot) => {
					setAppStatus(snapshot.data().applicationStatus)
				})
		}
		window.addEventListener('resize', () => {
			setWindowWidth(window.innerWidth)
		})
    })
	console.log(introTextWidth)
	return (<div>
				<div style={{display:"flex", flex:1, flexDirection:"row", justifyContent:"space-between", fontFamily:"poppins"}}>
			<img id="indexLogo" src={nova_logo_cropped} style={{ height: cornerImageHeight, width: cornerImageWidth, marginLeft: "3vw", marginTop: "20px", marginBottom: "10px"}} />
			<div id="indexLogin" style={{ display: "flex", flexDirection: "row", alignItems: "center", marginRight: "2.5vw"}}>
				{appStatus ? <p>Application Status: {appStatus}</p> : null}
				{user ? <button onClick={() => { signOut(); setAppStatus(false) }} style={{ marginLeft: "30px" }}>Sign out</button> : <button style={{ marginLeft: "30px" }} onClick={() => { window.location = "/login" }}>Login</button>}
				</div>
				</div>
		<div className="indexMain" style={{ position: "relative", marginTop:"12px"}}>
					<div id="indexBanner">
				<div style={{ position:"relative", marginTop: "10px", display: "flex", flexDirection: "column", marginLeft: "25px", justifyContent:"space-around"}}>
					<h1>NOVA Fellowship Applications are now open!</h1>
					<p className="bannerText">
						NOVA FIRE (Fellowship in Innovation, Research, and Education) is a
						5 month-long intensive fellowship program for high school students.
						Our fellows will participate in primary and secondary interdisciplinary
						research in 1 of our 4 topics. They will be given the opportunity to either
						develop a hands-on project, or a written report for publication, based on their findings
						and analysis. Students will have a chance to work in teams of 5-6.
						NOVA will be accepting a maximum of 24 students into our program. <a href="https://novaxnetwork.com/fellowship/">Learn More</a>
				</p>
				</div>
				<div id="bannerImg">
					<img src={nova_front_art} style={{maxHeight:"330px"}}/>
				</div>
					</div>
					<div style={{ marginTop:"20px", marginLeft:"25px", marginBottom:"40px"}}>
						<div style={{display:"flex", flexDirection:"row"}}>
					<button style={{ marginRight:"10px"}} onClick={() => { window.location = "/signup" }}>Sign up</button>
					<button className="button" onClick={() => {
						if (!user) {
							window.location = "/login"
						}
						else {
							window.location="/form"
                        }
					}}>Continue your application</button>
								</div>
							</div>
						</div>
					</div>
  )
}

export default withFirebaseAuth({ providers, firebaseAppAuth })(IndexPage)
