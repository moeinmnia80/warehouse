import App from "@/App.tsx";
import { StrictMode } from "react";
import { Provider } from "react-redux";
import { store } from "@/store/redux/store";
import { BrowserRouter } from "react-router";
import { createRoot } from "react-dom/client";
import { GoogleOAuthProvider } from "@react-oauth/google";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
        <Provider store={store}>
          <App />
        </Provider>
      </GoogleOAuthProvider>
      ,
    </BrowserRouter>
  </StrictMode>,
);
