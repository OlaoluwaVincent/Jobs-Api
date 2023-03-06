//
const User = require('../models/User');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError, UnauthenticatedError } = require('../errors');

//
const register = async (req, res) => {
	//I am checking it already in the mongoose
	const user = await User.create({ ...req.body });
	const token = user.createJWT();

	res.status(StatusCodes.CREATED).json({ user: user.getName(), token });
};

// Login controller
const login = async (req, res) => {
	const { email, password } = req.body;
	if (!email || !password) {
		throw new BadRequestError('Email or password is empty');
	}
	const user = await User.findOne({ email });
	if (!user) {
		throw new UnauthenticatedError('Email or password is incorrect');
	}
	//compare password with hashed bcrypt password
	const isPasswordCorrect = await user.comparePassword(password);
	if (!isPasswordCorrect) {
		throw new UnauthenticatedError('Email or password is incorrect');
	}
	// create token
	const token = user.createJWT();
	res.status(StatusCodes.OK).json({ user: { name: user.name }, token });
};

module.exports = {
	register,
	login,
};
