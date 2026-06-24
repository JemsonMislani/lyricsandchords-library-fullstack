import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FaEdit, FaTrash, FaCheck, FaTimes } from "react-icons/fa";
import { useParams } from "react-router-dom";

export default function ManageLibrary(){
    const [songlists, setSonglists] = useState([])
    const [findId, setFindId] = useState(null)
    const [edittitle, setEditTitle] = useState('')
    const [editartist, setEditArtist] = useState('')
    const [editkeyOf, setEditKeyOf] = useState('')

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

    const handleEditIcon = (s) => {
        setFindId(s.id)
        setEditTitle(s.title)
        setEditArtist(s.artist)
        setEditKeyOf(s.song_key)
    }

    const handleEditedSong = (id) => {
        const token = localStorage.getItem('token') || sessionStorage.getItem('token')
        axios.put('http://localhost:3005/editDataOfSong/' + id, {
            title: edittitle,
            artist: editartist,
            song_key: editkeyOf
        },{
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(result => {
            setSonglists(prev => prev.map(sl => sl.id === id ?
                result.data : sl
            ))
            setFindId(null)
            setEditTitle('')
            setEditArtist('')
            setEditKeyOf('')
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
                <h1 className="text-2xl font-semibold mb-5">Manage Songs</h1>
                    <div className="grid gap-4" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(3in, max-content))' }}>
                    </div>
                    <div className="grid grid-cols-4 gap-2 mb-2 text-black text-l">
                        <span className="font-bold">Title:</span>
                        <span className="font-bold">Artist:</span>
                        <span className="font-bold">Key Of:</span>
                        <span className="font-bold">Action:</span>
                    </div>
                        {
                            songlists.map((sl) => (
                                <div key={sl.id}
                                    className="grid grid-cols-4 gap-1 mb-1">
                                {
                                    findId === sl.id ? 
                                    (<>
                                    <input 
                                        className="border p-2 rounded w-full"
                                        type="text" 
                                        value={edittitle}
                                        onChange={(e) => setEditTitle(e.target.value)}/>
                                    <input 
                                        className="border p-2 rounded w-full"
                                        type="text" 
                                        value={editartist}
                                        onChange={(e) => setEditArtist(e.target.value)}/>
                                    <input 
                                        className="border p-2 rounded w-full"
                                        type="text" 
                                        value={editkeyOf}
                                        onChange={(e) => setEditKeyOf(e.target.value)}/>
                                    <div 
                                        className="flex gap-2 justify-center items-center bg-sky-900 text-white p-2 rounded w-full">
                                    <button
                                        className="text-green-600 hover:text-green-500 text-xl cursor-pointer"
                                        onClick={() => handleEditedSong(sl.id)}><FaCheck />
                                    </button>
                                    <button
                                        className="text-red-600 hover:text-red-500 text-xl cursor-pointer"
                                        onClick={() => setFindId(null)}
                                        ><FaTimes />
                                    </button>
                                    </div>
                                    </>)
                                    :
                                    (<>
                                    <div className="bg-gray-900 text-white p-2 font-medium rounded ">{sl.title}
                                    </div>
                                    <div className="bg-gray-900 text-white p-2 font-medium rounded">{sl.artist}
                                    </div>
                                    <div className="bg-gray-900 text-white p-2 font-medium rounded">{sl.song_key}
                                    </div>
                                    <div className="flex justify-center items-center gap-1 bg-sky-900 text-white p-2 font-medium rounded">
                                        <span
                                            onClick={() => handleEditIcon(sl)}
                                            className="flex justify-center items-center gap-1 bg-green-700 text-white rounded text-blue-400 hover:text-green-300 px-1 cursor-pointer">Edit<FaEdit /></span>
                                        <span 
                                            className="flex        justify-center items-center gap-1 bg-red-900 text-white text-red-400 hover:text-red-300 px-1 cursor-pointer">Delete<FaTrash /></span>
                                    </div>
                                    </>)
                                }
                                </div>
                            ))
                        }
                </main>
            </div>
        </>
    );
}