import { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Editor } from '@tinymce/tinymce-react';
import { getBlog, createBlog, updateBlog } from '../services/api';

const BlogEditor = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEditMode = !!id;
    const editorRef = useRef(null);

    const [formData, setFormData] = useState({
        title: '',
        content: '',
        featuredImage: '',
        category: '',
        tags: '',
        authorName: 'DU Digital Global'
    });
    const [loading, setLoading] = useState(false);
    const [initialLoading, setInitialLoading] = useState(isEditMode);

    useEffect(() => {
        if (isEditMode) {
            fetchBlogDetails();
        }
    }, [id]);

    const fetchBlogDetails = async () => {
        try {
            const data = await getBlog(id);
            setFormData({
                title: data.title,
                content: data.content,
                featuredImage: data.featuredImage || '',
                category: data.category || '',
                tags: data.tags ? data.tags.join(', ') : '',
                authorName: data.author?.name || 'DU Digital Global'
            });
        } catch (error) {
            console.error('Error fetching blog details:', error);
            alert('Failed to load blog details');
            navigate('/blogs');
        } finally {
            setInitialLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const blogData = {
            ...formData,
            content: editorRef.current ? editorRef.current.getContent() : formData.content,
            author: { name: formData.authorName },
            tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
        };

        try {
            if (isEditMode) {
                await updateBlog(id, blogData);
                alert('Blog updated successfully');
            } else {
                await createBlog(blogData);
                alert('Blog created successfully');
            }
            navigate('/blogs');
        } catch (error) {
            console.error('Error saving blog:', error);
            alert('Failed to save blog');
        } finally {
            setLoading(false);
        }
    };

    const inputStyle = {
        width: '100%',
        padding: '0.75rem',
        marginBottom: '1rem',
        border: '1px solid #ddd',
        borderRadius: '4px',
        fontSize: '1rem'
    };

    const labelStyle = { display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' };

    if (initialLoading) return <p style={{ padding: '2rem' }}>Loading blog details...</p>;

    return (
        <div style={{ padding: '2rem', maxWidth: '1000px', margin: '0 auto' }}>
            <h2 style={{ marginBottom: '2rem', color: '#333' }}>
                {isEditMode ? 'Edit Blog' : 'Create New Blog'}
            </h2>

            <form onSubmit={handleSubmit}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div>
                        <label style={labelStyle}>Title *</label>
                        <input
                            type="text"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            style={inputStyle}
                            required
                        />
                    </div>
                    <div>
                        <label style={labelStyle}>Category</label>
                        <input
                            type="text"
                            value={formData.category}
                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                            style={inputStyle}
                            placeholder="e.g. Visa, Business"
                        />
                    </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div>
                        <label style={labelStyle}>Featured Image URL</label>
                        <input
                            type="text"
                            value={formData.featuredImage}
                            onChange={(e) => setFormData({ ...formData, featuredImage: e.target.value })}
                            style={inputStyle}
                            placeholder="https://..."
                        />
                    </div>
                    <div>
                        <label style={labelStyle}>Author Name</label>
                        <input
                            type="text"
                            value={formData.authorName}
                            onChange={(e) => setFormData({ ...formData, authorName: e.target.value })}
                            style={inputStyle}
                        />
                    </div>
                </div>

                <div>
                    <label style={labelStyle}>Tags (comma separated)</label>
                    <input
                        type="text"
                        value={formData.tags}
                        onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                        style={inputStyle}
                        placeholder="e.g. Visa, UK, Travel"
                    />
                </div>

                <div style={{ marginBottom: '2rem' }}>
                    <label style={labelStyle}>Content *</label>
                    <Editor
                        apiKey='no-api-key' // Working without key shows warning but works for dev
                        onInit={(evt, editor) => editorRef.current = editor}
                        initialValue={formData.content}
                        init={{
                            height: 500,
                            menubar: true,
                            plugins: [
                                'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                                'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                                'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                            ],
                            toolbar: 'undo redo | blocks | ' +
                                'bold italic forecolor | alignleft aligncenter ' +
                                'alignright alignjustify | bullist numlist outdent indent | ' +
                                'removeformat | help',
                            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                        }}
                    />
                </div>

                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                    <button
                        type="button"
                        onClick={() => navigate('/blogs')}
                        style={{
                            padding: '0.75rem 1.5rem',
                            backgroundColor: '#6c757d',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer'
                        }}
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={loading}
                        style={{
                            padding: '0.75rem 1.5rem',
                            backgroundColor: '#28a745',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            minWidth: '120px'
                        }}
                    >
                        {loading ? 'Saving...' : 'Save Blog'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default BlogEditor;
