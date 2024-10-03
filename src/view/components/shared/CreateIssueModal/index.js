import { useState, useContext } from 'react';
import { Modal, Form, notification } from 'antd';
import { taskStatus } from '../../../../core/constants/issue';
import { doc, setDoc, db, updateDoc, arrayUnion } from '../../../../services/firebase/firebase';
import { AuthContext } from '../../../../context/AuthContext';
import IssueModalForm from '../IssueModalForm';

const CreateIssueModal = ({ visible, setVisible }) => { //render
    const [ form ] = Form.useForm();
    const { handleGetIssues } = useContext(AuthContext);
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
            key: taskId,
            status: taskStatus.TODO.key,
            ...values
        }
     
        try{
            const createDoc = doc(db, 'issue', taskId);
            await setDoc(createDoc, taskDataModel);
            await handleUpdateAssigneesTask(taskId, values.assignees);
            handleGetIssues();
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
            <IssueModalForm 
                form={form}
                onFinish={handleCreateIssue}
            />
        </Modal>
    )
};

export default CreateIssueModal;