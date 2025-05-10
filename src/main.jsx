import ShopcontextProvider from "./Context/Shopcontext.jsx";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
// import Latestcollection from "./Components/Latestcollection.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ShopcontextProvider>
      {/* <Latestcollection /> */}
      <App />
    </ShopcontextProvider>
  </BrowserRouter>
);
