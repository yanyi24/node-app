const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');
const User = mongoose.model('Users'); // Users =》User.js中取的表名
const keys = require('./keys');
let opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrkey;
module.exports = passport => {
	passport.use(new JwtStrategy(opts, function (jwt_payload, done) {
		// console.log(jwt_payload);
		User.findById(jwt_payload.id)
				.then(user => {
					if(user) {
						return done(null, user);
					}
					return done(null, false);
				})
				.catch(err => {throw err});
	}));
}