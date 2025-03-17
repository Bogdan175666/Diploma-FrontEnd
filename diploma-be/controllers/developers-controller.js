const Developer = require("../models/developer");
const createDeveloper = async (req, res, next) => {
    console.log(req);
    const {name, skills} = req.body;

    const createdDev = new Developer({
        name,
        skills,
        image: 'https://images.theconversation.com/files/393210/original/file-20210401-13-z6rl6z.jpg?ixlib=rb-4.1.0&rect=9%2C0%2C2994%2C1999&q=20&auto=format&w=320&fit=clip&dpr=2&usm=12&cs=strip',
        rating: 0.0
    });

    try {
        await createdDev.save();
    } catch (err) {
        console.log(err);
        return next(err);
    }

    res.status(201).json({developer: createdDev});
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

exports.createDeveloper = createDeveloper;
exports.getDeveloperById = getDeveloperById;
