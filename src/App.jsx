import { Outlet, BrowserRouter, Routes, Route } from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css";

import Header from './components/ui/Header'
import './App.css'
import AuthPage from './pages/authPage/AuthPage'
import TeacherPage from './pages/teacherPage/TeacherPage'
import MainPage from './pages/MainPage'

import SidebarTeacher from './components/teacher/sidebar/SidebarTeacher'
import Login from './components/auth/login/Login'
import Register from './components/auth/register/Register'
import MainContentTeacher from './components/teacher/MainContentTeacher';
import ParentPage from './pages/parentPage/ParentPage';
import MainContentParent from './components/parent/MainContentParent';
import StudentPage from './pages/studentPage/StudentPage';
import MainContentStudent from './components/student/MainContentStudent';


const App = () => {
  return (
     <Routes>
      {/* Teacher layout */}
      {/* Main layout */}
      <Route path='/' element={<MainPage/>}>

      </Route>
      <Route path='/teacher' element={<TeacherPage/>}>
        <Route index element={<MainContentTeacher/>}/>
        {/* Dieu khien bang URL */}
        <Route path='new' element={<MainContentTeacher />}/> 
      </Route>
      {/* Parent layout */}
      <Route path='parent' element={<ParentPage/>}>
        <Route index element={<MainContentParent/>}/>
      </Route>
      {/* Student layout */}
      <Route path='student' element={<StudentPage/>}>
        <Route index element={<MainContentStudent/>}/> 
      </Route>
      {/* Authentic Layout */}
      <Route path="auth" element={<AuthPage />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
     </Routes>
  )
}

export default App