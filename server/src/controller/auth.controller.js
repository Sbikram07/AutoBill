const Admin=require("../model/admin.model");


const login=async(req,res)=>{
    try {
        // console.log("login endpoin hit")
        const {name,admin_key}=req.body;
        // console.log(req.body)
   
        const admin=await Admin.findOne({name,admin_key});
        if(admin){
            res.cookie("admin_id", admin._id, {
              httpOnly: true,
              secure: false,
              sameSite: "lax",
            });

           return  res.status(200).json({
                success:true,
                message :`${name} login successfully`
            });
         
        }
        else{
           return  res.status(400).json({
                success:false,
                message :`Invalid credentials, login failed`
            });
        }
        
    } catch (error) {
        return res.status(500).json({
            success:false,
            message :error.message 
        })
    }
}

const logout=async(req,res)=>{
    try {
        res.clearCookie("admin_id");
        return res.status(200).json({
            success:true,
            message :`Logout successfully`
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message :`Internal server error`
        })
    }
}

const verifyPin=async(req,res)=>{
    try {
        const {admin_pin}=req.body;
        const admin=await Admin.findOne({admin_pin});
        if(admin){
            res.cookie.admin_id = admin._id;
           return  res.status(200).json({
                success:true,
                message :`Admin verified successfully`
            });
         
        }
        else{
           return  res.status(400).json({
                success:false,
                message :`Invalid credentials, verification failed`
            });
        }
        
    } catch (error) {
        return res.status(500).json({
            success:false,
            message :`Internal server error`
        })
    }
}

const createAdmin=async(req,res)=>{
    try {
        const {name,admin_key,admin_pin}=req.body;
        const admin=new Admin({name,admin_key,admin_pin});
        const savedAdmin=await admin.save();
        res.status(200).json(savedAdmin);
    } catch (error) {
        res.status(500).json(error);
    }
}

module.exports={
    login,
    logout,
    verifyPin,
    createAdmin
}