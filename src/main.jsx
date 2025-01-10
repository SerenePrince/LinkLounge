// Importing necessary dependencies
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";

// Importing local files
import "./index.css"; // Global styles
import App from "./App.jsx";
import { store } from "./app/store.jsx";

import { disableReactDevTools } from "@fvilers/disable-react-devtools";

if (import.meta.env.VITE_NODE_ENV === "production") disableReactDevTools;

// Rendering the root element and wrapping the app with necessary providers
createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* Redux Provider for state management */}
    <Provider store={store}>
      {/* Router setup to handle navigation */}
      <BrowserRouter>
        <Routes>
          {/* Fallback route that renders the App component */}
          <Route path="/*" element={<App />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
