import bcrypt from 'bcryptjs'
import generateToken from '../utils/token.util.js'
import userModel from '../models/user.model.js'
import validate from 'validator'

// Function to register new user
const userRegister = async (req, res) => {

    const { name, email, password } = req.body
    
    if(!name || !email || !password) {
        return res.status(401).json({
            success: false,
            message: "Missing required fields"
        })
    }

    try {
        
        if(!validate.isEmail(email)) {
            return res.status(401).json({
                success: false,
                message: 'Please enter a valid email address!'
            })
        }

        if(password.length < 8 ) {
            return res.status(401).json({
                success: false,
                message: 'Password length should be greater or equals to 8'
            })
        }

        const existedUser = await userModel.findOne({email})
        if(existedUser) {
            return res.status(401).json({
                success: false,
                message: 'User already exits with this email'
            })
        }

        const saltRounds = await bcrypt.genSalt(10)
        const hashPass = await bcrypt.hash(password, saltRounds)

        const newUser = await userModel.create({
            name,
            email,
            password: hashPass
        })

        const token = generateToken(newUser._id)

        const user = await userModel.findById(newUser._id).select("name email")

        const options = {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production'? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000 //milisec
        }

        return res
        .status(201)
        .cookie("token", token, options) //name, val, opt
        .json({
            success: true,
            message: 'Account created successfully',
            user
        })


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}


export {userRegister}