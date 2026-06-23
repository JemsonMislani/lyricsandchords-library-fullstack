import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Songlists(){
    const [username, setUserName] = useState('')

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
                    <a href="#" className="block px-4 py-2 rounded hover:bg-gray-700">➕ Add songs               <label className="text-white m-1 p-1"></label></a>
                    <a href="#" className="block px-4 py-2 rounded hover:bg-gray-700">🙍🏻‍♂️ Users</a>
                </nav>
                <div className="p-4 border-t border-gray-700 text-sm text-gray-400">
                © 2026 Jemson Mislani
                </div>
                </aside>
                <main className="flex-1 p-6 overflow-auto">
                <h1 className="text-2xl font-semibold mb-5">Welcome, {username}!</h1>
                    <div className="grid gap-4" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(3in, max-content))' }}>
                    </div>
                    <h1>song list here!</h1>
                </main>
            </div>
        </>
    );
}