import { model, Schema, Document } from 'mongoose';

export interface UserModelInterface {
	_id?: string
	email: string;
	fullname: string;
	username: string;
	password: string;
	posts?: string[];
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
		unique: true,
		required: true,
		type: String,
	},
	password: {
		required: true,
		type: String,
	},
	role: [{ type: String, ref: 'Role'}],
	posts: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
});

export const UserModel = model<UserModelDocumentInterface>('User', UserSchema);
