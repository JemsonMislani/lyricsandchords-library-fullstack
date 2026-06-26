import { BrowserRouter, Routes, Route, } from 'react-router-dom'
import LoginAccount from './LoginAcc'
import RegisterAccount from './RegisterAcc'
import AdminDashBoard from './AdminDashboard'
import Songlists from './Songlists'
import AddDataOfSongs from './AddDataOfSong'
import ManageLibrary from './ManageLibrary'
import UserDashBoard from './users/UserDashboard'
import SearchSong from './users/SearchSong'
export default function App() {

  return (
    <>
      <BrowserRouter>
      <Routes>
        {/* For creating and login account */}
        <Route path='/' element={<LoginAccount />}/>
        <Route path='/register' element={<RegisterAccount />}/>

        {/* For admin */}
        <Route path='/adminDashboard' element={<AdminDashBoard />}/>
        <Route path='/songlists' element={<Songlists />}/>
        <Route path='/addsong' element={<AddDataOfSongs />}/>
        <Route path='/manageLibrary' element={<ManageLibrary />}/>
        
        {/* For user */}
        <Route path='/userDashboard' element={<UserDashBoard/>}/>
        <Route path='/searchSong' element={<SearchSong />}/>
      </Routes>
      </BrowserRouter>
    </>
  )
}