const User = require('../models/userModel')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.signUp = async (req, res, next) => {
    try {
        const { email } = req.body;
        const isExistingUser = await User.findOne({ email });
        console.log(isExistingUser)

        // check if user already exists
        if (isExistingUser) {
            throw new Error("User already exists");
        }

        // create new user
        const user = await User.create(req.body);
        if (user) {
            res.status(201).json({
                message: "User created successfully",
                data: user
            });
        }
    } catch (error) {
        // return res.status(400).send(error.message);
        next(error)
    }
};


exports.login = async (req, res, next) => {
    //Step 1: Check if user is registered
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            throw new Error("User is not Registered");
        }
        //check if password is correct
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        //console.log(isPasswordMatch);
        if (!isPasswordMatch) {
            throw new Error("Password do not match,try Again");
        }
        //generate token
        const token = jwt.sign({ id: user._id, name: user.name, user: user.role },
            'this-is-my-secret-key', { expiresIn: '30d' });

        res.status(200).json({
            message: "User Logged in successfully"
            , token: token
        });
    }
    catch (error) {
        next(error);
    }
};


