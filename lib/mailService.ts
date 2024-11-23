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
      html: htmlContent,
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
    const subject = 'Welcome to Recipe AI!';
    const htmlContent = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body {
            margin: 0;
            padding: 0;
            font-family: Arial, sans-serif;
            background-color: #f4f4f9;
            color: #333;
            line-height: 1.6;
          }
          .email-container {
            max-width: 600px;
            margin: 0 auto;
            background: #ffffff;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          }
          .email-header {
            background: #6c63ff;
            color: #ffffff;
            text-align: center;
            padding: 20px;
          }
          .email-header h1 {
            margin: 0;
            font-size: 24px;
          }
          .email-body {
            padding: 20px;
            text-align: center;
          }
          .email-body h2 {
            font-size: 22px;
            color: #6c63ff;
            margin-bottom: 10px;
          }
          .email-body p {
            font-size: 16px;
            margin: 10px 0;
            color: #555;
          }
          .email-footer {
            text-align: center;
            padding: 15px;
            font-size: 14px;
            color: #888;
            background: #f4f4f9;
          }
          .email-footer a {
            color: #6c63ff;
            text-decoration: none;
          }
        </style>
      </head>
      <body>
        <div class="email-container">
          <!-- Header Section -->
          <div class="email-header">
            <h1>Recipe AI</h1>
          </div>
  
          <!-- Body Section -->
          <div class="email-body">
            <h2>Welcome, ${name}!</h2>
            <p>We're thrilled to have you join the Recipe AI family. Explore countless recipes and elevate your cooking skills with ease!</p>
            <p>Feel free to dive right in and start creating amazing dishes today.</p>
          </div>
  
          <!-- Footer Section -->
          <div class="email-footer">
            <p>If you have any questions, <a href="mailto:support@recipeai.com">contact us</a>.</p>
            <p>&copy; ${new Date().getFullYear()} Recipe AI. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
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