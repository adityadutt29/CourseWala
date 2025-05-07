# CourseWala - An AI-Powered Course Generator

CourseWala is a full-stack MERN web application that uses artificial intelligence to automatically generate detailed, structured online courses. Users can define a course topic, difficulty level, duration, and number of chapters—and the system intelligently creates the entire course, complete with chapter summaries, key points, code examples, and curated YouTube tutorials.

Developed by **Aditya Dutt**  
📽️ [Watch Demo](https://drive.google.com/file/d/1_7Jvii8uTlQ-OU6MiIioZMsfy4nCwBV-/view?usp=drive_link)

---

## 🚀 Features

### 🔹 AI-Powered Course Generation
- Utilizes **Google Gemini AI** to create a coherent course structure based on topic, difficulty, duration, and chapter count.
- Each chapter includes:
  - Descriptive summaries
  - Key learning points
  - Code examples (where applicable)

### 🔹 Integrated Video Learning
- Uses the **YouTube Data API v3** to fetch and embed relevant tutorial videos for each chapter.
- Provides multiple learning resources per chapter.

### 🔹 Course Customization
- Users can set:
  - Course topic and objectives
  - Difficulty level (Beginner/Intermediate/Advanced)
  - Total duration
  - Number of chapters

### 🔹 Review & Edit Functionality
- Easily review and update chapter titles, summaries, and durations before final content generation.

### 🔹 Full Course Dashboard
- All created courses are displayed in a user-friendly, card-based dashboard.
- Interactive course viewer allows seamless chapter and resource navigation.

### 🔹 User Authentication
- Secure login and registration with **JWT** for session handling.
- Passwords protected using **bcryptjs**.

---

## 📚 Tech Stack

- **Frontend**: React.js
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **AI Integration**: Google Gemini AI API
- **Video Search**: YouTube Data API v3
- **Authentication**: JWT, bcryptjs

---

## ⚙️ Setup and Installation

### 1. Clone the Repository
```bash
git clone https://github.com/adityadutt29/CourseWala.git
cd course-wala
```

### 2. Install Backend Dependencies
```bash
cd server
npm install
```

### 3. Install Frontend Dependencies
```bash
cd client
npm install
```

### 4. Configure Environment Variables
Create a `.env` file in the `backend` directory and add the following:
```env
MONGO_URI=<your_mongodb_connection_string>
JWT_SECRET=<your_jwt_secret_key>
GEMINI_API_KEY=<your_google_gemini_api_key>
YOUTUBE_API_KEY=<your_youtube_data_api_key>
```
Ensure you've obtained the necessary API keys from [Google Cloud Console](https://console.cloud.google.com/).

### 5. Run the Application
#### Start Backend
```bash
cd server
npm start
```
#### Start Frontend
```bash
cd client
npm run dev
```
Visit: `http://localhost:5173/`

---

## 📖 Usage Guide

1. **Sign Up / Sign In**: Create an account or log in.
2. **Create Course**: Navigate to "Create Course" and enter your inputs.
3. **Generate Structure**: Click "Create Course" to auto-generate chapters.
4. **Review & Edit**: Adjust chapter titles, summaries, and durations.
5. **Generate Content**: Use the AI to populate chapters with full content and video tutorials.
6. **View Course**: Navigate through each chapter and access all associated resources.
7. **Browse Courses**: All your courses are available on the dashboard.
8. **Logout**: Securely end your session.

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).

---

**Developed by Aditya Dutt**
