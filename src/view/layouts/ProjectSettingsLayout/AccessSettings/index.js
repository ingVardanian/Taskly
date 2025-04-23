import { Switch, Button } from 'antd';

const AccessSettings = () => (
    <div>
        <Button type="primary">Manage Users</Button>
        <Switch checkedChildren="Admin" unCheckedChildren="User" style={{ marginLeft: 10 }} />
    </div>
);

export default AccessSettings;