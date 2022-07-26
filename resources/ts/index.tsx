import "../js/bootstrap";
import "../css/app.css";
import React from "react";
import App from "./App"
import { createRoot } from 'react-dom/client';


const container = document.getElementById('app') as HTMLInputElement;
const root = createRoot(container);
root.render(<App />);
