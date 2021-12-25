import { userService } from '../services/UserService';
import * as express from 'express';
import { validationResult } from 'express-validator';
import { isValidObjectId } from '../utils/isValidObjectId';
import { UserModel } from '../models/UserModel';
class UserController {
		async getUsers(req: express.Request, res: express.Response, next: express.NextFunction) {
			try {
				const users = await userService.getUsers();
				return res.json({
					data: users
				});
			} catch (e) {
				next(e);
			}
		}

	async updateProfile(req: express.Request, res: express.Response): Promise<void> {
		const userId = req.body.id;
		try {
			const errors = validationResult(req)
			if (!errors.isEmpty()) {
				res.status(400).json({ status: 'error', errors: errors.array() });
				return;
			}
			if (userId) {
				if (!isValidObjectId(userId)) {
					res.status(400).send();
					return;
				}
				const currentUser = await UserModel.findById(userId);

				if (userId) {
					if (String(currentUser._id) === String(userId)) {
						currentUser.email = req.body.email;
						currentUser.fullname = req.body.fullname;
						currentUser.username = req.body.username;
						currentUser.save();
						res.status(200).json({
							data: currentUser,
						})
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
