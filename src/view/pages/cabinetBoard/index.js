import React, { useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { taskStatus } from '../../../core/constants/issue';
import './index.css';

const taskStatusModel = {
    [taskStatus.TODO]: {
        name: taskStatus.TODO,
        items: [
            {id: '1', title: 'Create Button'},
        ],
    },
    [taskStatus.IN_PROGRESS]: {
        name: taskStatus.IN_PROGRESS,
        items: [],
    },
    [taskStatus.TEST]: {
        name: taskStatus.TEST,
        items: [],
    },
    [taskStatus.DONE]: {
        name: taskStatus.DONE,
        items: []
    }
};


const CabinetBoard = () => {
    const [columns, setColumns] = useState(taskStatusModel); 


    const result = [
        ['todo', { name: taskStatus.TODO, items: []}],
        ['inProgress', { name: taskStatus.IN_PROGRESS, items: []}],
        ['test', { name: taskStatus.TEST, items: []}],
    ]
    
    return (
        <div className="drag_context_container">
            <DragDropContext>
                {
                    Object.entries(columns).map(([columnId, column], index) => {
                        return (
                            <div className="column_container" key={columnId}>
                                <h2>{column.name}</h2>

                                <div style={{margin: 10}}>
                                    <Droppable droppableId={columnId} key={columnId}> 
                                        {(provided, snapshot) => {
                                            console.log(provided, 'provided');
                                            return (
                                                <div
                                                    {...provided.droppableProps}
                                                    ref={provided.innerRef}
                                                    style={{
                                                        width: 200,
                                                        padding: 6,
                                                        minHeight: 600,
                                                        backgroundColor: snapshot.isDraggingOver ? 'lightblue' : '#f4f5f7'
                                                    }}
                                                >
                                                    {
                                                        column.items.map((item, index) => {
                                                            return (
                                                                <Draggable 
                                                                    key={item.id}
                                                                    draggableId={item.id} 
                                                                    index={index} 
                                                                >
                                                                    {
                                                                        (provided, snapshot) => {
                                                                            return (
                                                                                <div
                                                                                    ref={provided.innerRef}
                                                                                    {...provided.draggableProps}
                                                                                    {...provided.dragHandleProps}
                                                                                    style={{
                                                                                       userSelect: 'none',
                                                                                        padding: 18,
                                                                                        minHeight: 50,
                                                                                        color: 'white',
                                                                                        backgroundColor: snapshot.isDragging ?  'gray' : 'blue',
                                                                                        ...provided.draggableProps.style,
                                                                                    }}
                                                                                >
                                                                                    {item.title}
                                                                                </div>
                                                                            )
                                                                        }
                                                                    }
                                                                </Draggable>
                                                            )
                                    
                                                        })
                                                    }
                                                </div>
                                            )
                                        }}
                                    </Droppable>
                                </div>
                            </div>
                        )
                    })
                }
            </DragDropContext>
        </div>
    )
};

export default CabinetBoard;
