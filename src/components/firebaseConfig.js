const firebaseConfig = {
    apiKey: "AIzaSyAdkK0kjqxhh7PPwCd-mfoPDC4sZSA4GBY",
    authDomain: "nova-fire-application.firebaseapp.com",
    projectId: "nova-fire-application",
    storageBucket: "nova-fire-application.appspot.com",
    messagingSenderId: "707404942351",
    appId: "1:707404942351:web:8ec630843bd53e4f64a77a",
    measurementId: "G-7B0674VV11"
};
let firebaseInstance
function getFirebase(firebase) {
    if (firebaseInstance) {
        return firebaseInstance
    }

    firebase.default.initializeApp(firebaseConfig)
    firebaseInstance = firebase

    return firebase
}
export default getFirebase