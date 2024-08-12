import { useState } from 'react';

import { Button, Menu } from 'antd';
import { DatabaseOutlined, SettingOutlined, TeamOutlined } from '@ant-design/icons'

const items = [
    {
      key: 'board',
      label: 'Kabinet Board',
      icon: <DatabaseOutlined />
    },
    {
        key: 'projectSettings',
        label: 'Project Settings',
        icon: <SettingOutlined />
    },
    {
        key: 'teams',
        label: 'Teams',
        icon: <TeamOutlined />
    }
];

const Sidebar = () => {
    const [collapsed, setCollapsed] = useState(true); 
    
    const handleChangeCollapsed = () => {
        setCollapsed(!collapsed);
    }

    return (
        <div className="sidebar">
            <Button onClick={handleChangeCollapsed}>
                {
                    collapsed ? 'open' : 'close'
                }
            </Button>
            <Menu 
                items={items}
                mode="inline"
                inlineCollapsed={collapsed}
            />
        </div>
    )
};


export default Sidebar;
