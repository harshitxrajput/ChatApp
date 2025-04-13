import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

import authRoutes from './routes/auth.route.js';
import messageRoutes from './routes/message.route.js';
import { connectToDB } from './lib/db.js';
import { app, server } from './lib/socket.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 5001;

app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ limit: '5mb', extended: true }));
app.use(cookieParser());

// CORS configuration
app.use(cors({
    origin: process.env.NODE_ENV === "development" 
        ? "http://localhost:5173" 
        : "https://your-render-frontend-url.onrender.com",
    credentials: true
}));

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/message', messageRoutes);

// Serve static files in production
if (process.env.NODE_ENV === "production") {
    const frontendDist = path.join(__dirname, "../../frontend/dist");
    
    app.use(express.static(frontendDist));

    app.get("/", (req, res) => {
        res.sendFile(path.join(frontendDist, "index.html"));
    });
}

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    connectToDB();
});