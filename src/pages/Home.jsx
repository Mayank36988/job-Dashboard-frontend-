import React, { useEffect, useState } from 'react';
import JobCard from '../components/JobCard';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Home = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchType, setSearchType] = useState('title'); // 'title' or 'location'

    useEffect(() => {
        fetchJobs();
    }, []);

    const fetchJobs = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/jobs`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setJobs(data);
        } catch (error) {
            console.error('Error fetching jobs:', error);
        } finally {
            setLoading(false);
        }
    };

    const filteredJobs = jobs.filter(job => {
        const searchLower = searchTerm.toLowerCase();
        if (searchType === 'title') {
            return job.title.toLowerCase().includes(searchLower);
        } else {
            return job.location.toLowerCase().includes(searchLower);
        }
    });

    const handleDeleteJob = (jobId) => {
        setJobs(jobs.filter(job => job._id !== jobId));
    };

    return (
        <div className="home-container">
            <ToastContainer />
            <div className="home-header">
                <h1>Available Jobs</h1>
                <p>Find your next opportunity from our list of open positions</p>
                
                {/* Search Section */}
                <div className="search-container">
                    <div className="search-type">
                        <select 
                            value={searchType}
                            onChange={(e) => setSearchType(e.target.value)}
                            className="search-select"
                        >
                            <option value="title">Search by Title</option>
                            <option value="location">Search by Location</option>
                        </select>
                    </div>
                    <input
                        type="text"
                        placeholder={`Search by ${searchType}...`}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="search-input"
                    />
                </div>
            </div>

            <div className="job-list">
                {loading ? (
                    <div className="loading">Loading jobs...</div>
                ) : filteredJobs.length > 0 ? (
                    filteredJobs.map(job => (
                        <JobCard 
                            key={job._id} 
                            job={job} 
                            onDelete={handleDeleteJob}
                        />
                    ))
                ) : (
                    <p>No jobs found matching your search.</p>
                )}
            </div>
        </div>
    );
};

export default Home;