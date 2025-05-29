import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const JobDetails = () => {
    const { id } = useParams();
    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchJobDetails = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/jobs/${id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch job details');
                }
                const data = await response.json();
                setJob(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchJobDetails();
    }, [id]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!job) return <div>Job not found</div>;

    return (
        <div className="job-details-container">
            <h2>{job.title}</h2>
            <div className="job-details-info">
                <p><strong>Company:</strong> {job.company}</p>
                <p><strong>Location:</strong> {job.location}</p>
                <p><strong>Type:</strong> {job.type}</p>
                <p><strong>Description:</strong> {job.description}</p>
                <p><strong>Posted on:</strong> {new Date(job.createdAt).toLocaleDateString()}</p>
            </div>
        </div>
    );
};

export default JobDetails;