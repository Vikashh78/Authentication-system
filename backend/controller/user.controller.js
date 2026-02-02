import bcrypt from 'bcryptjs'
import generateToken from '../utils/token.util.js'
import userModel from '../models/user.model.js'
import validate from 'validator'


// Function to register new user
const userRegister = async (req, res) => {

    const { name, email, password } = req.body
    
    if(!name || !email || !password) {
        return res.status(400).json({
            success: false,
            message: "Missing required fields"
        })
    }

    try {
        
        if(!validate.isEmail(email)) {
            return res.status(400).json({
                success: false,
                message: 'Please enter a valid email address!'
            })
        }

        if(password.length < 8 ) {
            return res.status(400).json({
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

        const token = await generateToken(newUser._id)

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

// Function for user login
const userLogin = async (req, res) => {

    const { email, password } = req.body

    if(!email || !password) {
        return res.status(400).json({
            success: false,
            message: "Required field is missing"
        })
    }

    try {

        if (!validate.isEmail(email)) {
            return res.status(400).json({
                success: false,
                message: "Email address is not valid"
            })
        }

        const existedUser = await userModel.findOne({email})

        if(!existedUser) {
            return res.status(401).json({
                success: false,
                message: "User not found"
            })

        } 

        const isValid = await bcrypt.compare(password, existedUser.password)
        if(!isValid) {
            return res.status(400).json({
                success: false,
                message: "Invalid login credentials"
            })
        }

        const token = await generateToken(existedUser._id)

        const options = {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production'? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        }

        return res
        .status(200)
        .cookie('token', token, options)
        .json({
            success: true,
            message: 'Logged in successfully'
        })


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

// Function to logout user
const logoutUser = async (req, res) => {
    try {
        const options = {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production'? 'none' : 'strict'
        }

        return res
        .status(200)
        .clearCookie('token', options)
        .json({
            success: true,
            message: "Logged out"
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export { userRegister, userLogin, logoutUser }