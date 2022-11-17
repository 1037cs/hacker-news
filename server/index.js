require('dotenv').config()
const express = require('express')
const cors = require('cors')
const path = require("path");
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const PORT = process.env.PORT || 7070
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.static(path.resolve(__dirname,'static')))

app.get('/:id', async (req, res) => {
	const {id} = req.params
	console.log(id)
	const response = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
	const data = await response.json();
	return res.json(data)
})

app.get('/api/getNews', async (req, res) => {
	const response = await fetch(`https://hacker-news.firebaseio.com/v0/newstories.json`)
	const data = await response.json();
	return res.json(data)
})

const start = async () => {
	try {
		app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`))
	} catch (e) {
		console.log(e.message)
	}
}

start()