const Client = require('../models/client');
const Developer = require('../models/developer');
const bcrypt = require('bcryptjs');
const generateToken = require("../utils/generateToken");


const login = async (req, res, next) => {
    const {email, password} = req.body;

    try {
        let user = await Developer.findOne({email}) || await Client.findOne({email});

        if (!user) return res.status(401).json({message: "Invalid credentials"});

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({message: "Invalid credentials"});

        const token = generateToken(user);
        res.json({token, user});

    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

exports.login = login;
