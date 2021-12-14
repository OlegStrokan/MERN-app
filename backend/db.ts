import mongoose from 'mongoose';

export const uri = 'mongodb+srv://oleg:258120@cluster0.omnpn.mongodb.net/Cluster0?retryWrites=true&w=majority';

mongoose.connect(uri, {
	useNewUrlParser: true,
	useCreateIndex: true,
	useUnifiedTopology: true,
	useFindAndModify: false,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

export { db, mongoose };
