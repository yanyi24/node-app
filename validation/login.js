const Validator = require('validator');
const isEmpty = require('./isEmpty');

module.exports = function validateLoginInput(data) {  
	let errors = {};

	data.email = !isEmpty(data.email) ? data.email : '';
	data.password = !isEmpty(data.password) ? data.password : '';

	if (!Validator.isEmail(data.email)) {
		errors.email = '邮箱不合规则！';
	}
	if (Validator.isEmpty(data.email)) {
		errors.email = '邮箱不能为空！';
	}

	if (Validator.isEmpty(data.password)) {
		errors.password = '密码不能为空！';
	}

	return {
		errors,
		isValid: isEmpty(errors)
	}
}
