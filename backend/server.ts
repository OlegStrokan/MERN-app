import * as express from 'express'
import {UserCtrl} from "./controllers/UserController";
import * as dotenv from 'dotenv'
import './db'
import * as bodyParser from 'body-parser';
import { updateValidations } from './validations/updateUser';
import { PostCtrl } from './controllers/PostsController';
import { postValidation } from './validations/post';
import { AuthCtrl } from './controllers/AuthController';
const authMiddleware = require('./middleware/authMiddleware');
const cors = require('cors');

dotenv.config();
const app = express();

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

const corsOpts = {
	origin: '*',

	methods: [
		'GET',
		'POST',
	],

	allowedHeaders: [
		'Content-Type',
	],
};

app.use(cors(corsOpts));

app.post('/auth/registration', AuthCtrl.registration)
app.post('/auth/login', AuthCtrl.login)
app.delete('/auth/logout', AuthCtrl.logout);

app.patch('/profile/:id', updateValidations, AuthCtrl.update);
app.get('/profile/:id', authMiddleware, UserCtrl.show);


app.get('/users', authMiddleware, UserCtrl.index);


app.get('/posts', PostCtrl.index);
app.get('/posts/:id', PostCtrl.show);
app.get('/posts/user/:id', PostCtrl.getUserPosts);
app.post('/users/:id/posts', PostCtrl.create);
app.delete('/posts/:id',  PostCtrl.delete);
app.patch('/posts/:id', postValidation, PostCtrl.update);





app.listen(8888, () => {
	console.log('Server run!')
})


