const { google } = require("googleapis");
const { getClient } = require("./googleAuth");

function service() {
    return google.tasks({
        version: "v1",
        auth: getClient()
    });
}

// ----------------------
// Task Lists
// ----------------------

async function getTaskLists() {
    const res = await service().tasklists.list();

    return res.data.items || [];
}

async function createTaskList(title) {
    const res = await service().tasklists.insert({
        requestBody: {
            title
        }
    });

    return res.data;
}

async function renameTaskList(taskListId, title) {
    const res = await service().tasklists.patch({
        tasklist: taskListId,
        requestBody: {
            title
        }
    });

    return res.data;
}

async function deleteTaskList(taskListId) {
    await service().tasklists.delete({
        tasklist: taskListId
    });

    return true;
}

// ----------------------
// Tasks
// ----------------------

async function getTasks(taskListId) {
    const res = await service().tasks.list({
        tasklist: taskListId
    });

    return res.data.items || [];
}

async function getTask(taskListId, taskId) {
    const res = await service().tasks.get({
        tasklist: taskListId,
        task: taskId
    });

    return res.data;
}

async function createTask(taskListId, task) {

    const res = await service().tasks.insert({
        tasklist: taskListId,
        requestBody: {
            title: task.title,
            notes: task.notes,
            due: task.due
        }
    });

    return res.data;
}

async function updateTask(taskListId, taskId, updates) {

    const res = await service().tasks.patch({
        tasklist: taskListId,
        task: taskId,
        requestBody: updates
    });

    return res.data;
}

async function completeTask(taskListId, taskId) {

    const res = await service().tasks.patch({
        tasklist: taskListId,
        task: taskId,
        requestBody: {
            status: "completed",
            completed: new Date().toISOString()
        }
    });

    return res.data;
}

async function uncompleteTask(taskListId, taskId) {

    const res = await service().tasks.patch({
        tasklist: taskListId,
        task: taskId,
        requestBody: {
            status: "needsAction",
            completed: null
        }
    });

    return res.data;
}

async function deleteTask(taskListId, taskId) {

    await service().tasks.delete({
        tasklist: taskListId,
        task: taskId
    });

    return true;
}

async function moveTask(taskListId, taskId, previousTaskId) {

    const res = await service().tasks.move({
        tasklist: taskListId,
        task: taskId,
        previous: previousTaskId
    });

    return res.data;
}

module.exports = {

    // Task Lists
    getTaskLists,
    createTaskList,
    renameTaskList,
    deleteTaskList,

    // Tasks
    getTasks,
    getTask,
    createTask,
    updateTask,
    completeTask,
    uncompleteTask,
    deleteTask,
    moveTask
};
