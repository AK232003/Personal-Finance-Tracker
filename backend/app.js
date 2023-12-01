const express = require('express')
const cors = require('cors');
const { db } = require('./db/db');
const {readdirSync} = require('fs')
const app = express()
const auth = require("./controllers/auth.js");

require('dotenv').config()

const PORT = 5000

//middlewares
app.use(express.json())
app.use(cors())

// actions for authentication
app.post("/register", auth.register);
app.post("/login", auth.login);
app.post("/logout", auth.logout);

//routes
readdirSync('./routes').map((route) => app.use('/api/v1', require('./routes/' + route)))

const server = () => {
    db()
    app.listen(PORT, () => {
        console.log('listening to port:', PORT)
    })
}

server()