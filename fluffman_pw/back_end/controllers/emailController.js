import nodemailer from 'nodemailer';

// Funzione per inviare un'email
export async function sendEmail(req, res) {
    // Estrai i dati dal corpo della richiesta
    const { to, subject, body } = req.body;

    // Validazione dei dati in ingresso
    if (!to || !subject || !body) {
        return res.status(400).json({ error: true, message: "Destinatario, oggetto e corpo del messaggio sono obbligatori." });
    }

    try {
        // Creazione del "trasportatore" con le tue credenziali OAuth2
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: process.env.EMAIL_USER,
                clientId: process.env.GOOGLE_CLIENT_ID,
                clientSecret: process.env.GOOGLE_CLIENT_SECRET,
                refreshToken: process.env.GOOGLE_REFRESH_TOKEN
            }
        });

        // Opzioni dell'email
        let mailOptions = {
            from: process.env.EMAIL_USER,
            to: to,
            subject: subject,
            html: body
        };

        // Invio dell'email
        await transporter.sendMail(mailOptions);

        // Risposta di successo
        res.status(200).json({ success: true, message: "Email inviata con successo." });
    } catch (err) {
        // Gestione degli errori
        console.error("Errore nell'invio dell'email:", err);
        res.status(500).json({ error: true, message: "Si è verificato un errore durante l'invio dell'email." });
    }
}