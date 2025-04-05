import { initializeApp } from 'firebase/app'; 
import { getAuth, onAuthStateChanged, signInAnonymously } from 'firebase/auth'; 
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
auth.useDeviceLanguage()
