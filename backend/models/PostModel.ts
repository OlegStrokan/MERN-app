import { model, Schema, Document } from 'mongoose';

export interface PostModelInterface {
	_id?: string
	content: string;
	likesCount: number;
	userId: string
}

type PostModelDocumentInterface = PostModelInterface & Document;

const PostSchema = new Schema<PostModelInterface>({
	content: {
		required: true,
		type: String,
	},
	likesCount: {
		required: false,
		type: Number,
	},
	userId: {
		required: true,
		ref: 'User',
		type: Schema.Types.ObjectId,
	},

});

export const PostModel = model<PostModelDocumentInterface>('Post', PostSchema);
