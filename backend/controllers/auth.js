const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secret = "adeioosi2392n#n1i1n@8n8";
const salt = bcrypt.genSaltSync(10);
const index = require("../app");

module.exports = {
	login: async(req, res) => {
		const { username, password } = req.body;
		try {
			const UserDoc = await User.findOne({ username });
			const passOk = bcrypt.compareSync(password, UserDoc.password);
			if (passOk) {
			jwt.sign({ username, id: UserDoc._id }, secret, {}, (err, token) => {
				if (err) throw err;
				res.cookie("token", token).json({
				id: UserDoc._id,
				username,
				});
			});
			console.log('Successful Login');
			} else {
				console.log.warn('Invalid credentials');
				res.status(401).json({message: "invalid credentials"});
			}
		} catch (e) {
			console.log(e);
			res.status(400).json(e);
			console.log('Username doesn\'t exist');
		}
	},

	logout: async(req, res) => {
		console.log('Successful Logout');
		res.cookie("token", "").json("ok");
	},

	register: async (req, res) => {
		const { username, password, name } = req.body;
		const all_usernames = await User.aggregate([
			{
				$match:{
					username: username
				}
			}
		]);
		// console.log(all_usernames);
		if(all_usernames.length == 0){
			try {
				const userDoc = await User.create({
				username,
				password: bcrypt.hashSync(password, salt),
				name,
				incomeTransactions: [],
				expenseTransactions: [],
				});
				console.log('User created successfully');
				res.json({ requestData: { username, password } });
			} catch (e) {
				console.log(e);
				console.log('Unkown Error');
				res.status(409).json(e);
			}
		}
		else{
			console.log('Create user aborted: Username already in use');
			res.status(409).json({message: "username in use"});
		}
	}
}