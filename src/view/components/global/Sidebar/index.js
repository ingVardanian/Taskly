import { useState, useEffect } from 'react';
import { Menu, Button } from 'antd';
import { DatabaseOutlined, SettingOutlined, TeamOutlined, MenuOutlined } from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';
import './index.css';
import { ROUTES_CONSTANTS } from '../../../../routes';

const items = [
  { key: 'board', label: 'Cabinet Board', icon: <DatabaseOutlined />, path: ROUTES_CONSTANTS.CABINET },
  { key: 'projectSettings', label: 'Project Settings', icon: <SettingOutlined />, path: ROUTES_CONSTANTS.PROJECT_SETTINGS },
  { key: 'teams', label: 'Teams', icon: <TeamOutlined />, path: ROUTES_CONSTANTS.TEAM },
];

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [collapsed, setCollapsed] = useState(window.innerWidth < 768); // collapsed on mobile by default

  // Update isMobile and collapsed on window resize
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      setCollapsed(mobile); // auto-collapse on mobile, expand on desktop
    };
    window.addEventListener('resize', handleResize);
    handleResize(); // initial check
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleMenuClick = (e) => {
    const selectedItem = items.find(item => item.key === e.key);
    if (selectedItem) {
      navigate(selectedItem.path);
      if (isMobile) {
        setCollapsed(true); // close sidebar after navigation on mobile
      }
    }
  };

  const activeKey = items.find(item => item.path === location.pathname)?.key;

  return (
    <>
      {isMobile && (
        <Button
          className="sidebar-toggle-btn"
          icon={<MenuOutlined />}
          onClick={() => setCollapsed(!collapsed)}
          aria-label="Toggle sidebar"
        />
      )}

      <div className={`sidebar ${collapsed ? 'collapsed' : 'expanded'}`}>
        <Menu
          className="project_sidebar"
          items={items}
          mode="inline"
          onClick={handleMenuClick}
          selectedKeys={[activeKey]}
        />
      </div>
    </>
  );
};

export default Sidebar;
