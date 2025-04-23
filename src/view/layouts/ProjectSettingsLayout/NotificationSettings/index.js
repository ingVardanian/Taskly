import { Switch } from 'antd';

const NotificationSettings = () => (
    <div>
        <Switch checkedChildren="Enable Email" unCheckedChildren="Disable Email" />
        <Switch checkedChildren="Enable Slack" unCheckedChildren="Disable Slack" style={{ marginLeft: 10 }} />
    </div>
);

export default NotificationSettings;