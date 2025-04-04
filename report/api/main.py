from fastapi import FastAPI # type: ignore
from report.admin.admin_student_reports import router as admin_student_router
from report.admin.admin_faculty_reports import router as admin_faculty_router
from report.faculty.faculty_reports import router as faculty_router


app = FastAPI(title="E-Learning Report System")

# Include Routers
app.include_router(admin_student_router, prefix="/api")
app.include_router(admin_faculty_router, prefix="/api")
app.include_router(faculty_router, prefix="/api")

@app.get("/")
def home():
    return {"message": "E-Learning Report System is running!"}
