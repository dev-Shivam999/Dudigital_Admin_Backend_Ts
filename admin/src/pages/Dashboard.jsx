import { useEffect, useState } from 'react';
import { getStats, getContactStats, getPartnerStats } from '../services/api';
import { FileText, Folder, Building, MapPin, MessageSquare, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchStats() {
            try {
                const [mainStats, contactStats, partnerStats] = await Promise.all([
                    getStats(),
                    getContactStats(),
                    getPartnerStats()
                ]);
                
                // Merge stats
                setStats({
                    ...mainStats,
                    contacts: contactStats,
                    partners: partnerStats,
                });
            } catch (error) {
                console.error("Error fetching stats", error);
            } finally {
                setLoading(false);
            }
        }
        fetchStats();
    }, []);

    if (loading) return <div style={{ padding: '2rem' }}>Loading Dashboard...</div>;
    if (!stats) return <div style={{ padding: '2rem' }}>Error loading stats.</div>;

    const cards = [
        { title: "Today's Queries", count: stats.contacts?.today || 0, icon: <MessageSquare size={30} />, color: "#8e44ad" },
        { title: "Total Queries", count: stats.contacts?.total || 0, icon: <MessageSquare size={30} />, color: "#8e44ad" },
        
        { title: "Partner Requests", count: stats.partners?.total || 0, icon: <Users size={30} />, color: "#d35400" },
        
        { title: "Investor Reports", count: stats.counts?.reports || stats.counts.reports, icon: <FileText size={30} />, color: "#3498db" },
        { title: "Categories", count: stats.counts?.categories || stats.counts.categories, icon: <Folder size={30} />, color: "#f1c40f" },
        { title: "Office Types", count: stats.counts?.officeTypes || stats.counts.officeTypes, icon: <Building size={30} />, color: "#e74c3c" },
        { title: "Locations", count: stats.counts?.locations || stats.counts.locations, icon: <MapPin size={30} />, color: "#2ecc71" }
    ];

    return (
        <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
            <h1>Admin Dashboard</h1>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginTop: '1rem' }}>
                {cards.map((card, idx) => (
                    <div key={idx} style={{ 
                        padding: '1.5rem', 
                        borderRadius: '8px', 
                        boxShadow: '0 2px 5px rgba(0,0,0,0.1)', 
                        backgroundColor: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        borderLeft: `5px solid ${card.color}`
                    }}>
                        <div>
                            <div style={{ fontSize: '0.9rem', color: '#666' }}>{card.title}</div>
                            <div style={{ fontSize: '1.8rem', fontWeight: 'bold' }}>{card.count}</div>
                        </div>
                        <div style={{ color: card.color }}>{card.icon}</div>
                    </div>
                ))}
            </div>

            <div style={{ marginTop: '3rem', display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
                <div style={{ flex: 1, minWidth: '300px' }}>
                    <h3>Recent Investor Reports</h3>
                    <div style={{ background: 'white', border: '1px solid #eee', borderRadius: '8px', overflow: 'hidden' }}>
                        {stats.recentReports.length === 0 ? (
                            <div style={{ padding: '1rem' }}>No reports yet.</div>
                        ) : (
                            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                <thead style={{ background: '#f8f9fa' }}>
                                    <tr>
                                        <th style={{ padding: '10px', textAlign: 'left' }}>Title</th>
                                        <th style={{ padding: '10px', textAlign: 'left' }}>Category</th>
                                        <th style={{ padding: '10px', textAlign: 'left' }}>Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {stats.recentReports.map(report => (
                                        <tr key={report._id} style={{ borderBottom: '1px solid #eee' }}>
                                            <td style={{ padding: '10px' }}>{report.title}</td>
                                            <td style={{ padding: '10px' }}>
                                                <span style={{ fontSize: '0.8rem', background: '#eef', padding: '2px 6px', borderRadius: '4px' }}>
                                                    {report.categoryId?.name || 'N/A'}
                                                </span>
                                            </td>
                                            <td style={{ padding: '10px', fontSize: '0.9rem', color: '#666' }}>
                                                {new Date(report.uploadedDate).toLocaleDateString()}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                    <div style={{ marginTop: '10px', textAlign: 'right' }}>
                        <Link to="/investor-relations" style={{ color: '#007bff', textDecoration: 'none' }}>Manage Reports &rarr;</Link>
                    </div>
                </div>

                <div style={{ flex: 1, minWidth: '300px' }}>
                    <h3>Quick Actions</h3>
                    <div style={{ display: 'grid', gap: '10px' }}>
                         <Link to="/investor-relations" style={{ padding: '1rem', background: 'white', border: '1px solid #ddd', borderRadius: '6px', textDecoration: 'none', color: '#333', display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <FileText size={20} /> Upload New Report
                         </Link>
                         <Link to="/offices" style={{ padding: '1rem', background: 'white', border: '1px solid #ddd', borderRadius: '6px', textDecoration: 'none', color: '#333', display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <MapPin size={20} /> Add New Office Location
                         </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
