"use client"
import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import axios from 'axios';
import { Card } from '@/components/ui/card';
import { number } from 'zod';
import { Mail, Phone, MapPin, CheckCircle, Clock, Calendar, Globe, MapIcon } from 'lucide-react';

const Page = () => {
  const [appointments, setAppointments] = useState([]);

  const handleDatesSet = (arg: any) => {
    console.log('Start Date:', arg.startStr);
    console.log('End Date:', arg.endStr);

    axios.post('/api/appointments', { startDate: arg.startStr, endDate: arg.endStr })
      .then((res) => {
        // Transform the API response to match FullCalendar's expected format
        const events = res.data.appointments.map((appointment: any) => ({
          id: appointment.id,
          title: appointment.contact.email,
          start: appointment.startTime,
          end: appointment.endTime,
          extendedProps: {
            address: appointment.address,
            email: appointment.contact.email,
            phone: appointment.contact.phone,
            fullName: appointment.contact.fullNameLowerCase,
            appointmentStatus: appointment.appointmentStatus,
            location: appointment.contact.locationId,
            isFullDay: appointment.isFullDay,
            timezone: appointment.selectedTimezone,
          },
        }));
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
          plugins={[dayGridPlugin, interactionPlugin]}
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
  const fullName = eventInfo.event.extendedProps.fullName;
  const email = eventInfo.event.extendedProps.email;
  const phone = eventInfo.event.extendedProps.phone;
  const address = eventInfo.event.extendedProps.address;
  const location = eventInfo.event.extendedProps.location;
  const appointmentStatus = eventInfo.event.extendedProps.appointmentStatus;
  const isFullDay = eventInfo.event.extendedProps.isFullDay;
  const timezone = eventInfo.event.extendedProps.timezone;

  return (
    <Dialog>
      <DialogTrigger className="cursor-pointer hover:underline ">
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
              <Phone className="mr-2 " /> Phone Number: {phone}
            </p>
            <p className="flex items-center">
              <Globe className="mr-2 " /> Location: {location}
            </p>
            <p className="flex items-center">
              <MapPin className="mr-2 " width={40} /> Address: {address}
            </p>
            <p className="flex items-center">
              <CheckCircle className="mr-2 " /> Appointment Status: {appointmentStatus}
            </p>
            <p className="flex items-center">
              <Calendar className="mr-2 " /> Full Day Event: {isFullDay ? 'Yes' : 'No'}
            </p>
            <p className="flex items-center">
              <Globe className="mr-2 " /> Timezone: {timezone}
            </p>
            <p className="flex items-center">
              <Clock className="mr-2 " /> Start Time: {new Date(eventInfo.event.start).toLocaleString()}
            </p>
            <p className="flex items-center">
              <Clock className="mr-2 " /> End Time: {new Date(eventInfo.event.end).toLocaleString()}
            </p>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default Page;
