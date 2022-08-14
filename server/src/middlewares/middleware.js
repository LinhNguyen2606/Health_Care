const jwt = require('jsonwebtoken');

const middlewareController = {
    auth: (req, res, next) => {
        try {
            const token = req.header('Authorization');
            if (!token)
                return res.status(400).json({
                    errCode: 1,
                    errMessage: 'Invalid Authentication.',
                });

            jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
                if (err)
                    return res.status(400).json({
                        errCode: 1,
                        errMessage: 'Invalid Authentication.',
                    });

                req.user = user;
                next();
            });
        } catch (e) {
            console.log(e);
            return res.status(500).json({
                errCode: -1,
                errMessage: 'Error from the server',
            });
        }
    },

    authAdmin: async (req, res, next) => {
        try {
            const user = await db.User.findOne({ id: req.users.id });

            if (user.roleId !== 1)
                return res.status(500).json({
                    errCode: 1,
                    errMessage: 'Admin resources access denied.',
                });

            next();
        } catch (e) {
            console.log(e);
            return res.status(500).json({
                errCode: -1,
                errMessage: 'Error from the server',
            });
        }
    },
};

module.exports = middlewareController;
