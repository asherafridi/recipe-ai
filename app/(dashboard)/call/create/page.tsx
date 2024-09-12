"use client"
import Breadcrumb from '@/components/Breadcrumb';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Button } from '@/components/ui/button';
import { Upload } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import FormButton from '@/components/FormButton';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useAllAgentFetch } from '@/hooks/agentHook';
import { useAllContactFetch } from '@/hooks/contactHook';
import { Skeleton } from '@/components/ui/skeleton';
import { Card } from '@/components/ui/card';

const Page = () => {
    const { data: agents, loading: agentsLoading } = useAllAgentFetch();
    const { contact: contacts, contactLoader } = useAllContactFetch();
    const form = useForm();
    const [buttonLoading, setButtonLoading] = useState(false);

    const submit = async (values: any) => {
        setButtonLoading(true);
        try {
            const response = await axios.post('/api/call/create', values);
            toast.success(response.data?.msg);
            form.reset();
        } catch (e: any) {
            toast.error(e?.response?.data?.msg || 'Failed to create call');
        } finally {
            setButtonLoading(false);
        }
    };

    if(agentsLoading && contactLoader){
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

                            <FormField
                                control={form.control}
                                name="contactId"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Contact</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select Contact" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {contacts.map((ele, index) => (
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
                                name="duration"
                                defaultValue={1}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Max Duration</FormLabel>
                                        <FormControl>
                                            <Input type='number' {...field} min={1} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormButton state={buttonLoading} text={'Send Call'} />
                        </form>
                    </Form>
            </Card>
    )
};

export default Page;
