import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Songlists(){
    const [username, setUserName] = useState('')
    const [songlists, setSonglists] = useState([])
    const [open, setOpen] = useState(false);  

    useEffect(() => {
        const token = localStorage.getItem('token') || sessionStorage.getItem('token')
        axios.get('http://localhost:3005/getAdminUsername', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(result => {
            setUserName(result.data.username)
        })
        .catch(err => {
            console.log(err)
        })
    }, [])

    useEffect(() => {
        const token = localStorage.getItem('token') || sessionStorage.getItem('token')
        axios.get('http://localhost:3005/getDataOfSong', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(result => {
            setSonglists(result.data)
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
                    onClick={() => setOpen(false)}
                    />
                )}
                <aside className={`
                    fixed sm:static z-50 top-0 left-0 h-full w-64 bg-gray-900 text-white flex flex-col
                    transform transition-transform duration-300
                    ${open ? "translate-x-0" : "-translate-x-full"}
                    sm:translate-x-0
                `}>
                <div className="text-2xl font-bold p-6 border-b border-gray-700">Admin Dashboard</div>
                <nav className="flex-1 p-4 space-y-2">
                    <Link 
                        to={'/adminDashboard'}
                        className="block px-4 py-2 rounded hover:bg-gray-700">🏠 Home</Link>
                    <Link 
                        to={'/songlists'}
                        className="block px-4 py-2 rounded hover:bg-gray-700">🎧 Song lists</Link>
                    <Link 
                        to={'/addsong'}
                        className="block px-4 py-2 rounded hover:bg-gray-700">➕ Add songs               <label className="text-white m-1 p-1"></label></Link>
                    <Link 
                        to={'/manageLibrary'}
                        className="block px-4 py-2 rounded hover:bg-gray-700">🙍🏻‍♂️ Manage Library</Link>
                </nav>
                <div className="p-4 border-t border-gray-700 text-sm text-gray-400">
                © 2026 Jemson Mislani
                </div>
                </aside>
                <main className="flex-1 p-6 overflow-auto">
                    <div className="flex items-center justify-between mb-6 sm:hidden">
                    <button
                        onClick={() => setOpen(true)}
                        className="text-2xl p-2 bg-sky-900 text-white rounded"
                    >
                        ☰
                    </button>
                    </div>
                    <div className="grid gap-4" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(3in, max-content))' }}>
                    </div>
                    <div>
                       <h1 className="text-3xl font-semibold mb-5 text-white"> List of songs</h1>
                    </div>
                    <div className="hidden sm:grid sm:grid-cols-3 gap-2 mb-2 text-white px-3">
                        <span className="font-bold">Title:</span>
                        <span className="font-bold">Artist:</span>
                        <span className="font-bold">Key Of:</span>
                    </div>
                    {
                        songlists.map((sl) => (
                            <div
                                key={sl.id}
                                className="bg-gray-900 text-white p-3 rounded mb-2 border border-gray-700"
                            >
                                <div className="sm:hidden space-y-1">
                                <div>
                                    <span className="text-gray-400 text-xs">Title:</span>
                                    <div className="font-medium">{sl.title}</div>
                                </div>

                                <div>
                                    <span className="text-gray-400 text-xs">Artist:</span>
                                    <div>{sl.artist}</div>
                                </div>

                                <div>
                                    <span className="text-gray-400 text-xs">Key Of:</span>
                                    <div className="uppercase">{sl.song_key}</div>
                                </div>
                                </div>

                                <div className="hidden sm:grid sm:grid-cols-3 gap-2">
                                    <div>{sl.title}</div>
                                    <div>{sl.artist}</div>
                                    <div className="uppercase">{sl.song_key}</div>
                                </div>
                            </div>
                        ))
                    }
                </main>
            </div>
        </>
    );
}