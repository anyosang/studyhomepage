const express = require("express")
const app = express()
const { MongoClient, ObjectId } = require("mongodb")
const PORT = 4958

app.use('/static', express.static(__dirname + '/public'));
app.set("view engine", "ejs")
//app.set('views', __dirname + '/views')
//app.use(express.json())


//var list = require('./router/list')
var write = require('./write')

//const bodyParser= require('body-parser');
//const methodOverride = require("method-override");
//const session = require("express-session");
//const passport = require("passport");
//const LocalStrategy = require("passport-local");
//const bcrypt = require("bcrypt");
//app.use(bodyParser.urlencoded({extended: true}));

app.listen(PORT, () => {
  console.log("Server don start for port: " + PORT)
})

let db
const url = "mongodb+srv://admin:qwe123@cluster0.okipy9k.mongodb.net/?retryWrites=true&w=majority"
new MongoClient(url).connect()
.then((client) => {
  console.log("DB연결성공")
  db = client.db("todoapp")
  
}).catch((err) => {
  console.log(err)
})

// HOME 이동
app.get("/", (req, res) => {
  res.render("home.ejs")
})

app.get('/write', write.index)
//app.use('/write', writeRouter)
//app.get('/list', list.index);

// // // 글 목록 이동
// app.get("/list", async (req, res) => {
//   let result = await db.collection("post").find().toArray();
//   res.render("list.ejs", { posts: result });
// });
// // 글 작성 페이지 이동
// app.get("/write", (req, res) => {
//   res.render("write.ejs");
// });
// // 글 작성
// app.post("/add", async (req, res) => {
//   console.log(req.body.title);
//   console.log(req.body.date);
//   try {
//     if (req.body.title == "" || req.body.date == "") {
//       res.send("입력하세요");
//     } else {
//       await db
//         .collection("post")
//         .insertOne({ title: req.body.title, date: req.body.date });
//       res.redirect("/list");
//     }
//   } catch (e) {
//     console.log(e);
//     res.status(500).send("server error");
//   }
// });
// // 글 상세 페이지 이동
// app.get("/detail/:id", async (req, res) => {
//   console.log(req.params);
//   try {
//     let result = await db
//       .collection("post")
//       .findOne({ _id: new ObjectId(req.params.id) });
//     res.render("detail.ejs", { result: result });
//   } catch (e) {
//     res.status(404).send("server error");
//   }
// });
// // 글 수정 페이지 이동
// app.get("/edit/:id", async (req, res) => {
//   console.log(req.params);
//   try {
//     let result = await db
//       .collection("post")
//       .findOne({ _id: new ObjectId(req.params.id) });
//     res.render("edit.ejs", { result: result });
//   } catch (e) {
//     res.status(404).send("server error");
//   }
// });
// // 글 수정
// //app.post('/edit', async (req, res) => {
// app.put("/edit", async (req, res) => {
//   console.log("edit post", req.body);
//   try {
//     let result = db
//       .collection("post")
//       .updateOne(
//         { _id: new ObjectId(req.body.id) },
//         { $set: { title: req.body.title, date: req.body.date } }
//       );
//     console.log(result);
//     res.redirect("/list");
//   } catch (e) {
//     res.status(404).send("server error");
//   }
// });
// // 글 삭제
// app.delete("/delete", async (req, res) => {
//   console.log("delete", req.query);
//   await db.collection("post").deleteOne({ _id: new ObjectId(req.query.id) });
//   res.send("delete complete");
// });
// 글 목록 이동 (페이징 처리)
// app.get('/list/1', async(req, res) => {
//   let result = await db.collection('post').find().limit(5).toArray();
//   res.render('list.ejs', { posts : result });
// });
// app.get('/list/2', async(req, res) => {
//   let result = await db.collection('post').find().skip(5).limit(5).toArray();
//   res.render('list.ejs', { posts : result });
// });
// app.get('/list/3', async(req, res) => {
//   let result = await db.collection('post').find().skip(10).limit(5).toArray();
//   res.render('list.ejs', { posts : result });
// });
// app.get("/list/:id", async (req, res) => {
//   let result = await db
//     .collection("post")
//     .find()
//     .skip((req.params.id - 1) * 5)
//     .limit(5)
//     .toArray();
//   console.log(result);
//   res.render("list.ejs", { posts: result });
// });
// app.get("/list/next/:id", async (req, res) => {
//   console.log("next", req.params);
//   let result = await db
//     .collection("post")
//     .find({ _id: { $gt: new ObjectId(req.params.id) } })
//     .limit(5)
//     .toArray();
//   console.log(result);
//   res.render("list.ejs", { posts: result });
// });
// passport.use(
//   new LocalStrategy(async (regid, regpw, cb) => {
//     console.log("id", regid);
//     console.log("pw", regpw);
//     let result = await db.collection("user").findOne({ username: regid });
//     if (!result) {
//       return cb(null, false, { message: "아이디 DB에 없음" });
//     }
//     if (await bcrypt.compare(result.password, regpw)) {
//       return cb(null, result);
//     } else {
//       return cb(null, false, { message: "비번불일치" });
//     }
//   })
// );
// // 쿠키 발행 / 브라우져 > 유져
// passport.serializeUser((user, done) => {
//   console.log("serializeUser", user);
//   process.nextTick(() => {
//     done(null, { id: user._id, username: user.username });
//   });
// });
// // 유저가 보낸 쿠키 분석
// passport.deserializeUser(async (user, done) => {
//   console.log("deserializeUser", user);
//   let result = await db
//     .collection("user")
//     .findOne({ _id: new ObjectId(user.id) });
//   delete result.password;
//   process.nextTick(() => {
//     return done(null, user);
//   });
// });
// // 로그인 페이지 이동
// app.get("/login", async (req, res) => {
//   console.log(req.user);
//   res.render("login.ejs");
// });
// // 로그인
// app.post("/login", async (req, res, next) => {
//   console.log("login", req.body);
//   passport.authenticate("local", (error, user, info) => {
//     console.log("user", user);
//     if (error) return res.status(404).json(error);
//     if (!user) return res.status(401).json(info.message);
//     req.logIn(user, (err) => {
//       if (err) return next(err);
//       res.redirect("/list");
//     });
//   })(req, res, next);
// });
// // 가입페이지 이동
// app.get("/register", async (req, res) => {
//   res.render("register.ejs");
// });
// // 가입기능
// app.post("/register", async (req, res) => {
//   let hash = await bcrypt.hash(req.body.password, 10);
//   console.log("hash", hash);
//   await db.collection("user").insertOne({
//     username: req.body.username,
//     password: hash,
//   });
//   res.redirect("/login");
// });
