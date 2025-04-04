from fpdf import FPDF # type: ignore
import os

REPORT_DIR = "output/student_reports/"

def generate_student_report(student_data):
    """Generate a student progress report as a PDF"""
    if not os.path.exists(REPORT_DIR):
        os.makedirs(REPORT_DIR)

    student_id = student_data["student_uid"]
    filename = f"{REPORT_DIR}{student_id}_report.pdf"

    pdf = FPDF()
    pdf.set_auto_page_break(auto=True, margin=15)
    pdf.add_page()
    pdf.set_font("Arial", "B", 16)
    pdf.cell(200, 10, "Student Progress Report", ln=True, align="C")

    pdf.set_font("Arial", size=12)
    pdf.ln(10)
    pdf.cell(200, 10, f"Student Name: {student_data['student_name']}", ln=True)
    pdf.cell(200, 10, f"Student ID: {student_id}", ln=True)
    pdf.cell(200, 10, f"Department: {student_data['student_department']}", ln=True)

    pdf.ln(10)
    pdf.cell(200, 10, "Course Progress:", ln=True)

    for course, progress in student_data["progress"].items():
        pdf.cell(200, 10, f"{course}: {progress}%", ln=True)

    pdf.output(filename)
    return filename
