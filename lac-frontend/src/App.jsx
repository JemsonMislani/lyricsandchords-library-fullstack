import { BrowserRouter, Routes, Route, } from 'react-router-dom'
import LoginAccount from './LoginAcc'
import RegisterAccount from './RegisterAcc'
import AdminDashBoard from './AdminDashboard'
import UserDashBoard from './UserDashboard'
import Songlists from './Songlists'
import AddDataOfSongs from './AddDataOfSong'
import ManageLibrary from './ManageLibrary'
export default function App() {

  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<LoginAccount />}/>
        <Route path='/register' element={<RegisterAccount />}/>
        <Route path='/adminDashboard' element={<AdminDashBoard />}/>
        <Route path='/userDashboard' element={<UserDashBoard />}/>
        <Route path='/songlists' element={<Songlists />}/>
        <Route path='/addsong' element={<AddDataOfSongs />}/>
        <Route path='/manageLibrary' element={<ManageLibrary />}/>
      </Routes>
      </BrowserRouter>
    </>
  )
}