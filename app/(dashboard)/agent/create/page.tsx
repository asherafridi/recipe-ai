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
import { useFetchNumber, useFetchVoice } from '@/hooks/agentHook'

const Page = () => {

    const { voice, voiceLoader } = useFetchVoice();
    const { number, numberLoader } = useFetchNumber();
    const form = useForm();
    const [loading, setLoading] = useState(false);

    const submit = (values: any) => {
        setLoading(true);
        console.log(values);
        axios.post('/api/agent/create', values).then(response => {
            toast.success(response.data?.msg);
            setTimeout(() => {
                setLoading(false);
                form.reset();
            })
        }).catch(e => {
            // toast.error(e?.response?.data?.error);
            setLoading(false);
            console.log(e);
        });
    }


    if ( numberLoader || voiceLoader) {
        return <div className='p-5 bg-white'>Loading...</div>;
    }

    return (
        <div className='p-5 min-h-screen'>
            <Breadcrumb title="Add Agent" />
            <div className="bg-white mt-4 rounded p-4">
                <div className='flex justify-between items-center'>
                    <h3>Add Agent</h3>
                </div>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(submit)} className="space-y-4 w-1/3 mt-4">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Agent Name" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="agentType"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Agent Type</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Agent Type" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="Inbound">Inbound Agent</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="voice"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Voice</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Voice" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {voice.map((element, index) => (
                                                <SelectItem key={index} value={element?.id}>{element?.name} - {element?.description}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="numberId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Number</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Number" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {number.map((element, index) => (
                                                <SelectItem key={index} value={element?.id}>{element?.number}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="prompt"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Prompt</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="Type your prompt here...." {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormButton state={loading} />
                    </form>
                </Form>
            </div>
        </div>
    )
}

export default Page