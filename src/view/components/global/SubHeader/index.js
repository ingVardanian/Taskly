import React from 'react';
import { useSelector } from 'react-redux';
import { Input, Avatar, Button, Divider, Tooltip } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import CreateIssueModal from '../../shared/CreateIssueModal';
import { getFirstLetters } from '../../../../core/helpers/getFirstLetters';
import { getColorByName } from '../../../../core/helpers/getColorByName';

import './index.css';

const SubHeader = ({ searchTerm, setSearchTerm }) => {
    const { users } = useSelector((state) => state.users);
    const [modalVisible, setModalVisible] = React.useState(false);

    const handleOpenModal = () => {
        setModalVisible(true);
    };

    return (
        <div className="sub_header">
            <Input.Search
                className="serach_input"
                placeholder="Search"
                value={searchTerm}               // controlled input value
                onChange={(e) => setSearchTerm(e.target.value)}  // update parent state
                allowClear
            />

            <Divider type="vertical" />

            <Avatar.Group
                max={{
                    count: 4,
                    style: { color: '#f56a00', backgroundColor: '#fde3cf', cursor: 'pointer' },
                    popover: {
                        trigger: 'hover',
                    },
                }}
            >
                {users.map((user, index) => {
                    const color = getColorByName(user.label);
                    return (
                        <Tooltip title={user.label} key={index}>
                            <Avatar style={{ backgroundColor: color }}>
                                {getFirstLetters(`${user.label}`)}
                            </Avatar>
                        </Tooltip>
                    );
                })}
            </Avatar.Group>

            <Divider type="vertical" />

            <Button type="primary" icon={<PlusOutlined />} onClick={handleOpenModal}>
                Create issue
            </Button>

            <CreateIssueModal visible={modalVisible} setVisible={setModalVisible} />
        </div>
    );
};

export default SubHeader;
