import * as express from 'express'
import {UserCtrl} from "./controllers/user-controller";
import {registerValidations} from "./validations/register";
const app = express()


app.use(express.json)

app.get('/users', UserCtrl.index)
app.post('/users', registerValidations, UserCtrl.create)
app.patch('/users', UserCtrl.create)
app.delete('/users', UserCtrl.create)

app.listen(8888, () => {
	console.log('Server run!')
})
