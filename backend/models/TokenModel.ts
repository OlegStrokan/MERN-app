import { Schema, model, Document } from 'mongoose';
import { UserModelInterface } from './UserModel';


export interface TokenModelInterface {
  user: string,
  refreshToken: string,
}

export type TokenModelDocumentInterface = TokenModelInterface & Document;


const TokenSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId, ref: 'User'
  },
  refreshToken: {
    type: String,
    required: true
  }

})


export const TokenModel = model<TokenModelDocumentInterface>('Token', TokenSchema);

