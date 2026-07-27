const service=require("../services/task.service");


exports.getLists=async(req,res)=>{

    const data=await service.getTaskLists();

    res.json(data);

};



exports.getTasks=async(req,res)=>{

    const data=
        await service.getTasks(
            req.params.listId
        );

    res.json(data);

};



exports.createTask=async(req,res)=>{

    const data=
        await service.createTask(
            req.params.listId,
            req.body
        );

    res.json(data);

};



exports.updateTask=async(req,res)=>{

    const data=
        await service.updateTask(
            req.params.listId,
            req.params.taskId,
            req.body
        );

    res.json(data);

};



exports.deleteTask=async(req,res)=>{

    const data=
        await service.deleteTask(
            req.params.listId,
            req.params.taskId
        );

    res.json(data);

};
