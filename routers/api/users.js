// @login & register
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const gravatar = require('gravatar');
const jwt = require('jsonwebtoken');

const User = require('../../models/User');
const keys = require('../../config/keys');
const passport = require('passport');




// 引入验证方法
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

// $router GET api/users/test
// @desc 返回的请求的json数据
// @access public
router.get('/test',(req,res)=>{
	res.json({msg: 'login works'})
})


// $router POST api/users/register
// @desc 返回的请求的json数据
// @access public
router.post('/register',(req,res) => {
	// console.log(req.body);
	
	// 判断isValid是否通过
	if (!isValid) {
		return res.status(400).json(errors);
	}
	// 查询数据库中是否存在邮箱
	User.findOne({email: req.body.email})
		.then(user => {
			if(user){
				return res.status(400).json({email: '邮箱已被注册！'});
			}else{
				const avatar = gravatar.url(req.body.email, {s: '200', r: 'G', d: 'mm'});
				const newUser = new User({
					name: req.body.name,
					email: req.body.email,
					avatar,
					password: req.body.password
				});

				// 加密密码
				bcrypt.genSalt(10, function(err, salt) {
					bcrypt.hash(newUser.password, salt, function(err, hash) {
						if (err) throw err;
						
						newUser.password = hash;
						newUser.save()
							.then(user => res.json(user))
							.catch(err => console.error(err));
					});
				});
			}
		})
})
// $router GET api/users/login
// @desc 返回token jwt passport
// @access public
router.post('/login', (req,res) => {
	// 验证输入
	const {errors, isValid} = validateLoginInput(req.body);
	if (!isValid) {
		return res.status(400).json(errors);
	}

	const email = req.body.email;
	const password = req.body.password;
	// 查询数据库
	User.findOne({email})
	.then(user => {
		if (!user) {
			return res.status(404).json({
				email: '用户不存在！'
			})
		}
		// 匹配密码
		bcrypt.compare(password, user.password)
			.then(isMatch => {
				if (isMatch) {
					const rule = {id: user.id, name: user.name};
					// jwt.sign('规则', '加密名字', '过期时间', '回调函数')
					jwt.sign(rule, keys.secretOrkey, {expiresIn: 3600}, (err, token) => {
						if (err) throw err;
						res.json({
							success: true,
							token: "Bearer " + token,
						})
					});
					// res.json({
					// 	msg: 'Success'
					// });
				} else {
					return res.status(400).json({
						password: '密码错误！'
					});
				}
			})
		})
})

// $router GET api/users/current
// @desc 返回current user
// @access Private


// router.get('/current','验证token',(req, res)=>{})
router.get('/current',passport.authenticate('jwt',{session: false}),(req, res)=>{
	res.json({
		id: req.user.id,
		name: req.user.name,
		email: req.user.email
	})
})
module.exports = router;