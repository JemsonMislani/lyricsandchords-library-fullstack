import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FaEdit, FaTrash, FaCheck, FaTimes } from "react-icons/fa";
import { useAuthForLogout } from './LogoutFeature';

export default function ManageLibrary(){
    const [songlists, setSonglists] = useState([])
    const [findId, setFindId] = useState(null)
    const [edittitle, setEditTitle] = useState('')
    const [editartist, setEditArtist] = useState('')
    const [editkeyOf, setEditKeyOf] = useState('')
    const [findSongId, setfindSongId] = useState(null)
    const [editLyricsMode, setEditLyricsMode] = useState(null)
    const [editlyrics, setEditLyrics] = useState('')
    const [open, setOpen] = useState(false);
    const [searchSong, setSearchSong] = useState('')
    const [searchTitle, setSearchTitle] = useState([])
    const { handleLogoutBtn } = useAuthForLogout()

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
        if(!edittitle.trim() || !editartist.trim() || !editkeyOf.trim()){
            alert('Please fillout field before saving')
            return
        }
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

    const handleDeleteBtn = (id) => {
        const token = localStorage.getItem('token') || sessionStorage.getItem('token')
        axios.delete('http://localhost:3005/deleteDataOfSong/' + id, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(result => {
            setSonglists(prev => prev.filter(sl => sl.id !== id))
            result.data
        })
        .catch(err => {
            console.log(err)
        })
    }

    const toggleViewLyrics = (id) => {
        setfindSongId(prev => prev === id ? null : id)
    }

    const handleEditLyrics = (edit) => {
        setEditLyricsMode(edit.id)
        setEditLyrics(edit.lyrics)
    }

    const handleSaveEditedLyrics = (id) => {
        const token = localStorage.getItem('token') || sessionStorage.getItem('token')
        axios.put('http://localhost:3005/editLyrics/' + id, {
            lyrics: editlyrics
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(result => {
            setSonglists(prev => prev.map(sl => sl.id === id ? 
                result.data : sl
            ))
            setEditLyricsMode(null)
        })
        .catch(err => {
            console.log(err)
        })
    }

    const handleSearchInp = () => {
        const token = localStorage.getItem('token') || sessionStorage.getItem('token')
        if(!searchSong.trim()){
            return;
        }
        axios.get('http://localhost:3005/searchSongTitle', {
            params: { searchTitle: searchSong},
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(result => {
            setSearchTitle(result.data)
        })
        .catch(err => {
            console.log(err)
        })
    }

    const handleSearchedSongs = searchSong.trim() ? searchTitle : songlists

    useEffect(() => {
        const delaySearch = setTimeout(() => {
            if(searchSong){
                handleSearchInp()
            } else {
                setSearchTitle([])
            }
        }, 300)
        return () => clearTimeout(delaySearch)
    }, [searchSong])

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
                    fixed sm:static z-50 top-0 left-0 h-full w-64
                    bg-gray-900 text-white flex flex-col
                    transform transition-transform duration-300 ease-in-out
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
                <main className="flex-1 p-4 sm:p-6 overflow-auto">
                    <div className="flex items-center justify-between mb-6 sm:hidden">
                    <button
                        onClick={() => setOpen(true)}
                        className="text-2xl p-2 bg-sky-900 text-white rounded"
                    >
                        ☰
                    </button>
                    </div>
                <h1 className="text-3xl font-semibold mb-5 text-white">Manage Songs</h1>
                    <div className="w-full max-w-md flex justify-center items-center gap-2">
                        <input 
                            className="p-2 w-full bg-gray-900 text-white resize-none rounded border border-gray-500 mb-2"
                            type="text"
                            placeholder="Search title of song"
                            value={searchSong}
                            onChange={(e) => setSearchSong(e.target.value)}/>
                    </div>
                    <div className="hidden sm:grid sm:grid-cols-4 gap-2 mb-2 text-black font-bold">
                        <span className="font-bold text-white">Title:</span>
                        <span className="font-bold text-white">Artist:</span>
                        <span className="font-bold text-white">Key Of:</span>
                        <span className="font-bold text-white">Action:</span>
                    </div>
                    <div className="flex flex-col">
                        {
                            handleSearchedSongs.map((sl) => (
                                <div key={sl.id}
                                    className="bg-white sm:bg-transparent sm:grid sm:grid-cols-4 gap-1 p-3 sm:p-0 rounded shadow sm:shadow-none mb-1"
                                >
                                {
                                    findId === sl.id ? 
                                    (<>
                                    <input 
                                        className="border p-2 rounded w-full mt-1 mb-1 text-white bg-sky-900"
                                        type="text" 
                                        value={edittitle}
                                        onChange={(e) => setEditTitle(e.target.value)}/>
                                    <input 
                                        className="border p-2 rounded w-full mt-1 mb-1 text-white bg-sky-900"
                                        type="text" 
                                        value={editartist}
                                        onChange={(e) => setEditArtist(e.target.value)}/>
                                    <input 
                                        className="border p-2 rounded w-full mt-1 mb-1 text-white bg-sky-900"
                                        type="text" 
                                        value={editkeyOf}
                                        onChange={(e) => setEditKeyOf(e.target.value)}/>
                                    <div 
                                        className="flex gap-2 justify-center items-center bg-sky-900 text-white p-2 rounded w-full mt-1 mb-1">
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
                                    <div className="bg-gray-900 border border-gray-500 text-white p-2 rounded flex mt-1 justify-between items-center">{sl.title}
                                        <label
                                            className="hover:bg-sky-500 cursor-pointer rounded text-sm hover:scale-110 transition"
                                            title="View lyrics"
                                            onClick={() => toggleViewLyrics(sl.id)}>👁️
                                        </label>
                                    </div>
                                    <div className="bg-gray-900 border border-gray-500 text-white p-2 rounded flex mt-1 justify-between items-center">{sl.artist}
                                    </div>
                                    <div className="bg-gray-900 border border-gray-500 text-white p-2 rounded flex mt-1 justify-between items-center uppercase">{sl.song_key}
                                    </div>
                                    <div className="flex gap-1 justify-center items-center bg-sky-900 text-white p-2 rounded mt-1">
                                        <span
                                            onClick={() => handleEditIcon(sl)}
                                            className="flex items-center gap-1 bg-green-700 px-2 py-1 rounded cursor-pointer"
                                            >Edit<FaEdit /></span>
                                        <span 
                                            className="flex items-center gap-1 bg-red-900 px-2 py-1 rounded cursor-pointer"
                                            onClick={() => handleDeleteBtn(sl.id)}>Delete<FaTrash /></span>
                                    </div>
                                    {
                                        findSongId === sl.id && (
                                            <div className="col-span-4 bg-gray-800 text-white p-4 rounded mt-3">
                                            <div className="flex justify-between items-center mb-2">
                                                <div className="font-bold mb-2">Lyrics & Chords
                                                </div>
                                                <span
                                                    onClick={() => handleEditLyrics(sl)}
                                                    className="flex items-center gap-1 bg-green-700 px-2 py-1 rounded cursor-pointer">Edit<FaEdit />
                                                </span>
                                            </div>
                                            <div className="font-bold mb-2 underline">Title: {sl.title}
                                            </div>
                                                {
                                                    editLyricsMode === sl.id ? 
                                                    (<>
                                                    <textarea 
                                                        className="w-full h-80 p-2 bg-gray-900 text-white rounded"
                                                        value={editlyrics}
                                                        onChange={(e) => setEditLyrics(e.target.value)}
                                                    />
                                                    <div className="flex gap-2 mt-3">
                                                        <button
                                                            className="text-green-600 hover:text-green-500 text-xl cursor-pointer"
                                                            onClick={() => handleSaveEditedLyrics(sl.id)}><FaCheck />
                                                        </button>
                                                        <button
                                                            className="text-red-400 hover:text-red-500 text-xl cursor-pointer"
                                                            onClick={() => setEditLyricsMode(null)}
                                                        ><FaTimes />
                                                        </button>
                                                    </div>
                                                    </>)
                                                    :
                                                    (<>
                                                    <div className="whitespace-pre font-mono text-sm sm:text-base leading-6 text-gray-100 max-h-[70vh] overflow-y-auto scrollbar-hide">
                                                        {sl.lyrics}
                                                    </div>
                                                    </>)
                                                }
                                            </div>
                                        )
                                    }
                                    </>)
                                }
                                </div>
                            ))
                        }
                    </div>
                </main>
            </div>
        </>
    );
}