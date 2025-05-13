import { useEffect, useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { db, updateDoc, doc } from '../../../services/firebase/firebase';
import LoadingWrapper from '../../components/shared/LoadingWrapper';
import { Typography, Flex, Avatar, Button, Tooltip, Input } from 'antd';
import EditIssueModal from '../../components/shared/EditIssueModal';
import { ISSUE_OPTION, PRIORITY_OPTION } from '../../../core/constants/issue';
import { useDispatch, useSelector } from 'react-redux';
import { fetchIssuesData, changeIssueColumns } from '../../../state-managment/slices/issuesSlice';
import { fetchUsersData } from '../../../state-managment/slices/usersSlice';
import './index.css';
import { getFirstLetters } from '../../../core/helpers/getFirstLetters';
import { getColorByName } from '../../../core/helpers/getColorByName';

const { Title, Text } = Typography;

const CabinetBoard = () => {
    const [selectedIssueData, setSelectedIssueData] = useState(null);
    const dispatch = useDispatch();

    // Get issues and users data from the Redux store
    const { issueColumns, loading } = useSelector(state => state.issues);
    const { users } = useSelector(state => state.users);

    // Fetch issues and users data when the component mounts
    useEffect(() => {
        dispatch(fetchIssuesData());
        dispatch(fetchUsersData());
    }, [dispatch]);

    // Function to handle drag-and-drop of issues
    const handleDragEnd = result => {
        dispatch(changeIssueColumns(result));
    };

    const handleChangeTaskStatus = async result => {
        if (result.destination) {
            try {
                handleDragEnd(result);
                const { destination: { droppableId, index }, draggableId } = result;

                const docRef = doc(db, 'issue', draggableId);
                await updateDoc(docRef, {
                    status: droppableId,
                    index
                });
            } catch {
                console.log('Error updating task status');
            }
        }
    };

    // Function to get user by ID
    const getUserById = (userId) => {
        return users.find(user => user.id === userId); // Get user by matching IDs
    };

    // Render the avatars for the assignees of each issue
    const renderAssigneeAvatars = (assignees) => {
        // Ensure assignees is always an array (even if it's a single ID)
        const assigneeArray = Array.isArray(assignees) ? assignees : [assignees];

        return assigneeArray.map((assigneeId) => {
            const user = getUserById(assigneeId);
            if (user) {
                const firstLetter = getFirstLetters(user.firstName);
                const color = getColorByName(user.firstName);  // Color based on first name

                return (
                    <Tooltip title={user.firstName} key={assigneeId}>
                        <Avatar
                            style={{ backgroundColor: color }}
                            size={30}
                        >
                            {firstLetter}
                        </Avatar>
                    </Tooltip>
                );
            }
            return null;  // If no user is found, return null
        });
    };

    return (
        <div className="drag_context_container">
            <LoadingWrapper loading={loading}>
                <DragDropContext onDragEnd={handleChangeTaskStatus}>
                    {Object.entries(issueColumns).map(([columnId, column]) => {
                        return (
                            <div className="column_container" key={columnId}>
                                <div className="column_header">
                                    <Title level={5} type="secondary">
                                        {column.name} {' '}
                                        {column.items.length}
                                    </Title>
                                </div>

                                <Droppable droppableId={columnId} key={columnId}>
                                    {(provided, snapshot) => (
                                        <div
                                            {...provided.droppableProps}
                                            ref={provided.innerRef}
                                            className="droppable_container"
                                            style={{
                                                backgroundColor: snapshot.isDraggingOver
                                                    ? 'lightblue'
                                                    : '#f4f5f7',
                                            }}
                                        >
                                            {column.items.map((item, index) => (
                                                <Draggable key={item.key} draggableId={item.key} index={index}>
                                                    {(provided, snapshot) => (
                                                        <div
                                                            onClick={() => setSelectedIssueData(item)}
                                                            className="issue_card_container"
                                                            ref={provided.innerRef}
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}
                                                            style={{
                                                                backgroundColor: snapshot.isDragging ? '#ebecf0' : '#fff',
                                                                ...provided.draggableProps.style,
                                                            }}
                                                        >
                                                            <Text>{item.shortSummary}</Text>

                                                            <Flex justify="space-between">
                                                                <div>
                                                                    {ISSUE_OPTION[item.issueType].icon}{' '}
                                                                    {PRIORITY_OPTION[item.priority].icon}
                                                                </div>

                                                                <div>
                                                                    {/* Render Assignee Avatars inside the task card */}
                                                                    <div className="avatar-group">
                                                                        {renderAssigneeAvatars(item.assignees)}
                                                                    </div>
                                                                </div>
                                                            </Flex>
                                                        </div>
                                                    )}
                                                </Draggable>
                                            ))}
                                        </div>
                                    )}
                                </Droppable>
                            </div>
                        );
                    })}
                </DragDropContext>
            </LoadingWrapper>

            {Boolean(selectedIssueData) && (
                <EditIssueModal
                    issueData={selectedIssueData}
                    visible={Boolean(selectedIssueData)}
                    onClose={() => setSelectedIssueData(null)}
                />
            )}
        </div>
    );
};

export default CabinetBoard;
