---

# **LinkLounge Frontend**

The frontend for the **LinkLounge** project, built using **React**. This user interface complements the **LinkLounge API**, providing a clean, responsive platform for users to interact with their lounges.

[Try it now!](https://linklounge-2inr.onrender.com)

![loungeExample](https://github.com/user-attachments/assets/301f6177-cbf5-4df3-b949-2cd3938c582a)

---

## **About the Project**

This is a personal project developed solely by me, **Noah Park-Nguyen**. The frontend serves as a showcase of my skills in designing and developing modern web interfaces, interacting seamlessly with the **LinkLounge API**.

---

## **Features**

- **User Authentication**:  
  - Login and sign-up functionality.  
  - Secure session management integrated with the backend API.

- **Customizable Lounges**:  
  - Users can create and manage personalized lounges with links, images, and social media profiles.  
  - Dynamic drag-and-drop image upload for easy customization.

- **Responsive Design**:  
  - Fully responsive layout optimized for mobile, tablet, and desktop devices.

- **Feedback System**:  
  - Users can submit feedback to improve the platform.

- **Themes and Styling**:  
  - Tailored to the **LinkLounge** brand using a custom **Tailwind CSS** palette.

---

## **Technologies Used**

- **React**: For building dynamic user interfaces.  
- **Tailwind CSS**: For responsive and modern styling.  
- **Axios**: For API requests to the backend.  
- **React Router**: For handling client-side routing.  
- **Cloudinary**: For image hosting and media management.

---

## 🚀 **Getting Started**

### **Prerequisites**

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (version 14 or later recommended)  
- [npm](https://www.npmjs.com/)

### **Installation**

1. Clone the repository:
   ```bash
   git clone https://github.com/sereneprince/LinkLounge-Frontend.git
   cd LinkLounge-Frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables in a `.env` file:
   ```env
   VITE_NODE_ENV=development
   VITE_CLOUD_NAME=your-cloudinary-cloud-name
   VITE_API_KEY=your-cloudinary-api-key
   VITE_API_SECRET=your-cloudinary-api-secret
   VITE_CLOUDINARY_URL=your-cloudinary-url
   VITE_PROD_URL=linklounge-2inr.onrender.com
   ```

4. Start the development server:
   ```bash
   npm start
   ```
   The application will be available at `http://localhost:3000`.

---

## **Folder Structure**
```plaintext
\---src
    +---app
    |   \---api
    +---assets
    +---components
    +---config
    +---features
    |   +---auth
    |   +---lounges
    |   \---users
    +---hooks
    \---pages
```

---

## **Deployment**

### **Deploy Locally**

- Use [Postman](https://www.postman.com/) or browser dev tools to test backend interactions.

### **Deploy to Production**

1. Build the production-ready frontend:
   ```bash
   npm run build
   ```

2. Deploy to a hosting platform like [Netlify](https://www.netlify.com/) or [Vercel](https://vercel.com/).

---

## **Live Demo**

[Try LinkLounge now!](https://linklounge-2inr.onrender.com)

---

## **Showcase and Contact**

This project is a showcase of my frontend development skills. For questions or feedback, feel free to contact me.

---

## **License**

This project is proprietary and developed solely by me, **Noah Park-Nguyen**. No part of this project may be reused, modified, or distributed without explicit permission.

---
