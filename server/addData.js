const mongoose = require("mongoose");
const Student = require("./models/StudentModel"); // Import the Student model

const studentsData = [
  {
    student_uid: "S001",
    student_name: "Aryan Verma",
    student_email: "aryan.verma@example.com",
    student_password: "pass1234",
    student_department: "Computer Science",
    student_degree: "Bachelor",
    student_semester: 5,
    student_enrolled_courses: [],
  },
  {
    student_uid: "S002",
    student_name: "Neha Das",
    student_email: "neha.das@example.com",
    student_password: "pass5678",
    student_department: "Data Science",
    student_degree: "Bachelor",
    student_semester: 6,
    student_enrolled_courses: [],
  },
  {
    student_uid: "S003",
    student_name: "Rohan Sharma",
    student_email: "rohan.sharma@example.com",
    student_password: "pass8765",
    student_department: "Information Technology",
    student_degree: "Master",
    student_semester: 3,
    student_enrolled_courses: [],
  },
  {
    student_uid: "S004",
    student_name: "Anjali Sinha",
    student_email: "anjali.sinha@example.com",
    student_password: "securePass",
    student_department: "Artificial Intelligence",
    student_degree: "Bachelor",
    student_semester: 7,
    student_enrolled_courses: [],
  },
  {
    student_uid: "S005",
    student_name: "Vikram Nayak",
    student_email: "vikram.nayak@example.com",
    student_password: "vik123",
    student_department: "Cybersecurity",
    student_degree: "PhD",
    student_semester: 1,
    student_enrolled_courses: [],
  },
  {
    student_uid: "S006",
    student_name: "Shruti Nair",
    student_email: "shruti.nair@example.com",
    student_password: "shruti321",
    student_department: "Software Engineering",
    student_degree: "Bachelor",
    student_semester: 8,
    student_enrolled_courses: [],
  },
  {
    student_uid: "S007",
    student_name: "Aman Khan",
    student_email: "aman.khan@example.com",
    student_password: "amank123",
    student_department: "Mechanical Engineering",
    student_degree: "Bachelor",
    student_semester: 4,
    student_enrolled_courses: [],
  },
  {
    student_uid: "S008",
    student_name: "Preeti Yadav",
    student_email: "preeti.yadav@example.com",
    student_password: "preeti987",
    student_department: "Civil Engineering",
    student_degree: "Diploma",
    student_semester: 2,
    student_enrolled_courses: [],
  },
  {
    student_uid: "S009",
    student_name: "Karan Mehta",
    student_email: "karan.mehta@example.com",
    student_password: "karan456",
    student_department: "Electrical Engineering",
    student_degree: "Bachelor",
    student_semester: 6,
    student_enrolled_courses: [],
  },
  {
    student_uid: "S010",
    student_name: "Ishita Roy",
    student_email: "ishita.roy@example.com",
    student_password: "ishita234",
    student_department: "Biomedical Engineering",
    student_degree: "Bachelor",
    student_semester: 5,
    student_enrolled_courses: [],
  },
  {
    student_uid: "S011",
    student_name: "Devansh Agarwal",
    student_email: "devansh.agarwal@example.com",
    student_password: "devansh321",
    student_department: "Industrial Engineering",
    student_degree: "Other",
    student_semester: 7,
    student_enrolled_courses: [],
  },
  {
    student_uid: "S012",
    student_name: "Ritika Gupta",
    student_email: "ritika.gupta@example.com",
    student_password: "ritika789",
    student_department: "Chemical Engineering",
    student_degree: "Bachelor",
    student_semester: 4,
    student_enrolled_courses: [],
  },
  {
    student_uid: "S013",
    student_name: "Aditya Raj",
    student_email: "aditya.raj@example.com",
    student_password: "adityaraj1",
    student_department: "Aerospace Engineering",
    student_degree: "Bachelor",
    student_semester: 6,
    student_enrolled_courses: [],
  },
  {
    student_uid: "S014",
    student_name: "Sneha Rani",
    student_email: "sneha.rani@example.com",
    student_password: "sneha456",
    student_department: "Computer Engineering",
    student_degree: "Bachelor",
    student_semester: 3,
    student_enrolled_courses: [],
  },
  {
    student_uid: "S015",
    student_name: "Ravi Kumar",
    student_email: "ravi.kumar@example.com",
    student_password: "ravi987",
    student_department: "Computer Science",
    student_degree: "Bachelor",
    student_semester: 8,
    student_enrolled_courses: [],
  },
];

const MONGO_URI =
  "mongodb+srv://shauryajha35:shauryajha35@cluster0.ok6g962.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB Connected");
    return Student.insertMany(studentsData);
  })
  .then(() => {
    console.log("Students data added successfully");
    mongoose.disconnect();
  })
  .catch((err) => {
    console.error("Error:", err);
    mongoose.disconnect();
  });
