import * as express from 'express'
import {validationResult} from "express-validator";
import { isValidObjectId } from '../utils/isValidObjectId';
import { PostModel, PostModelInterface } from '../models/PostModel';
import { UserModel, UserModelDocumentInterface, UserModelInterface } from '../models/UserModel';
class PostController {

	async index(_: any, res: express.Response): Promise<void> {
		try {
			const tweets = await PostModel.find({}).populate('user').sort({ createdAt: '-1' }).exec();

			res.json({
				status: 'success',
				data: tweets,
			});
		} catch (error) {
			res.status(500).json({
				status: 'error',
				message: error,
			});
		}
	}

	async show(req: any, res: express.Response): Promise<void> {
		try {
			const tweetId = req.params.id;

			if (!isValidObjectId(tweetId)) {
				res.status(400).send();
				return;
			}

			const tweet = await PostModel.findById(tweetId).populate('user').exec();

			if (!tweet) {
				res.status(404).send();
				return;
			}

			res.json({
				status: 'success',
				data: tweet,
			});
		} catch (error) {
			res.status(500).json({
				status: 'error',
				message: error,
			});
		}
	}

	async getUserPosts(req: any, res: express.Response): Promise<void> {
		try {
			const userId = req.params.id;

			if (!isValidObjectId(userId)) {
				res.status(400).send();
				return;
			}

			const post = await PostModel.find({ user: userId }).populate('user').exec();

			if (!post) {
				res.status(404).send();
				return;
			}

			res.json({
				status: 'success',
				data: post,
			});
		} catch (error) {
			res.status(500).json({
				status: 'error',
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

				const data: any = {
					content: req.body.content,
					user: user._id,
				};


				const post = await PostModel.create(data);

				user.posts!.push(post._id);
		
				res.json({
					status: 'success',
					data: await post.populate('user').execPopulate(),
				});

			}
		} catch (error) {
			res.status(500).json({
				status: 'error',
				message: error,
			});
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
