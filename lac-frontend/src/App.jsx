import { BrowserRouter, Routes, Route, } from 'react-router-dom'
import LoginAccount from './LoginAcc'
import RegisterAccount from './RegisterAcc'
export default function App() {

  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<LoginAccount />}/>
        <Route path='/register' element={<RegisterAccount />}/>
      </Routes>
      </BrowserRouter>
    </>
  )
}