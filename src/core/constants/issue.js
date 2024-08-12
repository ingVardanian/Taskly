const issueTypes = [
    {
        value: 'bug',
        label: 'Bug',
    },
    {
        value: 'task',
        label: 'Task',
    },
    {
        value: 'story',
        label: 'Story',
    },
];

const priority = [
    {
        value: 'high',
        label: 'High'
    },
    {
        value: 'highest',
        label: 'Highest'
    },
    {
        value: 'medium',
        label: 'Medium'
    },
    {
        value: 'low',
        label: 'Low'
    },
    {
        value: 'lowest',
        label: 'Lowest'
    }
]
const taskStatus = {
    TODO: '0',
    IN_PROGRESS: '1',
    TEST: '2',
    DONE: '3',
}
export {
    issueTypes, priority, taskStatus
}