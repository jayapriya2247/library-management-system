const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
    try {
        const token = req.header("Authorization");

        if (!token) {
            return res.status(401).json({
                message: "Access denied. No token provided"
            });
        }

        const verified = jwt.verify(
            token.replace("Bearer ", ""),
            "secretkey"
        );

        req.user = verified;

        next();

    } catch (error) {
        res.status(401).json({
            message: "Invalid token"
        });
    }
};

module.exports = auth;