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
	// const { token } = req.cookies;
	const {username} = req.params;
	console.log(username)
	const userDoc = await User.findOne({username}, "username name income expense");
	res.json(userDoc);
	console.log("User info fetched successfully");
}

exports.updateInfo = async(req, res)=>{
	const {username} = req.params;
	const {name} = req.body;
	console.log(userename, name)
	const updte = await User.findOneandUpdate({username: username}, {
		name: name
	})

}