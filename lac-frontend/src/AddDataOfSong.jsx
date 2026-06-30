import { useState } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useAuthForLogout } from './LogoutFeature';

export default function AddDataOfSongs(){
    const [data, setData] = useState([])
    const [title, setTitle] = useState('')
    const [artist, setArtist] = useState('')
    const [keyOf, setKeyOf] = useState('')
    const [genre, setGenre] = useState('')
    const [lyricsandchords, setLyricsAndChords] = useState('')
    const [open, setOpen] = useState(false);  
    const { handleLogoutBtn, loading } = useAuthForLogout()

    const handleAddBtn = (e) => {
        e.preventDefault()
        if(!title.trim() || !artist.trim() || !keyOf.trim() || !genre.trim() || !lyricsandchords.trim() ){
            alert('Please fill out fields')
            return
        }
        const token = localStorage.getItem('token') || sessionStorage.getItem('token')
        axios.post(`${import.meta.env.VITE_API_URL}/createDataOfSong`, {
            title: title,
            artist: artist,
            song_key: keyOf,
            genre: genre,
            lyrics: lyricsandchords
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(result => {
            setData([...data, result.data])
            setTitle('')
            setArtist('')
            setKeyOf('')
            setGenre('')
            setLyricsAndChords('')
        })
        .catch(err => {
            console.log(err)
        })
    }
    
    return(
        <>
            {
                loading && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-[9999]">
                        <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                    </div>
                )
            }
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
                        className="block px-4 py-2 rounded hover:bg-gray-700">➕ Add songs<label className="text-white m-1 p-1"></label></Link>
                    <Link 
                        to={'/manageLibrary'}
                        className="block px-4 py-2 rounded hover:bg-gray-700">🙍🏻‍♂️ Manage Library</Link>
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
                       <h1 className="text-3xl font-semibold mb-5 text-white">Add a song</h1>
                    </div>
                    <form onSubmit={handleAddBtn}>
                        <div className='flex flex-col gap-1'>
                            <div className='w-full max-w-md'>
                                <input 
                                    className='p-2 w-full bg-gray-900 text-white resize-none rounded border border-gray-500'
                                    type="text" 
                                    placeholder='Title of song'
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}/>
                            </div>
                            <div className='w-full max-w-md'>
                                <input 
                                    className='p-2 w-full bg-gray-900 text-white resize-none rounded border border-gray-500'
                                    type="text" 
                                    placeholder='Artist'
                                    value={artist}
                                    onChange={(e) => setArtist(e.target.value)}/>
                            </div>
                            <div className='w-full max-w-md'>
                                <input 
                                    className='p-2 w-full bg-gray-900 text-white resize-none rounded border border-gray-500'
                                    type="text" 
                                    placeholder='Key Of?'
                                    value={keyOf}
                                    onChange={(e) => setKeyOf(e.target.value)}/>
                            </div>
                            <div className='w-full max-w-md'>
                                <input 
                                    className='p-2 w-full bg-gray-900 text-white resize-none rounded border border-gray-500'
                                    type="text" 
                                    placeholder='Genre of song'
                                    value={genre}
                                    onChange={(e) => setGenre(e.target.value)}/>
                            </div>
                            <div className="w-1/1 h-[70vh]">
                            <textarea
                                className="w-full h-full p-4 border rounded-lg bg-gray-900 text-white resize-none border-gray-500"
                                placeholder="Enter lyrics & chords here..."
                                value={lyricsandchords}
                                onChange={(e) => setLyricsAndChords(e.target.value)}
                            />
                            </div>
                            <button className='py-3 px-8 mt-2 cursor-pointer w-30 bg-sky-700 rounded text-white hover:bg-sky-500 active:bg-sky-700'>Add</button>
                        </div>
                    </form>
                </main>
            </div>
        </>
    );
}