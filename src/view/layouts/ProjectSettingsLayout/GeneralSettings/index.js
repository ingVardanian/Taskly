import { Input, Select, Button, message } from 'antd';
import { useState, useEffect } from 'react';
import { collection, addDoc, getDocs, orderBy, query, limit, doc, getDoc } from 'firebase/firestore';
import './index.css';
import { auth, db } from '../../../../services/firebase/firebase';

const GeneralSettings = () => {
    const [projectName, setProjectName] = useState('');
    const [projectKey, setProjectKey] = useState('');
    const [description, setDescription] = useState('');
    const [visibility, setVisibility] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProjectAndCheckAdmin = async () => {
            try {
                const user = auth.currentUser;
                if (!user) return;

                const userDoc = await getDoc(doc(db, 'registerUsers', user.uid));
                const userData = userDoc.exists() ? userDoc.data() : {};
                setIsAdmin(userData.isAdmin || false);

                const q = query(collection(db, 'projects'), orderBy('createdAt', 'desc'), limit(1));
                const snapshot = await getDocs(q);
                if (!snapshot.empty) {
                    const data = snapshot.docs[0].data();
                    setProjectName(data.projectName);
                    setProjectKey(data.projectKey);
                    setDescription(data.description);
                    setVisibility(data.visibility);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProjectAndCheckAdmin();
    }, []);

    const handleSave = async () => {
        if (!projectName || !projectKey || !visibility) {
            message.error('Please fill all required fields.');
            return;
        }

        try {
            await addDoc(collection(db, 'projects'), {
                projectName,
                projectKey,
                description,
                visibility,
                createdAt: new Date(),
            });
            message.success('Project saved to Firebase!');
        } catch (error) {
            console.error('Error saving project:', error);
            message.error('Failed to save project.');
        }
    };

    if (loading) return <p>Loading...</p>;

    return (
        <div className="generalLayout">
            {!isAdmin && <p style={{ color: 'red', marginBottom: 10 }}>You don't have permission to edit settings.</p>}

            <Input
                placeholder="Project Name"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                disabled={!isAdmin}
                style={{ marginBottom: 10, padding: 10 }}
            />
            <Input
                placeholder="Project Key"
                value={projectKey}
                onChange={(e) => setProjectKey(e.target.value)}
                disabled={!isAdmin}
                style={{ marginBottom: 10, padding: 10 }}
            />
            <Input.TextArea
                placeholder="Description"
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                disabled={!isAdmin}
                style={{ marginBottom: 10, padding: 10 }}
            />
            <Select
                placeholder="Visibility"
                value={visibility}
                onChange={setVisibility}
                disabled={!isAdmin}
                style={{ width: '100%', marginBottom: 10 }}
            >
                <Select.Option value="public">Public</Select.Option>
                <Select.Option value="private">Private</Select.Option>
            </Select>

            <Button type="primary" onClick={handleSave} disabled={!isAdmin}>
                Save Settings
            </Button>
        </div>
    );
};

export default GeneralSettings;
