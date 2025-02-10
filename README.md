# 🌐 **LinkLounge – Personalized Link Hub**  

🚀 **Live Demo:** [**LinkLounge**](https://linklounge-2inr.onrender.com)  

LinkLounge is a **full-stack MERN application** that lets users create customizable lounges to showcase their **social media links, websites, and online profiles** in a visually appealing and responsive way.  

![LinkLounge Thumbnail](https://github.com/user-attachments/assets/cf9b5abe-e7b0-424d-bcb9-8aea423e96da)  

---

## 🎯 **About the Project**  

Developed solely by **Noah Park-Nguyen**, this project provides users with a **modern, user-friendly link management tool** while also serving as a demonstration of my full-stack development skills.  

---

## ✨ **Features**  

### **Frontend**  
✅ **User Authentication** – Secure login and sign-up with JWT authentication.  
✅ **Customizable Lounges** – Drag-and-drop image uploads, editable links, and profiles.  
✅ **Responsive Design** – Optimized for mobile, tablet, and desktop.  
✅ **Dark Mode** – Toggle between light and dark themes.  
✅ **Feedback System** – Users can provide feedback to improve the platform.  

### **Backend API**  
🔹 **User Management** – Secure storage of credentials and profile data.  
🔹 **Lounge Management** – CRUD operations for lounges and social links.  
🔹 **Image Hosting** – Cloudinary integration for seamless media uploads.  
🔹 **Secure API** – Token-based authentication with Express and MongoDB.  

---

## 🛠️ **Tech Stack**  

### **Frontend**  
- **React** – Dynamic and interactive UI  
- **Tailwind CSS** – Responsive and modern styling  
- **React Router** – Client-side navigation  
- **Axios** – API requests  
- **Cloudinary** – Image storage and management  

### **Backend**  
- **Node.js & Express.js** – REST API development  
- **MongoDB** – NoSQL database for user and lounge storage  
- **Cloudinary** – Media storage for lounge images  
- **JWT Authentication** – Secure authentication  

---

## 🚀 **Getting Started**  

### **Prerequisites**  
Ensure you have the following installed:  
- [Node.js](https://nodejs.org/) (14+ recommended)  
- [MongoDB](https://www.mongodb.com/try/download/community)  
- [Cloudinary Account](https://cloudinary.com/)  

### **Installation**  

#### **1️⃣ Clone the Repository**  

bash
git clone https://github.com/sereneprince/LinkLounge.git
cd LinkLounge



#### **2️⃣ Setup the Frontend**  

bash
cd frontend
npm install


Create a .env file in frontend/ and add:  

env
VITE_API_BASE_URL=http://localhost:5000
VITE_CLOUDINARY_URL=your-cloudinary-url


Run the frontend:  

bash
npm start


Frontend available at http://localhost:3000.  

#### **3️⃣ Setup the Backend**  

bash
cd ../backend
npm install


Create a .env file in backend/ and add:  

env
PORT=5000
MONGO_URI=your-mongodb-connection-string
CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name
CLOUDINARY_API_KEY=your-cloudinary-api-key
CLOUDINARY_API_SECRET=your-cloudinary-api-secret
JWT_SECRET=your-jwt-secret


Run the backend:  

bash
npm start


API available at http://localhost:5000.  

---

## 🔌 **API Endpoints**  

### **Authentication**  
🔑 POST /api/auth/register – Register a new user  
🔑 POST /api/auth/login – Authenticate and return a token  

### **User Management**  
👤 GET /api/users/me – Retrieve logged-in user's information  

### **Lounge Management**  
📌 POST /api/lounges – Create a new lounge  
📌 GET /api/lounges – Get all lounges  
📌 GET /api/lounges/:id – Get a lounge by ID  
📌 PUT /api/lounges/:id – Update a lounge  
📌 DELETE /api/lounges/:id – Delete a lounge  

### **Image Upload**  
🖼 POST /api/uploads – Upload an image to Cloudinary  

---

## 🌍 **Deployment**  

### **Local Deployment**  
Use tools like [Postman](https://www.postman.com/) to test API interactions.  

### **Production Deployment**  

#### **Frontend**  
1. Build the production-ready frontend:  
   

bash
   npm run build


2. Deploy the build folder to **Netlify**, **Vercel**, or similar.  

#### **Backend**  
1. Choose a hosting platform (**Heroku**, **Render**, **AWS**, etc.).  
2. Configure environment variables.  
3. Deploy the server.  

---

## 📌 **Why I Built This**  

This project is a **showcase of my full-stack skills** while providing a practical tool for users to organize and share their online presence.  

---

## 🎯 **Future Enhancements**  

🚀 **Custom Domains** – Allow users to link personal domains.  
🚀 **Analytics Dashboard** – Track link clicks and lounge views.  
🚀 **More Themes** – Expand customization options for lounges.  

---

## 💬 **Feedback & Contact**  

If you have suggestions or questions, feel free to reach out via my **[portfolio](https://sereneprince.github.io/noahpn/)**.  

📧 **Email:** noah@example.com  

---

## ⚖️ **License**  

This project is proprietary and developed solely by **Noah Park-Nguyen**. No part of this project may be reused, modified, or distributed without explicit permission.
