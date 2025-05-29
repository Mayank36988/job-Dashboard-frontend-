import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const JobForm = () => {
    const navigate = useNavigate();
    const [jobData, setJobData] = useState({
        title: '',
        company: '',
        type: 'Full-time',
        location: '',
        description: ''
    });

    const handleChange = (e) => {
        setJobData({
            ...jobData,
            [e.target.name]: e.target.value
        });
    };

    const validateForm = () => {
        // Add your form validation logic here
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }

        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/jobs`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(jobData),
            });

            if (!response.ok) {
                throw new Error('Failed to add job');
            }

            const data = await response.json();
            toast.success('Job added successfully');
            navigate('/');
        } catch (error) {
            console.error('Error adding job:', error);
            toast.error('Failed to add job');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="job-form">
            <div className="form-group">
                <label htmlFor="title">Job Title</label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    value={jobData.title}
                    onChange={handleChange}
                    required
                    className="form-control"
                />
            </div>

            <div className="form-group">
                <label htmlFor="company">Company</label>
                <input
                    type="text"
                    id="company"
                    name="company"
                    value={jobData.company}
                    onChange={handleChange}
                    required
                    className="form-control"
                />
            </div>

            <div className="form-group">
                <label htmlFor="type">Job Type</label>
                <select
                    id="type"
                    name="type"
                    value={jobData.type}
                    onChange={handleChange}
                    className="form-control"
                >
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                </select>
            </div>

            <div className="form-group">
                <label htmlFor="location">Location</label>
                <input
                    type="text"
                    id="location"
                    name="location"
                    value={jobData.location}
                    onChange={handleChange}
                    required
                    className="form-control"
                />
            </div>

            <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea
                    id="description"
                    name="description"
                    value={jobData.description}
                    onChange={handleChange}
                    required
                    className="form-control"
                    rows="5"
                />
            </div>

            <button type="submit" className="submit-button">
                Add Job
            </button>
        </form>
    );
};

export default JobForm;