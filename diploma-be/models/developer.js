const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const developerSchema = new Schema({
    name: { type: String, required: true},
    rating: { type: Number, required: true},
    skills: {type: [String], required: true},
    image: {type: String, required: false},
    //id for the future project
    // assignedProject: {type: String, required: false}

    //possible variants
    //email, age
})

module.exports = mongoose.model('Developer', developerSchema);
