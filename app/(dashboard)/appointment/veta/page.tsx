"use client"
import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import axios from 'axios';
import { Card } from '@/components/ui/card';
import { Mail, Phone, MapPin, CheckCircle, Clock, Calendar, Globe } from 'lucide-react';

const Page = () => {
  const [appointments, setAppointments] = useState([]);

  const handleDatesSet = (arg: any) => {
    console.log('Start Date:', arg.startStr);
    console.log('End Date:', arg.endStr);

    axios.post('/api/appointments/veta/user-booked', { startDate: arg.startStr, endDate: arg.endStr })
      .then((res) => {
        // Transform the API response to match FullCalendar's expected format
        const events = res.data.appointments.map((appointment: any) => ({
          id: appointment.id,
          title: appointment.email,
          extendedProps: {
            fullName: appointment.name,
            email: appointment.email,
            phone: appointment.phone_number,
            address: appointment.address,
            location: appointment.location,
            appointmentStatus: appointment.status,
            isFullDay: appointment.isFullDay,
            timezone: appointment.timezone,
          },
          start: appointment.startTime,
          end: appointment.endTime,
        }));
        console.log(res);
        setAppointments(events);
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <>
      <Card className='p-8'>
        <FullCalendar
          plugins={[timeGridPlugin, interactionPlugin]}
          initialView="timeGridWeek"
          datesSet={handleDatesSet}
          events={appointments}
          eventContent={renderEventContent}
        />
      </Card>
    </>
  );
};

// Function to customize the event content within FullCalendar
function renderEventContent(eventInfo: any) {
  const { fullName, email, phone, address, location, appointmentStatus, isFullDay, timezone } = eventInfo.event.extendedProps;

  return (
    <Dialog>
      <DialogTrigger className="cursor-pointer hover:underline">
        {eventInfo.event.title}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">
            {eventInfo.event.title}
          </DialogTitle>
          <DialogDescription className="space-y-4 mt-4">
            <p className="flex items-center">
              <CheckCircle className="mr-2" /> Name: {fullName}
            </p>
            <p className="flex items-center">
              <Mail className="mr-2" /> Email: {email}
            </p>
            <p className="flex items-center">
              <Phone className="mr-2" /> Phone Number: {phone}
            </p>
            <p className="flex items-center">
              <CheckCircle className="mr-2" /> Appointment Status: {appointmentStatus}
            </p>
            <p className="flex items-center">
              <Clock className="mr-2" /> Start Time: {new Date(eventInfo.event.start).toLocaleString()}
            </p>
            <p className="flex items-center">
              <Clock className="mr-2" /> End Time: {new Date(eventInfo.event.end).toLocaleString()}
            </p>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default Page;
