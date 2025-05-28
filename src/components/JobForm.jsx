import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const JobForm = () => {
    const navigate = useNavigate();
    const [jobData, setJobData] = useState({
        title: '',
        company: '',
        type: '',
        location: '',
        description: ''
    });
    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const newErrors = {};
        
        // Title validation
        if (!jobData.title.trim()) {
            newErrors.title = 'Title is required';
        } else if (jobData.title.length < 3) {
            newErrors.title = 'Title must be at least 3 characters long';
        }

        // Company validation
        if (!jobData.company.trim()) {
            newErrors.company = 'Company name is required';
        }

        // Type validation
        if (!jobData.type) {
            newErrors.type = 'Please select a job type';
        }

        // Location validation
        if (!jobData.location.trim()) {
            newErrors.location = 'Location is required';
        }

        // Description validation
        if (!jobData.description.trim()) {
            newErrors.description = 'Description is required';
        } else if (jobData.description.length < 20) {
            newErrors.description = 'Description must be at least 20 characters long';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
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

            if (response.ok) {
                navigate('/');
            } else {
                const data = await response.json();
                setErrors(data.errors || { submit: 'Failed to add job' });
            }
        } catch (error) {
            setErrors({ submit: 'Error submitting form' });
        }
    };

    const handleChange = (e) => {
        setJobData({ ...jobData, [e.target.name]: e.target.value });
        // Clear error when user starts typing
        if (errors[e.target.name]) {
            setErrors({ ...errors, [e.target.name]: '' });
        }
    };

    return (
        <div className="job-form-container">
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Job Title</label>
                    <input 
                        type="text" 
                        name="title" 
                        className={`form-control ${errors.title ? 'error' : ''}`}
                        value={jobData.title} 
                        onChange={handleChange} 
                        required 
                        
                    />
                    {errors.title && <span className="error-message">{errors.title}</span>}
                </div>
                <div className="form-group">
                    <label>Company Name</label>
                    <input 
                        type="text" 
                        name="company" 
                        className={`form-control ${errors.company ? 'error' : ''}`}
                        value={jobData.company} 
                        onChange={handleChange} 
                        required 
                
                    />
                    {errors.company && <span className="error-message">{errors.company}</span>}
                </div>
                <div className="form-group">
                    <label>Job Type</label>
                    <select 
                        name="type" 
                        className={`form-control ${errors.type ? 'error' : ''}`}
                        value={jobData.type} 
                        onChange={handleChange} 
                        required
                    >
                        <option value="">Select Type</option>
                        <option value="Full-time">Full-time</option>
                        <option value="Part-time">Part-time</option>
                    </select>
                    {errors.type && <span className="error-message">{errors.type}</span>}
                </div>
                <div className="form-group">
                    <label>Location</label>
                    <input 
                        type="text" 
                        name="location" 
                        className={`form-control ${errors.location ? 'error' : ''}`}
                        value={jobData.location} 
                        onChange={handleChange} 
                        required 
                        
                    />
                    {errors.location && <span className="error-message">{errors.location}</span>}
                </div>
                <div className="form-group">
                    <label>Description</label>
                    <textarea 
                        name="description" 
                        className={`form-control ${errors.description ? 'error' : ''}`}
                        value={jobData.description} 
                        onChange={handleChange} 
                        required 
                        placeholder="Describe "
                    />
                    {errors.description && <span className="error-message">{errors.description}</span>}
                </div>
                {errors.submit && <div className="error-message">{errors.submit}</div>}
                <button type="submit" className="submit-button">
                    Post Job
                </button>
            </form>
        </div>
    );
};

export default JobForm;