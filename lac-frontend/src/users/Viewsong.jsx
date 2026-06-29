import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { FaHeart, FaRegHeart } from "react-icons/fa";

export default function ViewSong(){
    const [dataOfSong, setDataOfSong] = useState([])
    const [scroll, setScroll] = useState(false)
    const [fave, setFave] = useState(false)
    const { id } = useParams();

    useEffect(() => {
        const token = localStorage.getItem('token') || sessionStorage.getItem('token')
        axios.get('http://localhost:3005/getSongTitleArtistKey/' + id, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(result => {
            setDataOfSong(result.data)
        })
        .catch(err => {
            console.log(err)
        })
    }, [])

    const scrollLyricsAndChords = useRef(null)
    useEffect(() => {
        let interval;

        if(scroll && scrollLyricsAndChords.current){
            interval = setInterval(() => {
                scrollLyricsAndChords.current.scrollTop += 1
            }, 200)
        }
        return () => clearInterval(interval)
    }, [scroll])

    const handleScrollBtn = () => {
        setScroll((srl) => !srl)
    }

    const handleFaveBtn = () => {
        const token = localStorage.getItem('token') || sessionStorage.getItem('token')
        setFave(prev => !prev)
        axios.post('http://localhost:3005/favorites/toggle/' + id, {}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(result => {
            setFave(result.data.isFavorite)
        })
        .catch(err => {
            console.log(err)
        setFave(prev => !prev)
        })
    }

    return(
        <>
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-sky-900 text-white p-6">
            <div className="max-w-5xl mx-auto">
                <Link
                    to="/searchsong"
                    className="inline-flex items-center mb-6 px-4 py-2 rounded-lg bg-sky-700 hover:bg-sky-600 transition"
                >
                    ← Back
                </Link>
                    <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-3xl p-8 shadow-xl">
                        <div 
                            className="flex flex-col md:flex-row md:justify-between md:items-center gap-2">
                            <div>
                                <h1 className="text-3xl font-bold">
                                    {dataOfSong.title}
                                </h1>
                                <p className="text-gray-300 mt-2 text-lg">
                                    {dataOfSong.artist}
                                </p>
                            </div>
                            <div className="flex gap-3 flex-wrap">
                                <button 
                                    onClick={handleFaveBtn}
                                    className="px-4 py-2 rounded-full bg-white text-red-300 font-semibold cursor-pointer">
                                    {fave ? (
                                        <>
                                        <FaHeart className="text-red-500" />
                                        </> )
                                         : 
                                         (
                                        <>
                                        <FaRegHeart className="text-gray-400 hover:text-red-400" />
                                        </>
                                         )}
                                </button>
                                <span className="px-4 py-2 rounded-full bg-sky-500/20 border border-sky-500/40 text-sky-300 font-semibold uppercase">
                                    {dataOfSong.song_key}
                                </span>
                                <span className="px-4 py-2 rounded-full bg-purple-500/20 border border-purple-500/40 text-purple-300 font-semibold">
                                    {dataOfSong.genre}
                                </span>
                            </div>
                        </div>
                    </div>
                     <div className="mt-2 bg-white/10 backdrop-blur-md border border-white/10 rounded-3xl p-8">
                    <div className="flex items-center justify-between m-5 ml-0">
                        <h2 className="text-2xl font-bold">
                            Lyrics & Chords
                        </h2>
                        <button 
                            className='cursor-pointer text-2xl'
                            onClick={handleScrollBtn}>{scroll ? '❚❚' : '▶︎'}
                        </button>
                    </div>
                    <pre 
                        ref={scrollLyricsAndChords}
                        className="whitespace-pre-wrap font-mono leading-8 text-lg text-gray-100 max-h-[580px] overflow-y-auto scrollbar-hide">
                        {dataOfSong.lyrics}
                    </pre>
                </div>
            </div>
        </div>
        </>
    );
}