import { Outlet, BrowserRouter, Routes, Route } from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css";

import Header from './components/ui/Header'
import './App.css'
import AuthLayout from './layouts/AuthLayout'
import TeacherLayout from './layouts/TeacherLayout'
import SidebarTeacher from './pages/Teachers/SidebarTeacher'
import Login from './pages/Auth/Login/Login'
import Register from './pages/Auth/Register/Register'
import MainContentTeacher from './pages/Teachers/MainContentTeacher';
import ParentLayout from './layouts/ParentLayout';
import MainContentParent from './pages/Parents/MainContentParent';
import StudentLayout from './layouts/StudentLayout';
import MainContentStudent from './pages/Students/MainContentStudent';


const App = () => {
  return (
     <Routes>
      {/* Teacher layout */}
      <Route path='teacher' element={<TeacherLayout/>}>
        <Route index element={<MainContentTeacher/>}/>
      </Route>
      {/* Parent layout */}
      <Route path='parent' element={<ParentLayout/>}>
        <Route index element={<MainContentParent/>}/>
      </Route>
      {/* Student layout */}
      <Route path='student' element={<StudentLayout/>}>
        <Route index element={<MainContentStudent/>}/>
      </Route>
      {/* Authentic Layout */}
      <Route path="auth" element={<AuthLayout />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
     </Routes>
  )
}

export default App