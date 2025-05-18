import { useEffect, useState } from 'react';
import { Switch, message } from 'antd';
import { auth, db } from '../../../../services/firebase/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

const NotificationSettings = () => {
    const [emailNotif, setEmailNotif] = useState(false);
    const [slackNotif, setSlackNotif] = useState(false);
    const [loading, setLoading] = useState(true);
    const [userDocRef, setUserDocRef] = useState(null);

    useEffect(() => {
        const loadSettings = async () => {
            const user = auth.currentUser;
            if (!user) return;

            const docRef = doc(db, 'registerUsers', user.uid);
            setUserDocRef(docRef);

            const userSnap = await getDoc(docRef);
            if (userSnap.exists()) {
                const data = userSnap.data();
                const notifications = data.notifications || {};
                setEmailNotif(!!notifications.email);
                setSlackNotif(!!notifications.slack);
            }

            setLoading(false);
        };

        loadSettings();
    }, []);

    const handleChange = async (type, value) => {
        if (!userDocRef) return;
        try {
            await updateDoc(userDocRef, {
                [`notifications.${type}`]: value
            });
            message.success(`${type === 'email' ? 'Email' : 'Slack'} notifications ${value ? 'enabled' : 'disabled'}`);
            if (type === 'email') setEmailNotif(value);
            if (type === 'slack') setSlackNotif(value);
        } catch (err) {
            console.error(err);
            message.error('Failed to update notification setting');
        }
    };

    if (loading) return <p>Loading...</p>;

    return (
        <div>
            <Switch
                checkedChildren="Enable Email"
                unCheckedChildren="Disable Email"
                checked={emailNotif}
                onChange={(val) => handleChange('email', val)}
            />
            <Switch
                checkedChildren="Enable Slack"
                unCheckedChildren="Disable Slack"
                checked={slackNotif}
                onChange={(val) => handleChange('slack', val)}
                style={{ marginLeft: 10 }}
            />
        </div>
    );
};

export default NotificationSettings;
