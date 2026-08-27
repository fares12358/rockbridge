import welcomeTemplate from "../utils/emailTemplates/welcomeTemplate.js";
import sendEmail from "../utils/sendEmail.js";

export const sendWelcomeEmail = async (req, res) => {
    try {
        const { to, name } = req.body;
        const html = welcomeTemplate({
            name,
            message: "Welcome to our platform! We're glad to have you on board.",
        });

        await sendEmail(
            to,
            'Welcome to Our Platform!',
            html
        );
        res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Email failed', error });
    }
};
