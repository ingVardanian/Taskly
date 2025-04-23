import { Menu } from 'antd';
import { DatabaseOutlined, SettingOutlined, TeamOutlined } from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';
import './index.css';
import { ROUTES_CONSTANTS } from '../../../../routes';

const items = [
  {
    key: 'board',
    label: 'Cabinet Board',
    icon: <DatabaseOutlined />,
    path: ROUTES_CONSTANTS.CABINET,
  },
  {
    key: 'projectSettings',
    label: 'Project Settings',
    icon: <SettingOutlined />,
    path: ROUTES_CONSTANTS.PROJECT_SETTINGS,
  },
  {
    key: 'teams',
    label: 'Teams',
    icon: <TeamOutlined />,
    path: ROUTES_CONSTANTS.TEAM,
  },
];

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation(); 
    
  const handleMenuClick = (e) => {
    const selectedItem = items.find(item => item.key === e.key);
    if (selectedItem) {
      navigate(selectedItem.path);
    }
  };

  const activeKey = items.find(item => item.path === location.pathname)?.key;

  return (
    <div className="sidebar">
      <Menu
        className="project_sidebar"
        items={items}
        mode="inline"
        onClick={handleMenuClick}
        selectedKeys={[activeKey]}
      />
    </div>
  );
};

export default Sidebar;
