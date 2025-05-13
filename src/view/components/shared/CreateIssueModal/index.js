import { useState } from 'react';
import { Modal, Form, notification } from 'antd';
import { taskStatus } from '../../../../core/constants/issue';
import { doc, setDoc, db, updateDoc, arrayUnion } from '../../../../services/firebase/firebase';
import IssueModalForm from '../IssueModalForm';
import { fetchIssuesData } from '../../../../state-managment/slices/issuesSlice';
import { useDispatch } from 'react-redux';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const CreateIssueModal = ({ visible, setVisible }) => {
    const [ form ] = Form.useForm();
    const [confirmLoading, setConfirmLoading] = useState(false);
    const dispatch = useDispatch();

    const handleUpdateAssigneesTask = async (taskId, userIds) => {
        for (const userId of userIds) {
            try {
                const docRef = doc(db, 'registerUsers', userId);
                await updateDoc(docRef, {
                    task: arrayUnion(taskId) // Add taskId to the task array of the user
                });
            } catch (error) {
                console.error(`Error updating task for user ${userId}: `, error);
            }
        }
    };

    const createNotificationForAssignee = async (taskId, userId, taskTitle) => {
        try {
            await addDoc(collection(db, 'notifications'), {
                recipientId: userId,
                type: 'issue_assigned',
                issueId: taskId,
                message: `You've been assigned a new issue: "${taskTitle}"`,
                isRead: false,
                createdAt: serverTimestamp()
            });
        } catch (error) {
            console.error(`Error creating notification for user ${userId}: `, error);
        }
    };

    const handleCloseModal = () => {
        setVisible(false);
        form.resetFields();
    };

    const handleCreateIssue = async (values) => {
        const taskId = `${Date.now()}`;
        setConfirmLoading(true);

        const taskDataModel = {
            key: taskId,
            status: taskStatus.TODO.key,
            ...values
        };

        console.log('Task Data Model: ', taskDataModel);  // Debugging log

        try {
            const createDoc = doc(db, 'issue', taskId);
            await setDoc(createDoc, taskDataModel); // Create the task document

            console.log('Assignees: ', values.assignees);  // Debugging log

            await handleUpdateAssigneesTask(taskId, values.assignees);

            for (const assignee of values.assignees) {
                await createNotificationForAssignee(taskId, assignee, values.shortSummary);
            }

            dispatch(fetchIssuesData());

            notification.success({
                message: 'Your task has been created',
            });

            setVisible(false);
            form.resetFields();
        } catch (error) {
            console.error('Error creating issue: ', error);  // Log the full error
            notification.error({
                message: 'Error ooops :(',
            });
        } finally {
            setConfirmLoading(false);
        }
    };

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
    );
};

export default CreateIssueModal;
