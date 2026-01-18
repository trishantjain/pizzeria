const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')
const { default: User } = require('../models/User');

// REGISTER USER
router.post('/register', async (req, res) => {
    try {
        const { email, password, contact } = req.body;

        if (!email || !password || !contact) {
            return res.status(400).send({ errorCode: 400, errorMsg: "Invalid Credentials" });
        }

        const emailCheck = await User.findOne({ email });

        if (emailCheck) {
            return res.status(409).json({ error: "email already exist" });
        }

        const updated_pwd = await bcrypt.hash(password, 10);

        const user = {
            email: email,
            password: updated_pwd,
            contact: contact
        };

        const newUser = new User(user);
        const saveResult = await newUser.save();

        if (saveResult) {
            res.send({ email, updated_pwd, msg: "Registered" })
        }
    } catch (err) {
        const errorCode = err.code || 500;
        const errorMsg = err.message || "Internal Server Error";
        res.status(errorCode).send({ errorCode, errorMsg });
    }
});

// LOGIN USER
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const registeredUser = await User.findOne({ email: email });
        const registeredPassword = registeredUser.password;
        console.log("User: ", registeredUser);

        const PRIVATE_KEY = "pizzauserregister88";

        if (!registeredUser) {
            console.log("Password not matched")
            return res.status(401).send({ msg: "Invalid Credentials" });
        }

        const isPasswordMatch = await bcrypt.compare(password, registeredPassword);

        if (!isPasswordMatch) {
            console.log("Password not matched")
            return res.status(401).send({ msg: "Invalid Credentials" });
        }
        console.log("password matched")

        const token = jwt.sign({ userId: registeredUser._id }, PRIVATE_KEY, { expiresIn: "2h" })
        // res.cookie({ token, msg: "Logined" })
        console.log("token: ", token);


        // STORING COOKIE
        res.cookie('token', token, {
            httpOnly: true,
            sameSite: true,
            secure: false,
            maxAge: 86400000
        });

        res.json({ success: true });
    } catch (err) {
        const errorCode = err.code || 500;
        const errorMsg = err.message || "Internal Server Error";
        res.status(errorCode).send({ errorCode, errorMsg })
    }

});

// ROUTE FOR FETCHING COOKIE
router.get('/me', (req, res) => {
    const token = req.cookies.token;

    const PRIVATE_KEY = "pizzauserregister88";

    if (!token) return res.status(401).json({ error: 'No token' });
    try {
        const decoded = jwt.verify(token, PRIVATE_KEY);
        res.json({ userId: decoded.userId });
    } catch (err) {
        res.status(401).json({ error: 'Invalid token' });
    }
})

module.exports = router;