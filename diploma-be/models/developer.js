const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const developerSchema = new Schema({
    name: { type: String, required: true},
    rating: { type: Number, required: true},
    skills: {type: [String], required: true},
    image: {type: String, required: false},
    password: {type: String, required: false},
    email: {type: String, required: false, unique: true},
    assignedProject: {type: mongoose.Types.ObjectId, required: false, ref: 'Project'}

})

module.exports = mongoose.model('Developer', developerSchema);
