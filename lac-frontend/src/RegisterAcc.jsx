import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function RegisterAccount(){
    const [user, setUser] = useState(null)
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const nav = useNavigate()
    const [showpass, setShowPass] = useState(false)

    const handleSubmitBtn = (e) => {
        e.preventDefault()
        if(!username || !email || !password){
            alert('Please fillout fields')
            return
        }

        axios.post('http://localhost:3005/registerAcc', {
            username: username,
            email: email,
            password: password
        })
        .then(result => {
            setUser(result.data)
            localStorage.setItem('token', result.data.token)
            localStorage.setItem('user', JSON.stringify(result.data.user))
            setUsername('')
            setEmail('')
            setPassword('')
            alert('Account created successfully')
            nav('/')
        })
        .catch(err => {
            alert(err.response?.data?.message || 'Email already used')
        })
        
    }
    return(
        <>
            <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-sky-900'>
                <form 
                    onSubmit={handleSubmitBtn}
                    className='w-full max-w-mdw-full max-w-md sm:p-4'>
                    <div className='w-full min-h-screen sm:min-h-auto sm:rounded-2xl bg-white/20 backdrop-blur-xl border border-white/30 shadow-2xl p-6 sm:p-10 flex flex-col justify-center'>
                        <div>
                            <div className='text-3xl font-semibold text-center mb-8 text-white'>Signup</div>
                            <div className='flex flex-col gap-5'>
                            <input
                                className='w-full py-3 px-3 bg-white/80 border border-white/40 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500'
                                type="text" 
                                placeholder="Enter username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}/>
                            <input 
                                className='w-full py-3 px-3 bg-white/80 border border-white/40 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500'
                                type="email" 
                                placeholder="Enter email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}/>
                            <div className="relative">
                                <input
                                className='w-full py-3 px-3 bg-white/80 border border-white/40 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500' 
                                type={showpass ? 'text' : 'password'}
                                placeholder="Enter password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}/>
                                <div 
                                    className='absolute top-3.5 right-4 text-2xl cursor-pointer text-sky-900'
                                    onClick={() => setShowPass(!showpass)}>
                                    {showpass ? <FaEyeSlash /> : <FaEye />}
                                </div>
                            </div>
                            <button className='w-full py-3 bg-sky-600 text-white rounded-lg text-lg hover:bg-sky-700 active:bg-sky-800 transition cursor-pointer'>Submit</button>
                            <div className='flex justify-center'>
                            <Link 
                                className='text-center text-sm text-white hover:text-sky-400'
                                to='/'>Go back to Login</Link>
                            </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}