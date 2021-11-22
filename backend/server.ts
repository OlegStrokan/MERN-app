import * as express from 'express'
import {UserCtrl} from "./controllers/UserController";
import {registerValidations} from "./validations/register";
import * as dotenv from 'dotenv'
import './db'
import * as bodyParser from 'body-parser';
import { updateValidations } from './validations/updateUser';
import { PostCtrl } from './controllers/PostsController';
import { postValidation } from './validations/post';


dotenv.config();
const app = express();

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));


app.get('/users', UserCtrl.index);
app.get('/users/:id', UserCtrl.show);
app.post('/users', registerValidations, UserCtrl.create);
app.patch('/users/:id', updateValidations, UserCtrl.update);
app.delete('/users/:id', UserCtrl.delete);

app.get('/posts', PostCtrl.index);
app.get('/posts/:id', PostCtrl.show);
app.get('/posts/user/:id', PostCtrl.getUserPosts);
app.delete('/posts/:id',  PostCtrl.delete);
app.patch('/posts/:id', postValidation, PostCtrl.update);
app.post('/posts', postValidation, PostCtrl.create);


app.listen(8888, () => {
	console.log('Server run!')
})


