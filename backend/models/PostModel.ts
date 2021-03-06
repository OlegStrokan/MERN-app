import { model, Schema, Document } from 'mongoose';
import { UserModelInterface } from './UserModel';

export interface PostModelInterface {
	_id?: string
	content: string;
	title: string;
	likesCount: number;
	user: UserModelInterface
}

type PostModelDocumentInterface = PostModelInterface & Document;

const PostSchema = new Schema<PostModelInterface>({
	title: {
		required: true,
		type: String,
	},
	content: {
		required: true,
		type: String,
	},
	likesCount: {
		required: false,
		type: Number,
	},
	user: {
		required: true,
		ref: 'User',
		type: Schema.Types.ObjectId,
	},

});

export const PostModel = model<PostModelDocumentInterface>('Post', PostSchema);
