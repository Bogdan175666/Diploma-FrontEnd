const Client = require("../models/client");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");

const createClient = async (req, res, next) => {
    const { name, password, email } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    try {
        const existingClient = await Client.findOne({ email });
        if (existingClient) return res.status(400).json({ message: "Email already in use" });
        const createdClient = new Client({
            name,
            desirableApp: "",
            password: hashedPassword,
            email
        });
        await createdClient.save();

        const token = generateToken(createdClient);

        res.status(201).json({token: token, client: createdClient});

    } catch (err) {
        console.log(err);
        return next(err);
    }

}

exports.createClient = createClient;
