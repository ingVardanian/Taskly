import { useState } from 'react';
import { Modal, Form, Input, Select, notification } from 'antd';
import { issueTypes, priority, taskStatus } from '../../../../core/constants/issue';
import Editor from '../Editor';
import { doc, setDoc, db, updateDoc, arrayUnion } from '../../../../services/firebase/firebase';

const CreateIssueModal = ({ visible, setVisible, users }) => { //render
    const [ form ] = Form.useForm();
   
    const [confirmLoading, setConfirmLoading] = useState(false);

    const handleUpdateAssigneesTask = async (taskId, assignerId) => {
        const docRef = doc(db, 'registerUsers', assignerId);
        await updateDoc(docRef, {
            task: arrayUnion(taskId)
        })
    };

    const handleCloseModal = () => {
        setVisible(false);
        form.resetFields();
    }

    const handleCreateIssue = async (values) => {
        const taskId = `${Date.now()}`;
        setConfirmLoading(true);

        const taskDataModel = {
            status: taskStatus.TODO,
            ...values
        }
     
        try{
            const createDoc = doc(db, 'issue', taskId);
            await setDoc(createDoc, taskDataModel);
            await handleUpdateAssigneesTask(taskId, values.assignees)
            notification.success({
                message: 'Your task has been created',
            });

            setVisible(false);
            form.resetFields();
        }catch(error) {
            notification.error({
                message: 'Error ooops :(',
            });
        }finally{
            setConfirmLoading(false);
        }
    }

    return (
        <Modal
            title="Create issue"
            okText="Create issue"
            centered
            open={visible}
            width={800}
            confirmLoading={confirmLoading}
            onCancel={handleCloseModal}
            onOk={form.submit}
            styles={{
                body: {
                    maxHeight: '600px',
                    overflowY: 'auto',
                    overflowX: 'hidden'
                }
            }}
        >
            <Form layout="vertical" form={form} onFinish={handleCreateIssue}>
                <Form.Item
                    name="issueType"
                    label="Issue Type"
                    rules={[{required: true, message: 'Please Select Issue Type!'}]}
                >
                    <Select 
                        showSearch
                        placeholder="Issue Type"
                        options={issueTypes}
                    />
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
                        options={priority}
                    />
                </Form.Item>
            </Form>   
        </Modal>
    )
};

export default CreateIssueModal;