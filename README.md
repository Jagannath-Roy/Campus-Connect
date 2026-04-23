# Campus Connect 🎓
> A Smart Digital Classroom Management System

Campus Connect is a full-stack MERN web application built as a role-based Digital Classroom Portal for Teachers and Students. It provides an intuitive, professional, and responsive platform to manage educational resources, quizzes, and announcements.

## 🚀 Features

### 👨‍🏫 Teacher Dashboard
- **Notes Management:** Upload and manage PDF study materials.
- **Quiz Creator:** Create dynamic MCQ-based quizzes with custom deadlines.
- **Announcements:** Post real-time updates and notices for students.
- **Analytics & Tracking:** View student quiz attempts, scores, and overall class statistics.

### 👨‍🎓 Student Dashboard
- **Study Materials:** Access, filter, and download notes uploaded by teachers.
- **Interactive Quizzes:** Attempt available quizzes and submit answers in a user-friendly interface.
- **Score Viewer:** Track past attempts, scores, and performance history.
- **Live Announcements:** Read the latest updates from teachers.

## 🛠️ Tech Stack

- **Frontend:** React.js, Tailwind CSS (v4), React Router DOM, Axios, Context API
- **Backend:** Node.js, Express.js
- **Database:** MongoDB Atlas, Mongoose
- **Authentication:** JWT (JSON Web Tokens), bcrypt
- **File Storage:** Local Multer storage for PDF uploads

## 💻 Running Locally

### Prerequisites
- Node.js installed on your machine
- MongoDB Atlas URI (or local MongoDB connection)

### 1. Clone the repository
```bash
git clone https://github.com/Jagannath-Roy/Campus-Connect.git
cd Campus-Connect
```

### 2. Backend Setup
```bash
cd backend
npm install
```
Create a `.env` file in the `backend` directory and add the following:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```
Start the backend server:
```bash
npm run dev
```

### 3. Frontend Setup
Open a new terminal window:
```bash
cd frontend
npm install
npm run dev
```

### 4. Access the application
Open your browser and navigate to the localhost port provided by Vite (usually `http://localhost:5173`).

## 🔒 Role-Based Access Control (RBAC)
The application ensures that students cannot access teacher privileges and vice-versa. Protected routes and middleware are implemented on both the frontend (React Router PrivateRoutes) and backend (Express Auth Middleware).

---
*Built with ❤️ for better digital education.*
