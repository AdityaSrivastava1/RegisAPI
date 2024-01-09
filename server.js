import { app } from "./app.js";

import { connectdb } from "./data/database.js";



// database
connectdb(); 


console.log(process.env.PORT);
app.listen(process.env.PORT,()=>{
    console.log(`Server is working on port :${process.env.PORT} in ${process.env.NODE_ENV} Mode`);
})