import { GoogleGenAI } from '@google/genai';
import { User } from '../models/userModel.js';
import { Job } from '../models/jobModel.js';
import fs from 'fs';
import path from 'path';

export const analyzeResume = async (req, res) => {
    try {
        const userId = req.id;
        const user = await User.findById(userId);

        if (!user || !user.profile.resume) {
            return res.status(400).json({ message: "Please upload your Resume (PDF) first.", success: false });
        }

        if (!user.profile.resume.toLowerCase().endsWith('.pdf')) {
            return res.status(400).json({ 
                message: "Arey bhai galti mil gayi! AI sirf .pdf file padhta hai, aur tumne .docx daali hai.", 
                success: false 
            });
        }

        const resumePath = path.resolve("uploads", user.profile.resume);
        
        if (!fs.existsSync(resumePath)) {
             return res.status(400).json({ message: `File na mili: ${resumePath}`, success: false });
        }

        let pdfBase64 = "";
        try {
            const dataBuffer = fs.readFileSync(resumePath);
            // DIRECT AI CONVERSION (NO THIRD PARTY PDF CRAP)
            pdfBase64 = dataBuffer.toString("base64");
        } catch (err) {
            console.log(err);
            return res.status(500).json({ message: "File padhne me dikkat: " + err.message, success: false });
        }

        const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

        const prompt = `
        You are an expert HR Analyst. Analyze the attached candidate's resume (PDF).
        Provide your analysis strictly in raw JSON format.
        {
            "score": 85,
            "missingSkills": ["AWS", "Docker", "System Design"],
            "suggestedRoles": ["Software Engineer", "Backend Developer"]
        }
        `;

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: [
                prompt,
                {
                    inlineData: {
                        data: pdfBase64,
                        mimeType: 'application/pdf'
                    }
                }
            ]
        });

        const cleanedText = response.text.replace(/```json/g, "").replace(/```/g, "").trim();
        const aiAnalysis = JSON.parse(cleanedText);

        const suggestedRoles = aiAnalysis.suggestedRoles || [];
        
        const roleQueries = suggestedRoles.map(role => ({ title: { $regex: role, $options: "i" } }));
        
        let suggestedJobs = [];
        if (roleQueries.length > 0) {
            suggestedJobs = await Job.find({ $or: roleQueries }).limit(5);
        }

        return res.status(200).json({ 
            analysis: aiAnalysis, 
            matchedJobs: suggestedJobs,
            success: true 
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Gemini AI connection failed: " + error.message, success: false });
    }
};
