import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

function Profile() {
    const [input, setInput] = useState({
        fullname: "",
        email: "",
        bio: "",
        skills: "",
        file: null
    });

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const fileHandler = (e) => {
        setInput({ ...input, file: e.target.files[0] });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        
        const formData = new FormData();
        formData.append("fullname", input.fullname);
        formData.append("email", input.email);
        formData.append("bio", input.bio);
        formData.append("skills", input.skills);
        if (input.file) {
            formData.append("file", input.file);
        }

        try {
            const res = await axios.post("http://localhost:8000/api/v1/user/profile/update", formData, {
                headers: { "Content-Type": "multipart/form-data" },
                withCredentials: true
            });
            if (res.data.success) {
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Update failed");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
            <form onSubmit={submitHandler} className="bg-white p-8 rounded-lg shadow-md w-full max-w-2xl grid grid-cols-2 gap-4">
                <h1 className="col-span-2 font-bold text-2xl mb-4 text-blue-600">Update Profile & Upload Resume</h1>
                
                <div>
                    <label className="block text-gray-700 font-medium mb-1">Full Name</label>
                    <input type="text" name="fullname" value={input.fullname} onChange={changeEventHandler} className="w-full border p-2 rounded focus:outline-blue-500" />
                </div>
                
                <div>
                    <label className="block text-gray-700 font-medium mb-1">Email</label>
                    <input type="email" name="email" value={input.email} onChange={changeEventHandler} className="w-full border p-2 rounded focus:outline-blue-500" />
                </div>

                <div className="col-span-2">
                    <label className="block text-gray-700 font-medium mb-1">Bio</label>
                    <textarea name="bio" value={input.bio} onChange={changeEventHandler} className="w-full border p-2 rounded focus:outline-blue-500" rows="3"></textarea>
                </div>

                <div className="col-span-2">
                    <label className="block text-gray-700 font-medium mb-1">Skills (comma separated)</label>
                    <input type="text" name="skills" value={input.skills} onChange={changeEventHandler} className="w-full border p-2 rounded focus:outline-blue-500" placeholder="e.g. HTML, CSS, React" />
                </div>

                <div className="col-span-2 mt-2">
                    <label className="block text-gray-700 font-medium mb-1">Upload Resume (PDF/DOC)</label>
                    <input type="file" onChange={fileHandler} className="w-full border p-2 rounded bg-gray-50 focus:outline-blue-500" accept="application/pdf,.doc,.docx" />
                </div>
                
                <button type="submit" className="col-span-2 mt-4 w-full bg-blue-600 text-white font-bold py-2 rounded hover:bg-blue-700">
                    Update Profile
                </button>
            </form>
        </div>
    );
}

export default Profile;
