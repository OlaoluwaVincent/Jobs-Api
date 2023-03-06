const JobModel = require('../models/Job');
const { BadRequestError, NotFoundError } = require('../errors');
const { StatusCodes } = require('http-status-codes');

const getAllJobs = async (req, res) => {
	const jobs = await JobModel.find({ createdBy: req.user.userId }).sort(
		'createdAt'
	);
	res.status(StatusCodes.OK).json({ jobs, count: jobs.length });
};

//create Jobs
const createJob = async (req, res) => {
	req.body.createdBy = req.user.userId;

	const job = await JobModel.create(req.body);
	res.status(StatusCodes.CREATED).json({ job });
};

// get jobs
const getJob = async (req, res) => {
	const {
		user: { userId },
		params: { id: jobId },
	} = req;

	const job = await JobModel.findOne({
		_id: jobId,
		createdBy: userId,
	});

	if (!job) {
		throw new BadRequestError(`Job with ID: ${jobId}, not found`);
	}
	res.status(StatusCodes.OK).json({ job });
};

// Update Jobs
const updateJob = async (req, res) => {
	const {
		user: { userId },
		params: { id: jobId },
		body: { company, position },
	} = req;

	if (company === '' || position === '') {
		throw new BadRequestError(
			'Please company or position fields cannot be empty'
		);
	}

	const job = await JobModel.findOneAndUpdate(
		{
			_id: jobId,
			createdBy: userId,
		},
		req.body,
		{ new: true, runValidators: true }
	);

	if (!job) {
		throw new BadRequestError('Job with id: ' + jobId + ',not found');
	}

	res.status(StatusCodes.OK).json({ job });
};

// Delete Jobs
const deleteJob = async (req, res) => {
	const {
		user: { userId },
		params: { id: jobId },
	} = req;

	const job = await JobModel.findOneAndDelete({
		_id: jobId,
		createdBy: userId,
	});

	if (!job) {
		throw new BadRequestError(`Job ID: ${jobId} was not found`);
	}
	res.status(StatusCodes.OK).send();
};

module.exports = {
	getAllJobs,
	getJob,
	createJob,
	updateJob,
	deleteJob,
};
