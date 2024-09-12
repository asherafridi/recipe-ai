"use client";
import Breadcrumb from '@/components/Breadcrumb';
import { Input } from '@/components/ui/input';
import React, { useState } from 'react';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useFetchCall } from '@/hooks/singleCallHook';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import FormButton from '@/components/FormButton';
import axios from 'axios';
import { useFetchCampaign } from '@/hooks/campaignHook';
import { Skeleton } from '@/components/ui/skeleton';
import { Card } from '@/components/ui/card';

interface Result {
    questions: any[]
    answers: any[]
}
interface FormValues {
    fields: { user: string; text: string }[];
    goal: string;
}


const Page = ({ params }: { params: { id: string } }) => {
    const { batchLoader, batches } = useFetchCampaign(params.id);
    const [buttonLoading, setButtonLoading] = useState(false);

    const [result, setResult] = useState<Result>();
    const form = useForm<FormValues>({
        defaultValues: {
            fields: [{ user: '', text: '' }],
            goal: ''
        }
    });

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: 'fields'
    });

    const onSubmit = (data: any) => {
        console.log(data);
        setButtonLoading(true);
        toast.success('Analyzing...');
        const values = { ...data, call_id: params.id };
        axios.post('/api/campaign/analyze', values).then(response => {
            toast.success(response.data?.data?.message);
            setResult(response.data?.data);
            console.log(response.data);
            setTimeout(() => {
                setButtonLoading(false);
            })
        }).catch(e => {
            toast.error(e?.response?.data?.error);
            setButtonLoading(false);
            console.log(e);
        });
    };

    if (batchLoader) {
        return <Skeleton className='w-full h-[400px] rounded mt-4' />;
    }

    return (
        <>
            <Card className="bg-white mt-4 rounded p-4">

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <FormField
                            control={form.control}
                            name="goal"
                            render={({ field }) => (
                                <FormItem className='mb-4'>
                                    <FormLabel>Goal</FormLabel>
                                    <FormControl>
                                        <Input type='text' {...field} placeholder='Goal' required />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormLabel>Questions</FormLabel>
                        {fields.map((item, index) => (
                            <div key={index} className="flex items-center space-x-2 mb-2 w-full">
                                <Controller
                                    control={form.control}
                                    name={`fields.${index}.user`}
                                    render={({ field }) => <Input {...field} className='w-4/5' required placeholder={`Question ${index + 1} ?`} />}
                                />
                                <Controller
                                    control={form.control}
                                    name={`fields.${index}.text`}
                                    render={({ field }) =>
                                        <FormItem className='w-1/5'>
                                            <Select onValueChange={field.onChange} required>
                                                <FormControl >
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Type" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value={`human or voicemail`}>Human or Voicemail</SelectItem>
                                                    <SelectItem value={`string`}>Text</SelectItem>
                                                    <SelectItem value={`boolean`}>True or False</SelectItem>

                                                </SelectContent>
                                            </Select>
                                        </FormItem>}
                                />
                                <Button
                                    type="button"
                                    onClick={() => remove(index)}
                                    className="flex items-center justify-center p-2"
                                >
                                    <X size={16} />
                                </Button>
                            </div>
                        ))}
                        <div className="flex space-x-2">
                            <Button
                                type="button"
                                onClick={() => append({ user: '', text: '' })}
                                className="mb-2"
                            >
                                Add Field
                            </Button>
                            <FormButton state={buttonLoading} />
                        </div>
                    </form>
                </Form>
            </Card>

            {result == null ? '' : <div className=''>
                {Object.entries(result.answers).map(([key, value], index) => (
                    <Card className=' mt-2 px-4 py-6' key={index}>
                        <h1>Call id : {key}</h1>
                        {value.map((ele: any, ind: any) => (
                            <div key={ind}>
                                <b>Question No.{ind + 1} : </b>{result.questions[ind][0]}<br />
                                <b>Answer :</b> {ele}
                            </div>
                        ))}
                    </Card>
                ))}
            </div>}
        </>
    )
}

export default Page;
