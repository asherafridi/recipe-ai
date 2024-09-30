import axios from "axios";
import qs from "qs";

const appointmentMailSender  = async (to: string, appointment: any,emailTemplate : string,sender :string,smtp:any)=>{
    const subject = 'Appointment Confirmed';
    const htmlContent = emailTemplate
    .replace('{{name}}', appointment.name)
    .replace('{{phone_number}}', appointment.phone_number)
    .replace('{{email}}', appointment.email)
    .replace('{{meeting_link}}', appointment.meeting_link)
    .replace('{{start_time}}', appointment.startTime)
    .replace('{{end_time}}', appointment.endTime)
    .replace('{{sender_name}}', sender); 

    const options = {
        host :  smtp.host,
        user : smtp.user,
        password : smtp.pass,
        port : smtp.port,
        html : htmlContent,
        subject : 'Appointment Confirmed',
        to : to
    }
    
    await axios.post('https://calling.vetaai.com/index.php',qs.stringify(options), {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    }  ).then((res)=>{
        console.log(res.data);
    }).catch((e)=>{
        console.log(e);
    });



}


export {appointmentMailSender};