const service=require("../services/task.service");

exports.getLists = async(req,res)=>{

    const tokens = req.session.googleTokens;


    if(!tokens){
        return res.status(401).json({
            error:"Google authentication required"
        });
    }


    const lists =
        await service.getTaskLists(tokens);


    res.json(lists);

};

exports.getTasks=async(req,res)=>{

    const data=
        await service.getTaskLists(
            req.session.googleTokens
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
