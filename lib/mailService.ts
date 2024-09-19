// lib/mailService.ts
import nodemailer, { Transporter } from 'nodemailer';

class MailService {
  private transporter: Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail', // You can use other services or SMTP configurations
      auth: {
        user: process.env.MAIL_USER as string,
        pass: process.env.MAIL_PASS as string,
      },
    });
  }

  async sendMail(to: string, subject: string, htmlContent: string): Promise<any> {
    const mailOptions = {
      from: process.env.MAIL_USER as string,
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


  async sendMeetingEmail(to: string, appointment: any): Promise<any> {
    const subject = 'Appointment Confirmed';
    const htmlContent = `<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Appointment Confirmation</title>
  <style>
    body {
      font-family: 'Helvetica Neue', Arial, sans-serif;
      background-color: #f4f4f4;
      color: #333;
      line-height: 1.6;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 600px;
      margin: 30px auto;
      background-color: #fff;
      padding: 30px;
      border-radius: 10px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }
    h1 {
      color: #2c3e50;
      font-size: 26px;
      margin-bottom: 25px;
      text-align: center;
      border-bottom: 2px solid #3498db;
      padding-bottom: 15px;
    }
    p {
      margin-bottom: 15px;
      font-size: 16px;
      color: #555;
    }
    strong {
      color: #fff;
    }
    .appointment-details {
      background-color: #f9f9f9;
      padding: 20px;
      border-radius: 8px;
      margin-top: 25px;
      border-left: 5px solid #3498db;
    }
    .appointment-details p {
      margin: 8px 0;
      font-size: 16px;
      line-height: 1.8;
    }
    a {
      color: #fff;
      text-decoration: none;
      background-color: #3498db;
      padding: 5px 10px;
      border-radius: 5px;
      display: inline-block;
    }
    .footer {
      margin-top: 30px;
      text-align: center;
      color: #7f8c8d;
      font-size: 14px;
      border-top: 1px solid #e1e1e1;
      padding-top: 20px;
    }
      .btn{
      color : #fff;
      }
    .btn:hover {
      background-color: #2980b9;
    }
    .reschedule {
      margin-top: 20px;
      text-align: center;
      font-size: 16px;
    }
    .reschedule a {
      color: #3498db;
      text-decoration: underline;
    }
    .company-logo img {
      max-width: 200px;
      margin-top: 10px;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>Your Appointment is Confirmed!</h1>
    <p>Thank you for choosing to schedule an appointment with us! We're thrilled to connect with you soon and ensure a productive and insightful meeting. Below are the key details of your appointment:</p>
    
    <div class="appointment-details">
      <p>We’re all set to meet with you, <strong>${appointment.name}</strong>! If we need to reach you beforehand, we’ll use the phone number <strong>${appointment.phone_number}</strong> or your email <b>${appointment.email}</b>, so please keep an eye out.</p>
      <p>When it’s time for the meeting, simply click the link below to join:</p>
      <a href="${appointment.meeting_link}" class="btn">Join the Meeting</a>
      <p>We’ll kick things off at <strong>${appointment.startTime}</strong> and wrap up by <strong>${appointment.endTime}</strong></p>
    </div>

    <div class="reschedule">
        <p>We recommend joining the meeting a few minutes early to ensure everything runs smoothly. If you need to make any changes or have any questions, just reply to this email, and we'll be happy to assist.</p>
        <p>We're looking forward to connecting with you soon!</p>
    </div>
    
    <div class="footer">
      <p>Best regards,<br><strong>Suneel</strong></p>
      <div class="company-logo">
        <img src="https://raw.githubusercontent.com/vetasuneel/ideapad_cdn_2/main/idea_pad.png" alt="Your Company Logo">
      </div>
    </div>
  </div>
</body>
</html>
    `;
    return this.sendMail(to, subject, htmlContent);
  }
}

export default new MailService();
