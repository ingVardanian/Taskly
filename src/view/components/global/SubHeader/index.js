import { useEffect, useState } from 'react';
import { Input, Avatar, Button, Divider } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import CreateIssueModal from '../../shared/CreateIssueModal';
import './index.css';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../../services/firebase/firebase';
import { getFirstLetters } from '../../../../core/helpers/getFirstLetters';

const SubHeader = () => {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        const handleGetUsersData = async () => {
            const queryData = await getDocs(collection(db, 'registerUsers'));
            const result = queryData.docs.map((doc) => {
                const { firstName, lastName } = doc.data();
                return {label: `${firstName} ${lastName}`, value: doc.id}
            });

            setUsers(result);
        }
    
        handleGetUsersData();
    }, []);
    const [modalVisible, setModalVisible] = useState(false);
    
    const handleOpenModal = () => {
        setModalVisible(true);
    }

    return (
        <div className="sub_header">
            <Input.Search 
                className="serach_input"
                placeholder="Search"
            />

            <Divider type="vertical"/>
            
            <Avatar.Group 
                max={{
                    count: 4,
                    style: { color: '#f56a00', backgroundColor: '#fde3cf', cursor: 'pointer' },
                    popover: {
                        trigger: 'hover'
                    }
                }}
            >
                {
                    users.map((user)=> {
                        <Avatar> 
                           { getFirstLetters(`${user.label}`)}
                        </Avatar>
                    })
                }
            </Avatar.Group>

            <Divider type="vertical"/>

            <Button 
                type="primary" icon={<PlusOutlined />}
                onClick={handleOpenModal}
            >
                Create issue
            </Button>

            <CreateIssueModal 
                users={users}
                visible={modalVisible}
                setVisible={setModalVisible}
            />
        </div>
    )
};

export default SubHeader;