import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

export default function ViewSong(){
    const [dataOfSong, setDataOfSong] = useState([])
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

                    <h2 className="text-2xl font-bold mb-6">
                        Lyrics & Chords
                    </h2>
                    <pre className="whitespace-pre-wrap font-mono leading-8 text-lg text-gray-100">
                        {dataOfSong.lyrics}
                    </pre>
                </div>
            </div>
        </div>
        </>
    );
}