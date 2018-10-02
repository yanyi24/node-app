const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const passport = require('passport');
// 服务器
const app = express();
const port = process.env.PORT || 5000;

// 
const users = require('./routers/api/users');
// DB config
const db = require('./config/keys').mongoURI;


// 使用中间件实现允许跨域
app.use((req,res,next) => {
	res.header('Access-Control-Allow-Origin','*');
	res.header('Access-Control-Allow-Headers','Content-Type');
	res.header('Access-Control-Allow-Methods','PUT,POST,GET,DELETE,OPTIONS');
	next();
});

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
// 初始化passport
app.use(passport.initialize());
require('./config/passport')(passport);

// connect to mongoodb
mongoose.connect(db)
	.then(() => console.log('MongoDB Connected'))
	.catch(err => console.error(err));
//test
app.get('/', (req, res) => {
	res.send('Hello World!!');
})

//使用routers
app.use('/api/users', users)

app.listen(port, () => {
	console.log(`Server running on port :${port}`);
});