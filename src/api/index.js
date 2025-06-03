const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Helper function to handle API calls
const apiCall = async (endpoint, options = {}) => {
    try {
        const response = await fetch(`${API_URL}${endpoint}`, {
            ...options,
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                ...options.headers
            }
        });

        if (!response.ok) {
            if (response.status === 401) {
                // Handle unauthorized - redirect to login
                window.location.href = '/login';
                return null;
            }
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('API call error:', error);
        throw error;
    }
};

// Auth API calls
export const login = async (credentials) => {
    return apiCall('/auth/login', {
        method: 'POST',
        body: JSON.stringify(credentials)
    });
};

export const register = async (userData) => {
    return apiCall('/auth/register', {
        method: 'POST',
        body: JSON.stringify(userData)
    });
};

export const logout = async () => {
    return apiCall('/auth/logout', {
        method: 'GET'
    });
};

export const checkAuth = async () => {
    return apiCall('/auth/check', {
        method: 'GET'
    });
};

// Jobs API calls
export const fetchJobs = async () => {
    const response = await apiCall('/jobs');
    return response?.data || [];
};

export const fetchJobById = async (id) => {
    const response = await apiCall(`/jobs/${id}`);
    return response?.data;
};

export const createJob = async (jobData) => {
    return apiCall('/jobs', {
        method: 'POST',
        body: JSON.stringify(jobData)
    });
};

export const updateJob = async (id, jobData) => {
    return apiCall(`/jobs/${id}`, {
        method: 'PUT',
        body: JSON.stringify(jobData)
    });
};

export const deleteJob = async (id) => {
    return apiCall(`/jobs/${id}`, {
        method: 'DELETE'
    });
};