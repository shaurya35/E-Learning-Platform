const jwt = require("jsonwebtoken");
const Admin = require("../models/adminModel");

const verifyAdmin = async (req, res, next) => {
    try {
        const token = req.header("Authorization").replace("Bearer ", "");
        if (!token) {
            return res.status(401).json({ message: "Access Denied! No token provided." });
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const admin = await Admin.findOne({ admin_id: decoded.admin_id });

        if (!admin) {
            return res.status(403).json({ message: "Access Denied! Not an admin." });
        }

        req.admin = admin;
        next();
    } catch (error) {
        res.status(401).json({ message: "Invalid Token!", error: error.message });
    }
};

module.exports = { verifyAdmin };
