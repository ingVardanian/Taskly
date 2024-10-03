import { taskStatus } from '../../../core/constants/issue';

export const taskStatusModel = () => ({
    [taskStatus.TODO.key]: {
        name: taskStatus.TODO.title,
        items: [],
    },
    [taskStatus.IN_PROGRESS.key]: {
        name: taskStatus.IN_PROGRESS.title,
        items: [],
    },
    [taskStatus.TEST.key]: {
        name: taskStatus.TEST.title,
        items: [],
    },
    [taskStatus.DONE.key]: {
        name: taskStatus.DONE.title,
        items: []
    }
});