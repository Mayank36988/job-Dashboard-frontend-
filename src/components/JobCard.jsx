import React from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const JobCard = ({ job, onDelete }) => {
    const handleDelete = async (e) => {
        e.preventDefault();
        
        if (window.confirm('Are you sure you want to delete this job?')) {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/jobs/${job._id}`, {
                    method: 'DELETE',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                toast.success('Job deleted successfully');
                onDelete(job._id);
            } catch (error) {
                console.error('Error deleting job:', error);
                toast.error(`Failed to delete job: ${error.message}`);
            }
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
                className="delete-button"
                onClick={handleDelete}
                aria-label="Delete job"
            >
                Delete Job
            </button>
        </div>
    );
};

export default JobCard;