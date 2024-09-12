"use client"
import Breadcrumb from '@/components/Breadcrumb';
import FormButton from '@/components/FormButton';
import { Input } from '@/components/ui/input';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useFetchAgent, useFetchVoice } from '@/hooks/agentHook';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

import { useNumberFetch } from '@/hooks/numberHook';
import { useInboundAgentDetail } from '@/hooks/inboundAgentHook';
import { useToolsFetch, useVectorFetch } from '@/hooks/vectorHook';
import { Skeleton } from '@/components/ui/skeleton';



const Page = ({ params }: { params: { id: string } }) => {
    const { voice, voiceLoader } = useFetchVoice();
    const [loading, setLoading] = useState(false);

    const { agent, agentLoader } = useInboundAgentDetail(params.id);

    
    const { vector, vectorLoader } = useVectorFetch();
    const { tools, toolsLoader } = useToolsFetch();

    console.log(agent);
    const form = useForm();


    const submit = (values: any) => {
        setLoading(true);
        axios.post(`/api/inbound-agent/update`, {
            ...values,
            id: params.id
        }).then(response => {
            toast.success(response.data?.msg);
            setTimeout(() => {
                setLoading(false);
                // router.push('/inbound-agent');
            }, 2000);
        }).catch(e => {
            toast.error(e.response.data?.error);
            setLoading(false);
            console.log(e);
        });
    }

    if (agentLoader && voiceLoader && vectorLoader && toolsLoader) {
        return <Skeleton className='w-full h-[400px] rounded mt-4'/>;
    }


    return (

        <div className='p-5 min-h-screen'>
            <div className="bg-white mt-4 rounded p-4">

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(submit)} className="flex w-full flex-wrap">
                        
                        <FormField
                            control={form.control}
                            name="voice_id"
                            defaultValue={agent?.voice_id}
                            render={({ field }) => (
                                <FormItem className='w-full md:w-1/2 lg:w-1/2 p-2'>
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
                            name="first_sentence"
                            defaultValue={agent?.first_sentence}
                            render={({ field }) => (
                                <FormItem className='w-full md:w-1/2 lg:w-1/2 p-2'>
                                    <FormLabel>First Sentence</FormLabel>
                                    <FormControl>
                                        <Input placeholder="First Sentence" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="prompt"
                            defaultValue={agent?.prompt}
                            render={({ field }) => (
                                <FormItem className='w-full mb-4'>
                                    <FormLabel>Prompt</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="Type your prompt here...." {...field} className='w-full' rows={10} />
                                    </FormControl>
                                    <FormMessage />
                                    <FormDescription className='text-right text-blue'><a className='text-blue-800 ' href="">Prompt Guide</a></FormDescription>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="max_duration"
                            defaultValue={agent?.max_duration}
                            render={({ field }) => (
                                <FormItem className='w-full md:w-1/2 lg:w-1/4 p-2'>
                                    <FormLabel>Max Duration</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Max Duration" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />


                        <FormField
                            control={form.control}
                            name="transfer_phone_number"
                            defaultValue={agent?.transfer_phone_number}
                            render={({ field }) => (
                                <FormItem className='w-full md:w-1/2 lg:w-1/4 p-2'>
                                    <FormLabel>Transfer Number</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Transfer Call to" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="language"
                            defaultValue={agent?.language}
                            render={({ field }) => (
                                <FormItem className='w-full md:w-1/2 lg:w-1/4 p-2'>
                                    <FormLabel>Language</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={agent?.language}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Wait For Greeting" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value='ENG'>English</SelectItem>
                                            <SelectItem value='ESP'>Spanish</SelectItem>
                                            <SelectItem value='FRE'>French</SelectItem>
                                            <SelectItem value='POL'>Polish</SelectItem>
                                            <SelectItem value='GER'>German</SelectItem>
                                            <SelectItem value='ITA'>Italian</SelectItem>
                                            <SelectItem value='PBR'>Brazilian Portuguese</SelectItem>
                                            <SelectItem value='POR'>Portuguese</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="model"
                            defaultValue={agent?.model}
                            render={({ field }) => (
                                <FormItem className='w-full md:w-1/2 lg:w-1/4 p-2'>
                                    <FormLabel>Model</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={agent?.model}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Model" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value='enhanced'>Enhanced</SelectItem>
                                            <SelectItem value='gpt4'>GPT 4</SelectItem>
                                            <SelectItem value='base'>Base</SelectItem>
                                            <SelectItem value='turbo'>Turbo</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                                    
<FormField
                            control={form.control}
                            name="information"
                            render={({ field }) => (
                                <FormItem className='w-full md:w-full lg:w-full p-2'>
                                    <FormLabel>Company Informations</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Information" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {vector.map((element, index) => (
                                                <SelectItem key={index} value={element?.vector_id}>{element?.name} - {element?.description}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />  

                        <FormField
                            control={form.control}
                            name="tools"
                            render={({ field }) => (
                                <FormItem className='w-full md:w-full lg:w-full p-2'>
                                    <FormLabel>Tools</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Tools" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {tools.map((element, index) => (
                                                <SelectItem key={index} value={element?.tool_id}>{element?.tool?.name}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <br /><br />
                        <FormButton state={loading} />
                    </form>
                </Form>
            </div>
        </div>
    )
}

export default Page