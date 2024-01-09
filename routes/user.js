import express from "express";
import { register,login,getMyProfile,logout } from "../controllers/user.js";
import { isAuthenticated } from "../middleware/auth.js";

const router = express.Router();


// router.get("/all",getAllUsers);

router.post("/new",register);

router.post("/login",login);

router.post("/logout",logout);


//we use router.route when we have same path 
// router.route("/userid/:id").get(getUserDetails);

 router.get("/me",isAuthenticated, getMyProfile);



 export default router;