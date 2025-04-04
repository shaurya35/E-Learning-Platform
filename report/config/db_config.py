import os

class Config:
    MONGO_URI = os.getenv("MONGO_URI", "mongodb+srv://shauryajha35:shauryajha35@cluster0.ok6g962.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
    DB_NAME = "test"
    OUTPUT_DIR = "output/"
    STUDENT_REPORTS_DIR = os.path.join(OUTPUT_DIR, "student_reports/")
    FACULTY_REPORTS_DIR = os.path.join(OUTPUT_DIR, "faculty_reports/")

# Ensure directories exist
os.makedirs(Config.OUTPUT_DIR, exist_ok=True)
os.makedirs(Config.STUDENT_REPORTS_DIR, exist_ok=True)
os.makedirs(Config.FACULTY_REPORTS_DIR, exist_ok=True)
