import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EventManager = () => {
    const [events, setEvents] = useState([]);
    const [formData, setFormData] = useState({
        title: '',
        date: '',
        image: null
    });
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [isEventModalOpen, setIsEventModalOpen] = useState(false);
    const [isGalleryModalOpen, setIsGalleryModalOpen] = useState(false);
    const [galleryImages, setGalleryImages] = useState([]);
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/events');
            setEvents(response.data);
        } catch (error) {
            console.error('Error fetching events:', error);
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
        data.append('date', formData.date);
        if (formData.image) {
            data.append('image', formData.image);
        }

        try {
            await axios.post('http://localhost:3000/api/events', data, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            fetchEvents();
            resetForm();
            setIsEventModalOpen(false);
        } catch (error) {
            console.error('Error creating event:', error);
        }
    };

    const resetForm = () => {
        setFormData({
            title: '',
            date: '',
            image: null
        });
    };

    // Gallery Logic
    const openGalleryManager = async (event) => {
        setSelectedEvent(event);
        setIsGalleryModalOpen(true);
        fetchGalleryImages(event._id);
    };

    const fetchGalleryImages = async (eventId) => {
        try {
            const response = await axios.get(`http://localhost:3000/api/events/${eventId}/images`);
            setGalleryImages(response.data);
        } catch (error) {
            console.error('Error fetching gallery images:', error);
        }
    };

    const handleGalleryUpload = async (e) => {
        const files = Array.from(e.target.files);
        if (files.length === 0) return;

        const data = new FormData();
        files.forEach(file => {
            data.append('images', file);
        });

        setUploading(true);
        try {
            await axios.post(`http://localhost:3000/api/events/${selectedEvent._id}/images`, data, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            fetchGalleryImages(selectedEvent._id);
        } catch (error) {
            console.error('Error uploading gallery images:', error);
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Event Manager</h1>
                <button
                    onClick={() => { resetForm(); setIsEventModalOpen(true); }}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    Add Event
                </button>
            </div>

            {/* Event List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {events.map((event) => (
                    <div key={event._id} className="bg-white border rounded shadow p-4">
                        {event.imageUrl && (
                            <img src={`http://localhost:3000${event.imageUrl}`} alt={event.title} className="w-full h-48 object-cover rounded mb-4" />
                        )}
                        <h2 className="text-xl font-bold mb-2">{event.title}</h2>
                        <p className="text-gray-600 mb-4">{new Date(event.date).toLocaleDateString()}</p>
                        <button
                            onClick={() => openGalleryManager(event)}
                            className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-900 w-full"
                        >
                            Manage Gallery Images
                        </button>
                    </div>
                ))}
            </div>

            {/* Create Event Modal */}
            {isEventModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-lg w-full max-w-md">
                        <h2 className="text-xl font-bold mb-4">Add Event</h2>
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
                                <label className="block text-sm font-medium mb-1">Date</label>
                                <input
                                    type="date"
                                    name="date"
                                    value={formData.date}
                                    onChange={handleInputChange}
                                    className="w-full border p-2 rounded"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Thumbnail Image</label>
                                <input
                                    type="file"
                                    onChange={handleFileChange}
                                    className="w-full border p-2 rounded"
                                />
                            </div>
                            <div className="flex justify-end space-x-2">
                                <button
                                    type="button"
                                    onClick={() => setIsEventModalOpen(false)}
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

            {/* Gallery Manager Modal */}
            {isGalleryModalOpen && selectedEvent && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-lg w-full max-w-4xl h-[80vh] overflow-y-auto">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold">Manage Images for {selectedEvent.title}</h2>
                            <button
                                onClick={() => setIsGalleryModalOpen(false)}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                Close
                            </button>
                        </div>
                        
                        <div className="mb-6">
                            <label className="block text-sm font-medium mb-2">Upload Images (Select Multiple)</label>
                            <input
                                type="file"
                                multiple
                                onChange={handleGalleryUpload}
                                className="w-full border p-2 rounded"
                                disabled={uploading}
                            />
                            {uploading && <p className="text-blue-500 mt-2">Uploading...</p>}
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {galleryImages.map((img) => (
                                <div key={img._id} className="border rounded p-2">
                                    <img src={`http://localhost:3000${img.fileUrl}`} alt="Gallery" className="w-full h-32 object-cover rounded" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EventManager;
