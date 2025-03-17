const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const developerSchema = new Schema({
    name: { type: String, required: true},
    rating: { type: Number, required: true},
    skills: {type: [String], required: true},
    image: {type: String, required: false},
})

module.exports = mongoose.model('Developer', developerSchema);
