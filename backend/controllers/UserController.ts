import * as express from 'express'
import { UserModel } from '../models/UserModel';

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
	async show(req: any, res: express.Response): Promise<void> {
		try {
			const userId = req.params.id;

			if (!isValidObjectId(userId)) {
				res.status(400).send();
				return;
			}

			const user = await UserModel.findById(userId).populate('posts').exec();

			if (!user) {
				res.status(404).send();
				return;
			}

			res.json({
				status: 'success',
				data: user,
			});
		} catch (error) {
			res.status(500).json({
				status: 'error',
				message: error,
			});
		}
	}
}

export const UserCtrl = new UserController()
