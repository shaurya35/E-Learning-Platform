const Notification = require("../models/notificationModel");

const Course = require("../models/CourseModel");

const sendNotification = async (req, res) => {
  try {
    const { title, description, type, course_id } = req.body;

    if (!title || !description || !type || !course_id) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const allowedTypes = ["classes", "assignments", "announcements"];
    if (!allowedTypes.includes(type)) {
      return res.status(400).json({
        message:
          "Invalid notification type. Must be one of: classes, assignments, announcements",
      });
    }

    // Validate course exists
    const course = await Course.findById(course_id);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    const notification = new Notification({
      title,
      description,
      type,
      course: course_id,
    });

    await notification.save();

    res.status(201).json({
      message: "Notification sent successfully!",
      notification,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

module.exports = {
  sendNotification,
};

module.exports = {
  sendNotification,
};
