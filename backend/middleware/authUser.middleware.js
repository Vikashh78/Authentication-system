import jwt from 'jsonwebtoken'

const authUser = async (req, res, next) => {
    try {
        const token = req.cookies?.token

        if(!token) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized Please login again."
            })
        }

        const decoded_token = jwt.verify(token, process.env.JWT_ACCESS_SECRET)
        
        req.userId = decoded_token._id
        
        next();
        
    } catch (error) {
        console.log(error)
        return res.status(401).json({
            success: false,
            message: "Invalid or expired token"
        });
    }
}

export default authUser