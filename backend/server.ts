import express from 'express';
import { UserCtrl } from './controllers/UserController';
import * as dotenv from 'dotenv'
import './db';
import { PostCtrl } from './controllers/PostsController';
import { postValidation } from './validations/post-validation';
import { AuthCtrl } from './controllers/AuthController';
import { registerValidation } from './validations/register-validation';
import { loginValidation } from './validations/login-validation';

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const authMiddleware = require('./middleware/authMiddleware')
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

// auth functional
app.post('/auth/registration', registerValidation, AuthCtrl.registration)
app.post('/auth/login', loginValidation, AuthCtrl.login)
app.post('/auth/logout', AuthCtrl.logout);
app.get('/auth/activate/:link', AuthCtrl.activate);
app.get('/auth/me', AuthCtrl.refresh);

// users functional
app.get('/users', UserCtrl.getUsers);
app.post('/profile', authMiddleware, UserCtrl.updateProfile)

// user's post functional
app.get('/posts', PostCtrl.index);
app.post('/posts', PostCtrl.create);
app.patch('/posts', postValidation, PostCtrl.update);
app.delete('/posts' , PostCtrl.delete);


app.listen(8000, () => {
  console.log('Server run!')
})


