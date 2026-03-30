export const sendEmail = async ({ toEmail, toName, subject, htmlContent }) => {
    try {
        const response = await fetch('https://api.brevo.com/v3/smtp/email', {
            method: 'POST',
            headers: {
                'accept': 'application/json',
                'api-key': process.env.BREVO_API_KEY,
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                sender: { 
                    name: process.env.BREVO_SENDER_NAME, 
                    email: process.env.BREVO_SENDER_EMAIL 
                },
                to: [{ email: toEmail, name: toName }],
                subject: subject,
                htmlContent: htmlContent 
            })
        });

        const data = await response.json();

        if (!response.ok) {
           
            console.error("Brevo API Error Details:", data);
            throw new Error(data.message || "Email service failed");
        }

        return { success: true, data };
    } catch (error) {
        console.error("Email Utility Error:", error.message);
        throw error;
    }
};