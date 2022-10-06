import * as React from "react"
import { useState, useEffect } from "react"
import nova_logo_cropped from "../images/cropped-NOVA-logo-1.png"
import nova_front_art from "../images/NovaHomepageClipArt.png"
import getFirebase from "../components/firebaseConfig.js"
import { Helmet } from "react-helmet"
import "firebase/firestore"
import "firebase/auth"
const IndexPage = () => {
	const [userStatus, setUserStatus] = useState(false)
	const [appStatus, setAppStatus] = useState(false)
	const [gotAuthStatus, setGotAuthStatus] = useState(false)
	const [auth, setAuth] = useState('')
	var cornerImageHeight = "auto"
	var cornerImageWidth = "8vw"
	useEffect(() => {
		const app = import("firebase/app")
		Promise.all([app]).then(([firebase]) => {
			const firebaseApp = getFirebase(firebase)
			//console.log(firebaseApp)
			const firebaseAppAuth = firebaseApp.default.auth()
			let db = firebaseApp.default.firestore()
			firebaseAppAuth.onAuthStateChanged((user) => {
				setGotAuthStatus(true)
				if (user) {
					db.collection("submissions").doc(user.email).get()
						.then((snapshot) => {
							setAppStatus(snapshot.data().applicationStatus)
							setUserStatus(user)
							setAuth(firebaseAppAuth)
						})
				}
			})
		})
	}, [])
	if (!gotAuthStatus) {
		return (<div>
		</div>)
	}
	return (<div style={{position:"relative", minHeight:"100vh", display:"flex", flexDirection:"column", justifyContent:"space-between"}}>
				<Helmet>
					<meta charSet="utf-8" />
					<link rel="icon" href="../images/cropped-NOVA-logo-1.png" type="image/png"/>
					<title>FIRE Program Application</title>
				</Helmet>
				<div>
					<div style={{display:"flex", flex:1, flexDirection:"row", justifyContent:"space-between", fontFamily:"poppins"}}>
						<img id="indexLogo" src={nova_logo_cropped} style={{ height: cornerImageHeight, width: cornerImageWidth, marginLeft: "3vw", marginTop: "20px", marginBottom: "10px"}} />
						<div id="indexLogin" style={{ display: "flex", flexDirection: "row", alignItems: "center", marginRight: "2.5vw"}}>
							{appStatus ? <p style={{color:"black"}}>Application Status: {appStatus}</p> : null}
							{userStatus ? <button
							onClick={() => { auth.signOut(); setAppStatus(false); setUserStatus(false) }}
							style={{ marginLeft: "30px" }}>Sign out</button> : <button style={{ marginLeft: "30px" }}
							onClick={() => { window.location = "/login" }}>Login</button>}
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
								if (!userStatus) {
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
				<p style={{ marginTop:"10px", color: "#323865", fontSize: "calc(10px + 0.4vw)" }}>Have a question? Experiencing troubles with completeing your application? Email us at <a href="mailto: novaxnetwork@gmail.com">novaxnetwork@gmail.com</a>.</p>
			</div>
  )
}

export default IndexPage
