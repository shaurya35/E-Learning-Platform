from data.fetch_data import get_faculty_data

def generate_faculty_report(faculty_id):
    """Generate faculty activity report."""
    faculty_data = get_faculty_data(faculty_id)
    if not faculty_data:
        return {"error": "Faculty not found"}

    report = {
        "Faculty ID": faculty_data["faculty_id"],
        "Name": faculty_data["name"],
        "Courses Created": faculty_data.get("courses_created", []),
        "Content Updates": faculty_data.get("updates", []),
    }
    return report
