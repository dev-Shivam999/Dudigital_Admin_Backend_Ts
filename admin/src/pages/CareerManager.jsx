import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CareerManager = () => {
    const [careers, setCareers] = useState([]);
    const [formData, setFormData] = useState({
        title: '',
        location: '',
        department: '',
        experience: '',
        jobType: '',
        description: '',
        responsibilities: '',
        qualifications: ''
    });
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        fetchCareers();
    }, []);

    const fetchCareers = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/careers');
            setCareers(response.data);
        } catch (error) {
            console.error('Error fetching careers:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            ...formData,
            responsibilities: formData.responsibilities.split('\n').filter(line => line.trim() !== ''),
            qualifications: formData.qualifications.split('\n').filter(line => line.trim() !== '')
        };

        try {
            await axios.post('http://localhost:3000/api/careers', data);
            fetchCareers();
            resetForm();
            setIsModalOpen(false);
        } catch (error) {
            console.error('Error creating career:', error);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this job posting?')) {
            try {
                await axios.delete(`http://localhost:3000/api/careers/${id}`);
                fetchCareers();
            } catch (error) {
                console.error('Error deleting career:', error);
            }
        }
    };

    const resetForm = () => {
        setFormData({
            title: '',
            location: '',
            department: '',
            experience: '',
            jobType: '',
            description: '',
            responsibilities: '',
            qualifications: ''
        });
    };

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Career & Vacancy Manager</h1>
                <button
                    onClick={() => { resetForm(); setIsModalOpen(true); }}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    Add Job Post
                </button>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-lg w-full max-w-2xl h-[90vh] overflow-y-auto">
                        <h2 className="text-xl font-bold mb-4">Add Job Vacancy</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Job Title</label>
                                    <input type="text" name="title" value={formData.title} onChange={handleInputChange} className="w-full border p-2 rounded" required />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Location</label>
                                    <input type="text" name="location" value={formData.location} onChange={handleInputChange} className="w-full border p-2 rounded" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Department</label>
                                    <input type="text" name="department" value={formData.department} onChange={handleInputChange} className="w-full border p-2 rounded" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Experience</label>
                                    <input type="text" name="experience" value={formData.experience} onChange={handleInputChange} className="w-full border p-2 rounded" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Job Type</label>
                                    <input type="text" name="jobType" value={formData.jobType} onChange={handleInputChange} className="w-full border p-2 rounded" placeholder="Full Time / Part Time" />
                                </div>
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium mb-1">Description</label>
                                <textarea name="description" value={formData.description} onChange={handleInputChange} className="w-full border p-2 rounded h-24" />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">Responsibilities (One per line)</label>
                                <textarea name="responsibilities" value={formData.responsibilities} onChange={handleInputChange} className="w-full border p-2 rounded h-32" placeholder="- Task 1\n- Task 2" />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">Qualifications (One per line)</label>
                                <textarea name="qualifications" value={formData.qualifications} onChange={handleInputChange} className="w-full border p-2 rounded h-32" placeholder="- Skill 1\n- Skill 2" />
                            </div>

                            <div className="flex justify-end space-x-2">
                                <button type="button" onClick={() => setIsModalOpen(false)} className="bg-gray-300 px-4 py-2 rounded">Cancel</button>
                                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Save</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border rounded">
                    <thead>
                        <tr className="bg-gray-100 border-b">
                            <th className="py-2 px-4 text-left">Title</th>
                            <th className="py-2 px-4 text-left">Department</th>
                            <th className="py-2 px-4 text-left">Location</th>
                            <th className="py-2 px-4 text-left">Type</th>
                            <th className="py-2 px-4 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {careers.map((item) => (
                            <tr key={item._id} className="border-b hover:bg-gray-50">
                                <td className="py-2 px-4 font-medium">{item.title}</td>
                                <td className="py-2 px-4">{item.department}</td>
                                <td className="py-2 px-4">{item.location}</td>
                                <td className="py-2 px-4">{item.jobType}</td>
                                <td className="py-2 px-4">
                                    <button
                                        onClick={() => handleDelete(item._id)}
                                        className="text-red-600 hover:text-red-800"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default CareerManager;
