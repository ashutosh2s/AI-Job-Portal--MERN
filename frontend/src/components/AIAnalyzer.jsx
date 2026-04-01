import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

function AIAnalyzer() {
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);

    const analyzeResumeHandler = async () => {
        setLoading(true);
        try {
            const res = await axios.get("http://localhost:8000/api/v1/user/ai-analyze", {
                withCredentials: true
            });
            if (res.data.success) {
                setResult(res.data);
                toast.success("AI Analysis Complete!");
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Failed to analyze resume");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-4xl mx-auto space-y-8">
                <div className="bg-white p-8 rounded-lg shadow-md text-center">
                    <h1 className="text-3xl font-bold text-blue-700 mb-4">Gemini AI Resume Analyzer</h1>
                    <p className="text-gray-600 mb-6">Let our AI scan your uploaded resume and recommend the perfect jobs.</p>
                    <button 
                        onClick={analyzeResumeHandler} 
                        disabled={loading}
                        className={`font-bold py-3 px-8 rounded-full text-white transition ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:scale-105 shadow-lg'}`}
                    >
                        {loading ? "Scanning Resume with AI..." : "Start AI Scanning ✨"}
                    </button>
                </div>

                {result && (
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-blue-600">
                            <h2 className="text-xl font-bold mb-4">Your AI Score 🎯</h2>
                            <div className="flex items-center justify-center">
                                <div className="text-5xl font-extrabold text-blue-600">{result.analysis.score}/100</div>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-red-500">
                            <h2 className="text-xl font-bold mb-4">Missing Skills to Learn 📈</h2>
                            <ul className="list-disc pl-5 space-y-2 text-gray-700">
                                {result.analysis.missingSkills?.map((skill, index) => (
                                    <li key={index} className="font-medium text-red-600">{skill}</li>
                                ))}
                            </ul>
                        </div>

                        <div className="md:col-span-2 bg-white p-6 rounded-lg shadow-md border-t-4 border-green-500">
                            <h2 className="text-xl font-bold mb-4">Jobs Matched For You 💼</h2>
                            {result.matchedJobs?.length === 0 ? (
                                <p className="text-gray-500">No perfectly matching jobs found right now.</p>
                            ) : (
                                <div className="space-y-4">
                                    {result.matchedJobs?.map((job) => (
                                        <div key={job._id} className="border p-4 rounded hover:bg-gray-50 transition border-l-4 border-l-green-400">
                                            <h3 className="font-bold text-lg">{job.title}</h3>
                                            <p className="text-sm text-gray-600">{job.companyName} | ₹{job.salary} LPA</p>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default AIAnalyzer;
