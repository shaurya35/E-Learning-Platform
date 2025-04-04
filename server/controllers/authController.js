const jwt = require("jsonwebtoken");
require("dotenv").config();

const generateAccessToken = (admin) => {
  return jwt.sign(
    { admin_id: admin.admin_id, email: admin.admin_email, role: "admin" },
    process.env.JWT_SECRET,
    { expiresIn: "2h" }
  );
};

const generateRefreshToken = (admin) => {
  return jwt.sign(
    { admin_id: admin.admin_id, email: admin.admin_email, role: "admin" },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: "30d" }
  );
};

const refreshAccessToken = (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return res.status(401).json({ message: "Refresh token missing" });
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    const newAccessToken = generateAccessToken({
      admin_id: decoded.admin_id,
      email: decoded.email,
      role: "admin",
    });

    res.status(200).json({
      accessToken: newAccessToken,
      user: {
        email: decoded.email,
        admin_id: decoded.admin_id,
        role: "admin",
      },
    });
  } catch (error) {
    res.status(401).json({ message: "Invalid or expired refresh token" });
  }
};

module.exports = {
  refreshAccessToken,
};
