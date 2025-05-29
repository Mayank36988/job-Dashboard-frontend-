import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Home from './pages/Home';
import AddJob from './pages/AddJob';
import JobView from './pages/JobView';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';

// Add this line to verify API URL
console.log('API URL:', process.env.REACT_APP_API_URL);

const App = () => {
    return (
        <Router>
            <div className="app-container">
                <nav className="navbar">
                    <Link to="/">Home</Link>
                    <Link to="/add-job">Add Job</Link>
                </nav>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/add-job" element={<AddJob />} />
                    <Route path="/job/:id" element={<JobView />} />
                </Routes>
                <ToastContainer />
            </div>
        </Router>
    );
};

export default App;