# LinkLounge Frontend

The frontend for the **LinkLounge** project, built with **React**. This component of the project provides a seamless and visually appealing interface for users to interact with their lounges.

## About the Project
This project is a personal endeavor developed solely by me, Noah Park-Nguyen. The frontend complements the backend **LinkLounge API** and showcases my skills in designing and developing modern web interfaces.

## Features
- **User Authentication**:
  - Login and sign-up functionality.
  - Secure session management integrated with the backend API.
- **Customizable Lounges**:
  - Create and manage personal lounges with links, images, and social media profiles.
  - Dynamic drag-and-drop image upload and customization.
- **Responsive Design**:
  - Fully responsive layout optimized for phones, tablets, and desktops.
- **Feedback System**:
  - Users can provide feedback to help improve the platform.
- **Themes and Styling**:
  - Tailored to the **LinkLounge** theme using a custom Tailwind CSS palette.

## Technologies Used
- **React**: For building dynamic and interactive user interfaces.
- **Tailwind CSS**: For modern, responsive, and consistent styling.
- **Axios**: For making API requests to the backend.
- **React Router**: For handling client-side routing.
- **Cloudinary**: For hosting user-uploaded images.

## Getting Started

### Prerequisites
Ensure you have the following installed on your system:
- [Node.js](https://nodejs.org/) (version 14 or later recommended)
- [npm](https://www.npmjs.com/)

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/sereneprince/LinkLounge-Frontend.git
   cd LinkLounge-Frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the project root and configure the following variables:
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

## Folder Structure
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

## Deployment
### To Deploy Locally
- Use tools like [Postman](https://www.postman.com/) or the browser developer console to test interactions with the backend API.

### To Deploy to Production
1. Build the production-ready frontend:
   ```bash
   npm run build
   ```
2. Deploy the `build` folder to a hosting service like [Netlify](https://www.netlify.com/) or [Vercel](https://vercel.com/).
3. Configure environment variables in the hosting platform.

## Live Demo
A live demo of the project can be accessed at:
[linklounge.com]((https://linklounge-2inr.onrender.com))

## Showcase and Contact
This project serves as a showcase of my frontend development skills. If you have any questions or feedback, feel free to contact me through my [portfolio](https://yourportfolio.com).

## License
This project is proprietary and developed solely by me, Noah Park-Nguyen. No part of this project may be reused, modified, or distributed without explicit permission.

