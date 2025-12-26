import { useState, useEffect } from 'react';
import { getInquiries } from '../services/api';
import { Mail, CheckCircle, XCircle } from 'lucide-react';

const ContactManager = () => {
    const [inquiries, setInquiries] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchInquiries();
    }, []);

    const fetchInquiries = async () => {
        try {
            const data = await getInquiries();
            setInquiries(data);
        } catch (error) {
            console.error("Error fetching inquiries", error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div style={{ padding: '2rem' }}>Loading Inquiries...</div>;

    return (
        <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
            <h1>Contact Inquiries</h1>
            {inquiries.length === 0 ? (
                <p>No inquiries found.</p>
            ) : (
                <div style={{ display: 'grid', gap: '1rem', marginTop: '1rem' }}>
                    {inquiries.map(inq => (
                        <div key={inq._id} style={{ padding: '1.5rem', border: '1px solid #ddd', borderRadius: '8px', backgroundColor: 'white', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>
                                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                                    <Mail size={20} color="#007bff" />
                                    <span style={{ fontWeight: 'bold' }}>{inq.fullName}</span>
                                    <span style={{ color: '#666', fontSize: '0.9rem' }}> &lt;{inq.email}&gt;</span>
                                </div>
                                <div style={{ fontSize: '0.85rem', color: '#999' }}>
                                    {new Date(inq.createdAt).toLocaleString()}
                                </div>
                            </div>
                            <div>
                                <div style={{ fontWeight: 'bold', marginBottom: '5px', fontSize: '0.9rem' }}>Message:</div>
                                <div style={{ background: '#f9f9f9', padding: '10px', borderRadius: '4px' }}>
                                    {inq.message}
                                </div>
                            </div>
                            <div style={{ display: 'flex', gap: '2rem', fontSize: '0.85rem', color: '#555' }}>
                                <span>📞 {inq.phone || 'N/A'}</span>
                                <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                    Allowed Marketing: {inq.AllowMsg ? <CheckCircle size={14} color="green"/> : <XCircle size={14} color="red"/>}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ContactManager;
