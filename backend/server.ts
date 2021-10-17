import * as express from 'express'

const app = express()

app.get('/', ((req, res) => {
	res.send('Hello')
}))

app.listen(8888, () => {
	console.log('Server run!')
})
