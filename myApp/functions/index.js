import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'; 
import * as cheerio from 'cheerio'
import https from 'https'; 
import fs from 'fs'
import { randomBytes } from 'crypto'; 

export const obj = functions.https.onRequest({cors: true}, (req, res) => {
    const site = req.query.site;
    const select = req.query.select;

    const link = new URL(site).href; 
    https.get(link, (res1) => {
        let data = ""
        res1.on("data", (chunk) => {
            data += chunk; 
        })
        res1.on("end", () => {
            const $ = cheerio.load(data); 
            const arr = []; 
            const ans = $(select).text().split(" ");
            ans.forEach((e) => {
                arr.push(e); 
            })
            let target = JSON.stringify({"data": arr})
            res.status(200).json(JSON.parse(target))
            return res.end()
        })
    })
})