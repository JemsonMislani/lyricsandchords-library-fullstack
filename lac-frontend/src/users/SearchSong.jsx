import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

export default function SearchSong(){
    const [open, setOpen] = useState(false)
    const [songlists, setSonglists] = useState([])
    const [searchsongLists, setSearchSongLists] = useState('')
    const [songlistsdata, setSonglistsData] = useState([])

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

    const handleSearchInp = () => {
        const token = localStorage.getItem('token') || sessionStorage.getItem('token')
        axios.get('http://localhost:3005/searchSongTitleArtistKey', {
            params: {searchSongLists: searchsongLists},
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(result => {
            setSonglistsData(result.data)
        })
        .catch(err => {
            console.log(err)
        })
    }

     const handleSearchedInp = searchsongLists.trim() ? songlistsdata : songlists

     useEffect(() => {
        const delaySearch = setTimeout(() => {
            if(searchsongLists){
                handleSearchInp()
            } else {
                setSonglistsData([])
            }
        }, 300)

        return () => clearTimeout(delaySearch)
     }, [searchsongLists])

     const highlightText = (text, search) => {
        if (!search.trim()) return text;

        const regex = new RegExp(`(${search})`, "gi");
        const parts = text.split(regex);

        return parts.map((part, index) =>
            part.toLowerCase() === search.toLowerCase() ? (
                <span
                    key={index}
                    className="text-yellow-400 text-black rounded"
                >
                    {part}
                </span>
            ) : (
                part
            )
        );
    };

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
                <h1 className="text-3xl font-semibold mb-5 text-white">View song</h1>
                    <div className='w-full max-w-md'>
                        <input 
                            className='p-2 w-full bg-gray-900 text-white resize-none rounded border border-gray-500 mb-5'
                            type="text" 
                            placeholder='Search song...'
                            value={searchsongLists}
                            onChange={(e) => setSearchSongLists(e.target.value)}/>
                    </div>
                    <div>
                        <div className="hidden sm:grid sm:grid-cols-5 gap-2 mb-2 text-white px-3">
                        <span className="font-bold">Title:</span>
                        <span className="font-bold">Artist:</span>
                        <span className="font-bold">Key Of:</span>
                        <span className="font-bold">Genre:</span>
                        <span className="font-bold">Action:</span>
                    </div>
                        {
                        handleSearchedInp.map((sl) => (
                            <div
                                key={sl.id}
                                className="bg-gray-900 text-white p-3 rounded mb-1 border border-gray-700"
                            >
                                <div className="sm:hidden space-y-1">
                                <div>
                                    <span className="text-gray-400 text-xs">Title:</span>
                                    <div>{highlightText(sl.title, searchsongLists)}</div>
                                </div>
                                <div>
                                    <span className="text-gray-400 text-xs">Artist:</span>
                                    <div>{sl.artist}</div>
                                </div>
                                <div>
                                    <span className="text-gray-400 text-xs">Key Of:</span>
                                    <div className="uppercase">{sl.song_key}</div>
                                </div>
                                <div>
                                    <span className="text-gray-400 text-xs">Genre:</span>
                                    <div>{sl.genre}</div>
                                </div>
                                <div>
                                    <span className="text-gray-400 text-xs">Action: </span>
                                    <button
                                        className="flex flex-col bg-sky-900 px-5 py-2 rounded">View song</button>
                                </div>
                                </div>

                                <div className="hidden sm:grid sm:grid-cols-5 gap-2">
                                    <div>{highlightText(sl.title, searchsongLists)}</div>
                                    <div>{sl.artist}</div>
                                    <div className="uppercase">{sl.song_key}</div>
                                    <div>{sl.genre}</div>
                                    <button className="px-1 bg-sky-900 rounded cursor-pointer hover:bg-sky-700 active:bg-sky-900">View song</button>
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