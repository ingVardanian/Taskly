import { Select } from 'antd';

const IssueSettings = () => (
    <div>
        <Select placeholder="Default Issue Type" style={{ width: '100%' }}>
            <Select.Option value="bug">Bug</Select.Option>
            <Select.Option value="task">Task</Select.Option>
            <Select.Option value="story">Story</Select.Option>
        </Select>
    </div>
);

export default IssueSettings;