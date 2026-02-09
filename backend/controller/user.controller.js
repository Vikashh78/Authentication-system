import bcrypt from 'bcryptjs'
import generateToken from '../utils/token.util.js'
import userModel from '../models/user.model.js'
import validate from 'validator'
import sendEmail from '../config/nodeMailer.config.js'


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

        // Sending user a welcome email
        const sub = 'Welcome to Srma'
        const body = `Welcome to Srma world! Your account with email: ${email} has been created successfully.`
        await sendEmail(email, sub, body);

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


const verifyOtp = async (req, res) => {
    const {userId} = req.userId
    try {
        const user = await userModel.findById(userId)
        if(!user) {
            return res.status(401).json({
                success: false,
                message: "User does not exits"
            })
        }

        if(user.isAccountVerified) {
            return res.status(401).json({
                success: false,
                message: "User already verified"
            })
        }

        const otp = Math.floor(100000+Math.random()*900000) 
        user.verifyOtp = otp
        user.isAccountVerified = true
        user.resetOtpExpiresAt = Date.now() + 24*60*60*1000

        

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export { userRegister, userLogin, logoutUser }