import * as express from 'express'
import { UserModel, UserModelInterface } from '../models/UserModel';
import {validationResult} from "express-validator";
import {generateMD5} from "../utils/generateHash";
import { isValidObjectId } from '../utils/isValidObjectId';
class UserController {
	async index(_: any, res: express.Response): Promise<void> {
		try {
			const users = await UserModel.find({}).exec();
			res.json({
				status: 'success',
				data: users
			})
		} catch (error) {
			res.json({
				status: 'error',
				message: JSON.stringify(error)
			})
		}
	}
	async create(req: express.Request, res: express.Response): Promise<void> {
		try {
			const errors = validationResult(req)
			if (!errors.isEmpty()) {
				res.status(400).json({ status: 'error', errors: errors.array() });
				return;
			}

			const data = {
				email: req.body.email,
				fullname: req.body.fullname,
				username: req.body.username,
				password: req.body.password,
				confirmHash: generateMD5(process.env.SECRET_KEY || Math.random().toString()),
			}

			const user = await UserModel.create(data)

			res.json({
				status: 'success',
				data: user
			})
		} catch (error) {
			res.json({
				status: 'error',
				message: JSON.stringify(error)
			})
		}
	}

	async delete(req: express.Request, res: express.Response): Promise<void> {
		const user = req.body as UserModelInterface;
		try {
			if (user) {
				const userId = req.params.id;

				if (!isValidObjectId(userId)) {
					res.status(400).send();
					return;
				}

				const currentUser = await UserModel.findById(userId);

				if (currentUser) {
					if (String(currentUser._id) === String(userId)) {
						currentUser.remove();
						res.send();
					} else {
						res.status(403).send();
					}
				} else {
					res.status(404).send();
				}
			}
		} catch (error) {
			res.status(500).json({
				status: 'error',
				message: error,
			});
		}

	}

	async update(req: express.Request, res: express.Response): Promise<void> {
		// @ts-ignore
		const user = req.body as UserModelInterface;
		try {
		const errors = validationResult(req)
		if (!errors.isEmpty()) {
			res.status(400).json({ status: 'error', errors: errors.array() });
			return;
		}
			if (user) {
				const userId = req.params.id;

				if (!isValidObjectId(userId)) {
					res.status(400).send();
					return;
				}

				const currentUser = await UserModel.findById(userId);

				if (user) {
					if (String(currentUser._id) === String(userId)) {
						currentUser.email = req.body.email;
						currentUser.fullname = req.body.fullname;
						currentUser.username = req.body.username;
						currentUser.save();
						res.send();
					} else {
						res.status(403).send();
					}
				} else {
					res.status(404).send();
				}
			}
		} catch (error) {
			res.status(500).json({
				status: 'error',
				message: error,
			});
		}
	}


}

export const UserCtrl = new UserController()
