import React, { useState } from "react";
import {Typography, makeStyles } from "@material-ui/core";
import getFirebase from "../components/firebaseConfig.js";
import "firebase/firestore";
import "firebase/auth";
import SteinStore from "stein-js-client"

const Review = () => {
  let [errorMsgs, setErrorMsgs] = useState([]);
  const store = new SteinStore(
    "https://api.steinhq.com/v1/storages/61f022fac582292380c66833"
  );
  const handleSpreadsheet = (data) => {
const {basicInfo,files,longAnswer,survey} = data
const {surveyQuestion1,surveyQuestion2} = survey;
const Stringone = surveyQuestion1.toString();
const Stringtwo = surveyQuestion2.toString();
console.log(files)
store.append("Sheet1", [
    {
      firstName:basicInfo.firstName,
      lastName: basicInfo.lastName,
      PhoneNumber: basicInfo.phoneNumber,
      School: basicInfo.school,
      Gender:basicInfo.gender,
      Grade:basicInfo.grade,
      City:basicInfo.city,
      address:basicInfo.address,
      RegionalProgramme: basicInfo.regionalProgram,
      canAttendGala:basicInfo.canAttendGala,
      householdIncome: basicInfo.householdIncome,
      isFirstNation:basicInfo.isFirstNation,
      file1: "blog.me.com/awesome-article",
      file2: "Awesome article",
      file3: "Me!",
      laptopAndInternetAccess:basicInfo.laptopAndInternetAccess,
      surveyQuestion1:Stringone,
      surveyQuestion2:Stringtwo,
      surveyQuestion2Other: survey.surveyQuestion2Other,
      surveyQuestion3: survey.surveyQuestion3,
      surveyQuestion1Other: survey.surveyQuestion1Other,   
      longQuestion1: longAnswer.longQuestion1,
      longQuestion2: longAnswer.longQuestion2,
      longQuestion3: longAnswer.longQuestion3,
      longQuestion4: longAnswer.longQuestion4,     
    }
  ])
  .then(res => {
    console.log(res);
  });
  }

  let reviewStyle = makeStyles(() => ({
    body: {
      "& p": {
        color: "red",
        fontFamily: `poppins`,
      },
    },
  }));
  const classes = reviewStyle();
  return (
    <div
      style={{
        height: "75vh",
        display: "flex",
        width: "65vw",
        flexDirection: "column",
        alignItems: "center",
      }}
      className={classes.body}
    >
      <button
        onClick={() => {
          let errorMsgsCopy = [];
          const app = import("firebase/app");

          Promise.all([app]).then(([firebase]) => {
            const firebaseApp = getFirebase(firebase);
            const firebaseAppAuth = firebaseApp.default.auth();
            const db = firebaseApp.default.firestore();
            firebaseAppAuth.onAuthStateChanged((user) => {
              db.collection("submissions")
                .doc(user.email)
                .get()
                .then((snapshot) => {
                  Object.keys(snapshot.data()).forEach((category) => {
                    let appSection = snapshot.data()[category];
                    
                    let mandatoryFields = [];
                    let section = "";
                    switch (category) {
                      case "basicInfo":
                        mandatoryFields = [
                          "grade",
                          "city",
                          "firstName",
                          "lastName",
                          "isFirstNation",
                          "laptopAndInternetAccess",
                          "householdIncome",
                          "school",
                        ];
                        section = "Personal Information";
                        break;
                      case "longAnswer":
                       
                        section = "Creative Responses";
                        mandatoryFields = [
                          "longQuestion1",
                          "longQuestion2",
                          "longQuestion3",
                          "longQuestion4",
                        ];
                        mandatoryFields.forEach((field) => {
                          try {
                            if (field === "longQuestion1") {
                              if(appSection[field].trim().split(/\s+/).length > 500){
                                errorMsgsCopy.push(
                                  <p>
                                    Error! Your answer for question{" "}
                                    {field[field.length - 1]} for the Creative
                                    Responses section was too long
                                  </p>
                                );
                              }
                            } else if (
                              appSection[field].trim().split(/\s+/).length > 300
                            ) {
                                                           
                              errorMsgsCopy.push(
                                <p>
                                  Error! Your answer for question{" "}
                                  {field[field.length - 1]} for the Creative
                                  Responses section was too long
                                </p>
                              );
                            }
                          } catch {}
                        });
                        break;
                      case "survey":
                        section = "Survey";
                        mandatoryFields = [
                          "surveyQuestion1",
                          "surveyQuestion2",
                        ];
                        if (appSection["surveyQuestion1Other"]) {
                          appSection["surveyQuestion1"].push(
                            appSection["surveyQuestion1Other"]
                          );
                        }
                        if (appSection["surveyQuestion2Other"]) {
                          appSection["surveyQuestion2"].push(
                            appSection["surveyQuestion2Other"]
                          );
                        }
                     
                        break;
                      case "files":
                        section = "Upload Documents";
                        if (Object.keys(appSection).length < 1) {
                          errorMsgsCopy.push(
                            <p>
                              Error! You haven't uploaded any files for the
                              Upload Documents section.
                            </p>
                          );
                        }
                    }
                    if (JSON.stringify(appSection) === "{}") {
                                          }
                
                    mandatoryFields.every((field) => {
                    
                      if (!appSection[field] || appSection[field].length === 0) {
                      
                                                errorMsgsCopy.push(
                          <p>
                            Error! You're missing mandatory responses from the{" "}
                            {section} section.
                          </p>
                        );
                        return false;
                      }
                      return true;
                    });
                   
                  });
                  if (errorMsgsCopy.length === 0) {
                    errorMsgsCopy.push(
                      <p style={{ color: "green" }}>
                        You've successfully completed the application. Your
                        answers have been submitted. Thank you!
                      </p>
                    );
                    const data = snapshot.data();
                    handleSpreadsheet(data)
                    firebaseAppAuth.onAuthStateChanged((user) => {
                      db.collection("submissions")
                        .doc(user.email)
                        .update({ applicationStatus: "Complete" });
                    });
                  } else {
                    db.collection("submissions")
                      .doc(user.email)
                      .update({ applicationStatus: "Incomplete" });
                  }
                  setErrorMsgs(errorMsgsCopy);
                });
            });
          });
          
        }}
        style={{ marginBottom: "25px" }}
      >
        {" "}
        Verify and Submit{" "}
      </button>
      <Typography style={{ color: "black" }}>
        Click on the button to check if all your answers are valid and if you've
        completed all the necessary parts of the application. Until the
        application deadline of November 20 2021, 11:59pm, you can still edit
        your application after submitting it.
      </Typography>
      {errorMsgs}
    </div>
  );
};
export default Review;