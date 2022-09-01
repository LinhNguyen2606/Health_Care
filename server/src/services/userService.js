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

let getUserOrAllUsers = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = '';
            if (userId === 'ALL') {
                users = await db.User.findAll({
                    attributes: {
                        exclude: ['password'],
                    },
                });
            }
            if (userId && userId !== 'ALL') {
                users = await db.User.findOne({
                    where: { id: userId },
                    attributes: {
                        exclude: ['password'],
                    },
                });
            }
            resolve(users);
        } catch (e) {
            reject(e);
        }
    });
};

const createNewUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!validateEmail(data.email))
                resolve({
                    errCode: 1,
                    errMessage: 'Invalid email',
                });

            if (data.password.length < 6)
                resolve({
                    errCode: 2,
                    errMessage: 'Password must be at least 6 characters.',
                });
            //check email is exist?
            const check = await checkUserEmail(data.email);
            if (check === true) {
                resolve({
                    errCode: 3,
                    errMessage: 'This email is exist, Plz try another email',
                });
            } else {
                const hashPassWordFromBcrypt = await hashUserPassword(data.password);
                await db.User.create({
                    email: data.email,
                    password: hashPassWordFromBcrypt,
                    fullname: data.fullname,
                    address: data.address,
                    phonenumber: data.phonenumber,
                    gender: data.gender,
                    roleId: data.roleId,
                    positionId: data.positionId,
                    image: data.avatar,
                });
                resolve({
                    errCode: 0,
                    message: 'Create new user successfully',
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};

const updateUserData = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id || !data.roleId || !data.positionId || !data.gender) {
                resolve({
                    errCode: 2,
                    errMessage: 'Missing required parameters',
                });
            }
            let user = await db.User.findOne({
                where: { id: data.id },
                raw: false,
            });

            if (user) {
                user.fullname = data.fullname;
                user.address = data.address;
                user.roleId = data.roleId;
                user.positionId = data.positionId;
                user.gender = data.gender;
                user.phonenumber = data.phonenumber;
                if (data.avatar) {
                    user.image = data.avatar;
                }
                await user.save();
                resolve({
                    errCode: 0,
                    message: 'Edit user successfully',
                });
            } else {
                resolve({
                    errCode: 1,
                    errMessage: 'User not found',
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};

const deleteUser = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let foundUser = await db.User.findOne({ where: { id: userId } });
            if (!foundUser) {
                resolve({
                    errCode: 2,
                    errMessage: "The user isn't exist.",
                });
            }
            await db.User.destroy({ where: { id: userId } });
            resolve({
                errCode: 0,
                message: 'Delete user successfully',
            });
        } catch (e) {
            reject(e);
        }
    });
};

function validateEmail(email) {
    const re =
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

module.exports = {
    handleUserRegister: handleUserRegister,
    handleUserLogin: handleUserLogin,
    getAllCodeService: getAllCodeService,
    createNewUser: createNewUser,
    getUserOrAllUsers: getUserOrAllUsers,
    updateUserData: updateUserData,
    deleteUser: deleteUser,
};
