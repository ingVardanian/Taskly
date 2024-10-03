
import { Menu } from 'antd';
import { DatabaseOutlined, SettingOutlined, TeamOutlined } from '@ant-design/icons'
import './index.css';

const items = [
    {
      key: 'board',
      label: 'Cabinet Board',
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
    return (
        <div className="sidebar">
            <Menu 
                className='project_sidebar'
                items={items}
                mode="inline"
            />
        </div>
    )
};


export default Sidebar;
