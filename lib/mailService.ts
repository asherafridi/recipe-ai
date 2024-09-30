// lib/mailService.ts
import nodemailer, { Transporter } from 'nodemailer';
import { string } from 'zod';

class MailService {
  private transporter: Transporter;
  private from : string;

  constructor(smtp: { host?: string; port: number; user?: string; pass?: string }) {
    const { host, port, user, pass } = smtp;
    this.from = user || process.env.MAIL_USER as string;
    this.transporter = nodemailer.createTransport({
      host: host || process.env.MAIL_HOST as string,  // Fallback to MAIL_HOST env variable
      port: port,
      secure: true,
      auth: {
        user: user || process.env.MAIL_USER as string,  // Fallback to MAIL_USER env variable
        pass: pass || process.env.MAIL_PASS as string,  // Fallback to MAIL_PASS env variable
      },
    });
  }

  async sendMail(to: string, subject: string, htmlContent: string): Promise<any> {
    const mailOptions = {
      from: this.from,
      to,
      subject,
      text: htmlContent,
    };

    try {
      const info = await this.transporter.sendMail(mailOptions);
      console.log('Email sent: ' + info.response);
      return info;
    } catch (error) {
      console.error('Error sending email:', error);
      throw error;
    }
  }

  async sendWelcomeEmail(to: string, name: string): Promise<any> {
    const subject = 'Welcome to Our Platform!';
    const htmlContent = `
      <h1>Welcome, ${name}!</h1>
      <p>We're excited to have you on board.</p>
    `;
    return this.sendMail(to, subject, htmlContent);
  }

  async sendPasswordResetEmail(to: string, resetLink: string): Promise<any> {
    const subject = 'Password Reset Request';
    const htmlContent = `
      <p>Click the link below to reset your password:</p>
      <a href="${resetLink}">Reset Password</a>
    `;
    return this.sendMail(to, subject, htmlContent);
  }

  async sendOrderConfirmationEmail(to: string, orderDetails: { id: string; total: number }): Promise<any> {
    const subject = 'Your Order Confirmation';
    const htmlContent = `
      <h1>Order Confirmation</h1>
      <p>Thank you for your order! Here are the details:</p>
      <p>Order ID: ${orderDetails.id}</p>
      <p>Total: ${orderDetails.total}</p>
    `;
    return this.sendMail(to, subject, htmlContent);
  }


  async sendMeetingEmail(to: string, appointment: any,emailTemplate : string,sender :string): Promise<any> {
    const subject = 'Appointment Confirmed';
    const htmlContent = emailTemplate
    .replace('{{name}}', appointment.name)
    .replace('{{phone_number}}', appointment.phone_number)
    .replace('{{email}}', appointment.email)
    .replace('{{meeting_link}}', appointment.meeting_link)
    .replace('{{start_time}}', appointment.startTime)
    .replace('{{end_time}}', appointment.endTime)
    .replace('{{sender_name}}', sender); 

    return this.sendMail(to, subject, htmlContent);
  }
}


const smtpConfig = {
  host: process.env.MAIL_HOST as string,
  port: parseInt(process.env.MAIL_PORT as string, 10),
  user: process.env.MAIL_USER as string,
  pass: process.env.MAIL_PASS as string,
};


export default MailService;

export { smtpConfig };