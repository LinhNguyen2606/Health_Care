import db from '../models/index';
import userService from '../services/userService';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const handleRegister = async (req, res) => {
    try {
        const { fullname, email, password } = req.body;
        if (!fullname || !email || !password)
            return res.status(400).json({
                errCode: 1,
                message: 'Please fill in all the fields.',
            });
        if (!validateEmail(email))
            return res.status(400).json({
                errCode: 2,
                message: 'Invalid email',
            });

        const user = await db.User.findOne({
            attributes: ['email', 'password', 'fullname'],
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

        return res.status(200).json({
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
            path: '/user/refresh_token',
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

const facebookLogin = async (req, res) => {
    try {
        //get access token and userId
        const { accessToken, userID, email, name } = req.body;
        const password = email + process.env.FACEBOOK_SECRET;

        const passwordHash = await bcrypt.hash(password, 12);

        const user = await db.User.findOne({ where: { email: email } });
        // 1. If user exist / sign in
        if (user) {
            //check password
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch)
                return res.status(400).json({
                    errCode: 3,
                    errMessage: 'Password is incorrect.',
                });

            //refresh token
            const refresh_token = createRefreshToken({ where: { id: user.id } });
            // store cookie
            res.cookie('refreshtoken', refresh_token, {
                httpOnly: true,
                path: '/user/refresh_token',
                maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
            });

            return res.status(200).json({
                errCode: 0,
                errMessage: 'Login success!',
            });
        } else {
            // new user / create user
            const newUser = await db.User.create({
                fullname: name,
                email: email,
                password: passwordHash,
                roleId: 'R3',
            });

            await newUser.save();

            //refresh token
            const refresh_token = createRefreshToken({ where: { id: newUser.id } });
            // store cookie
            res.cookie('refreshtoken', refresh_token, {
                httpOnly: true,
                // path: '/user/refresh_token',
                maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
            });
            return res.status(200).json({
                errCode: 0,
                errMessage: 'Login success!',
            });
        }
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
    facebookLogin: facebookLogin,
};
