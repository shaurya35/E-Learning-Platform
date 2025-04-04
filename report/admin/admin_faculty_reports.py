from fastapi import APIRouter, HTTPException # type: ignore
from report.data.fetch_data import get_faculty_reports

router = APIRouter()

@router.get("/faculty/{faculty_id}")
def fetch_faculty_report(faculty_id: str):
    report = get_faculty_reports(faculty_id)
    if not report:
        raise HTTPException(status_code=404, detail="Faculty not found")
    return {"status": "success", "data": report}
