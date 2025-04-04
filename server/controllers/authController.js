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
const logout = (req, res) => {
  try {
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Must be true in production
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", // Must match how the cookie was set
      path: "/", // Ensure the cookie is removed from the entire site
      // Optional: include the domain if you set it when creating the cookie:
      // domain: process.env.NODE_ENV === "production" ? "your-backend-domain.com" : undefined,
    });

    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Logout Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
module.exports = {
  refreshAccessToken,logout
};
