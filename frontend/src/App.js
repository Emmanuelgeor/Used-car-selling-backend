import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./views/login/login.js";
import CreateUser from "./views/createUser/createUser.js";
import CreateProfile from "./views/createProfile/createProfile.js";
import SearchAcc from "./views/searchAcc/searchAcc.js";
import SearchProfile from "./views/searchProfile/searchProfile.js";


const App = () => {
    return (
        <Router>
            <Routes>
                {/* Define the Login route */}
                <Route path="/" element={<Login />} />
                <Route path="/createUser" element={<CreateUser />} />
                <Route path="/createProfile" element={<CreateProfile />} />
                <Route path="/searchAcc" element={<SearchAcc />} />
                <Route path="/searchProfile" element={<SearchProfile />} />

                

            
            </Routes>
        </Router>
    );
};

export default App;
