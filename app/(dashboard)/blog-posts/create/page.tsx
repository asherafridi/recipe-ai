"use client"
import Breadcrumb from '@/components/Breadcrumb';
import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Button } from '@/components/ui/button';
import { Upload } from 'lucide-react';
import { Controller, useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import 'react-phone-input-2/lib/style.css';
import FormButton from '@/components/FormButton';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useAllAgentFetch } from '@/hooks/agentHook';
import { useAllContactFetch } from '@/hooks/contactHook';
import { Skeleton } from '@/components/ui/skeleton';
import { Card } from '@/components/ui/card';
import PhoneInput from 'react-phone-input-2'; // Make sure this is imported
import { Label } from '@/components/ui/label';

const Page = () => {
    const { data: agents, loading: agentsLoading } = useAllAgentFetch();
    const { contact: contacts, contactLoader } = useAllContactFetch();
    const form = useForm();
    const [buttonLoading, setButtonLoading] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState(''); // Add state for PhoneInput

    const submit = async (values: any) => {
        setButtonLoading(true);


        const formattedPhoneNumber = phoneNumber.startsWith('+') ? phoneNumber.slice(1) : phoneNumber;

        const contactData = {
            agentId:values.agentId,
            number: '+' + formattedPhoneNumber // include the formatted phone number with country code
          };
        try {
            const response = await axios.post('/api/call/create', contactData);
            toast.success(response.data?.msg);
            form.reset();
            setPhoneNumber(''); // Reset phone number as well
        } catch (e: any) {
            toast.error(e?.response?.data?.msg || 'Failed to create call');
        } finally {
            setButtonLoading(false);
        }
    };

    if (agentsLoading && contactLoader) {
        return <Skeleton className='w-full h-[400px] rounded' />;
    }

    return (
        <Card className=" p-4">
            <div className='flex justify-between items-center'>
                <h3>Send Call</h3>
            </div>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(submit)} className="space-y-4 w-full lg:w-full mt-4">
                    <FormField
                        control={form.control}
                        name="agentId"
                        rules={{ required: 'Agent is required' }} // Add validation
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Agent</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select Agent" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {agents.map((element, index) => (
                                            <SelectItem key={index} value={`${element?.id}`}>{element?.name}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />


                    {/* Phone Number Input */}
                    <div className='w-full mt-4'>
                        <Label htmlFor='number'>Phone Number</Label>
                        <Controller
                            name="number"
                            control={form.control}
                            render={({ field }) => (
                                <PhoneInput
                                    country={'us'}
                                    value={phoneNumber}
                                    onChange={(phone) => {
                                        setPhoneNumber(phone);
                                        field.onChange(phone); // Update react-hook-form state
                                    }}
                                    inputClass="w-full mt-2"
                                    inputStyle={{ width: '100%' }}
                                    placeholder='+1 (555) 555-5555'
                                />
                            )}
                            rules={{ required: true }}
                        />
                    </div>

                    <FormButton state={buttonLoading} text={'Send Call'} />
                </form>
            </Form>
        </Card>
    )
};

export default Page;
