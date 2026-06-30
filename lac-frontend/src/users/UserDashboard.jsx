import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useAuthForLogout } from './LogoutUser';

export default function UserDashBoard(){
    const [open, setOpen] = useState(false)
    const [user, setUser] = useState(null)
    const [topartist, setTopArtist] = useState([])
    const [mostusedkey, setMostUsedKeys] = useState([])
    const [genre, setGenre] = useState([])
    const { handleLogoutBtn } = useAuthForLogout()

    useEffect(() => {
        const token = localStorage.getItem('token') || sessionStorage.getItem('token')
        axios.get(`${import.meta.env.VITE_API_URL}/getUsersUsername`, {
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

    useEffect(() => {
        const token = localStorage.getItem('token') || sessionStorage.getItem('token')
        axios.get(`${import.meta.env.VITE_API_URL}/artistMostContributedSongs`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(result => {
            setTopArtist(result.data)
        })
        .catch(err => {
            console.log(err)
        })
    }, [])

    useEffect(() => {
        const token = localStorage.getItem('token') || sessionStorage.getItem('token')
        axios.get(`${import.meta.env.VITE_API_URL}/artistMostUsedKeys`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(result => {
            setMostUsedKeys(result.data)
        })
        .catch(err => {
            console.log(err)
        })
    }, [])

    useEffect(() => {
        const token = localStorage.getItem('token') || sessionStorage.getItem('token')
        axios.get(`${import.meta.env.VITE_API_URL}/genreOfSongs`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(result => {
            setGenre(result.data)
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
                <h1 className="text-3xl font-semibold mb-5 text-white">Welcome, {user}!👋</h1>
                    <div className="mt-8">
                        <div className="flex items-center justify-between mb-6">
                        <div>
                            <h2 className="text-3xl font-bold text-white">Popular Artists</h2>
                            <div className="w-24 h-1 mt-2 rounded-full bg-gradient-to-r from-sky-400 via-cyan-400 to-blue-500">
                            </div>
                            <p className="text-gray-400 text-sm">
                            Discover artists with the most song contributions.
                            </p>
                        </div>
                        </div>
                        <div className="flex flex-col md:flex-row gap-3">
                            {
                                topartist.map((art, ind) => (
                                    <div 
                                        key={ind}
                                        className="max-w-sm w-full rounded-3xl bg-white/10 backdrop-blur-md border border-white/10 p-6 hover:bg-white/15 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-sky-500/20">
                                    <div className="flex items-center gap-5">
                                    <div>
                                        <span 
                                            className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-sky-500/20 text-sky-300 border border-sky-500/30">Singer • Band
                                        </span>
                                        <h3 
                                            className="mt-3 text-2xl font-bold text-white">{art.artist}
                                        </h3>
                                        <p 
                                            className="text-gray-400 text-sm">Artist
                                        </p>
                                    </div>
                                    </div>
                                    <div 
                                        className='grid grid-cols-2 gap-4 mt-6 text-center'>
                                        <div className="rounded-2xl py-3 bg-sky-500/20 text-sky-300 border border-sky-500/30">
                                            <p className="text-xl font-bold text-white">{art.total_songs}</p>
                                            <span className="text-sm font-bold text-white">Total of
                                            Songs
                                            </span>
                                        </div>
                                        <div className="rounded-2xl py-3 bg-sky-500/20 text-sky-300 border border-sky-500/30">
                                            <p className="text-xl font-bold text-white uppercase">
                                            {
                                                mostusedkey.find(k => k.artist === art.artist)?.song_key
                                            }
                                            </p>
                                            <span className="text-sm font-bold text-white">
                                            Most used key
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                ))
                            }
                        </div>
                    </div>
                    <div className='mt-5'>
                        <h2 className="text-3xl font-bold text-white">Song Genres</h2>
                        <div className="w-24 h-1 mt-2 rounded-full bg-gradient-to-r from-sky-400 via-cyan-400 to-blue-500">
                        </div>
                        <p className="text-gray-400 text-sm mb-6">
                        Discover different genres of songs.
                        </p>
                    </div>
                    <div className="flex flex-col md:flex-row gap-3">
                    {
                        genre.map((gen, ind) => (
                    <div 
                        key={ind}
                        className="max-w-sm w-full rounded-3xl bg-white/10 backdrop-blur-md border border-white/10 p-6 
                        hover:bg-white/15 transition-all duration-300 
                        hover:-translate-y-1 hover:shadow-2xl hover:shadow-sky-500/20">

                    <div className="flex items-center gap-5">
                        <div>
                        <span 
                            className="inline-block px-3 py-1 text-xs font-semibold rounded-full 
                            bg-sky-500/20 text-sky-300 border border-sky-500/30"> Music Genre
                        </span>
                        <h3
                        className="mt-3 text-2xl font-bold text-white">
                            {gen.genre}
                        </h3>
                        <p 
                        className="text-gray-400 text-sm">
                            Spiritual & Inspirational Songs
                        </p>
                        </div>
                    </div>
                            <div 
                            className="grid grid-cols-1 gap-4 mt-6 text-center">
                                <div className="rounded-2xl py-3 bg-sky-500/20 text-sky-300 border border-sky-500/30">
                                    <p className="text-xl font-bold text-white">
                                        {gen.total}
                                    </p>
                                    <span className="text-sm font-bold text-white">
                                        Songs
                                    </span>
                                </div>
                            </div>
                        </div>
                        )) 
                    }
                    </div>
                </main>
            </div>
        </>
    );
}