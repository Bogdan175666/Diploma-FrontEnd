const Developer = require("../models/developer");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");

const getDevelopers = async (req, res, next) => {
    let developers;

    try {
        developers = await Developer.find();
        res.json(developers);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
}

const createDeveloper = async (req, res, next) => {
    const {name, skills, password, email} = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);



    try {
        const existingDeveloper = await Developer.findOne({ email });
        if (existingDeveloper) return res.status(400).json({ message: "Email already in use" });

        const createdDev = new Developer({
            name,
            skills,
            password: hashedPassword,
            email,
            image: 'https://images.theconversation.com/files/393210/original/file-20210401-13-z6rl6z.jpg?ixlib=rb-4.1.0&rect=9%2C0%2C2994%2C1999&q=20&auto=format&w=320&fit=clip&dpr=2&usm=12&cs=strip',
            rating: 0.0
        });
        await createdDev.save();

        const token = generateToken(createdDev);

        res.status(201).json({token: token, developer: createdDev});

    } catch (err) {
        console.log(err);
        return next(err);
    }
}

const getDeveloperById = async (req, res, next) => {
    const devId = req.params.devId;

    let developer;
    try {
        developer = await Developer.findById(devId);
    } catch (e) {
        console.log(e);
        return next(e);
    }

    // add validation for non-existing developer

    res.json({developer: developer.toObject({getters: true})})
}

const updateDeveloperSkills = async (req, res, next) => {
    const devId = req.params.devId;

    let developer;
    try {
        let {skills} = req.body;
        if (!Array.isArray(skills)) {
            skills = [];
        }
        developer = await Developer.findByIdAndUpdate(
            devId,
            { $set: { skills } },
            { new: true }
        );
        res.json(developer);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const deleteDeveloper = async (req, res, next) => {
    let devId = req.params.devId;

    let deletedDeveloper;

    try {
        deletedDeveloper = Developer.findById(devId);


        if (!deletedDeveloper) {
            return res.status(404).json({ message: "Developer not found" });
        }
    } catch (e) {
        res.status(500).json({ error: e.message });
    }

    try {
        await deletedDeveloper.deleteOne();
    } catch (e) {
        console.log(e);
    }

    return res.status(200).json({message: "Developer deleted"});
}

exports.createDeveloper = createDeveloper;
exports.getDeveloperById = getDeveloperById;
exports.updateDeveloperSkills = updateDeveloperSkills;
exports.getDevelopers = getDevelopers;
exports.deleteDeveloper = deleteDeveloper;
