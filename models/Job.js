// create a job model with mongoose with name, title and description
const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema(
	{
		company: {
			type: String,
			required: [true, 'Please Provide a company name'],
			maxLength: 50,
		},
		position: {
			type: String,
			required: [true, 'Please Provide a position'],
			maxLength: 100,
		},
		status: {
			type: String,
			enum: ['interview', 'declined', 'pending'],
			default: 'pending',
		},
		createdBy: {
			type: mongoose.Types.ObjectId,
			ref: 'User',
			required: true,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Jobs', JobSchema);
