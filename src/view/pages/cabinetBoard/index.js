import React, { useEffect, useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { db, updateDoc, doc } from '../../../services/firebase/firebase';
import LoadingWrapper from '../../components/shared/LoadingWrapper';
import { Typography, Flex, Avatar, Tooltip } from 'antd';
import EditIssueModal from '../../components/shared/EditIssueModal';
import { ISSUE_OPTION, PRIORITY_OPTION } from '../../../core/constants/issue';
import { useDispatch, useSelector } from 'react-redux';
import { fetchIssuesData, changeIssueColumns } from '../../../state-managment/slices/issuesSlice';
import { fetchUsersData } from '../../../state-managment/slices/usersSlice';
import './index.css';
import { getFirstLetters } from '../../../core/helpers/getFirstLetters';
import { getColorByName } from '../../../core/helpers/getColorByName';
import { useOutletContext } from 'react-router-dom';

const { Title, Text } = Typography;

const CabinetBoard = () => {
    const [selectedIssueData, setSelectedIssueData] = useState(null);
    const dispatch = useDispatch();

    const { issueColumns, loading } = useSelector(state => state.issues);
    const { users } = useSelector(state => state.users);

    const { searchTerm } = useOutletContext();

    useEffect(() => {
        dispatch(fetchIssuesData());
        dispatch(fetchUsersData());
    }, [dispatch]);

    const handleDragEnd = result => {
        dispatch(changeIssueColumns(result));
    };

    const handleChangeTaskStatus = async result => {
        if (result.destination) {
            try {
                handleDragEnd(result);
                const {
                    destination: { droppableId, index },
                    draggableId,
                } = result;

                const docRef = doc(db, 'issue', draggableId);
                await updateDoc(docRef, {
                    status: droppableId,
                    index,
                });
            } catch {
                console.log('Error updating task status');
            }
        }
    };

    const getUserById = userId => {
        return users.find(user => user.id === userId);
    };

    const renderAssigneeAvatars = assignees => {
        const assigneeArray = Array.isArray(assignees) ? assignees : [assignees];

        return assigneeArray.map(assigneeId => {
            const user = getUserById(assigneeId);
            if (user) {
                const firstLetter = getFirstLetters(user.firstName);
                const color = getColorByName(user.firstName);

                return (
                    <Tooltip title={user.firstName} key={assigneeId}>
                        <Avatar style={{ backgroundColor: color }} size={30}>
                            {firstLetter}
                        </Avatar>
                    </Tooltip>
                );
            }
            return null;
        });
    };

    return (
        <div className="drag_context_container">
            <LoadingWrapper loading={loading}>
                <DragDropContext onDragEnd={handleChangeTaskStatus}>
                    {Object.entries(issueColumns).map(([columnId, column]) => {
                        const filteredItems = column.items.filter(item =>
                            item.shortSummary.toLowerCase().includes(searchTerm?.toLowerCase() || '')
                        );

                        return (
                            <div className="column_container" key={columnId}>
                                <div className="column_header">
                                    <Title level={5} type="secondary">
                                        {column.name} {' '}
                                        {filteredItems.length}
                                    </Title>
                                </div>

                                <Droppable droppableId={columnId} key={columnId}>
                                    {(provided, snapshot) => (
                                        <div
                                            {...provided.droppableProps}
                                            ref={provided.innerRef}
                                            className="droppable_container"
                                            style={{
                                                backgroundColor: snapshot.isDraggingOver ? 'lightblue' : '#f4f5f7',
                                            }}
                                        >
                                            {filteredItems.map((item, index) => (
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
                                                                    <div className="avatar-group">
                                                                        {renderAssigneeAvatars(item.assignees)}
                                                                    </div>
                                                                </div>
                                                            </Flex>
                                                        </div>
                                                    )}
                                                </Draggable>
                                            ))}
                                            {provided.placeholder}
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
