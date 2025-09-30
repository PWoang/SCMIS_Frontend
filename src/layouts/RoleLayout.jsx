import { Outlet, useParams } from "react-router-dom";
import TeacherLayout from "./TeacherLayout";
import ParentLayout from "./ParentLayout";
import StudentLayout from "./StudentLayout";

export default function RoleLayout() {
  const { role } = useParams();
  if (role === "teacher") return <TeacherLayout />;
  if (role === "parent") return <ParentLayout />;
  if (role === "student") return <StudentLayout />;
  // role lạ -> redirect hoặc 404
  return <div>Role not found</div>;
}