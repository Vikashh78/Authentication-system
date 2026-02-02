import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({

    host: 'smtp-relay.brevo.com',
    port: 587,
    secure: false,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_KEY,
    },
})


const sendEmail = async (email, sub, body) => {
    await transporter.sendMail({
        from: process.env.SENDER_EMAIL,
        to: email,
        subject: sub,
        text: body,
    })
}

export default sendEmail;