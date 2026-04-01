import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate, Link } from 'react-router-dom';

function Login() {
    const navigate = useNavigate();
    const [input, setInput] = useState({
        email: "",
        password: "",
        role: "jobseeker"
    });

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:8000/api/v1/user/login", input, {
                headers: { "Content-Type": "application/json" },
                withCredentials: true
            });

            if (res.data.success) {
                // 👇 Aab browser humesha Current User ki details yaad rakhega 👇
                localStorage.setItem("user", JSON.stringify(res.data.user));
                toast.success(res.data.message);
                navigate("/home");
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Login Failed");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
            <form onSubmit={submitHandler} className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h1 className="font-bold text-2xl mb-6 text-center text-blue-600">Login to Job Portal</h1>
                
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">Email</label>
                    <input type="email" name="email" value={input.email} onChange={changeEventHandler} 
                           className="w-full border border-gray-300 rounded px-3 py-2 outline-none focus:border-blue-500" 
                           placeholder="Enter your email" required />
                </div>
                
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">Password</label>
                    <input type="password" name="password" value={input.password} onChange={changeEventHandler} 
                           className="w-full border border-gray-300 rounded px-3 py-2 outline-none focus:border-blue-500" 
                           placeholder="Enter your password" required />
                </div>
                
                <div className="mb-6 flex justify-between items-end">
                    <div>
                        <label className="block text-gray-700 font-medium mb-2">Select Role</label>
                        <div className="flex gap-4">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input type="radio" name="role" value="jobseeker" checked={input.role === 'jobseeker'} onChange={changeEventHandler}/>
                                Job Seeker
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input type="radio" name="role" value="recruiter" checked={input.role === 'recruiter'} onChange={changeEventHandler}/>
                                Recruiter
                            </label>
                        </div>
                    </div>
                    
                    <Link to="/forgot-password" className="text-sm text-blue-600 hover:text-blue-800 hover:underline font-semibold cursor-pointer">
                        Forgot Password?
                    </Link>
                </div>
                
                <button type="submit" className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition">
                    Login
                </button>
            </form>
        </div>
    );
}

export default Login;
