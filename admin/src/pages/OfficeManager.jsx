import { useState, useEffect } from 'react';
import { 
    getOfficeTypes, createOfficeType, deleteOfficeType,
    getLocations, createLocation, deleteLocation 
} from '../services/api';
import { Trash2, MapPin, Building } from 'lucide-react';

const OfficeManager = () => {
    const [activeTab, setActiveTab] = useState('locations');
    const [types, setTypes] = useState([]);
    const [locations, setLocations] = useState([]);
    
    // Forms state
    const [newType, setNewType] = useState({ name: '', code: '', description: '' });
    const [newLocation, setNewLocation] = useState({ 
        officeTypeId: '', officeName: '', 
        line1: '', line2: '', city: '', state: '', country: '', pincode: '',
        phone: '', email: ''
    });

    useEffect(() => {
        fetchTypes();
        fetchLocations();
    }, []);

    const fetchTypes = async () => {
        try {
            const data = await getOfficeTypes();
            setTypes(data);
        } catch (error) {
            console.error("Error fetching types", error);
        }
    };

    const fetchLocations = async () => {
        try {
            const data = await getLocations();
            setLocations(data);
        } catch (error) {
            console.error("Error fetching locations", error);
        }
    };

    const handleCreateType = async (e) => {
        e.preventDefault();
        try {
            await createOfficeType(newType);
            setNewType({ name: '', code: '', description: '' });
            fetchTypes();
            alert("Office Type Created!");
        } catch (error) {
            alert("Error creating type");
        }
    };

    const handleDeleteType = async (id) => {
        if(!confirm("Delete this type?")) return;
        try {
            await deleteOfficeType(id);
            fetchTypes();
        } catch (error) {
            alert("Error deleting type");
        }
    };

    const handleCreateLocation = async (e) => {
        e.preventDefault();
        try {
            const payload = {
                officeTypeId: newLocation.officeTypeId,
                officeName: newLocation.officeName,
                address: {
                    line1: newLocation.line1,
                    line2: newLocation.line2,
                    city: newLocation.city,
                    state: newLocation.state,
                    country: newLocation.country,
                    pincode: newLocation.pincode
                },
                contact: {
                    phone: newLocation.phone,
                    email: newLocation.email
                }
            };
            await createLocation(payload);
            setNewLocation({ 
                officeTypeId: '', officeName: '', 
                line1: '', line2: '', city: '', state: '', country: '', pincode: '',
                phone: '', email: ''
            });
            fetchLocations();
            alert("Location Created!");
        } catch (error) {
            alert("Error creating location");
        }
    };

    const handleDeleteLocation = async (id) => {
        if(!confirm("Delete this location?")) return;
        try {
            await deleteLocation(id);
            fetchLocations();
        } catch (error) {
            alert("Error deleting location");
        }
    };

    return (
        <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
            <h1>Office Management</h1>
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
                <button onClick={() => setActiveTab('locations')} style={{ padding: '10px 20px', cursor: 'pointer', background: activeTab === 'locations' ? '#007bff' : '#eee', color: activeTab === 'locations' ? 'white' : 'black', border: 'none' }}>
                    Locations
                </button>
                <button onClick={() => setActiveTab('types')} style={{ padding: '10px 20px', cursor: 'pointer', background: activeTab === 'types' ? '#007bff' : '#eee', color: activeTab === 'types' ? 'white' : 'black', border: 'none' }}>
                    Office Types
                </button>
            </div>

            {activeTab === 'types' && (
                <div style={{ display: 'flex', gap: '2rem' }}>
                    <div style={{ flex: 1 }}>
                        <h3>Add Office Type</h3>
                        <form onSubmit={handleCreateType} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            <input placeholder="Name (e.g. Head Office)" value={newType.name} onChange={e => setNewType({...newType, name: e.target.value})} required style={{ padding: '8px' }} />
                            <input placeholder="Code (e.g. HO)" value={newType.code} onChange={e => setNewType({...newType, code: e.target.value})} required style={{ padding: '8px' }} />
                            <input placeholder="Description" value={newType.description} onChange={e => setNewType({...newType, description: e.target.value})} style={{ padding: '8px' }} />
                            <button type="submit" style={{ padding: '10px', background: '#28a745', color: 'white', border: 'none' }}>Create Type</button>
                        </form>
                    </div>
                    <div style={{ flex: 2 }}>
                        <h3>Existing Types</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            {types.map(t => (
                                <div key={t._id} style={{ padding: '10px', border: '1px solid #ddd', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div>
                                        <strong>{t.name}</strong> ({t.code})
                                        <div style={{ fontSize: '0.8rem', color: '#666' }}>{t.description}</div>
                                    </div>
                                    <button onClick={() => handleDeleteType(t._id)} style={{ color: 'red', border: 'none', background: 'none', cursor: 'pointer' }}><Trash2 size={16} /></button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {activeTab === 'locations' && (
                <div style={{ display: 'flex', gap: '2rem' }}>
                     <div style={{ flex: 1, minWidth: '300px' }}>
                        <h3>Add Location</h3>
                        <form onSubmit={handleCreateLocation} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            <select value={newLocation.officeTypeId} onChange={e => setNewLocation({...newLocation, officeTypeId: e.target.value})} required style={{ padding: '8px' }}>
                                <option value="">Select Office Type</option>
                                {types.map(t => <option key={t._id} value={t._id}>{t.name}</option>)}
                            </select>
                            <input placeholder="Office Name (e.g. Mumbai HQ)" value={newLocation.officeName} onChange={e => setNewLocation({...newLocation, officeName: e.target.value})} required style={{ padding: '8px' }} />
                            
                            <h4>Address</h4>
                            <input placeholder="Line 1" value={newLocation.line1} onChange={e => setNewLocation({...newLocation, line1: e.target.value})} style={{ padding: '8px' }} />
                            <input placeholder="Line 2" value={newLocation.line2} onChange={e => setNewLocation({...newLocation, line2: e.target.value})} style={{ padding: '8px' }} />
                            <div style={{ display: 'flex', gap: '5px' }}>
                                <input placeholder="City" value={newLocation.city} onChange={e => setNewLocation({...newLocation, city: e.target.value})} style={{ padding: '8px', flex: 1 }} />
                                <input placeholder="State" value={newLocation.state} onChange={e => setNewLocation({...newLocation, state: e.target.value})} style={{ padding: '8px', flex: 1 }} />
                            </div>
                            <div style={{ display: 'flex', gap: '5px' }}>
                                <input placeholder="Country" value={newLocation.country} onChange={e => setNewLocation({...newLocation, country: e.target.value})} style={{ padding: '8px', flex: 1 }} />
                                <input placeholder="Pincode" value={newLocation.pincode} onChange={e => setNewLocation({...newLocation, pincode: e.target.value})} style={{ padding: '8px', flex: 1 }} />
                            </div>

                            <h4>Contact</h4>
                            <input placeholder="Phone" value={newLocation.phone} onChange={e => setNewLocation({...newLocation, phone: e.target.value})} style={{ padding: '8px' }} />
                            <input placeholder="Email" value={newLocation.email} onChange={e => setNewLocation({...newLocation, email: e.target.value})} style={{ padding: '8px' }} />

                            <button type="submit" style={{ padding: '10px', background: '#28a745', color: 'white', border: 'none', marginTop: '10px' }}>Create Location</button>
                        </form>
                    </div>
                    <div style={{ flex: 2 }}>
                        <h3>Existing Locations</h3>
                        <div style={{ display: 'grid', gap: '1rem' }}>
                            {locations.map(loc => (
                                <div key={loc._id} style={{ padding: '15px', border: '1px solid #ddd', borderRadius: '8px', backgroundColor: '#fff' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                                            <Building size={20} color="#007bff" />
                                            <div>
                                                <h4 style={{ margin: 0 }}>{loc.officeName}</h4>
                                                <span style={{ fontSize: '0.8rem', background: '#eee', padding: '2px 6px', borderRadius: '4px' }}>
                                                    {loc.officeTypeId?.name || "Unknown Type"}
                                                </span>
                                            </div>
                                        </div>
                                        <button onClick={() => handleDeleteLocation(loc._id)} style={{ color: 'red', border: 'none', background: 'none', cursor: 'pointer' }}><Trash2 size={16} /></button>
                                    </div>
                                    <div style={{ marginTop: '10px', fontSize: '0.9rem', color: '#555', display: 'flex', gap: '10px' }}>
                                        <MapPin size={16} />
                                        <div>
                                            {loc.address?.line1}, {loc.address?.line2}<br />
                                            {loc.address?.city}, {loc.address?.state} - {loc.address?.pincode}<br />
                                            {loc.address?.country}
                                        </div>
                                    </div>
                                    <div style={{ marginTop: '10px', fontSize: '0.9rem', color: '#555' }}>
                                        📞 {loc.contact?.phone} | ✉️ {loc.contact?.email}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default OfficeManager;
