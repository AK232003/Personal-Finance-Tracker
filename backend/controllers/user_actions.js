const User = require("../models/User");
const jwt = require("jsonwebtoken");
const secret = process.env.SECRET_KEY;

exports.profile =  async (req, res) => {
		const { token } = req.cookies;
		jwt.verify(token, secret, {}, (err, info) => {
			if (err){
				console.log('Unable to fetch profile', err);
				throw err;
			}
			console.log("Profile fetched successfully");
			res.json(info);
		});
}

exports.getUserInfo = async(req, res)=>{
	const { token } = req.cookies;
	jwt.verify(token, secret, {}, async(err, info)=>{
		if (err){
			console.log('Unable to fetch profile', err);
			throw err;
		}
		const userDoc = await User.findOne({username: info.username}, "username name income expense");
		res.json(userDoc);
		console.log("User info fetched successfully");
	})
}
