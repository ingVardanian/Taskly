import { Sidebar } from '../../components/global';
import { Tabs } from 'antd';
import GeneralSettings from './GeneralSettings';
import AccessSettings from './AccessSettings';
import NotificationSettings from './NotificationSettings';
import './index.css';

const ProjectSettingsLayout = () => {
    const items = [
        {
            key: '1',
            label: 'General',
            children: <GeneralSettings />,
        },
        {
            key: '2',
            label: 'Access & Permissions',
            children: <AccessSettings />,
        },
        {
            key: '4',
            label: 'Notifications & Integrations',
            children: <NotificationSettings />,
        },
    ];

    return (
        <div className='settings_layout_container'>
            <Sidebar />
            <div className='settings_content'>
                <Tabs defaultActiveKey='1' items={items} />
            </div>
        </div>
    );
};

export default ProjectSettingsLayout;
