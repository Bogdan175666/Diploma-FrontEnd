const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const projectSchema = new Schema({
    name: {type: String, required: true},
    dateStarted: {type: String, required: true},
    dateEnded: {type: String, required: false},
    clientId: {type: mongoose.Types.ObjectId, required: false, ref: 'Client'},
    developerId: {type: mongoose.Types.ObjectId, required: false, ref: 'Developer'}
})

module.exports = mongoose.model('Project', projectSchema);
