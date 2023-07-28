const { Schema, model } = require("mongoose");

const passwordSchema = new Schema({
    loginTo: {
        type: String,
        required: true,
    },
    savedUsername: {
        type: String,
        required: true,
    },
    savedPassword: {
        type: String,
        required: true,
    },
});


module.exports = passwordSchema;