import React, { useState, useEffect } from "react";
import {
    Button,
    Typography,
    makeStyles
} from "@material-ui/core";
import { useFilePicker } from 'use-file-picker';
import { CloudUpload } from '@material-ui/icons';
import getFirebase from "../components/firebaseConfig.js"
import "firebase/firestore"
import "firebase/auth"
const Upload = () => {
    const [allFiles, setAllFiles] = useState([])
    const [fetchDone, setFetchDone] = useState(true)
    const [db, setDb] = useState({})
    const [email, setEmail] = useState('')
    let [openFileSelector, { filesContent, errors, loading }] = useFilePicker({
        multiple: true,
        readAs: 'DataURL',
        accept: ['.pdf', '.png', '.jpeg', '.doc', '.docx'],
        maxFileSize: 0.4,
        limitFilesConfig: { max: 2 }
    });
    let uploadStyle = makeStyles(() => ({
        upload: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            '& *': {
                fontFamily: `poppins`,
            },
            '& span:hover': {
                cursor: "pointer"
            }
        }
    }))
    let classes = uploadStyle()
    useEffect(() => {
        const app = import("firebase/app")

        Promise.all([app]).then(([firebase]) => {
            const firebaseApp = getFirebase(firebase)
            const firebaseAppAuth = firebaseApp.default.auth()
            const database = firebaseApp.default.firestore()
            setDb(database)
            firebaseAppAuth.onAuthStateChanged((user) => {
                database.collection("submissions").doc(user.email).get()
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
        })
    }, [])
    if (loading && filesContent.length > 0 && !fetchDone) {
        console.log("loading")
        let allFilesTemp = [...allFiles]
        let counter=0
        filesContent.forEach(() => {
            allFilesTemp.forEach((file) => {
                if (file.name === filesContent[counter].name) {
                    filesContent[counter].name = filesContent[counter].name + " (1)"
                }
            })
            counter+=1
        })
        filesContent.forEach((file) => {
            if (allFilesTemp.length < 2) {
                allFilesTemp.push(file)
            }
        })
        let fileList = {}
        allFilesTemp.forEach((file) => {
            fileList[file.name] = file.content
        })
        db.collection("submissions").doc(email).update({ files: fileList })
        setAllFiles(allFilesTemp)
        setFetchDone(true)
    }
    console.log(errors)
    return (
        <div style={{ height: `${75}vh`, width: "65vw", overflowY: "scroll" }} className={classes.upload}>
            <Button onClick={() => { openFileSelector(); setFetchDone(false) }} style={{ background: `#1A6F4C`, height: `${30}vh`, width: `${80}%`, color: `#fff`, textAlign: `center` }}>
                <CloudUpload style={{ fontSize: `${15}em`, display: `block`, width: "20vw" }} /> Select file </Button>
            <br />
            <Typography>Please upload your resume(optional) and high school transcript (or most recent report card instead if you're in grade 9). <span style={{ fontWeight: "bold" }}>Please only upload up to two files. These files must be 400kB or less in size.</span></Typography>
            <Typography variant="h4" align="center" style={{ marginTop: "30px" }}>Uploaded files</Typography>
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
                            fileList[file.name] = file.content
                        })
                        db.collection("submissions").doc(email).update({ files: fileList })
                        setAllFiles(allFilesNew)
                    }}> x</span>
                </div>
            ))}
            {errors.length ?
                <div>
                    {errors[0].fileSizeToolarge ?
                        <Typography variant="h5" style={{color:"red"}}>Your file was too large!</Typography>
                        :
                        null
                    }
                    {errors[0].maxLimitExceeded ?
                        <Typography variant="h5" style={{ color: "red" }}>You selected too many files!</Typography>
                        :
                        null
                    }
                </div>
                :
                null
            }
            <Typography variant="h6" align="left" style={{fontSize:"12px", marginTop:"25px"}}>Tip: Click on the name of the file you've uploaded. If it can be displayed in a browser, click on the
                address bar of the blank page that pops up and press enter to preview the file. Otherwise, the file will be downloaded for preview.  </Typography>
        </div>
    );
}

export default Upload