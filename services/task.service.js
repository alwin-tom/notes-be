const { getTasksClient } = require("../googleClient");


async function getTaskLists(){

    const tasks = getTasksClient();

    const response =
        await tasks.tasklists.list();

    return response.data.items || [];
}

async function getTaskLists(tokens) {

    const tasks =
        getTasksClient(tokens);


    const response =
        await tasks.tasklists.list();


    return response.data.items || [];

}

async function getTasks(taskListId){

    const tasks = getTasksClient();

    const response =
        await tasks.tasks.list({
            tasklist: taskListId
        });

    return response.data.items || [];
}



async function createTask(taskListId,data){

    const tasks = getTasksClient();

    const response =
        await tasks.tasks.insert({

            tasklist: taskListId,

            requestBody:{
                title:data.title,
                notes:data.notes,
                due:data.due
            }

        });


    return response.data;
}



async function updateTask(
    taskListId,
    taskId,
    data
){

    const tasks = getTasksClient();


    const response =
        await tasks.tasks.patch({

            tasklist:taskListId,

            task:taskId,

            requestBody:data

        });


    return response.data;
}



async function deleteTask(
    taskListId,
    taskId
){

    const tasks=getTasksClient();


    await tasks.tasks.delete({

        tasklist:taskListId,

        task:taskId

    });


    return {
        success:true
    };

}



module.exports={
    getTaskLists,
    getTasks,
    createTask,
    updateTask,
    deleteTask
};
