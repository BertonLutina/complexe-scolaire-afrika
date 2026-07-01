import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';

const app = express();

const allowedOrigins = (process.env.CORS_ORIGIN || '*')
  .split(',')
  .map((o) => o.trim())
  .filter(Boolean);

app.use(
  cors({
    origin: allowedOrigins.includes('*') ? true : allowedOrigins,
  })
);
app.use(express.json());

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

app.get('/health', (_req, res) => res.json({ status: 'ok' }));

app.post('/contact', async (req, res) => {
  const { name, email, phone, message } = req.body || {};

  if (!name || !email || !phone || !message) {
    return res.status(400).json({ error: 'Champs manquants' });
  }

  try {
    await transporter.sendMail({
      from: `"Site Complexe Scolaire Afrika" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_TO || process.env.SMTP_USER,
      replyTo: email,
      subject: `Nouvelle demande d'inscription — ${name}`,
      text: `Nom: ${name}\nEmail: ${email}\nTéléphone: ${phone}\n\nMessage:\n${message}`,
      html: `<p><strong>Nom:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Téléphone:</strong> ${phone}</p><p><strong>Message:</strong><br/>${message.replace(/\n/g, '<br/>')}</p>`,
    });
    res.json({ ok: true });
  } catch (err) {
    console.error('Erreur envoi email:', err);
    res.status(500).json({ error: "Échec de l'envoi" });
  }
});

const port = process.env.PORT || 4001;
app.listen(port, () => console.log(`Contact API running on port ${port}`));
