# 🔐 MERN Authentication System

🚀 A production-ready full-stack authentication system built using the **MERN Stack** featuring secure JWT authentication, email verification, password reset workflow, and protected routes.

---

## 🌐 Live Demo

Frontend:   
Backend API: 

---

## ✨ Features

✅ User Registration & Login  
✅ JWT Authentication (HTTP-only Cookies)  
✅ Email Verification System  
✅ OTP-based Password Reset  
✅ Secure Session Management  
✅ Protected Routes (Frontend + Backend)  
✅ Responsive Modern UI  
✅ Serverless Deployment (Vercel)  
✅ Environment-based Configuration  

---

## 🧰 Tech Stack

### Frontend
- React.js
- Vite
- Axios
- React Router
- Context API

### Backend
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT Authentication
- Nodemailer (Email Service)
- bcrypt.js (Password Hashing)

### Deployment
- Vercel (Frontend + Serverless Backend)
- MongoDB Atlas

---

## 📂 Project Structure
├── frontend/ # React Frontend
│ ├── src/
│ └── vercel.json
│
├── backend/ # Express Backend
│ ├── api/
│ ├── controllers/
│ ├── models/
│ ├── routes/
│ └── vercel.json
│
└── README.md

---


---

## ⚙️ Installation & Setup

### 1️⃣ Clone Repository

```bash
git clone https://github.com/your-username/mern-auth.git
cd mern-auth
````
### 2️⃣ Backend Setup
cd backend
npm install

### Create .env file:
PORT=8000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
SENDER_EMAIL=your_email
EMAIL_PASS=your_email_password
CLIENT_URL=http://localhost:5173

# Run backend:
npm run server

### 3️⃣ Frontend Setup
cd frontend
npm install

# Create .env: 
VITE_BACKEND_URL=http://localhost:8000

# Run frontend:
npm run dev
