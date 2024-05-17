"use client"
import Breadcrumb from '@/components/Breadcrumb';
import FormButton from '@/components/FormButton';
import { Input } from '@/components/ui/input';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import {  useRouter } from 'next/navigation';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useFetchAgent,useFetchVoice,useFetchNumber } from '@/hooks/agentHook';



const Page = ({ params }: { params: { id: string } }) => {
    const {data,loader} =  useFetchAgent(params.id);
    const { voice, voiceLoader } = useFetchVoice();
    const { number, numberLoader } = useFetchNumber();
    const [loading, setLoading] = useState(false);
  
    const router = useRouter();
    const form = useForm();


    const submit = (values: any) => {
        setLoading(true);
        axios.post(`/api/agent/update`, {
            ...values,
            id: params.id
        }).then(response => {
            toast.success(response.data?.msg);
            setTimeout(() => {
                setLoading(false);
                router.push('/agent');
            }, 2000);
        }).catch(e => {
            toast.error(e.response.data?.error);
            setLoading(false);
            console.log(e);
        });
    }

    if (loader && numberLoader && voiceLoader) {
        return <div  className='p-5 bg-white'>Loading...</div>;
    }


    return (

        <div className='p-5 min-h-screen'>
            <Breadcrumb title="Edit Agent" />
            <div className="bg-white mt-4 rounded p-4">

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(submit)} className="space-y-4 w-1/3 mt-4">
                        <FormField
                            control={form.control}
                            name="name"
                            defaultValue={data?.name}
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
                            defaultValue={data?.agentType}
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
                            defaultValue={data?.voice}
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
                                                <SelectItem key={index} value={element.id}>{element.name} - {element.description}</SelectItem>
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
                            defaultValue={data?.numberId}
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
                                                <SelectItem key={index} value={element.id}>{element.number}</SelectItem>
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
                            defaultValue={data?.prompt}
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