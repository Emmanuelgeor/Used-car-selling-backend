import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./views/Login.js";

const App = () => {
    return (
        <Router>
            <Routes>
                {/* Define the Login route */}
                <Route path="/" element={<Login />} />

                

            
            </Routes>
        </Router>
    );
};

export default App;
