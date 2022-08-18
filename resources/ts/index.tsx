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
import App from "./App";

ReactDOM.render(
    <RecoilRoot>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </RecoilRoot>,
    document.getElementById("app")
);
