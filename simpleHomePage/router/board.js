const express = require("express")
const app = express()
const bodyParser= require('body-parser')
var requestIp = require('request-ip')
const router = express.Router()
const { connectDB, getDB } = require('../db')
const { BSON, ObjectId } = require("mongodb")

router.use(bodyParser.json())
router.use(bodyParser.urlencoded({extended: true}))

// 담당자 페이지
router.get('/view/:objectId', async (req, res) => {
  console.log("board./view --------------------------------------------")
    let objectId = req.params.objectId
    
    try {
      await connectDB();
      const db = getDB();
      const collection = db.collection('board')
      let result = await collection.findOne({"_id": new ObjectId(objectId)})
      
      res.render("write", { board: result})
    } catch(e) {
      console.log(e)
      res.status(500).send('Internal Server Error') // 오류가 발생한 경우 적절한 오류 응답을 보냅니다.

    }
});

router.get('/list', async (req, res) => {
  console.log("board./list --------------------------------------------")

  try {
    await connectDB()
    const db = getDB()
    const collection = db.collection('board')

    let result = await collection.find().toArray()
    console.log("result", result)
    res.render("list", { board: result})
  } catch (e) {
    console.log(e)
    res.status(500).send("server error")
  }
});

router.post('/write', async (req, res) => {
  console.log("board./write --------------------------------------------")
  console.log("req", req.body)

  try {
    // if (req.body.name == "" || req.body.task == "") {
    //   res.send("입력하세요");
    // } else {
      await connectDB()

      const db = getDB()
      const collection = db.collection('board')
      const currentDate = new Date(); // 현재 시간을 가져오기

      const formattedDate = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()} ${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds()}`;
      let ip = requestIp.getClientIp(req);
      const userIP = req.ip
      const userIP2 = req.headers['x-forwarded-for'] || req.connection.remoteAddress
      console.log(ip)
      console.log(userIP2)
      const result = await collection
        .insertOne({
          form: req.body.form, 
          subject: req.body.subject, 
          content: req.body.content, 
          writer: req.body.writer,
          ip: userIP,
          date: formattedDate 
        });
      // res.redirect("/list");
      console.log("save Complete")
      // res.render('manager')
      res.redirect("/board/view")
    // }
  } catch (e) {
    console.log(e)
    res.status(500).send("server error")
  }
});

module.exports = router;