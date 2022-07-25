import "../js/bootstrap";
import "../css/app.css";

// import ReactDOM from 'react-dom/client';
// import Home from '@/pages/Home';

// ReactDOM.createRoot(document.getElementById('app')).render(
//     <Home />
// );
import React from "react";
import ReactDOM from "react-dom";

const App = () => {
    const title: string = "Laravel 9 Vite  with TypeScript React !!";
    return <h1>{title}</h1>;
};

ReactDOM.render(<App />, document.getElementById("app"));
