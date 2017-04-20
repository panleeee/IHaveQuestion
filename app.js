var express = require("express");
var bodyParser = require('body-parser');
var ejs = require('ejs');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var list = [];

app.set('views', __dirname);
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended : false}))
app.use(express.static(__dirname));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});
app.get('/questionList',(req,res)=>{
    res.render('questionList',{preQuestion : list});
});

app.post('/question',(req,res)=>{
    list.push(req.body.info + " : " + req.body.question);
    io.emit('question',{info : req.body.info, desc :req.body.question });
    res.send("<script>alert('질문이 등록되었습니다!'); location.href = '/';</script>");
});

http.listen(3000, () => {
    console.log("port 3000 is opened");
});