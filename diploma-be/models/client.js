const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const clientSchema = new Schema({
    name: {type: String, required: true},
    /* Basically here we will decide either
    web - developer with HTML/CSS/JS/REACT/ANGULAR/VUE/SVELTE/NodeJS/Java will be shown
    mobile - developer with React Native/Flutter/Swift/Kotlin
    game - Unity/Unreal Engine
     */
    desirableApp: {type: String},
    //id for the future project
    assignedProject: {type: String, required: false}
})

module.exports = mongoose.model('Client', clientSchema);
