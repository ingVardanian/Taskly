import { useState, useEffect } from 'react';
import { Input, Avatar, Button, Divider } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import CreateIssueModal from '../../shared/CreateIssueModal';
import { db, getDocs, collection } from '../../../../services/firebase/firebase';
import { getFirstLetters } from '../../../../core/helpers/getFirstLetters';
import './index.css';

const SubHeader = () => {
    const [users, setUsers] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    
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
                    users.map((user) => {
                        return (
                            <Avatar style={{backgroundColor: 'green'}}>
                                {getFirstLetters(`${user.label}`)}
                            </Avatar>
                        )
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