import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const JobCard = ({ job }) => {
    const navigate = useNavigate();

    const handleApply = async (e) => {
        e.preventDefault();
        try {
            // You can either navigate to an application form
            navigate(`/job/${job._id}/apply`);
            
            // Or show a success message
            toast.success('Application submitted successfully!');
        } catch (error) {
            console.error('Error applying for job:', error);
            toast.error('Failed to apply for job');
        }
    };

    return (
        <div className="job-card">
            <Link to={`/job/${job._id}`} className="job-link">
                <h3>{job.title}</h3>
                <div className="job-info">
                    <p><strong>Company:</strong> {job.company}</p>
                    <p><strong>Location:</strong> {job.location}</p>
                    <p><strong>Type:</strong> {job.type}</p>
                </div>
            </Link>
            <button 
                className="apply-button"
                onClick={handleApply}
                aria-label="Apply for job"
            >
                Apply Now
            </button>
        </div>
    );
};

export default JobCard;