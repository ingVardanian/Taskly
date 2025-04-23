import { Input, Select } from 'antd';

const TaskSettings = () => (
    <div>
        <Input placeholder="Sprint Duration (Days)" type="number" style={{ marginBottom: 10 }} />
        <Select placeholder="Default Task Priority" style={{ width: '100%' }}>
            <Select.Option value="low">Low</Select.Option>
            <Select.Option value="medium">Medium</Select.Option>
            <Select.Option value="high">High</Select.Option>
        </Select>
    </div>
);


export default TaskSettings;