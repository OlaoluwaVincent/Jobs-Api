const { StatusCodes } = require('http-status-codes');
const errorHandlerMiddleware = (err, req, res, next) => {
	let customError = {
		// set defaults
		statusCode: err.StatusCode || StatusCodes.INTERNAL_SERVER_ERROR,
		msg: err.message || 'Something went wrong, try again later',
	};

	// Cast Errors for the _Id
	if (err.name === 'CastError') {
		// console.log(Object.values(err.errors));
		customError.msg = `ID: [${err.value}] was not found`;
		customError.statusCode = StatusCodes.NOT_FOUND;
	}

	// Validation Errors
	if (err.name === 'ValidationError') {
		// console.log(Object.values(err.errors));
		customError.msg = Object.values(err.errors)
			.map((item) => item.message)
			.join(',');
		customError.statusCode = StatusCodes.BAD_REQUEST;
	}
	// Email already exist
	if (err.code && err.code === 11000) {
		customError.msg = `Email already exist`;
		customError.statusCode = StatusCodes.BAD_REQUEST;
	}
	// return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err });
	return res.status(customError.statusCode).json({ msg: customError.msg });
};

module.exports = errorHandlerMiddleware;
