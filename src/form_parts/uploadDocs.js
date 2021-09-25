import React, { useState, useEffect } from "react";
import {
    Button,
    Container,
    Typography,
    makeStyles
} from "@material-ui/core";
import { useFilePicker } from 'use-file-picker';
import { CloudUpload } from '@material-ui/icons';
import firebaseApp from "../components/firebaseConfig.js"
import "firebase/firestore"
import "firebase/auth"
let db = firebaseApp.firestore()
const firebaseAppAuth = firebaseApp.auth();
const Upload = () => {
    const [allFiles, setAllFiles] = useState([])
    const[fetchDone, setFetchDone] = useState(true)
    const [openFileSelector, { filesContent, loading}] = useFilePicker({
        multiple: true,
        readAs: 'DataURL',
        accept: ['.pdf', '.png', '.jpeg', '.doc', '.docx'],
        limitFilesConfig: {max:1}
    });
    let uploadStyle = makeStyles(() => ({
        upload: {
            display: "flex",
            flexDirection: "column",
            alignItems:"center",
            '& *': {
                fontFamily: `poppins`,
            },
            '& span:hover': {
                cursor:"pointer"
            }
        }
    }))
    const[email, setEmail]=useState('')
    let classes = uploadStyle()
    useEffect(() => {
        firebaseAppAuth.onAuthStateChanged((user) => {
                db.collection("submissions").doc(user.email).get()
                    .then((snapshot) => {
                        let allFilesTemp = [...allFiles]
                        Object.keys(snapshot.data()['files']).forEach((file) => {
                            let fileWithName = {}
                            fileWithName.name = file
                            fileWithName.content = snapshot.data()['files'][file]
                            allFilesTemp.push(fileWithName)
                        })
                        setAllFiles(allFilesTemp)
                    })
            setEmail(user.email)
        })
    }, [])
    if (loading && filesContent.length>0 && !fetchDone) {
        console.log("loading")
        let allFilesTemp = [...allFiles]
        allFilesTemp.forEach((file) => {
            if (file.name == filesContent[0].name) {
                filesContent[0].name =filesContent[0].name+" (1)"
            }
        })
        allFilesTemp.push(filesContent[0])
        let fileList = {}
        allFilesTemp.forEach((file) => {
            fileList[file.name] = file.content
        })
        db.collection("submissions").doc(email).update({ files: fileList  })
        setAllFiles(allFilesTemp)
        setFetchDone(true)
    }
    return (
        <div style={{ height: `${75}vh`, width: "65vw"}} className={classes.upload}>
            <Button onClick={() => openFileSelector()} style={{ background: `#1A6F4C`, height: `${30}vh`, width: `${80}%`, color: `#fff`, textAlign: `center` }}>
                <CloudUpload style={{ fontSize: `${15}em`, display: `block` }} onClick={() => { setFetchDone(false)} }/> Select file </Button>
            <br />
            <Typography>Please upload your resume and high school transcript (or most recent report card instead if you're in grade 9). Upload <span style={{ fontWeight: "bold" }}>one file</span> for your resume,
                and <span style={{ fontWeight: "bold" }}>another file</span> for your transcript/report card.</Typography>
            <Typography variant="h4" align="center" style={{marginTop:"30px"}}>Uploaded files</Typography>
            {allFiles.map(file => (
                <div>
                    <a key={file.name} target="_blank" href={file.content} onClick={() => {
                        window.open(file.content)
                    }}>{file.name} </a>
                    <span onClick={() => {
                        console.log(allFiles);
                        let itemIndex = allFiles.indexOf(file)
                        console.log(itemIndex)
                        console.log([...allFiles])
                        let allFilesNew = [...allFiles]
                        allFilesNew.splice(itemIndex, 1)
                        let fileList = {}
                        allFilesNew.forEach((file) => {
                            fileList[file.name]=file.content
                        })
                        db.collection("submissions").doc(email).update({ files: fileList } )
                        setAllFiles(allFilesNew)
                    }}> x</span>
                 </div>
            ))}
            <Typography variant="h6" align="left" style={{fontSize:"12px", marginTop:"25px"}}>Tip: Click on the name of the file you've uploaded. If it can be displayed in a browser, click on the
                address bar of the blank page that pops up and press enter to preview the file. Otherwise, the file will be downloaded for preview.  </Typography>
        </div>
    );
}

export default Upload