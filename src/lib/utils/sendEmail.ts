import nodemailer, { Transporter } from "nodemailer";

interface EmailOptions {
  to: string | string[];
  subject: string;
  html: string;
}

const sendEmail = async (options: EmailOptions): Promise<void> => {
  const transporter: Transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER as string,
      pass: process.env.EMAIL_PASS as string,
    },
  });
  console.log("Sending email...", options.to);

  const mailOptions = {
    from: process.env.EMAIL_USER as string,
    to: Array.isArray(options.to) ? options.to.join(",") : options.to,
    subject: options.subject,
    html: options.html,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
  } catch (error) {
    console.log("Error occurred while sending email:", error);
    throw new Error("Error occurred while sending email");
  }
};

export default sendEmail;
