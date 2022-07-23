import db from '../models/index';
import userService from '../services/userService';
import jwt from 'jsonwebtoken';

const handleRegister = async (req, res) => {
    try {
        const { fullname, email, password } = req.body;
        if (!fullname || !email || !password) {
            return res.status(400).json({
                errCode: 1,
                message: 'Please fill in all the fields!',
            });
        }
        if (!validateEmail(email))
            return res.status(400).json({
                errCode: 2,
                message: 'Invalid email',
            });

        const user = await db.User.findOne({
            attributes: ['email', 'fullname', 'password'],
            where: { email: email },
            raw: true,
        });

        if (user)
            return res.status(400).json({
                errCode: 3,
                message: 'This email already exists.',
            });

        if (password.length < 6)
            return res.status(400).json({
                errCode: 4,
                message: 'Password must be at least 6 characters.',
            });

        const userData = await userService.handleUserRegister(fullname, email, password);
        return res.status(200).json({ userData });
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            errCode: -1,
            errMessage: 'Error from the server',
        });
    }
};

const activateEmail = async (req, res) => {
    try {
        const { activation_token } = req.body;
        const user = jwt.verify(activation_token, process.env.ACTIVATION_TOKEN_SECRET);

        const { fullname, email, password } = user;

        const check = await db.User.findOne({ where: { email: email } });
        if (check)
            return res.status(400).json({
                errCode: 1,
                message: 'This email is already exists.',
            });

        const newUser = await db.User.create({
            email: email,
            password: password,
            fullname: fullname,
            roleId: 'R3',
        });

        await newUser.save();

        res.status(200).json({
            errCode: 0,
            message: 'Account has been activated.',
        });
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            errCode: -1,
            errMessage: 'Error from the server',
        });
    }
};

const handleLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(500).json({
                errCode: 1,
                message: 'Please fill in all the fields!',
            });
        }

        let userData = await userService.handleUserLogin(email, password);

        const user = await db.User.findOne({
            attributes: ['id', 'email', 'roleId', 'password', 'fullname'],
            where: { email: email },
            raw: true,
        });

        await db.User.update(
            { refresh_token: createRefreshToken },
            {
                where: {
                    id: user.id,
                },
            },
        );

        res.cookie('refreshtoken', createRefreshToken, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });

        const access_token = createAccessToken({ where: { id: user.id } });
        return res.status(200).json({
            errCode: userData.errCode,
            message: userData.errMessage,
            user: userData.user ? userData.user : {},
            access_token,
        });
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            errCode: -1,
            errMessage: 'Error from the server',
        });
    }
};

function validateEmail(email) {
    const re =
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

const createAccessToken = (payload) => {
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
};

const createRefreshToken = (payload) => {
    return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
};

module.exports = {
    handleRegister: handleRegister,
    activateEmail: activateEmail,
    handleLogin: handleLogin,
};
