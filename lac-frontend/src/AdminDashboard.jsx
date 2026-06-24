import { useEffect } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useState } from 'react';

export default function AdminDashBoard(){
    const [username, setUserName] = useState('')
    const [totalofSong, setTotalOfSong] = useState(0)
    const [totalofArtist, setTotalOfArtist] = useState(0)
    const [totalofUsedChords, setTotalOfUsedChords] = useState(0)

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
        axios.get('http://localhost:3005/totalOfSong', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(result => {
            setTotalOfSong(result.data.total)
        })
        .catch(err => {
            console.log(err)
        })
    }, [])

    useEffect(() => {
        const token = localStorage.getItem('token') || sessionStorage.getItem('token')
        axios.get('http://localhost:3005/totalOfArtist', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(result => {
            setTotalOfArtist(result.data.total)
        })
        .catch(err => {
            console.log(err)
        })
    }, [])

    useEffect(() => {
        const token = localStorage.getItem('token') || sessionStorage.getItem('token')
        axios.get('http://localhost:3005/totalOfUsedChords', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(result => {
            setTotalOfUsedChords(result.data.total)
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
                        className="block px-4 py-2 rounded hover:bg-gray-700">➕ Add songs<label className="text-white m-1 p-1"></label></Link>
                    <Link 
                        to={'/manageLibrary'}
                        className="block px-4 py-2 rounded hover:bg-gray-700">🙍🏻‍♂️ Manage Library</Link>
                </nav>
                <div className="p-4 border-t border-gray-700 text-sm text-gray-400">
                © 2026 Jemson Mislani
                </div>
                </aside>
                <main className="flex-1 p-6 overflow-auto">
                <h1 className="text-2xl font-semibold mb-5">Welcome, {username}!</h1>
                    <div className="grid gap-4" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(3in, max-content))' }}>
                    </div>
                    <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mb-6'>
                        <div className='bg-gray-900 backdrop-blur-xl border border-sky/10 p-5 rounded-xl'>
                        <p className='text-l text-white'>Total Songs:</p>
                        <h2 className='text-2xl font-bold text-white'>{totalofSong}</h2>
                        </div>
                        <div className='bg-gray-900 backdrop-blur-xl border border-sky/10 p-5 rounded-xl'>
                        <p className='text-l text-white'>Artists:</p>
                        <h2 className='text-2xl font-bold text-white'>{totalofArtist}</h2>
                        </div>
                        <div className='bg-gray-900 backdrop-blur-xl border border-sky/10 p-5 rounded-xl'>
                        <p className='text-l text-white'>Chords:</p>
                        <h2 className='text-2xl font-bold text-white'>{totalofUsedChords}</h2>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}