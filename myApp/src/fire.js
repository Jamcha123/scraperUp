import { initializeApp } from 'firebase/app'; 
import { getFirestore, collection, addDoc, setDoc, doc, getDoc, getDocs, deleteField } from 'firebase/firestore'; 
import { getAuth, GithubAuthProvider, GoogleAuthProvider, onAuthStateChanged, signInAnonymously, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth'; 
import { initializeAppCheck, ReCaptchaEnterpriseProvider } from 'firebase/app-check'; 
import axios from 'axios';

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
onAuthStateChanged(auth, (user) => {
    if(user !== null){
      document.getElementById("create").addEventListener("click", async (e) => {
        const webby = await axios.get("https://gettoken-oegaseo74q-uc.a.run.app")

        const readIndex = await getDoc(doc(db, "/secrets/indices"))
        let nums = 0; 
        if(readIndex.get("index") != null){
            nums = Number.parseInt(readIndex.get("index"))
        }else{
            nums = 0; 
            await setDoc(doc(db, "/secrets/indices"), {
                index: nums
            })
        }
        const ans = {}
        ans[nums.toString()] = webby["data"]

        await setDoc(doc(db, "/secrets/" + user.uid + "/keys/" + nums.toString() ), ans); 
        nums += 1
        await setDoc(doc(db, "/secrets/indices"), {
            index: nums
        })
      })
    }else{
        document.getElementById("create").addEventListener("click", (e) => {
            alert("cannot create tokens until logged in") 
        })
    }
  })