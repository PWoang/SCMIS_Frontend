import { useState, useEffect } from "react";
const StudentPage = () => {
    useEffect(() => {
    document.title = "Student";
  }, []);
    return(
        <div>Student Layout</div>
    )
}

export default StudentPage;