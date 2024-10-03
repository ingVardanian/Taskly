import { useState, useContext } from 'react';
import { Input, Avatar, Button, Divider } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import CreateIssueModal from '../../shared/CreateIssueModal';
import { getFirstLetters } from '../../../../core/helpers/getFirstLetters';
import { AuthContext } from '../../../../context/AuthContext';
import './index.css';

const SubHeader = () => {
    const { users } = useContext(AuthContext);

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
                visible={modalVisible}
                setVisible={setModalVisible}
            />
        </div>
    )
};

export default SubHeader;