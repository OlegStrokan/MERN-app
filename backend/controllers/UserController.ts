import { userService } from '../services/UserService';
import * as express from 'express';
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
}

export const UserCtrl = new UserController()
