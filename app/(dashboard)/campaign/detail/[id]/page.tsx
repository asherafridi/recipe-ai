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
import { useFetchCampaign } from '@/hooks/campaignHook'; 



const Page = ({ params }: { params: { id: string } }) => {
    const { batches, batchLoader } = useFetchCampaign(params.id);
    const [loading, setLoading] = useState(false);

    const router = useRouter();
    const form = useForm();


    if (loading || batchLoader) {
        return <div className='p-5 bg-white'>Loading...</div>;
    }


    return (

        <div className='p-5 min-h-screen'>
            <Breadcrumb title="Call Detail" />
            <div className="bg-white mt-4 rounded p-4">
                <h2 className="text-2xl font-bold mb-4">batches Details</h2>
                <div>
                    <p><strong>batches ID:</strong> {batches?.batch_params.id}</p>
                    <p><strong>Label:</strong> {batches?.batch_params.label}</p>
                    <p><strong>Base Prompt:</strong> {batches?.batch_params.base_prompt}</p>
                    <p><strong>Endpoint Code:</strong> {batches?.batch_params.endpoint_code}</p>
                    <p><strong>Created At:</strong> {new Date(batches?.batch_params.created_at).toLocaleString()}</p>
                </div>

                <h3 className="text-xl font-semibold mt-6">Call Parameters</h3>
                <div>
                    <p><strong>Reduce Latency:</strong> {batches?.batch_params.call_params.reduce_latency}</p>
                    <p><strong>Voice ID:</strong> {batches?.batch_params.call_params.voice_id}</p>
                    <p><strong>Language:</strong> {batches?.batch_params.call_params.language}</p>
                    <p><strong>Max Duration:</strong> {batches?.batch_params.call_params.max_duration}</p>
                    <p><strong>Wait for Greeting:</strong> {batches?.batch_params.call_params.wait_for_greeting}</p>
                </div>

                <h3 className="text-xl font-semibold mt-6">Call Data</h3>
                {batches?.call_data.map((call, index) => (
                    <div key={index} className="border-b py-2">
                        <p><strong>Call ID:</strong> {call.call_id}</p>
                        <p><strong>Status:</strong> {call.status}</p>
                        <p><strong>From:</strong> {call.from}</p>
                        <p><strong>To:</strong> {call.to}</p>
                        <p><strong>Answered By:</strong> {call.answered_by}</p>
                        <p><strong>Created At:</strong> {new Date(call.created_at).toLocaleString()}</p>
                        <p><strong>End At:</strong> {new Date(call.end_at).toLocaleString()}</p>
                        <p><strong>Duration:</strong> {call.corrected_duration} seconds</p>
                        <p><strong>Transcripts:</strong></p>
                        <ul className="ml-4">
                            {call.transcripts.map((transcript, tIndex) => (
                                <li key={tIndex}>
                                    <strong>{transcript.user}:</strong> {transcript.text} <em>({new Date(transcript.created_at).toLocaleString()})</em>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}

                <h3 className="text-xl font-semibold mt-6">Analysis</h3>
                <div>
                    <p><strong>Total Calls:</strong> {batches?.analysis.total_calls}</p>
                    <p><strong>Completed Calls:</strong> {batches?.analysis.completed_calls}</p>
                    <p><strong>In Progress Calls:</strong> {batches?.analysis.in_progress_calls}</p>
                    <h4 className="text-lg font-semibold mt-4">Queue Statuses</h4>
                    <ul>
                        <li><strong>Complete:</strong> {batches?.analysis.queue_statuses.complete}</li>
                        <li><strong>Started:</strong> {batches?.analysis.queue_statuses.started}</li>
                        <li><strong>Call Error:</strong> {batches?.analysis.queue_statuses.call_error}</li>
                    </ul>

                    <h4 className="text-lg font-semibold mt-4">Call Lengths</h4>
                    <p><strong>Average Length:</strong> {batches?.analysis.call_lengths.average} seconds</p>
                    <p><strong>Average Non-Zero Length:</strong> {batches?.analysis.call_lengths.average_nonzero} seconds</p>
                    <h5 className="text-md font-semibold mt-2">Summary</h5>
                    <ul>
                        {Object.entries(batches?.analysis.call_lengths.summary).map(([range, count], index) => (
                            <li key={index}><strong>{range}:</strong> {count} calls</li>
                        ))}
                    </ul>

                    <h4 className="text-lg font-semibold mt-4">Error Messages</h4>
                    <ul>
                        {batches?.analysis.error_messages.map((error, index) => (
                            <li key={index}><strong>{error.call_id}:</strong> {error.error_message}</li>
                        ))}
                    </ul>

                    <h4 className="text-lg font-semibold mt-4">Endpoints</h4>
                    <ul>
                        {Object.entries(batches?.analysis.endpoints).map(([endpoint, count], index) => (
                            <li key={index}><strong>{endpoint}:</strong> {count} calls</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Page