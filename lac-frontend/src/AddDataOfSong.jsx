import { useState } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios'

export default function AddDataOfSongs(){
    const [data, setData] = useState([])
    const [title, setTitle] = useState('')
    const [artist, setArtist] = useState('')
    const [keyOf, setKeyOf] = useState('')
    const [lyricsandchords, setLyricsAndChords] = useState('')

    const handleAddBtn = () => {
        const token = localStorage.getItem('token') || sessionStorage.getItem('token')
        axios.post('http://localhost:3005/createDataOfSong', {
            title: title,
            artist: artist,
            song_key: keyOf,
            lyrics: lyricsandchords
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(result => {
            setData([...data, result.data])
        })
        .catch(err => {
            console.log(err)
        })
    }
    
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
                    <div className="grid gap-4" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(3in, max-content))' }}>
                    </div>
                    <div>
                       <h1 className="text-2xl font-semibold mb-5">Add a song(s)</h1>
                    </div>
                    <form onSubmit={handleAddBtn}>
                        <div className='flex flex-col gap-1'>
                            <div>
                                <input 
                                    className='border p-2 w-100 bg-gray-900 text-white resize-none rounded'
                                    type="text" 
                                    placeholder='Title of song'
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}/>
                            </div>
                            <div>
                                <input 
                                    className='border p-2 w-100 bg-gray-900 text-white resize-none rounded'
                                    type="text" 
                                    placeholder='Artist'
                                    value={artist}
                                    onChange={(e) => setArtist(e.target.value)}/>
                            </div>
                            <div>
                                <input 
                                    className='border p-2 w-100 bg-gray-900 text-white resize-none rounded'
                                    type="text" 
                                    placeholder='Key Of?'
                                    value={keyOf}
                                    onChange={(e) => setKeyOf(e.target.value)}/>
                            </div>
                            <div className="w-1/1 h-[70vh]">
                            <textarea
                                className="w-full h-full p-4 border rounded-lg bg-gray-900 text-white resize-none"
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