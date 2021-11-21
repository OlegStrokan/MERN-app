import * as express from 'express'
import {validationResult} from "express-validator";
import { isValidObjectId } from '../utils/isValidObjectId';
import { PostModel, PostModelInterface } from '../models/PostModel';
class PostController {
	async index(_: any, res: express.Response): Promise<void> {
		try {
			const posts = await PostModel.find({}).exec();
			res.json({
				status: 'success',
				data: posts
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
				content: req.body.content,
				likesCount: 0,
			}

			const post = await PostModel.create(data)

			res.json({
				status: 'success',
				data: post
			})
		} catch (error) {
			res.json({
				status: 'error',
				message: JSON.stringify(error)
			})
		}
	}

	async delete(req: express.Request, res: express.Response): Promise<void> {
		const post = req.body as PostModelInterface;
		try {
			if (post) {
				const postId = req.params.id;

				if (!isValidObjectId(postId)) {
					res.status(400).send();
					return;
				}

				const currentPost = await PostModel.findById(postId);

				if (currentPost) {
					if (String(currentPost._id) === String(postId)) {
						currentPost.remove();
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
		const post = req.body as PostModelInterface;
		try {
		const errors = validationResult(req)
		if (!errors.isEmpty()) {
			res.status(400).json({ status: 'error', errors: errors.array() });
			return;
		}
			if (post) {
				const postId = req.params.id;

				if (!isValidObjectId(postId)) {
					res.status(400).send();
					return;
				}

				const currentPost = await PostModel.findById(postId);

				if (post) {
					if (String(currentPost._id) === String(postId)) {
						currentPost.content = req.body.content;
						currentPost.save();
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

export const PostCtrl = new PostController()
