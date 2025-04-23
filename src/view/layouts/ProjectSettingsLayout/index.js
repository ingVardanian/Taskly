import { Sidebar } from '../../components/global';
import { Tabs } from 'antd';
import GeneralSettings from './GeneralSettings';
import AccessSettings from './AccessSettings';
import IssueSettings from './IssueSettings';
import NotificationSettings from './NotificationSettings';
import TaskSettings from './TaskSettings';
import AutomationSettings from './AutomationSettings';
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
            key: '3',
            label: 'Issue Types & Workflows',
            children: <IssueSettings />,
        },
        {
            key: '4',
            label: 'Notifications & Integrations',
            children: <NotificationSettings />,
        },
        {
            key: '5',
            label: 'Task & Sprint Management',
            children: <TaskSettings />,
        },
        {
            key: '6',
            label: 'Automation & Rules',
            children: <AutomationSettings />,
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
