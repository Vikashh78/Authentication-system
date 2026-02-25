import userModel from "../models/user.model.js";

const userData = async (req, res) => {

    const userId = req?.userId
    
    try {
        const user = await userModel.findById(userId)
        if(!user) {
            return res.status(401).json({success: false, message: 'User not found'})
        }

        const userData = {
            name: user.name,
            email: user.email,
            isAccountVerified: user.isAccountVerified
        }
        
        return res.status(200).json({
            success: true,
            userData: userData
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({success: false, message: error.message})
    }
}

export { userData }