export const isAdmin = (req,res,next)=>{
    try {
        if (req.userRole === "admin") {
    next();
}else{
            return res.status(403).json({
                success:false,
                message:"Access denied Admins only"
            });
        }
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Something went wrong",
        });
    }
};