import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import JobDetails from '../components/JobDetails';
import LoadingSpinner from '../components/LoadingSpinner';

const JobView = () => {
    const { id } = useParams();
    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchJob = async () => {
            try {
                const response = await fetch(`/api/jobs/${id}`);
                const data = await response.json();
                setJob(data);
            } catch (error) {
                console.error('Error fetching job:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchJob();
    }, [id]);

    if (loading) return <LoadingSpinner />;

    return (
        <div>
            {job ? <JobDetails job={job} /> : <div>Job not found</div>}
        </div>
    );
};

export default JobView;