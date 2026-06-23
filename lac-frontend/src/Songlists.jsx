import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Songlists(){
    const [username, setUserName] = useState('')
    const [songlists, setSonglists] = useState([])

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
            <div className="flex h-screen bg-gray-100">
                <aside className="w-64 bg-gray-900 text-white flex flex-col">
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
                    <div className="grid gap-4" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(3in, max-content))' }}>
                    </div>
                    <div>
                       <h1 className="text-2xl font-semibold mb-5"> List of songs</h1>
                    </div>
                    <div className="grid grid-cols-3 gap-2 mb-2 text-black text-l">
                        <span className="font-bold">Title:</span>
                        <span className="font-bold">Artist:</span>
                        <span className="font-bold">Key Of:</span>
                    </div>
                    {
                        songlists.map((sl) => (
                            <div key={sl.id}
                                className="grid grid-cols-3 gap-1 mb-1">
                                <div className="bg-gray-900 text-white p-2 font-medium rounded ">{sl.title}
                                </div>
                                <div className="bg-gray-900 text-white p-2 font-medium rounded">{sl.artist}
                                </div>
                                <div className="bg-gray-900 text-white p-2 font-medium rounded">{sl.song_key}
                                </div>
                            </div>
                        ))
                    }
                </main>
            </div>
        </>
    );
}