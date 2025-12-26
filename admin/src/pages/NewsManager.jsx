import React, { useState, useEffect } from 'react';
import axios from 'axios';

const NewsManager = () => {
    const [news, setNews] = useState([]);
    const [formData, setFormData] = useState({
        title: '',
        datePublished: '',
        discription: '',
        link: '',
        image: null
    });
    const [editingId, setEditingId] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        fetchNews();
    }, []);

    const fetchNews = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/news');
            setNews(response.data);
        } catch (error) {
            console.error('Error fetching news:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, image: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append('title', formData.title);
        data.append('datePublished', formData.datePublished);
        data.append('discription', formData.discription);
        data.append('link', formData.link);
        if (formData.image) {
            data.append('image', formData.image);
        }

        try {
            if (editingId) {
                await axios.put(`http://localhost:3000/api/news/${editingId}`, data, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
            } else {
                await axios.post('http://localhost:3000/api/news', data, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
            }
            fetchNews();
            resetForm();
            setIsModalOpen(false);
        } catch (error) {
            console.error('Error saving news:', error);
        }
    };

    const handleEdit = (item) => {
        setEditingId(item._id);
        setFormData({
            title: item.title,
            datePublished: item.datePublished.split('T')[0],
            discription: item.discription || '',
            link: item.link,
            image: null
        });
        setIsModalOpen(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this news?')) {
            try {
                await axios.delete(`http://localhost:3000/api/news/${id}`);
                fetchNews();
            } catch (error) {
                console.error('Error deleting news:', error);
            }
        }
    };

    const resetForm = () => {
        setFormData({
            title: '',
            datePublished: '',
            discription: '',
            link: '',
            image: null
        });
        setEditingId(null);
    };

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">News & Media Manager</h1>
                <button
                    onClick={() => { resetForm(); setIsModalOpen(true); }}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    Add News
                </button>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-lg w-full max-w-md">
                        <h2 className="text-xl font-bold mb-4">{editingId ? 'Edit News' : 'Add News'}</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Title</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleInputChange}
                                    className="w-full border p-2 rounded"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Date Published</label>
                                <input
                                    type="date"
                                    name="datePublished"
                                    value={formData.datePublished}
                                    onChange={handleInputChange}
                                    className="w-full border p-2 rounded"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Description</label>
                                <textarea
                                    name="discription"
                                    value={formData.discription}
                                    onChange={handleInputChange}
                                    className="w-full border p-2 rounded"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Link</label>
                                <input
                                    type="url"
                                    name="link"
                                    value={formData.link}
                                    onChange={handleInputChange}
                                    className="w-full border p-2 rounded"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Image</label>
                                <input
                                    type="file"
                                    onChange={handleFileChange}
                                    className="w-full border p-2 rounded"
                                />
                            </div>
                            <div className="flex justify-end space-x-2">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="bg-gray-300 px-4 py-2 rounded"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                                >
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border rounded">
                    <thead>
                        <tr className="bg-gray-100 border-b">
                            <th className="py-2 px-4 text-left">Date</th>
                            <th className="py-2 px-4 text-left">Title</th>
                            <th className="py-2 px-4 text-left">Link</th>
                            <th className="py-2 px-4 text-left">Image</th>
                            <th className="py-2 px-4 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {news.map((item) => (
                            <tr key={item._id} className="border-b hover:bg-gray-50">
                                <td className="py-2 px-4">{new Date(item.datePublished).toLocaleDateString()}</td>
                                <td className="py-2 px-4">{item.title}</td>
                                <td className="py-2 px-4">
                                    <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                                        View
                                    </a>
                                </td>
                                <td className="py-2 px-4">
                                    {item.imageUrl && (
                                        <img src={`http://localhost:3000${item.imageUrl}`} alt={item.title} className="h-10 w-10 object-cover rounded" />
                                    )}
                                </td>
                                <td className="py-2 px-4 space-x-2">
                                    <button
                                        onClick={() => handleEdit(item)}
                                        className="text-blue-600 hover:text-blue-800"
                                    >
                                        Edit
                                    </button>
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

export default NewsManager;
