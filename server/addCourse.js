const mongoose = require("mongoose");

const MONGO_URI =
  "mongodb+srv://shauryajha35:shauryajha35@cluster0.ok6g962.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const Course = require("./models/CourseModel")
const { v4: uuidv4 } = require("uuid");


const coursesData = [
    { course_id: uuidv4(), course_name: "Machine Learning", course_description: "An introduction to machine learning concepts and algorithms.", course_department: "Artificial Intelligence", course_semester: "6" },
    { course_id: uuidv4(), course_name: "Deep Learning", course_description: "Explore neural networks and deep learning architectures.", course_department: "Artificial Intelligence", course_semester: "6" },
    { course_id: uuidv4(), course_name: "Data Structures", course_description: "Study of data organization and manipulation.", course_department: "Computer Science", course_semester: "4" },
    { course_id: uuidv4(), course_name: "Operating Systems", course_description: "Learn about process management and memory allocation.", course_department: "Computer Science", course_semester: "5" },
    { course_id: uuidv4(), course_name: "Database Management", course_description: "Fundamentals of relational and NoSQL databases.", course_department: "Information Technology", course_semester: "4" },
    { course_id: uuidv4(), course_name: "Computer Networks", course_description: "Introduction to network protocols and communication.", course_department: "Information Technology", course_semester: "5" },
    { course_id: uuidv4(), course_name: "Cyber Security", course_description: "Learn about security threats and countermeasures.", course_department: "Cyber Security", course_semester: "6" },
    { course_id: uuidv4(), course_name: "Artificial Intelligence", course_description: "Introduction to AI techniques and applications.", course_department: "Artificial Intelligence", course_semester: "5" },
    { course_id: uuidv4(), course_name: "Software Engineering", course_description: "Software development life cycle and methodologies.", course_department: "Computer Science", course_semester: "4" },
    { course_id: uuidv4(), course_name: "Cloud Computing", course_description: "Understanding cloud infrastructure and deployment.", course_department: "Information Technology", course_semester: "6" },
    { course_id: uuidv4(), course_name: "Blockchain Technology", course_description: "Explore distributed ledger systems and smart contracts.", course_department: "Information Technology", course_semester: "7" },
    { course_id: uuidv4(), course_name: "IoT and Embedded Systems", course_description: "Learn about the Internet of Things and microcontrollers.", course_department: "Electronics", course_semester: "5" },
    { course_id: uuidv4(), course_name: "Quantum Computing", course_description: "Introduction to quantum algorithms and computing.", course_department: "Artificial Intelligence", course_semester: "8" },
    { course_id: uuidv4(), course_name: "Natural Language Processing", course_description: "Processing and analyzing human language data.", course_department: "Artificial Intelligence", course_semester: "6" },
    { course_id: uuidv4(), course_name: "Robotics and Automation", course_description: "Study of robotic systems and automation technologies.", course_department: "Mechanical Engineering", course_semester: "7" }
  ];
  
  mongoose
    .connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("MongoDB Connected");
      return Course.insertMany(coursesData);
    })
    .then(() => {
      console.log("Courses data added successfully");
      mongoose.disconnect();
    })
    .catch((err) => {
      console.error("Error:", err);
      mongoose.disconnect();
    });
  