"use client"
import Breadcrumb from '@/components/Breadcrumb'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import toast from 'react-hot-toast';
import { Button } from '@/components/ui/button';
import { Upload } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import FormButton from '@/components/FormButton';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useAllAgentFetch } from '@/hooks/agentHook';
import { useAllContactFetch } from '@/hooks/contactHook';


const Page = () => {
    const { data, loading } = useAllAgentFetch();
    const { contact, contactLoader } = useAllContactFetch();
    const form = useForm();
    const [buttonLoading, setButtonLoading] = useState(false);

    const submit = (values: any) => {
        setButtonLoading(true);
        console.log(values);
        axios.post('/api/call/create', values).then(response => {
            toast.success(response.data?.msg);
            setTimeout(() => {
                setButtonLoading(false);
                form.reset();
            })
        }).catch(e => {
            // toast.error(e?.response?.data?.error);
            setButtonLoading(false);
            console.log(e);
        });
    }


    if (loading && contactLoader) {
        return <div className='p-5 bg-white'>Loading...</div>;
    }


    return (
        <div className='p-5 min-h-screen'>
            <Breadcrumb title="Make Call" />
            <div className="bg-white mt-4 rounded p-4">
                <div className='flex justify-between items-center'>
                    <h3>Make an Call</h3>
                </div>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(submit)} className="space-y-4 w-1/3 mt-4">


                        <FormField
                            control={form.control}
                            name="agentId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Agent</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Agent" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {data.map((element, index) => (
                                                <SelectItem key={index} value={`${element?.id}`}>{element?.name}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="contactId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Contact</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Number" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {contact.map((ele, index) => (
                                                <SelectItem key={index} value={`${ele?.id}`}>{ele?.name}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

<FormField
                            control={form.control}
                            name="time"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Time</FormLabel>
                                    <FormControl>
                                        <Input type='datetime-local' {...field}/>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="duration"
                            defaultValue={1}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Max Duration</FormLabel>
                                    <FormControl>
                                        <Input type='number' {...field}/>
                                    </FormControl>
                                    <FormDescription>One Minute Call Cost around 0.16$</FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormButton state={buttonLoading} />
                    </form>
                </Form>
            </div>
        </div>
    )
}

export default Page