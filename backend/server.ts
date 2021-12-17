import express from 'express';
import {UserCtrl} from "./controllers/UserController";
import * as dotenv from 'dotenv'
import './db'
import { updateValidations } from './validations/updateUser';
import { PostCtrl } from './controllers/PostsController';
import { postValidation } from './validations/post';
import { AuthCtrl } from './controllers/AuthController';
const bodyParser  = require('body-parser');
const authMiddleware = require('./middleware/authMiddleware');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const errorMiddleware = require('./middleware/error-middleware')
dotenv.config();
const app = express();

app.use(cookieParser());
app.use(cors({
	credentials: true,
	origin: process.env.CLIENT_URL
}));
 app.use(bodyParser.json());
 app.use(bodyParser.urlencoded({ extended: false }));
 app.use(errorMiddleware);

app.post('/auth/registration', AuthCtrl.registration)
app.post('/auth/login', AuthCtrl.login)
app.post('/auth/logout', AuthCtrl.logout);
app.get('/auth/activate/:link', AuthCtrl.activate);
app.get('/token/refresh', AuthCtrl.refresh);



app.patch('/profile', updateValidations, AuthCtrl.update);
app.get('/profile/:id', authMiddleware, UserCtrl.show);


app.get('/users', authMiddleware, UserCtrl.index);


app.get('/posts', PostCtrl.index);
app.get('/posts/:id', PostCtrl.show);
app.get('/posts/user/:id', PostCtrl.getUserPosts);
app.post('/users/:id/posts', PostCtrl.create);
app.delete('/posts/:id',  PostCtrl.delete);
app.patch('/posts/:id', postValidation, PostCtrl.update);





app.listen(8000, () => {
	console.log('Server run!')
})


