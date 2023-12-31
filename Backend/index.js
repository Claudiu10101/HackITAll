const express = require("express");
const app = express();
const mongoose = require('mongoose')
const cors = require('cors')

app.use(cors())
app.use(express.json());


mongoose.connect("mongodb://localhost/hackaton")
const db = mongoose.connection

const UserRouter = require('./routes/HandleUsers')
app.use('/Users', UserRouter)

const BusinessRouter = require('./routes/HandleBusinesses')
app.use('/Bussiness', BusinessRouter)

const PCRouter = require('./routes/HandleClients')
app.use('/Clients', PCRouter)


app.listen(3000, () => {
	console.log("Server started on port 3000");
})
