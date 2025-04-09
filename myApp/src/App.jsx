import { useState, useEffect, useRef } from 'react'
import './App.css'
import * as cheerio from 'cheerio'
import {motion} from 'framer-motion'
import arrow from './assets/arrow.svg'
import google from './assets/google.svg'
import git from './assets/git.svg'
import './fire.js'
import axios from 'axios'
import { initializeApp } from 'firebase/app'; 
import { getFirestore } from 'firebase/firestore'; 
import { createUserWithEmailAndPassword, getAuth, GithubAuthProvider, GoogleAuthProvider, onAuthStateChanged, signInAnonymously, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth'; 
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

const auth = getAuth(app)
auth.useDeviceLanguage(); 

const db = getFirestore(app); 

const Github = new GithubAuthProvider(auth); 
Github.addScope("https://github.com/Jamcha123/scraperweb"); 

const Google = new GoogleAuthProvider(auth);

function AddNavbar(){
  const [active, setActive] = useState(true)
  return(
    <motion.nav initial={{width: 10 + "em"}} animate={{width: active? 10 + "em" : 4 + "em"}} transition={{type: "spring", duration: 1}} className="fixed left-[0%] w-[10em] z-[100] h-[100%] m-auto p-[0] bg-slate-300 ">
      <ul className="flex flex-col align-top justify-start text-center min-w-[100%] min-h-[90%]  ">
        <motion.div initial={{scale: 1, opacity: 1}} animate={{scale: active? 1 : 0, opacity: active? 1 : 0}} className="relative w-[100%] h-[3em] m-0 mt-[30%] p-[0] flex flex-col align-middle justify-center text-center hover:bg-slate-200 duration-300 transition-all " >
          <div className="flex flex-row align-middle justify-center min-w-[100%] min-h-[fit-content] ">
            <h1 className="text-xl cursor-pointer text-black ">
              <a href="#scraper">
                Web Scraper
              </a>
            </h1>
          </div>
        </motion.div>
        <motion.div initial={{scale: 1, opacity: 1}} animate={{scale: active? 1 : 0, opacity: active? 1 : 0}} className="relative w-[100%] h-[3em] m-0 mt-[30%] p-[0] flex flex-col align-middle justify-center text-center hover:bg-slate-200 duration-300 transition-all " >
          <div className="flex flex-row align-middle justify-center min-w-[100%] min-h-[fit-content] ">
            <h1 className="text-xl cursor-pointer text-black ">
              <a href="#usage">
                Usage
              </a>
            </h1>
          </div>
        </motion.div>
        <motion.div initial={{scale: 1, opacity: 1}} animate={{scale: active? 1 : 0, opacity: active? 1 : 0}} className="relative w-[100%] h-[3em] m-0 mt-[30%] p-[0] flex flex-col align-middle justify-center text-center hover:bg-slate-200 duration-300 transition-all " >
          <div className="flex flex-row align-middle justify-center min-w-[100%] min-h-[fit-content] ">
            <h1 className="text-xl cursor-pointer text-black ">
              <a href="#keys">
                API keys
              </a>
            </h1>
          </div>
        </motion.div>
        <motion.div initial={{scale: 1, opacity: 1}} animate={{scale: active? 1 : 0, opacity: active? 1 : 0}} className="relative w-[100%] h-[3em] m-0 mt-[30%] p-[0] flex flex-col align-middle justify-center text-center hover:bg-slate-200 duration-300 transition-all " >
          <div className="flex flex-row align-middle justify-center min-w-[100%] min-h-[fit-content] ">
            <h1 className="text-xl cursor-pointer text-black ">
              <a href="#Billing">
                Billing
              </a>
            </h1>
          </div>
        </motion.div>
        <motion.div initial={{scale: 1, opacity: 1}} animate={{scale: active? 1 : 0, opacity: active? 1 : 0}} className="relative w-[100%] h-[3em] m-0 mt-[30%] p-[0] flex flex-col align-middle justify-center text-center hover:bg-slate-200 duration-300 transition-all " >
          <div className="flex flex-row align-middle justify-center min-w-[100%] min-h-[fit-content] ">
            <h1 className="text-xl cursor-pointer text-black ">
              <a href="#docs">
                API docs
              </a>
            </h1>
          </div>
        </motion.div>
      </ul>
      <ul className="flex flex-col align-middle justify-center text-center min-w-[100%] min-h-[10%]  ">
        <div className="flex flex-row align-middle justify-center text-center min-h-[fit-content] min-w-[100%] ">
          <motion.span initial={{rotateZ: 0 + "deg"}} animate={{rotateZ: active? 180 + "deg" : 0 + "deg"}} transition={{type: "spring", duration: 1}} onClick={active? () => setActive(false) : () => setActive(true)} style={{fontSize: 30 + "px"}} className="material-symbols-outlined cursor-pointer text-2xl text-black ">
            arrow_forward_ios
          </motion.span>
        </div>
      </ul>
    </motion.nav>
  )
}
function AddScraper(){
  useEffect(() => {
    const site = document.getElementById("url")
    const selector = document.getElementById("selector")
    const data = document.getElementById("data"); 
    
    const jsonfile = document.getElementById("json")
    jsonfile.addEventListener("click", async (e) => {
      e.preventDefault()

      const link1 = "https://obj-oegaseo74q-uc.a.run.app?site=" + site.value + "&select=" + selector.value + ""
      await axios.get(link1, {
        url: link1, 
        responseType: "document", 
        method: "get"
      }).then(async (value) => {
        await axios.post(link1, {user1: "1234"}, {headers: {"Content-Type": "text/json"}}).then((response) => {
          const blob = new Blob([JSON.stringify({"data": response["data"]})], {type: "text/json"})

          const file = document.createElement("a"); 
          file.href = URL.createObjectURL(blob)
          file.download = "data.json"
          file.click()
        })
      })
    })
    const textfile = document.getElementById("text1")
    textfile.addEventListener("click", async (e) => {
      e.preventDefault()

      const link2 = "https://obj-oegaseo74q-uc.a.run.app?site=" + site.value + "&select=" + selector.value + ""
      await axios.get(link2, {
        url: link2, 
        responseType: "document", 
        method: "get"
      }).then(async (value) => {
        await axios.post(link2, {user1: "1234"}, {headers: {"Content-Type": "text/json"}}).then((response) => {

          data.innerHTML = "<p className='text-xl text-black'>" + response["data"]["data"] + "</p>" 
        })
        
      }).catch((err) => {
        console.log(err)
      })
    })
  })
  return(
    <motion.section initial={{translateY: 0 + "%"}} id="scraper" className="flex flex-col align-middle mr-[0%] justify-center text-center min-h-[100vh] min-w-[100vh] ">
      <div className="flex flex-col align-middle justify-center text-center min-w-[100%] min-h-[100%]">
        <div className="flex flex-row align-middle justify-center text-center min-h-[fit-content] min-w-[100%] ">
          <h1 className="text-3xl text-black ">ScraperWeb</h1>
          <h1 className="text-3xl text-black ml-[1%] hidden lg:block"> - no code web scraper</h1>
        </div>
        <div className="relative w-[100%] min-h-[20em] max-h-[fit-content] flex flex-col align-middle justify-center text-center " id="data"></div>
        <form action="/" method="get" id="form" className="flex flex-col align-middle justify-center text-center min-w-[30em] min-h-[30vh] ">
          <div className="flex flex-col align-middle justify-center text-center gap-[10px] min-w-[100%] min-h-[5em] ">
            <input type="text" className="relative bg-slate-100 w-[50%] h-[3em] m-auto p-[0] text-xl text-center text-black  " id="url" placeholder="enter a URL here" />
            <input type="text" className="relative bg-slate-100 w-[50%] h-[3em] m-auto p-[0] text-xl text-center text-black  " id="selector" placeholder="enter a Selector e.g # or ." />
          </div>
          <div className="flex mt-[10%] flex-row align-middle justify-center text-center gap-[10px] min-w-[100%] min-h-[5em] ">
            <motion.button initial={{scale: 1}} whileHover={{scale: 0.9}} whileTap={{scale: 1.1}} type="button" id="json" className="relative cursor-pointer w-[10em] h-[3em] bg-slate-500 m-0 mr-[5%] p-[0] text-xl text-white ">
              Create a file for data
            </motion.button>
            <motion.button initial={{scale: 1}} whileHover={{scale: 0.9}} whileTap={{scale: 1.1}} type="button" id="text1" className="relative cursor-pointer w-[10em] h-[3em] bg-slate-500 m-0 ml-[5%] p-[0] text-xl text-white">
              Show Data
            </motion.button>
          </div>
        </form>
      </div>
    </motion.section>
  )
}
function AddKeys(){
  const [active, setActive] = useState(false)
  const page = document.getElementById("LoginPage"); 
  useEffect(() => {
  })
  return(
    <motion.section id="keys" initial={{translateY: 0 + "%"}} className="flex mr-[0%] flex-col align-middle justify-center text-center min-h-[100vh] min-w-[100%] z-[100] ">
      <div className="flex flex-col align-middle justify-center text-center min-w-[100%] h-[15vh] ">
        <div className="flex flex-row align-middle justify-start text-start min-h-[5vh] min-w-[100%] ">
          <h1 className="text-3xl text-black ml-[25%]">API Keys</h1>
        </div>
        <div className="flex flex-row align-middle justify-start text-start min-h-[4vh] min-w-[100%] ">
          <p className="text-xl text-black ml-[25%]">
            To Generate API tokens, you have to <a href="" className="underline-offset-2 underline text-violet-600">login here</a> first
          </p>
        </div>
        <div className="flex flex-row align-middle justify-start text-start min-h-[4vh] min-w-[100%] ">
          <p className="text-xl text-black ml-[25%]">
            Keep the API tokens secure
          </p>
        </div>
      </div>
      <div className="flex flex-row align-middle justify-center text-center min-h-[6vh] min-w-[100%] mt-[5%] ">
          <motion.button id="create" initial={{scale: 1}} whileHover={{scale: 0.9}} whileTap={{scale: 1.1}} className="relative w-[9em] h-[100%] rounded-md border-violet-700 border-[2px] m-auto p-[0] bg-sky-800 text-sky-300 text-2xl cursor-pointer  ">
            + Generate Tokens
          </motion.button>
        </div>
      <div id="tokens" className="flex flex-col align-middle justify-center text-center min-w-[100%] h-[79vh] ">
      </div>
    </motion.section>
  )
}
function AddLogin(){
  useEffect(() => {
    const login = document.getElementById("login"); 
    const email = document.getElementById("email"); 
    const password = document.getElementById("password");
    const git_login = document.getElementById("git"); 
    const google_login = document.getElementById("google");
    
    google_login.addEventListener("click", (e) => {
      signInWithPopup(auth, Google).then((value) => {
        console.log([value.user, value.providerId, value.operationType])
      }).catch((err) => {
        alert(err)
      })
    }); 
    git_login.addEventListener("click", (e) => {
      signInWithPopup(auth, Github).then((value) => {
        console.log([value.user, value.providerId, value.operationType])
      }).catch((err) => {
        alert(err)
      })
    }); 

    login.addEventListener("click", (e) => {
      e.preventDefault()
      createUserWithEmailAndPassword(auth, email.value, password.value).then((value) => {
        signInWithEmailAndPassword(auth, email.value, password.value).then((response) => {
          console.log(response.providerId)
        }).catch((err) => {
          alert(err)
        })
      }).catch((err) => {
        alert(err)
      })
    })
  })
  return(
    <div id="LoginPage" className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-[20em] h-[fit-content] m-auto p-[0] bg-transparent rounded-lg z-[100] hide">
      <div className="flex flex-col align-middle justify-center text-center min-w-[100%] min-h-[fit-content] ">
        <input className="relative w-[100%] h-[2em] m-auto p-[0] text-center text-xl text-white bg-slate-600 " placeholder="enter your email"  id="email" type="email" />
        <input className="relative w-[100%] h-[2em] m-auto p-[0] text-center text-xl text-white bg-slate-600 " placeholder="enter a password"  id="password" type="password" />
        <button className="relative w-[100%] h-[2em] m-auto p-[0] text-center text-xl text-white bg-slate-500 cursor-pointer" id="login">
          Login
        </button>
      </div>
      <form action="/" method="post" id="form2" className="flex flex-row align-middle justify-center text-center min-w-[100%] min-h-[5em]">
        <div className="flex flex-col align-middle justify-center text-center min-w-[50%] min-h-[100%] bg-slate-600 ">
          <div className="flex flex-row align-middle justify-center text-center min-w-[100%] min-h-[50%]">
            <img id="git" src={git} className="cursor-pointer" style={{scale: 0.02, width: 3 + "em", height: 3+ "em"}} alt="" />
          </div>
        </div>
        <div className="flex flex-col align-middle justify-center text-center min-w-[50%] min-h-[100%] bg-slate-600 ">
          <div className="flex flex-row align-middle justify-center text-center min-w-[100%] min-h-[50%]">
            <img id="google" src={google} className="cursor-pointer" style={{scale: 0.02, width: 3 + "em", height: 3+ "em"}} alt="" />
          </div>
        </div>
      </form>
    </div>
  )
}
export default function App(){
  return(
    <div className="relative w-[100%] h-[100%] m-auto p-[0] flex flex-row align-middle justify-center text-center ">
      <AddNavbar></AddNavbar>
      <AddLogin></AddLogin>
      <div className="relative z-[99] w-[100%] h-[200vh] m-auto p-[0] bg-transparent flex flex-col align-middle justify-center text-center ">
        <AddScraper></AddScraper>
        <AddKeys></AddKeys>
      </div>
    </div>
  )
}