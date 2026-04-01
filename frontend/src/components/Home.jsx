import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Home() {
    const [user, setUser] = useState(null);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        } else {
            navigate("/login");
        }
    }, [navigate]);

    const handleMouseMove = (e) => {
        setMousePos({ x: e.clientX, y: e.clientY });
    };

    return (
        <div 
            onMouseMove={handleMouseMove}
            className="min-h-screen bg-[#07070a] relative overflow-hidden flex flex-col items-center pb-20 text-white"
        >
            <div 
               className="absolute inset-0 z-0 pointer-events-none"
               style={{
                   backgroundImage: "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjEuNSIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjE1KSIvPjwvc3ZnPg==')",
               }}
            ></div>

            <div 
               className="absolute inset-0 z-0 pointer-events-none transition-all duration-75"
               style={{
                   background: `radial-gradient(800px circle at ${mousePos.x}px ${mousePos.y}px, rgba(59, 130, 246, 0.15), transparent 80%)`
               }}
            ></div>

            <div className="z-10 relative w-full max-w-7xl px-6 pt-32 pb-16 flex flex-col items-center text-center">
                <span className="bg-blue-900/30 text-blue-400 border border-blue-700/40 px-5 py-2 rounded-full text-xs font-bold uppercase tracking-widest mb-8 backdrop-blur-md">
                    {user?.role} Portal Active 🟢
                </span>
                
                <h1 className="text-6xl md:text-8xl font-black mt-2 mb-6 tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white via-gray-200 to-gray-600">
                    Welcome, <br className="hidden md:block" />
                    <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                        {user?.fullname || "Guest"}
                    </span>
                </h1>
                
                <p className="text-gray-400 text-lg md:text-2xl font-medium max-w-3xl leading-relaxed mb-16">
                    {user?.role === 'recruiter' 
                        ? "Empowering companies with AI-driven applicant tracking. Deploy your next tech opening instantly."
                        : "Discover your true market value. Leverage Gemini AI to build a portfolio that recruiters can't ignore."}
                </p>

                <div className="flex flex-wrap justify-center gap-6 mb-24 relative">
                    <img src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=400&h=300&fit=crop" className="rounded-2xl shadow-2xl border border-gray-800/60 rotate-[-5deg] hover:scale-105 hover:z-10 transition duration-300 opacity-70 hover:opacity-100" alt="tech1" />
                    <img src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=400&h=300&fit=crop" className="rounded-2xl shadow-2xl border border-gray-800/60 mt-8 hover:scale-105 hover:z-10 transition duration-300 z-1 opacity-70 hover:opacity-100" alt="tech2" />
                    <img src="https://images.unsplash.com/photo-1605379399642-870262d3d051?q=80&w=400&h=300&fit=crop" className="rounded-2xl shadow-2xl border border-gray-800/60 rotate-[5deg] hover:scale-105 hover:z-10 transition duration-300 opacity-70 hover:opacity-100" alt="tech3" />
                </div>
            </div>

            <div className="w-full max-w-7xl z-10 grid grid-cols-1 md:grid-cols-3 gap-8 px-6">
                
                <div className="bg-[#111111] border border-gray-800 p-8 rounded-3xl shadow-2xl hover:border-purple-500/50 hover:bg-[#161616] transition duration-300 group flex flex-col justify-between relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-30 transition text-2xl">✨</div>
                    <div className="relative z-10">
                        <div className="w-12 h-12 bg-purple-900/30 rounded-xl mb-6 flex items-center justify-center text-purple-400 font-bold text-xl">AI</div>
                        <h2 className="text-3xl font-bold mb-4 text-gray-100 group-hover:text-purple-400 transition">Analyzer</h2>
                        <p className="text-gray-400 text-sm mb-8 leading-relaxed">Let Gemini scan your coding stack & assign you a match score.</p>
                    </div>
                    <Link to="/ai-analyzer" className="relative z-10 w-full text-center inline-block bg-white text-black px-6 py-3 rounded-full font-bold hover:bg-purple-500 hover:text-white transition shadow-lg">Scan Deeply</Link>
                </div>

                <div className="bg-[#111111] border border-gray-800 p-8 rounded-3xl shadow-2xl hover:border-blue-500/50 hover:bg-[#161616] transition duration-300 group flex flex-col justify-between relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-30 transition text-2xl">📝</div>
                    <div className="relative z-10">
                        <div className="w-12 h-12 bg-blue-900/30 rounded-xl mb-6 flex items-center justify-center text-blue-400 font-bold text-xl">PR</div>
                        <h2 className="text-3xl font-bold mb-4 text-gray-100 group-hover:text-blue-400 transition">My Profile</h2>
                        <p className="text-gray-400 text-sm mb-8 leading-relaxed">Keep your Bio, Skills, and active Resume (PDF) completely up to date.</p>
                    </div>
                    <Link to="/profile" className="relative z-10 w-full text-center inline-block bg-white text-black px-6 py-3 rounded-full font-bold hover:bg-blue-500 hover:text-white transition shadow-lg">Update Repo</Link>
                </div>

                {user?.role === 'recruiter' ? (
                    <div className="bg-[#111111] border border-gray-800 p-8 rounded-3xl shadow-2xl hover:border-emerald-500/50 hover:bg-[#161616] transition duration-300 group flex flex-col justify-between relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-30 transition text-2xl">💼</div>
                        <div className="relative z-10">
                            <div className="w-12 h-12 bg-emerald-900/30 rounded-xl mb-6 flex items-center justify-center text-emerald-400 font-bold text-xl">JB</div>
                            <h2 className="text-3xl font-bold mb-4 text-gray-100 group-hover:text-emerald-500 transition">New Job</h2>
                            <p className="text-gray-400 text-sm mb-8 leading-relaxed">Have a tech opening? Drop a live job posting instantly on portal.</p>
                        </div>
                        <Link to="/post-job" className="relative z-10 w-full text-center inline-block bg-white text-black px-6 py-3 rounded-full font-bold hover:bg-emerald-500 hover:text-white transition shadow-lg">Create Job</Link>
                    </div>
                ) : (
                    <div className="bg-[#111111] border border-gray-800 p-8 rounded-3xl shadow-2xl hover:border-emerald-500/50 hover:bg-[#161616] transition duration-300 group flex flex-col justify-between relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-30 transition text-2xl">🔍</div>
                        <div className="relative z-10">
                            <div className="w-12 h-12 bg-emerald-900/30 rounded-xl mb-6 flex items-center justify-center text-emerald-400 font-bold text-xl">SH</div>
                            <h2 className="text-3xl font-bold mb-4 text-gray-100 group-hover:text-emerald-500 transition">Search Jobs</h2>
                            <p className="text-gray-400 text-sm mb-8 leading-relaxed">Browse fresh tech-roles right now.</p>
                        </div>
                        <Link to="/find-jobs" className="relative z-10 w-full text-center inline-block bg-white text-black px-6 py-3 rounded-full font-bold hover:bg-emerald-500 hover:text-white transition shadow-lg">Launch Search</Link>
                    </div>
                )}
            </div>

        </div>
    );
}

export default Home;
