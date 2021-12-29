import * as express from 'express'
import {validationResult} from "express-validator";
import { isValidObjectId } from '../utils/isValidObjectId';
import { PostModel, PostModelInterface } from '../models/PostModel';
import { UserModel, UserModelInterface } from '../models/UserModel';
import { posts } from '../../frontend/src/mobx/posts';
class PostController {

	async index(req: express.Request, res: express.Response): Promise<void> {
		try {
			const posts = await PostModel.find();
			res.json({
				message: 'success',
				data: posts,
			});
		} catch (error) {
			res.status(500).json({
				message: error,
			});
		}
	}


	async create(req: express.Request, res: express.Response): Promise<void> {
		try {
			const user = req.body.user as UserModelInterface;
			if (user?._id) {
				const errors = validationResult(req);

				if (!errors.isEmpty()) {
					res.status(400).json({ status: 'error', errors: errors.array() });
					return;
				}
}
				const data: PostModelInterface = {
					content: req.body.content,
					likesCount: 0,
					userId: user._id,
				}


				const post = await PostModel.create(data);
				await post.save();
				const userById = await UserModel.findById(user._id);
				userById.posts.push(post);
				await userById.save();
				const posts = await PostModel.find();

				res.json({
					message: 'success',
					data: posts
				});

		} catch (error) {
			res.status(500).json({
				message: error,
			});
		}
	}


	async delete(req: express.Request, res: express.Response): Promise<void> {
		console.log(req.body)
		const postId = req.body.id as string;
		try {
			if (postId) {
				if (!isValidObjectId(postId)) {
					res.status(400).send();
					return;
				}

				const currentPost = await PostModel.findById(postId);
				console.log(currentPost)
				const currentUser = await UserModel.findById(currentPost.userId)
				console.log(currentUser)
				if (currentPost) {
					if (String(currentPost._id) === String(currentUser._id)) {
						currentPost.remove();
						const posts = await PostModel.find();
						res.status(200).send({
							message: 'success',
							posts: posts
						});
					} else {
						res.status(403).send({
							message: 'Пост с таким id не найдет'
						});
					}
				} else {
					res.status(404).send({
						message: 'Что-то пошло не так'
					});
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
		const post = req.body as PostModelInterface;
		console.log(post)
		try {
		const errors = validationResult(req)
		if (!errors.isEmpty()) {
			res.status(400).json({ status: 'error', errors: errors.array() });
			return;
		}
			if (post) {
				const postId = post._id;

				if (!isValidObjectId(postId)) {
					res.status(400).send();
					return;
				}

				const currentPost = await PostModel.findById(postId);

				if (post) {
					if (String(currentPost._id) === String(postId)) {
						currentPost.content = req.body.content;
						currentPost.likesCount = req.body.likesCount
						currentPost.save();
						const posts = await PostModel.find();
						res.status(200).send({
							message: 'success',
							posts: posts
						});
					} else {
						res.status(403).send({
							message: 'Пост с таким id не найдет'
						});
					}
				} else {
					res.status(404).send({
						message: 'Что-то пошло не так'
					});
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
