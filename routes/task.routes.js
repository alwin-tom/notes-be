const router=require("express").Router();

const controller=require("../controllers/task.controller");


router.get(
"/lists",
controller.getLists
);


router.get(
"/:listId",
controller.getTasks
);


router.post(
"/:listId",
controller.createTask
);


router.put(
"/:listId/:taskId",
controller.updateTask
);


router.delete(
"/:listId/:taskId",
controller.deleteTask
);


module.exports=router;
