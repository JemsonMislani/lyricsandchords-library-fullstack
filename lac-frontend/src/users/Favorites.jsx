import { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useAuthForLogout } from './LogoutUser';

export default function FavoriteSong(){
    const [open, setOpen] = useState(false)
    const [faveLists, setFaveLists] = useState([])
    const { handleLogoutBtn } = useAuthForLogout()

    useEffect(() => {
        const token = localStorage.getItem('token') || sessionStorage.getItem('token')
        axios.get(`${import.meta.env.VITE_API_URL}/favoriteSongs`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(result => {
            setFaveLists(result.data)
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
                        to={'/userDashboard'}
                        className="block px-4 py-2 rounded hover:bg-gray-700">🏠 Home</Link>
                    <Link 
                        to={'/searchsong'}
                        className="block px-4 py-2 rounded hover:bg-gray-700">🔎 Search Song</Link>
                    <Link 
                        to={'/favorite'}
                        className="block px-4 py-2 rounded hover:bg-gray-700">❤️ Favorites</Link>
                    <button 
                        to={'/'}
                        className="w-full text-left px-4 py-2 rounded hover:bg-gray-700 cursor-pointer"
                        onClick={handleLogoutBtn}>🔴 Logout</button>
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
                <h1 className="text-3xl font-semibold mb-5 text-white">Favorite lists</h1>
                    <div className="grid gap-2">
                        {faveLists.map((fv) => (
                            <div
                                key={fv.song_id}
                                className="group p-5 rounded-xl bg-white/10 border border-white/10 backdrop-blur-md hover:bg-white/15 transition-all duration-300 cursor-pointer"
                            >
                                <div className="flex justify-between items-start">
                                    <div>
                                        <p className="text-lg font-bold text-white group-hover:text-sky-300 transition">
                                            {fv.title}
                                        </p>
                                        <p className="text-gray-300 text-sm mt-1">
                                            {fv.artist}
                                        </p>
                                    </div>
                                    <span 
                                        className="px-3 py-1 text-xs font-semibold rounded-full 
                                    bg-sky-500/20 text-sky-300 border border-sky-500/30 uppercase">
                                        {fv.song_key}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </main>
            </div>
        </>
    );
}