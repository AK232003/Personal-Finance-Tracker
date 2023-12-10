const express = require('express')
const cors = require('cors');
const { db } = require('./db/db');
const {readdirSync} = require('fs')
const app = express()
const auth = require("./controllers/auth.js");
const { getUserInfo } = require('./controllers/user_actions.js');
const user_actions = require('./controllers/user_actions.js');

require('dotenv').config()

const PORT = 5000

//middlewares
app.use(express.json())
app.use(cors())

// actions for authentication
app.post("/register", auth.register);
app.post("/login", auth.login);
app.post("/logout", auth.logout);
app.post('/update-info', user_actions.updateInfo)
// get user related information
app.get("/profile", user_actions.profile);
app.get("/userinfo", user_actions.getUserInfo)

//routes
readdirSync('./routes').map((route) => app.use('/api/v1', require('./routes/' + route)))

const server = () => {
    db()
    app.listen(PORT, () => {
        console.log('listening to port:', PORT)
    })
}

server()