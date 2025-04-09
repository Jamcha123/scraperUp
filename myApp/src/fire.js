import { initializeApp } from 'firebase/app'; 
import { getFirestore, collection, addDoc, setDoc, doc, getDoc, getDocs } from 'firebase/firestore'; 
import { getAuth, GithubAuthProvider, GoogleAuthProvider, onAuthStateChanged, signInAnonymously, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth'; 
import { initializeAppCheck, ReCaptchaEnterpriseProvider } from 'firebase/app-check'; 

const config = {
    apiKey: "",
    authDomain: "webbyio-74224.firebaseapp.com",
    projectId: "webbyio-74224",
    storageBucket: "webbyio-74224.firebasestorage.app",
    messagingSenderId: "547559064125",
    appId: "1:547559064125:web:6b160359e9d457827c2054",
    measurementId: "G-T3EY74V2T7"
}

const app = initializeApp(config); 

const appcheck = initializeAppCheck(app, {
    provider: new ReCaptchaEnterpriseProvider("6Ldn6gcrAAAAALbGCSXaC2jX_GgovSm-iV_JSKcf"), 
    isTokenAutoRefreshEnabled: true
})

const auth = getAuth(app)
auth.useDeviceLanguage();

const db = getFirestore(app); 

const git = new GithubAuthProvider(auth); 
git.addScope("https://github.com/Jamcha123/scraperweb"); 

const google = new GoogleAuthProvider(auth)

onAuthStateChanged(auth, async (user) => {
    if(user === null){
        console.log("user, not found")
    }else{
        console.log("user logged in")
    }
})