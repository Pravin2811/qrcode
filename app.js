const express = require('express')
const app = express()
const mongoose = require('mongoose')
const PORT = process.env.PORT || 3000
//const jwt = require('jsonwebtoken')
const QRCode = require('qrcode')
require('dotenv').config()
const {JWT_SECRET} = require('./config/index')
const Data = require('./models/data')

app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.post('/data', (req,res)=>{
   const {name} = req.body
   const encoded = Buffer.from(name).toString('base64')
   
   const data = new Data({
    name:name,
    encoded:encoded
   })
   data.save()
       .then(result=>{
        res.json('Success')
        res.json(encoded)
       })
       .catch(err=>{
        console.log(err)
       })

   generateQR(`https:www.youtube.com/${encoded}`)
   console.log(encoded)
})

app.get('/data/:id', async (req, res)=>{
    const {id} = req.params
    const textt = Buffer.from(id, 'base64').toString('ascii')
    //const result = await Data.find({encoded:id},{name:1})
    console.log(textt)
    res.send(textt)
})

// const res = Buffer.from("Name Arun_hospital Floor 1 Room 2 Bed 3 Location 12.94530718423381, 80.24239120746127").toString('base64')
// console.log(res)
// console.log(Buffer.from("TmFtZSBBcnVuX2hvc3BpdGFsIEZsb29yIDEgUm9vbSAyIEJlZCAzIExvY2F0aW9uIDEyLjk0NTMwNzE4NDIzMzgxLCA4MC4yNDIzOTEyMDc0NjEyNw==", 'base64').toString('ascii'))
//const token = jwt.sign({},JWT_SECRET)

// const generateQR = async text=>{
//     try{
//         console.log(await QRCode.toDataURL(text))
//     }catch(err){
//         console.log(err)
//     }
// }

const generateQR = async text=>{
    try{
        await QRCode.toFile('./hospi.png', text)
    }catch(err){
        console.log(err)
    }
}



mongoose
    .connect(process.env.MONGO_URI, {
       dbName: process.env.DB_NAME
    }).then(
       console.log('Connected to DB'),
       app.listen(process.env.PORT,()=>{
       console.log(`Listening to port ${PORT}`)
    })
).catch((err)=>console.log(err.message))