import { model, Schema, Document } from 'mongoose';

export interface PostModelInterface {
	_id?: string
	content: string;
	likesCount: string;
}

type PostModelDocumentInterface = PostModelInterface & Document;

const PostSchema = new Schema<PostModelInterface>({
	content: {
		required: true,
		type: String,
	},
	likesCount: {
		required: false,
		type: String,
	},
});

export const PostModel = model<PostModelDocumentInterface>('Post', PostSchema);
