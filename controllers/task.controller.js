const service=require("../services/task.service");

exports.getLists = async(req,res)=>{

    try {

        const tokens = req.session.googleTokens;


        console.log("Google tokens:", tokens);


        if (!tokens) {

            return res.status(401).json({
                error:"Google authentication required"
            });

        }


        const lists =
            await service.getTaskLists(tokens);


        res.json(lists);


    } catch(error) {

        console.error(error);

        res.status(500).json({
            error:"Failed to fetch task lists"
        });

    }

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
