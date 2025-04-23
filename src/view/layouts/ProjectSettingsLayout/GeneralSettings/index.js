import { Input, Select } from 'antd';

 const GeneralSettings = () => (
    <div>
        <Input placeholder="Project Name" style={{ marginBottom: 10 }} />
        <Input placeholder="Project Key" style={{ marginBottom: 10 }} />
        <Input.TextArea placeholder="Description" rows={4} style={{ marginBottom: 10 }} />
        <Select placeholder="Visibility" style={{ width: '100%' }}>
            <Select.Option value="public">Public</Select.Option>
            <Select.Option value="private">Private</Select.Option>
        </Select>
    </div>
);

export default  GeneralSettings;