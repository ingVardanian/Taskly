import { useState, useEffect } from 'react';
import { Modal, Button, Switch, List, Spin, message, Typography } from 'antd';
import { collection, doc, getDoc, getDocs, updateDoc } from 'firebase/firestore';
import { auth, db } from '../../../../services/firebase/firebase';

const { Text } = Typography;

const AccessSettings = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [currentUserId, setCurrentUserId] = useState(null);

    useEffect(() => {
        const fetchUserRole = async () => {
            const currentUser = auth.currentUser;
            if (!currentUser) return;

            setCurrentUserId(currentUser.uid);

            const userDoc = await getDoc(doc(db, 'registerUsers', currentUser.uid));
            if (userDoc.exists()) {
                setIsAdmin(userDoc.data().isAdmin === true);
            }
        };

        fetchUserRole();
    }, []);

    const showModal = () => {
        if (!isAdmin) {
            message.warning("Access denied. Only admins can manage users.");
            return;
        }

        setIsModalOpen(true);
        fetchUsers();
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const fetchUsers = async () => {
        setLoading(true);
        const usersSnap = await getDocs(collection(db, 'registerUsers'));
        const usersList = usersSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setUsers(usersList);
        setLoading(false);
    };

    const toggleAdmin = async (userId, currentValue) => {
        try {
            await updateDoc(doc(db, 'registerUsers', userId), {
                isAdmin: !currentValue
            });
            message.success(`Updated role to ${!currentValue ? 'Admin' : 'User'}`);
            fetchUsers(); // refresh list
        } catch (error) {
            console.error(error);
            message.error('Failed to update role');
        }
    };

    return (
        <div>
         {isAdmin && (
            <Button type="primary" onClick={showModal}>
                 Manage Users
            </Button>
            )}

            <Switch
                checkedChildren="Admin"
                unCheckedChildren="User"
                style={{ marginLeft: 10 }}
                checked={isAdmin}
                disabled
            />

            <Modal
                title="User List"
                open={isModalOpen}
                onCancel={handleCancel}
                footer={null}
                width={600}
            >
                {loading ? (
                    <Spin />
                ) : (
                    <List
                        itemLayout="horizontal"
                        dataSource={users}
                        renderItem={user => (
                            <List.Item
                                actions={[
                                    user.id !== currentUserId && (
                                        <Switch
                                            checkedChildren="Admin"
                                            unCheckedChildren="User"
                                            checked={user.isAdmin}
                                            onChange={() => toggleAdmin(user.id, user.isAdmin)}
                                        />
                                    )
                                ]}
                            >
                                <List.Item.Meta
                                    title={
                                        <Text strong>
                                            {user.firstName} {user.lastName}
                                        </Text>
                                    }
                                    description={
                                        <>
                                            <Text type="secondary">{user.email}</Text><br />
                                            <Text type="secondary">Headline: {user.headline}</Text>
                                        </>
                                    }
                                />
                            </List.Item>
                        )}
                    />
                )}
            </Modal>
        </div>
    );
};

export default AccessSettings;
