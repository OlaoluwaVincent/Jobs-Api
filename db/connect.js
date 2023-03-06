require('dotenv').config();
const mongoose = require('mongoose');
mongoose.set('strictQuery', true);

const connectDB = () => {
	return mongoose
		.connect(process.env.MONGODB_URI, {
			useNewUrlParser: true,
			useCreateIndex: true,
			useFindAndModify: false,
			useUnifiedTopology: true,
		})
		.then(() => console.log('Connected to the db...'))
		.catch((err) => console.log(err));
};

module.exports = connectDB;
