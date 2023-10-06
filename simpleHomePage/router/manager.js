const express = require("express")
const bodyParser= require('body-parser')
const router = express.Router()
const { connectDB, getDB } = require('../db')

router.use(bodyParser.json())
router.use(bodyParser.urlencoded({extended: true}))

// 담당자 페이지
router.get('/view', async (req, res) => {
  console.log("manager./ --------------------------------------------")

  try {
    await connectDB()
    const db = getDB()
    const collection = db.collection('manager')
    var jobtab = req.query.tabval
    jobtab = 'api'
    console.log(jobtab)
    let result = await collection.find({job : jobtab}).sort({ job : 1}).toArray()
    console.log(result)
    res.render("/board/view", { manager: result})
  } catch (e) {
    console.log(e)
    res.status(500).send("server error")
  }
});

// 담당자 등록
router.post('/save', async (req, res) => {
  console.log("manager./save --------------------------------------------")
  console.log("req", req.body)

  try {
    if (req.body.name == "" || req.body.task == "") {
      res.send("입력하세요");
    } else {
      await connectDB()

      const db = getDB()
      const collection = db.collection('manager')

      const result = await collection
        .insertOne({
          job: req.body.job, 
          name: req.body.name, 
          task: req.body.task, 
          desc: req.body.desc 
        });
      // res.redirect("/list");
      console.log("save Complete")
      // res.render('manager')
      res.redirect("/manager/view");
    }
  } catch (e) {
    console.log(e);
    res.status(500).send("server error")
  }
});

module.exports = router;
