import { useState, useEffect, useRef } from 'react'
import './App.css'
import axios from 'axios'
import * as cheerio from 'cheerio'
import {motion} from 'framer-motion'
import arrow from './assets/arrow.svg'

function AddNavbar(){
  const [active, setActive] = useState(true)
  return(
    <motion.nav initial={{width: 10 + "em"}} animate={{width: active? 10 + "em" : 4 + "em"}} transition={{type: "spring", duration: 1}} className="relative w-[10em] z-[99] h-[100%] m-auto p-[0] bg-slate-300 ">
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
  
    const jsonfile = document.getElementById("json")
    jsonfile.addEventListener("submit", (e) => {
      e.preventDefault()
    })
    const textfile = document.getElementById("text")
    textfile.addEventListener("submit", (e) => {
      e.preventDefault()
    })
  })
  return(
    <section id="scraper" className="flex flex-col align-middle justify-center text-center min-h-[100vh] min-w-[100%] ">
      <div className="flex flex-row align-middle justify-center text-center min-h-[fit-content] min-w-[100%] ">
        <h1 className="text-3xl text-black ">Scraperfly</h1>
        <h1 className="text-3xl text-black ml-[1%] hidden lg:block"> - no code web scraper</h1>
      </div>
      <div className="relative w-[100%] min-h-[20em] max-h-[fit-content] " id="data"></div>
      <form action="/" method="get" id="form" className="flex flex-col align-middle justify-center text-center min-w-[50%] min-h-[30vh] ">
        <div className="flex flex-col align-middle justify-center text-center gap-[10px] min-w-[100%] min-h-[5em] ">
          <input type="text" className="relative w-[50%] h-[3em] m-auto p-[0] text-xl text-center text-black  " id="url" placeholder="enter a URL here" />
          <input type="text" className="relative w-[50%] h-[3em] m-auto p-[0] text-xl text-center text-black  " id="selector" placeholder="enter a Selector e.g # or ." />
        </div>
        <div className="flex mt-[10%] flex-row align-middle justify-center text-center gap-[10px] min-w-[100%] min-h-[5em] ">
          <motion.button initial={{scale: 1}} whileHover={{scale: 0.9}} whileTap={{scale: 1.1}} type="submit" id="json" className="relative cursor-pointer w-[10em] h-[3em] bg-slate-500 m-0 mr-[5%] p-[0] text-xl text-white ">
            Generate JSON file
          </motion.button>
          <motion.button initial={{scale: 1}} whileHover={{scale: 0.9}} whileTap={{scale: 1.1}} type="submit" id="text" className="relative cursor-pointer w-[10em] h-[3em] bg-slate-500 m-0 ml-[5%] p-[0] text-xl text-white">
            Show Data
          </motion.button>
        </div>
      </form>
    </section>
  )
}
export default function App(){
  return(
    <div className="fixed w-[100%] h-[100vh] m-auto p-[0] flex flex-row align-middle justify-center text-center ">
      <AddNavbar></AddNavbar>
      <div className="relative z-[99] w-[100%] h-[100%] m-auto p-[0] bg-transparent flex flex-col align-middle justify-center text-center ">
        <AddScraper></AddScraper>
      </div>
    </div>
  )
}