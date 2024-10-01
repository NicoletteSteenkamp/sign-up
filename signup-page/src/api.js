import axios from 'axios';

// Use the deployed API URL
const API_URL = 'https://sign-up-t5un.onrender.com/api';

// Create an Axios instance for the API
const api = axios.create({
    baseURL: API_URL, // Using the deployed URL
    headers: {
        'Content-Type': 'application/json',
    },
});

// Fetch data function
export const fetchData = async (endpoint) => {
    try {
        const response = await api.get(endpoint); // Make the request to the specified endpoint
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error; // Rethrow the error to handle it later
    }
};

// Export the Axios instance for other API calls
export default api;
