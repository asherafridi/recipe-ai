"use client"
import Breadcrumb from '@/components/Breadcrumb';
import FormButton from '@/components/FormButton';
import { Input } from '@/components/ui/input';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useFetchCall } from '@/hooks/singleCallHook';



const Page = ({ params }: { params: { id: string } }) => {
    const { call, callLoader } = useFetchCall(params.id);
    const [loading, setLoading] = useState(false);

    const router = useRouter();
    const form = useForm();


    if (callLoader) {
        return <div className='p-5 bg-white'>Loading...</div>;
    }


    return (

        <div className='p-5 min-h-screen'>
            <Breadcrumb title="Call Detail" />
            <div className="bg-white mt-4 rounded p-4">

                <p><strong>Call ID:</strong> {call?.call_id}</p>
                <p><strong>From:</strong> {call?.from}</p>
                <p><strong>To:</strong> {call?.to}</p>
                <p><strong>Started At:</strong> {call?.started_at}</p>
                <p><strong>Completed:</strong> {call?.completed ? 'Yes' : 'No'}</p>
                <p><strong>Answered By:</strong> {call?.answered_by}</p>
                <p><strong>Call Length:</strong> {call?.call_length} minutes</p>
                <p><strong>Summary:</strong> {call?.summary}</p>
                {call?.recording_url && (
                <div className='mx-4 my-3'>
                    <p className=''><strong>Recording:</strong></p>
                    <audio controls>
                        <source src={call?.recording_url} type="audio/mpeg" />
                        Your browser does not support the audio element.
                    </audio>
                </div>
            )}
                <ul className='bg-secondary rounded border p-4'>
                <p><strong>Transcript:</strong></p>
                    {call?.transcripts.map(transcript => (
                        <li key={transcript.id}>
                            <strong>{transcript.user}:</strong> {transcript.text}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default Page