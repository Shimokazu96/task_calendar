import "../js/bootstrap";
import "../css/app.css";

// import React from "react";
// import App from "./App"
// import { createRoot } from 'react-dom/client';

// const container = document.getElementById('app') as HTMLInputElement;
// const root = createRoot(container);
// root.render(<App />);
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, Zoom } from 'react-toastify';
import App from "./App";

ReactDOM.render(
    <RecoilRoot>
        <ToastContainer />
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </RecoilRoot>,
    document.getElementById("app")
);
