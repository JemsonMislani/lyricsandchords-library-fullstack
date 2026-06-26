import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios'

export default function UserDashBoard(){
    const [open, setOpen] = useState(false)
    const [user, setUser] = useState(null)

    useEffect(() => {
        const token = localStorage.getItem('token') || sessionStorage.getItem('token')
        axios.get('http://localhost:3005/getUsersUsername', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(result => {
            setUser(result.data.username)
        })
        .catch(err => {
            console.log(err)
        })
    }, [])
    
    return(
        <>
            <div className="flex h-screen bg-gray-100 min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-sky-900">
                {open && (
                    <div
                    className="fixed inset-0 bg-black/40 z-40 sm:hidden"
                    />
                )}
                <aside className={`
                    fixed sm:static z-50 top-0 left-0 h-full w-64 bg-gray-900 text-white flex flex-col
                    transform transition-transform duration-300
                    ${open ? "translate-x-0" : "-translate-x-full"}
                    sm:translate-x-0
                    `}>
                <div className="text-2xl font-bold p-6 border-b border-gray-700">User Dashboard</div>
                <nav className="flex-1 p-4 space-y-2">
                    <Link 
                        className="block px-4 py-2 rounded hover:bg-gray-700">🏠 Home</Link>
                </nav>
                <div className="p-4 border-t border-gray-700 text-sm text-gray-400">
                © 2026 Jemson Mislani
                </div>
                </aside>
                <main className="flex-1 p-6 overflow-auto">
                <div 
                    className="flex items-center justify-between mb-6 sm:hidden">
                    <button
                        onClick={() => setOpen(true)}
                        className="text-2xl p-2 bg-sky-900 text-white rounded"
                    >
                        ☰
                    </button>
                </div>
                <h1 className="text-3xl font-semibold mb-5 text-white">Welcome, {user}!👋</h1>
                </main>
            </div>
        </>
    );
}