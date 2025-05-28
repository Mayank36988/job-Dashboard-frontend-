import React from 'react';
import { Link } from 'react-router-dom';

const JobCard = ({ job }) => {
    return (
        <Link to={`/job/${job._id}`} style={{ textDecoration: 'none' }}>
            <div className="job-card">
                <h3>{job.title}</h3>
                <div className="job-card-content">
                    <p>
                        <i className="fas fa-building"></i>
                        <strong>Company:</strong> {job.company}
                    </p>
                    <p>
                        <i className="fas fa-map-marker-alt"></i>
                        <strong>Location:</strong> {job.location}
                    </p>
                    <span className="job-type-badge">
                        {job.type}
                    </span>
                </div>
            </div>
        </Link>
    );
};

export default JobCard;