import db from '../models/index';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import sendMail from '../controllers/sendMail.js';

const { CLIENT_URL } = process.env;
const salt = bcrypt.genSaltSync(10);

const hashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            const hashPassWord = await bcrypt.hashSync(password, salt);
            resolve(hashPassWord);
        } catch (e) {
            reject(e);
        }
    });
};

const handleUserRegister = (fullname, email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            const hashPasswordFromBcrypt = await hashUserPassword(password);
            const newUser = {
                fullname,
                email,
                password: hashPasswordFromBcrypt,
            };
            const activation_token = createActivationToken(newUser);

            const url = `${CLIENT_URL}/api/user/activate/${activation_token}`;
            sendMail(email, url, 'Verify your email address');
            resolve({
                errCode: 0,
                errMessage: 'Register Success! Please activate your email to start.',
            });
        } catch (e) {
            console.log(e);
            reject(e);
        }
    });
};

const handleUserLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            const userData = {};
            const isExist = await checkUserEmail(email);
            if (isExist) {
                //user already exist
                const user = await db.User.findOne({
                    attributes: ['email', 'roleId', 'password', 'fullname'],
                    where: { email: email },
                    raw: true,
                });
                if (user) {
                    const check = await bcrypt.compare(password, user.password);

                    if (check) {
                        userData.errCode = 0;
                        userData.errMessage = 'Login success!';

                        delete user.password;
                        userData.user = user;
                    } else {
                        userData.errCode = 3;
                        userData.errMessage = 'This password is incorrect!';
                    }
                } else {
                    userData.errCode = 2;
                    userData.errMessage = `User not found`;
                }
            } else {
                userData.errCode = 1;
                userData.errMessage = `Your's Email isn't exist in our system, plz try other email`;
            }

            resolve(userData);
        } catch (e) {
            reject(e);
        }
    });
};

const getAllCodeService = (typeInput) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!typeInput) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameters',
                });
            } else {
                const res = {};
                const allcode = await db.Allcode.findAll({ where: { type: typeInput } });
                res.errCode = 0;
                res.data = allcode;
                resolve(res);
            }
        } catch (e) {
            reject(e);
        }
    });
};

const checkUserEmail = (userEmail) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await db.User.findOne({
                where: { email: userEmail },
            });
            if (user) {
                resolve(true);
            } else {
                resolve(false);
            }
        } catch (e) {
            reject(e);
        }
    });
};

const createActivationToken = (payload) => {
    return jwt.sign(payload, process.env.ACTIVATION_TOKEN_SECRET, { expiresIn: '5m' });
};

module.exports = {
    handleUserRegister: handleUserRegister,
    handleUserLogin: handleUserLogin,
    getAllCodeService: getAllCodeService,
};
