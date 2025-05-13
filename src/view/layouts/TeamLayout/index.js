import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../services/firebase/firebase';
import { Avatar, Typography, Card } from 'antd';
import { Sidebar } from '../../components/global';
import { getFirstLetters } from '../../../core/helpers/getFirstLetters';
import { getColorByName } from '../../../core/helpers/getColorByName';
import './index.css';

const { Title, Text } = Typography;

const TeamLayout = () => {
    const [teams, setTeams] = useState({});

    useEffect(() => {
        const fetchUsers = async () => {
            const querySnapshot = await getDocs(collection(db, 'registerUsers'));
            const users = [];
            querySnapshot.forEach((doc) => {
                users.push({ id: doc.id, ...doc.data() });
            });

            const grouped = users.reduce((acc, user) => {
                const team = user.team || 'No Team';
                if (!acc[team]) acc[team] = [];
                acc[team].push(user);
                return acc;
            }, {});
            

            setTeams(grouped);
        };

        fetchUsers();
    }, []);

    return (
        <div className="team_layout_container">
            <Sidebar />

            <div className="teams_content">
                {
                    Object.entries(teams).map(([teamName, users]) => (
                        <Card key={teamName} title={teamName} style={{ marginBottom: 20 }}>
                            {
                                users.map(user => (
                                    <div key={user.id} className="team_user_card">
                                        <Avatar
                                            style={{
                                                backgroundColor: getColorByName(`${user.firstName} ${user.lastName}`),
                                                marginRight: 8
                                            }}
                                        >
                                            {getFirstLetters(`${user.firstName} ${user.lastName}`)}
                                        </Avatar>
                                        <div>
                                            <Text>{user.firstName} {user.lastName}</Text><br />
                                            <Text type="secondary">{user.email}</Text>
                                        </div>
                                    </div>
                                ))
                            }
                        </Card>
                    ))
                }
            </div>
        </div>
    );
};

export default TeamLayout;
