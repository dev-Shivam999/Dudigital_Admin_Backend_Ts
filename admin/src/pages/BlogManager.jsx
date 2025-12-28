import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getBlogs, deleteBlog } from '../services/api';

const BlogManager = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const limit = 10;

    useEffect(() => {
        fetchBlogs();
    }, [page]);

    const fetchBlogs = async () => {
        setLoading(true);
        try {
            const data = await getBlogs(page, limit);
            setBlogs(data.blogs);
            setTotalPages(data.totalPages);
        } catch (error) {
            console.error('Error fetching blogs:', error);
            alert('Failed to fetch blogs');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this blog?')) return;
        try {
            await deleteBlog(id);
            alert('Blog deleted successfully');
            fetchBlogs();
        } catch (error) {
            console.error('Error deleting blog:', error);
            alert('Failed to delete blog');
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString();
    };

    return (
        <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h2 style={{ fontSize: '1.8rem', color: '#333' }}>Blog Management</h2>
                <Link
                    to="/blogs/new"
                    style={{
                        padding: '0.5rem 1rem',
                        backgroundColor: '#007bff',
                        color: 'white',
                        textDecoration: 'none',
                        borderRadius: '4px'
                    }}
                >
                    + Add New Blog
                </Link>
            </div>

            {loading ? (
                <p>Loading...</p>
            ) : (
                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                        <thead>
                            <tr style={{ borderBottom: '2px solid #ddd', backgroundColor: '#f8f9fa' }}>
                                <th style={{ padding: '1rem' }}>Title</th>
                                <th style={{ padding: '1rem' }}>Category</th>
                                <th style={{ padding: '1rem' }}>Author</th>
                                <th style={{ padding: '1rem' }}>Published</th>
                                <th style={{ padding: '1rem', textAlign: 'center' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {blogs.length > 0 ? (
                                blogs.map((blog) => (
                                    <tr key={blog._id} style={{ borderBottom: '1px solid #eee' }}>
                                        <td style={{ padding: '1rem' }}>{blog.title}</td>
                                        <td style={{ padding: '1rem' }}>{blog.category || '-'}</td>
                                        <td style={{ padding: '1rem' }}>{blog.author?.name || '-'}</td>
                                        <td style={{ padding: '1rem' }}>{formatDate(blog.publishedAt)}</td>
                                        <td style={{ padding: '1rem', textAlign: 'center' }}>
                                            <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem' }}>
                                                <Link
                                                    to={`/blogs/edit/${blog._id}`}
                                                    style={{
                                                        padding: '0.25rem 0.5rem',
                                                        backgroundColor: '#ffc107',
                                                        color: '#000',
                                                        textDecoration: 'none',
                                                        borderRadius: '4px',
                                                        fontSize: '0.9rem'
                                                    }}
                                                >
                                                    Edit
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(blog._id)}
                                                    style={{
                                                        padding: '0.25rem 0.5rem',
                                                        backgroundColor: '#dc3545',
                                                        color: 'white',
                                                        border: 'none',
                                                        borderRadius: '4px',
                                                        cursor: 'pointer',
                                                        fontSize: '0.9rem'
                                                    }}
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" style={{ padding: '2rem', textAlign: 'center' }}>No blogs found.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem', gap: '0.5rem' }}>
                    <button
                        onClick={() => setPage(page - 1)}
                        disabled={page === 1}
                        style={{ padding: '0.5rem 1rem', cursor: 'pointer', disabled: page === 1 }}
                    >
                        Prev
                    </button>
                    <span style={{ padding: '0.5rem 1rem', border: '1px solid #ddd' }}>
                        Page {page} of {totalPages}
                    </span>
                    <button
                        onClick={() => setPage(page + 1)}
                        disabled={page === totalPages}
                        style={{ padding: '0.5rem 1rem', cursor: 'pointer', disabled: page === totalPages }}
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
};

export default BlogManager;
