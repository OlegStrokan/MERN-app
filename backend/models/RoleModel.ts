import { model, Schema, Document } from 'mongoose';

export interface RoleModelInterface {
	value: string,
}

export type RoleModelDocumentInterface = RoleModelInterface & Document;

const RoleSchema = new Schema<RoleModelInterface>({
	value: {
		type: String,
		default: 'USER',
		unique: true,
	},
	posts: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
});

export const RoleModel = model<RoleModelDocumentInterface>('Role', RoleSchema);
