import { mongoose } from '../db';


export const isValidObjectId = mongoose.Types.ObjectId.isValid;
