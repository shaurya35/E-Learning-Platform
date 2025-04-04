from pymongo import MongoClient  # type: ignore
import pandas as pd  # type: ignore
from config.settings import MONGODB_URI, DATABASE_NAME

class MongoDBConnector:
    """
    Handles connection to MongoDB and data extraction for the recommendation system.
    """

    def __init__(self):
        self.client = MongoClient(MONGODB_URI)
        self.db = self.client[DATABASE_NAME]  # Ensure this matches MongoDB Compass

        # Debugging: Check available collections
        collections = self.db.list_collection_names()
        print(f"📌 Available Collections in '{DATABASE_NAME}': {collections}")

    def get_student_data(self):
        """
        Extract student data including demographics and enrolled courses.
        """
        students_collection = self.db.students
        students_data = list(students_collection.find({}, {"_id": 0}))  # Fetch all fields except _id

        if not students_data:
            print("⚠️ No student data found!")

        print("📌 Raw Student Data:", students_data)  # Debugging print

        return pd.DataFrame(students_data) if students_data else pd.DataFrame()

    def get_faculty_data(self):
        """
        Extract faculty data including department and qualifications.
        """
        faculty_collection = self.db.faculties
        faculty_data = list(faculty_collection.find({}, {"_id": 0}))

        if not faculty_data:
            print("⚠️ No faculty data found!")

        print("📌 Raw Faculty Data:", faculty_data)  # Debugging print

        return pd.DataFrame(faculty_data) if faculty_data else pd.DataFrame()

    def get_admin_data(self):
        """
        Extract admin data including emails and names.
        """
        admin_collection = self.db.admins
        admin_data = list(admin_collection.find({}, {"_id": 0}))

        if not admin_data:
            print("⚠️ No admin data found!")

        print("📌 Raw Admin Data:", admin_data)  # Debugging print

        return pd.DataFrame(admin_data) if admin_data else pd.DataFrame()
    
    def get_course_data(self):
        """
        Extract course data including metadata and structure.
        """
        courses_collection = self.db.courses
        courses_data = list(courses_collection.find(
            {},
            {
                "_id": 0,
                "course_id": 1,
                "course_name": 1,
                "course_description": 1,
                "course_department": 1,
                "course_semester": 1,
                "course_lecture": 1,
                "course_assignment": 1,
                "course_quiz": 1,
                "course_notification": 1
            }
        ))

        if not courses_data:
            print("⚠️ No course data found!")

        print("📌 Raw Course Data:", courses_data)  # Debugging print

        return pd.DataFrame(courses_data) if courses_data else pd.DataFrame()

    def get_enrollment_data(self):
        """
        Extract enrollment records mapping students to courses.
        """
        students_collection = self.db.students
        enrollments = []

        for student in students_collection.find({}, {"student_uid": 1, "student_enrolled_courses": 1}):
            student_id = student.get("student_uid")  # Ensure the correct field name
            for course_id in student.get("student_enrolled_courses", []):
                enrollments.append({"student_uid": student_id, "course_id": course_id})

        if not enrollments:
            print("⚠️ No enrollment data found!")

        print("📌 Raw Enrollment Data:", enrollments)  # Debugging print

        return pd.DataFrame(enrollments) if enrollments else pd.DataFrame()
    
    def get_interaction_data(self):
        """
        Extract interaction data including views, ratings, and time spent.
        """
        interactions_collection = self.db.interactions
        interactions_data = list(interactions_collection.find(
            {},
            {
                "_id": 0,
                "student_uid": 1,
                "course_id": 1,
                "interaction_type": 1,  # Updated key from `interactionType`
                "rating": 1,
                "timestamp": 1,
                "time_spent": 1,  # Updated key from `timeSpent`
                "completed": 1
            }
        ))

        if not interactions_data:
            print("⚠️ No interaction data found!")

        print("📌 Raw Interaction Data:", interactions_data)  # Debugging print

        return pd.DataFrame(interactions_data) if interactions_data else pd.DataFrame()
