import App from "@/App.tsx";
import { Provider } from "react-redux";
import { store } from "@/store/redux/store";
import { BrowserRouter } from "react-router";
import { createRoot } from "react-dom/client";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
);
