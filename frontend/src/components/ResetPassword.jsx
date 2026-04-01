import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function ResetPassword() {
    const navigate = useNavigate();
    const [input, setInput] = useState({
        otp: "",
        newPassword: ""
    });

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:8000/api/v1/user/reset-password", input, {
                headers: { "Content-Type": "application/json" },
                withCredentials: true
            });

            if (res.data.success) {
                toast.success(res.data.message);
                navigate("/login");
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Invalid OTP or Error");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
            <form onSubmit={submitHandler} className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h1 className="font-bold text-2xl mb-6 text-center text-green-600">Reset Password</h1>
                
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">Enter 6-digit OTP</label>
                    <input type="text" name="otp" value={input.otp} onChange={changeEventHandler} 
                           className="w-full border border-gray-300 rounded px-3 py-2 outline-none focus:border-green-500" 
                           placeholder="123456" required />
                </div>
                
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">New Password</label>
                    <input type="password" name="newPassword" value={input.newPassword} onChange={changeEventHandler} 
                           className="w-full border border-gray-300 rounded px-3 py-2 outline-none focus:border-green-500" 
                           placeholder="Enter new strong password" required />
                </div>
                
                <button type="submit" className="w-full bg-green-600 text-white font-bold py-2 px-4 rounded hover:bg-green-700 transition">
                    Set New Password
                </button>
            </form>
        </div>
    );
}

export default ResetPassword;
