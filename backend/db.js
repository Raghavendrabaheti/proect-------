const mongoose = require('mongoose');

const colors = require('colors'); // for customize color

const connectDB = async () => {
    try {
        const connection = mongoose.connect('mongodb://localhost:27017/Ecommerce');
        console.log(colors.blue("Successfully connected to MongoDB"));

    } catch (error) {
        console.log(Colors.red(error));
    }
}

module.exports = connectDB;