from fastapi import APIRouter, HTTPException # type: ignore
from fastapi.responses import FileResponse # type: ignore
from report.data.fetch_data import get_student_reports
from report.utils.generate_report import generate_student_report

router = APIRouter()

@router.get("/faculty/reports/{student_id}/download")
def download_student_report(student_id: str):
    student_data = get_student_reports(student_id)
    if not student_data:
        raise HTTPException(status_code=404, detail="Student not found")

    file_path = generate_student_report(student_data)
    return FileResponse(file_path, filename=f"{student_id}_report.pdf", media_type="application/pdf")
