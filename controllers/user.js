// import { User } from "../models/user.js";
// import bcrypt from "bcrypt";
// import { sendCookie } from "../utils/features.js";


// // export const getAllUsers = async (req,res)=>{
 
// // }

// export const login = async (req,res)=>{

//     const {email,password} = req.body;

//     let user = await User.findOne({email}).select("+password");

//  if(!user){
//         return res.status(404).json({
//             success:false,
//             message:"Invalid Email or Password",
//         })
//     }

//     const isMatch = await bcrypt.compare(password,user.password);

//     if(!isMatch){
//         return res.status(404).json({
//             success:false,
//             message:"Invalid Email or Password",
//         })
//     }

//     sendCookie(user,res,`Welcome Back ${user.name}`,200);
// }


// export const register = async (req,res)=>{

//     const {name , email , password} = req.body;

//     let  user = await User.findOne({email});

//     if(user){
//         return res.status(404).json({
//             success:false,
//             message:"User Already Exist",
//         })
//     }

//     const hashedPassword = await bcrypt.hash(password,10);
   

//     user = await User.create({name , email , password:hashedPassword});

//     sendCookie(user,res,"Registered Successfully",201); 

// //insbko utils/feaures.js mae move kr rhe 👇
// // Token Generation
// //we are using token so that user could be redirected to dashboard after register
// // const token = jwt.sign({_id:user._id},process.env.JWT_SECRET);
// // // status :201 -> sb ok 
// // res.status(201)
// // .cookie("token",token,{
// //     httpOnly:true,
// //     maxAge : 15*60*1000,
// // })
// // .json({
// //     success:true,
// //     message:"Registered Successfully",
// // })


// }

// export const getMyProfile = (req,res)=>{

//     //in order to get details we have to access the user id
//     // moved below file to middleware/auth.js 👇
//     // const {token} = req.cookies;
//     // if(!token)
//     // {
//     //     return res.status(404).json({
//     //         success:false,
//     //         message:"Login First",
//     //     }) 
//     // }
  
//     // //with the  help of token we can fetch information about user
//     // const decoded = jwt.verify(token,process.env.JWT_SECRET);
//     // const user = await User.findById(decoded._id);

     
//     res.status(200).json({
//         success:true,
//         user:req.user,
//     })

// }


//     export const logout = (req,res)=>{

//         //cookie ko empty kr rhe 
//         res.status(200)
//         .cookie("token"," ",{
            
//             expires:new Date(Date.now()),
//             sameSite:process.env.NODE_ENV === "Development"? "lax":"none",
//             secure:process.env.NODE_ENV === "Development"? "false":"true",
        
        
//         })
//         .json({
//             success:true,
//             message:"logout successfully",
            
//         })

//     }

 


import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import { sendCookie } from "../utils/features.js";
// import ErrorHandler from "../middlewares/error.js";

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");

 if(!user){
        return res.status(404).json({
            success:false,
            message:"Invalid Email or Password",
        })
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch)
      return next(new ErrorHandler("Invalid Email or Password", 400));

    sendCookie(user, res, `Welcome back, ${user.name}`, 200);
  } catch (error) {
    next(error);
  }
};

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    let user = await User.findOne({ email });

    if (user) return next(new ErrorHandler("User Already Exist", 400));

    const hashedPassword = await bcrypt.hash(password, 10);

    user = await User.create({ name, email, password: hashedPassword });

    sendCookie(user, res, "Registered Successfully", 201);
  } catch (error) {
    next(error);
  }
};

export const getMyProfile = (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
};

export const logout = (req, res) => {
  res
    .status(200)
    .cookie("token", "", {
      expires: new Date(Date.now()),
      sameSite: process.env.NODE_ENV === "Develpoment" ? "lax" : "none",
      secure: process.env.NODE_ENV === "Develpoment" ? false : true,
    })
    .json({
      success: true,
      user: req.user,
    });
};