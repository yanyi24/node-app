const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
	user: {// User表中的id
		type: Schema.Types.ObjectId,
		ref: "Users"
	},
	handle: {// 返回的用户名
		type: String,
		required: true,
		max: 40
	},
	company: { 
		type: String,
	},
	website: {
		type: String,
	},
	loacation: {
		type: String,
	},
	status: { // 职位 ‘前段开发’
		type: String,
		required: true
	},
	skills:{ // 技能
		type: [String],
		required: true
	},
	bio: { // 个人简介
		type: String,
		required: false
	},
	githubusername: { 
		type: String,
		required: false
	},
	experience: [ 
		{
			current: {
				type: Boolean,
				default: true
			},
			title: { 
				type: String,
				required: true
			},
			company: { // 任职公司名称
				type: String,
				required: true
			},
			loacation: { // 任职公司所在地
				type: String,
				required: true
			},
			from: {// 任职日期
				type: String,
				require: true
			},
			to: {// 离职日期
				type: String,
			},
			description: { // 职责描述
				type: String,
			}
		}
	],
	education: [ 
		{
			current: {
				type: Boolean,
				default: true
			},
			school: { 
				type: String,
			},
			degree: { // 最高学历
				type: String,
			},
			fieldofstudy: { // 专业
				type: String,
			},
			from: {// 入学日期
				type: String,
				require: true
			},
			to: {// 毕业日期
				type: String,
			},
			description: { 
				type: String,
			}
		}
	],
	social: {
		wechat: { 
			type: String
		},
		QQ: { 
			type: String,
		}
	},
	date: {
		type: Date,
		default: Date.now
	}
});
module.exports = Profile = mongoose.model('profile', ProfileSchema);