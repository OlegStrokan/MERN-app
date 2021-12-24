import { model, Schema, Document } from 'mongoose';
import { PostModelInterface } from './PostModel';

export interface UserModelInterface {
	_id?: string
	email: string;
	fullname: string;
	username: string;
	password: string;
	role: string;
	isActivated: boolean;
	activationLink: string;
	posts?: PostModelInterface[];
}

export type UserModelDocumentInterface = UserModelInterface & Document;

const UserSchema = new Schema<UserModelInterface>({
	email: {
		unique: true,
		required: true,
		type: String,
	},
	fullname: {
		required: true,
		type: String,
	},
	username: {
		required: true,
		type: String,
	},
	password: {
		required: true,
		unique: false,
		type: String,
	},
	isActivated: {
		default: false,
		type: Boolean,
	},
	activationLink: {
		type: String,
	},
	role: { type: String, ref: 'Role'},
	posts: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
});

export const UserModel = model<UserModelDocumentInterface>('User', UserSchema);
