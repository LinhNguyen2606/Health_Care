import jwt from 'jsonwebtoken';

const auth = (req, res, next) => {
    try {
        const token = req.body.token;
        console.log(req.body);
        if (!token) return res.status(400).json({ message: 'Invalid Authentication.' });
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if (err) return res.status(400).json({ message: 'Invalid Authentication.' });

            req.user = user;
            next();
        });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

module.exports = auth;