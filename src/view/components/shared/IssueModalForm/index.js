import { useContext } from 'react';
import { Form, Select, Input } from 'antd';
import Editor from '../Editor';
import { issueTypes, priority } from '../../../../core/constants/issue';
import { AuthContext } from '../../../../context/AuthContext';

const IssueModalForm = ({ form, onFinish }) => {
    const { users } = useContext(AuthContext);

    return (
        <Form layout="vertical" form={form} onFinish={onFinish}>
                <Form.Item
                    name="issueType"
                    label="Issue Type"
                    rules={[{required: true, message: 'Please Select Issue Type!'}]}
                >
                    <Select 
                        showSearch
                        placeholder="Issue Type"
                    >
                        {
                            issueTypes.map((item) => {
                                return (
                                    <Select.Option value={item.value}>
                                        {item.icon}
                                        {' '}
                                        {item.label}
                                    </Select.Option>
                                )
                            })
                        }
                    </Select>
                </Form.Item>

                <Form.Item
                    name="shortSummary"
                    label="Short Summary"
                    rules={[{required: true, message: 'Please Input Issue Short Summary!'}]}
                >
                  <Input 
                    placeholder="Short Summary"
                  />
                </Form.Item>

                <Form.Item 
                    name="description"
                    label="Description"
                    rules={[{required: true, message: 'Please Input Description!'}]}
                >
                    <Editor />
                </Form.Item>

                <Form.Item
                    name="reporter"
                    label="Reporter"
                    rules={[{required: true, message: 'Please Select Reporter!'}]}
                >
                    <Select 
                        showSearch
                        placeholder="Reporter"
                        options={users}
                    />
                </Form.Item>

                <Form.Item
                    name="assignees"
                    label="Assignees"
                    rules={[{required: true, message: 'Please Select Assignees!'}]}
                >
                    <Select 
                        showSearch
                        placeholder="Assignees"
                        options={users}
                    />
                </Form.Item>

                <Form.Item
                    name="priority"
                    label="Priority"
                    rules={[{required: true, message: 'Please Select Priority!'}]}
                >
                    <Select 
                        showSearch
                        placeholder="Priority"
                    >
                        {
                            priority.map((item) => {
                               return (
                                <Select.Option value={item.value}>
                                    {item.icon}
                                    {' '}
                                    {item.label}
                                </Select.Option>
                               )
                            })
                        }
                    </Select>

                </Form.Item>
            </Form>   
    )
};

export default IssueModalForm;