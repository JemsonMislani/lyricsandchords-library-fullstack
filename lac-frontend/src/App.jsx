import { BrowserRouter, Routes, Route, } from 'react-router-dom'
import LoginAccount from './LoginAcc'
import RegisterAccount from './RegisterAcc'
import AdminDashBoard from './AdminDashboard'
import UserDashBoard from './UserDashboard'
export default function App() {

  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<LoginAccount />}/>
        <Route path='/register' element={<RegisterAccount />}/>
        <Route path='/adminDashboard' element={<AdminDashBoard />}/>
        <Route path='/userDasboard' element={<UserDashBoard />}/>
      </Routes>
      </BrowserRouter>
    </>
  )
}