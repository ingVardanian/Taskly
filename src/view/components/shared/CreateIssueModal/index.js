import { useState } from 'react';
import { Modal, Form, notification } from 'antd';
import { taskStatus } from '../../../../core/constants/issue';
import { doc, setDoc, updateDoc, arrayUnion, db } from '../../../../services/firebase/firebase';
import { getDoc, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import IssueModalForm from '../IssueModalForm';
import { fetchIssuesData } from '../../../../state-managment/slices/issuesSlice';
import { useDispatch } from 'react-redux';
import emailjs from '@emailjs/browser';

const CreateIssueModal = ({ visible, setVisible }) => {
    const [form] = Form.useForm();
    const [confirmLoading, setConfirmLoading] = useState(false);
    const dispatch = useDispatch();

    const handleCloseModal = () => {
        form.resetFields();
        setVisible(false);
    };

    const handleUpdateAssigneesTask = async (taskId, userIds) => {
    const ids = Array.isArray(userIds) ? userIds : [userIds];

    for (const userId of ids) {
        try {
            const userRef = doc(db, 'registerUsers', userId);
            await updateDoc(userRef, {
                task: arrayUnion(taskId),
            });
        } catch (error) {
            console.error(`Error updating task for user ${userId}:`, error);
        }
    }
};

   const sendEmailNotification = (email, taskTitle) => {
        const templateParams = {
            email: email,
            title: taskTitle,
        };

        emailjs.send('service_o6vsblb', 'template_feab5vs', templateParams, '7Pr3vPWGaUMqaSyDX')
            .then(() => {
            console.log('Email sent!');
            }, (error) => {
            console.error('Email sending error:', error);
            });
    };
    const sendSlackNotification = (username, taskTitle) => {
        console.log(`Slack to ${username}: "New Task Assigned - ${taskTitle}"`);
    };

    const createNotificationForAssignee = async (taskId, userId, taskTitle) => {
    try {
        await addDoc(collection(db, 'notifications'), {
            recipientId: userId,
            type: 'issue_assigned',
            issueId: taskId,
            message: `You've been assigned a new issue: "${taskTitle}"`,
            isRead: false,
            createdAt: serverTimestamp(),
        });

        const userRef = doc(db, 'registerUsers', userId);
        const userSnap = await getDoc(userRef);

        if (!userSnap.exists()) {
            console.warn(`User with ID ${userId} does not exist.`);
            return;
        }

        const { notifications = {}, email, slackUsername, firstName } = userSnap.data();

        if (notifications.email && email) {
            sendEmailNotification(email, taskTitle);
        }

        if (notifications.slack) {
            sendSlackNotification(slackUsername || firstName, taskTitle);
        }
    } catch (error) {
        console.error(`Error in createNotificationForAssignee for ${userId}:`, error);
    }
};

    const handleCreateIssue = async (values) => {
    setConfirmLoading(true);
    const taskId = `${Date.now()}`;

    const taskDataModel = {
        key: taskId,
        status: taskStatus.TODO.key,
        ...values,
    };

    try {
        const issueRef = doc(db, 'issue', taskId);
        await setDoc(issueRef, taskDataModel);

        await handleUpdateAssigneesTask(taskId, values.assignees);

        console.log('[Step 3] Sending notifications...');
        for (const assignee of values.assignees) {
            await createNotificationForAssignee(taskId, assignee, values.shortSummary);
        }

        dispatch(fetchIssuesData());

        notification.success({
            message: 'Your task has been created',
        });

        handleCloseModal();
    } catch (error) {
        console.error('Error in handleCreateIssue:', error);
        notification.error({
            message: 'Error creating task. Check console for details.',
        });
    } finally {
        setConfirmLoading(false);
    }
};


    return (
        <Modal
            title="Create issue"
            open={visible}
            onCancel={handleCloseModal}
            onOk={() => form.submit()}
            okText="Create issue"
            confirmLoading={confirmLoading}
            centered
            width={800}
            styles={{
                body: {
                    maxHeight: '600px',
                    overflowY: 'auto',
                    overflowX: 'hidden',
                },
            }}
        >
            <IssueModalForm form={form} onFinish={handleCreateIssue} />
        </Modal>
    );
};

export default CreateIssueModal;
