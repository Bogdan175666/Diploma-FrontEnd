const Client = require("../models/client");

const createClient = async (req, res, next) => {
    const {name} = req.body;

    const createdClient = new Client({
        name,
        desirableApp: "",
        assignedProject: ""
    });

    try {
        await createdClient.save();
    } catch (err) {
        console.log(err);
        return next(err);
    }

    res.status(201).json({client: createdClient});
}

exports.createClient = createClient;
