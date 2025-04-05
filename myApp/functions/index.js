import * as functions from 'firebase-functions'
import * as cheerio from 'cheerio'
import https from 'https'; 
import fs from 'fs'

export const scraper = functions.https.onRequest({cors: true}, (req, res) => {
    const site = req.query.site;
    const select = req.query.select; 
    const choice = req.query.choice

    const link = new URL(site).href; 
    https.get(link, (res1) => {
        let data = ""
        res1.on("data", (chunk) => {
            data += chunk; 
        })
        res1.on("end", () => {
            const $ = cheerio.load(data); 
            const data = $(select).text().split(" "); 
            const arr = []; 
            data.forEach((e) => {
                arr.push(e); 
            })
            fs.createWriteStream("data.json", "utf-8").write(JSON.stringify({"data": arr}))
        })
    })
    fs.createWriteStream("data.json", )
})