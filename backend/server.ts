import * as express from 'express'
import {UserCtrl} from "./controllers/UserController";
import {registerValidations} from "./validations/register";
import * as dotenv from 'dotenv'
import './db'
import * as bodyParser from 'body-parser';


dotenv.config();
const app = express();

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));


app.get('/users', UserCtrl.index);
app.post('/users', registerValidations, UserCtrl.create);
app.patch('/users/:id', UserCtrl.update);
app.delete('/users/:id', UserCtrl.delete);

app.listen(8888, () => {
	console.log('Server run!')
})

