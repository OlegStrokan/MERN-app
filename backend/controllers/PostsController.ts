import * as express from 'express'
import { validationResult } from 'express-validator';
import { isValidObjectId } from '../utils/isValidObjectId';
import { PostModel, PostModelInterface } from '../models/PostModel';
import { UserModel, UserModelInterface } from '../models/UserModel';

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

  async show(req: express.Request, res: express.Response): Promise<void> {
    try {
      const postId = req.params.id;

      if (!isValidObjectId(postId)) {
        res.status(400).send();
        return;
      }

      const post = await PostModel.findById(postId);

      if (!post) {
        res.status(404).send();
        return;
      }

      res.json({
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
      }
      const data: any = {
        title: req.body.title,
        content: req.body.content,
        likesCount: 0,
        user: user._id,
      }

      const post = await PostModel.create(data);
      await post.save();
      const userById = await UserModel.findById(user._id);
      userById.posts!.push(post._id);
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
            currentPost.title = post.title
            currentPost.content = post.content;
            currentPost.likesCount = post.likesCount
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

  async delete(req: express.Request, res: express.Response): Promise<void> {

    const postId = req.params.id as string;
    try {
      if (!postId) {
        if (!isValidObjectId(postId)) {
          res.status(400).send(' Post not found');
          return;
        }
      }
      const currentPost = await PostModel.findById(postId);
      const currentUser = await UserModel.findById(currentPost.user)
      const post = await UserModel.findByIdAndUpdate(
        currentUser._id,
        {
          $pull: { posts: postId },
        },
        { new: true }
      );
      if (post) {

        await PostModel.findByIdAndDelete(postId);
        res.status(200).send({
          message: 'success',
        });
      } else {
        res.status(404).send({
          message: 'Что-то пошло не так'
        });
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
