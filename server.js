import express from "express";
import multer from "multer";
import cors from "cors";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const upload = multer();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (!process.env.GMAIL_USER || !process.env.GMAIL_PASS) {
  console.error(" Ошибка: GMAIL_USER или GMAIL_PASS не заданы в .env");
  process.exit(1);
}

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

app.post("/vacancy", upload.single("file"), async (req, res) => {
  try {
    const { name, surname, email, message } = req.body;
    const file = req.file;

    const mailOptions = {
      from: `"${name || "—"} ${surname || "—"}" <${
        email || "no-reply@example.com"
      }>`,
      to: process.env.GMAIL_USER,
      subject: " Новая заявка по вакансии",
      text: `Имя: ${name || "—"}\nФамилия: ${surname || "—"}\nEmail: ${
        email || "—"
      }\nСообщение: ${message || "—"}`,
      attachments: file
        ? [
            {
              filename: file.originalname,
              content: file.buffer,
            },
          ]
        : [],
    };

    await transporter.sendMail(mailOptions);
    res.json({ success: true, message: "Заявка по вакансии отправлена " });
  } catch (err) {
    console.error(" Ошибка при отправке (вакансии):", err);
    res
      .status(500)
      .json({ success: false, message: "Ошибка при отправке вакансии" });
  }
});

app.post("/contact", upload.none(), async (req, res) => {
  try {
    const { name, email, company, message } = req.body;

    const mailOptions = {
      from: `"${name || "—"}" <${email || "no-reply@example.com"}>`,
      to: process.env.GMAIL_USER,
      subject: "Новая заявка с сайта (контактная форма)",
      text: `Имя: ${name || "—"}\nEmail: ${email || "—"}\nКомпания: ${
        company || "—"
      }\nСообщение: ${message || "—"}`,
    };

    await transporter.sendMail(mailOptions);
    res.json({ success: true, message: "Контактная форма отправлена " });
  } catch (err) {
    console.error(" Ошибка при отправке (контакт):", err);
    res.status(500).json({
      success: false,
      message: "Ошибка при отправке контактной формы",
    });
  }
});

app.get("/", (req, res) => {
  res.send(" Сервер работает! Доступные роуты: POST /vacancy, POST /contact");
});

const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
  console.log(`🚀 Server started on http://localhost:${PORT}`);
});
