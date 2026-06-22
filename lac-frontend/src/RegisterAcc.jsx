import { Link } from "react-router-dom";
export default function RegisterAccount(){
    return(
        <>
            <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-sky-900'>
                <form className='w-full max-w-mdw-full max-w-md sm:p-4'>
                    <div className='w-full min-h-screen sm:min-h-auto sm:rounded-2xl bg-white/20 backdrop-blur-xl border border-white/30 shadow-2xl p-6 sm:p-10 flex flex-col justify-center'>
                        <div>
                            <div className='text-3xl font-semibold text-center mb-8 text-white'>Signup</div>
                            <div className='flex flex-col gap-5'>
                            <input
                                className='w-full py-3 px-3 bg-white/80 border border-white/40 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500'
                                type="text" 
                                placeholder="Enter username"/>
                            <input 
                                className='w-full py-3 px-3 bg-white/80 border border-white/40 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500'
                                type="email" 
                                placeholder="Enter email"/>
                            <input
                                className='w-full py-3 px-3 bg-white/80 border border-white/40 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500' 
                                type="password" 
                                placeholder="Enter password"/>
                            <button className='w-full py-3 bg-sky-600 text-white rounded-lg text-lg hover:bg-sky-700 active:bg-sky-800 transition cursor-pointer'>Submit</button>
                            <div className='flex justify-center'>
                            <Link 
                                className='text-center text-sm text-white hover:text-sky-400'
                                to='/'>Go back to Login</Link>
                            </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}