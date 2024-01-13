import { Task } from "../models/task.js";

export const newTask = async (req,res,next) =>{

    const {title,description} = req.body;
 
    await Task.create({
        title,
        description,
        user:req.user,

    });
    res.status(201)
    .json({
        success:true,
        message:"Task added Successfully",
    }) 
}

export const getMyTask = async(req,res,next)=>{

    const userId = req.user._id;
    

    //jp login user hai uski id match ho jaegi task k userid k sath
    //sirf usi user ka task show krega
    const tasks = await Task.find({user:userId});


    res.status(200).json({
        success:true,
        tasks
    })
}


// export const updateTask = async(req,res,next)=>{

//     const {id} = req.params;
//     const task = await Task.findById(id);
//     if(!task){
//         res.status(404).json({
//             success:false,
//             message:"Invalid ID or no task found to update "
//         })
//     }

//     task.isCompleted = !task.isCompleted;

//     await task.save();


//     res.status(200).json({
//         success:true,
//         message:"Task updated"
//     })
// }


export const updateTask = async (req, res, next) => {
    try {
        const { id } = req.params;
        const task = await Task.findById(id);

        if (!task) {
            return res.status(404).json({
                success: false,
                message: "Invalid ID or no task found to update"
            });
        }

        task.isCompleted = !task.isCompleted;
        await task.save();

        res.status(200).json({
            success: true,
            message: "Task updated"
        });
    } catch (error) {
        // Handle any errors that might occur during the operation
        console.error("Error updating task:", error);
        res.status(500).json({
            success: false,
            message: "Failed to update task"
        });
    }
};


// export const deleteTask = async(req,res,next)=>{

//     const {id} = req.params;
//     const task = await Task.findById(id);

//     if(!task){
//         res.status(404).json({
//             success:false,
//             message:"Invalid ID or no task found"
//         })
//     }

//     await task.deleteOne();

//     res.status(200).json({
//         success:true,
//         message:"Task deleted"
//     })
// }

export const deleteTask = async (req, res, next) => {
    const { id } = req.params;
    const task = await Task.findById(id);

    if (!task) {
        return res.status(404).json({
            success: false,
            message: "Invalid ID or no task found"
        });
    }


    try {
        await task.deleteOne();
        res.status(200).json({
            success: true,
            message: "Task deleted"
        });
    } catch (error) {
        // Handle any database-related errors here
        res.status(500).json({
            success: false,
            message: "Error deleting task"
        });
    }
}