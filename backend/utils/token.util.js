import jwt from 'jsonwebtoken'

const generateToken = async (userId) => {

    const payload = { userId }

    const token = jwt.sign(
        payload,
        process.env.JWT_ACCESS_SECRET,
        { expiresIn: '7d' }
    )
    return token
}

export default generateToken;