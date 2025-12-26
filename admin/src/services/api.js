import axios from 'axios';

const API_URL_INVESTOR = 'http://localhost:3000/api/investor';
const API_URL_OFFICE = 'http://localhost:3000/api/office';
const API_URL_CONTACT = 'http://localhost:3000/api/contact';
const API_URL_PARTNER = 'http://localhost:3000/api/partner';
const API_URL_GALLERY = 'http://localhost:3000/api/gallery';

// --- Investor Relations ---
export const getStats = async () => {
    const response = await axios.get(`${API_URL_INVESTOR}/stats`);
    return response.data;
};

export const getCategories = async () => {
    const response = await axios.get(`${API_URL_INVESTOR}/categories`);
    return response.data;
};

export const createReport = async (formData) => {
    const response = await axios.post(`${API_URL_INVESTOR}/report`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
};

export const getReportsByCategory = async (slug, isAdmin = true) => {
    const response = await axios.get(`${API_URL_INVESTOR}/category/${slug}?isAdmin=${isAdmin}`);
    return response.data;
};

export const deleteReport = async (id) => {
    const response = await axios.delete(`${API_URL_INVESTOR}/report/${id}`);
    return response.data;
};

// --- Office Locations ---

export const getOfficeTypes = async () => {
    const response = await axios.get(`${API_URL_OFFICE}/types`);
    return response.data;
};

export const createOfficeType = async (data) => {
    const response = await axios.post(`${API_URL_OFFICE}/types`, data);
    return response.data;
};

export const deleteOfficeType = async (id) => {
    const response = await axios.delete(`${API_URL_OFFICE}/types/${id}`);
    return response.data;
};

export const getLocations = async (typeId = '') => {
    const response = await axios.get(`${API_URL_OFFICE}/locations${typeId ? `?typeId=${typeId}` : ''}`);
    return response.data;
};

export const createLocation = async (data) => {
    const response = await axios.post(`${API_URL_OFFICE}/locations`, data);
    return response.data;
};

export const deleteLocation = async (id) => {
    const response = await axios.delete(`${API_URL_OFFICE}/locations/${id}`);
    return response.data;
};

// --- Contact Inquiries ---

export const getInquiries = async () => {
    const response = await axios.get(`${API_URL_CONTACT}`);
    return response.data;
};

export const getContactStats = async () => {
    const response = await axios.get(`${API_URL_CONTACT}/stats`);
    return response.data;
};

// --- Partner Program ---

export const getPartnerRequests = async () => {
    const response = await axios.get(`${API_URL_PARTNER}`);
    return response.data;
};

export const getPartnerStats = async () => {
    const response = await axios.get(`${API_URL_PARTNER}/stats`);
    return response.data;
};

// --- Gallery ---

export const getImages = async () => {
    const response = await axios.get(`${API_URL_GALLERY}`);
    return response.data;
};

export const uploadImage = async (formData) => {
    const response = await axios.post(`${API_URL_GALLERY}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
};

export const deleteImage = async (id) => {
    const response = await axios.delete(`${API_URL_GALLERY}/${id}`);
    return response.data;
};

// Add updateReport if needed
