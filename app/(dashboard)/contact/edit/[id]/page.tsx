"use client";
import Breadcrumb from '@/components/Breadcrumb';
import FormButton from '@/components/FormButton';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { Card } from '@/components/ui/card';

const useFetchContact = (id: string, setValue: any, setPhoneNumber: any) => {
    useEffect(() => {
        axios.post(`/api/contacts/read`, {
            id: id
        })
            .then(response => {
                setValue('name', response?.data?.contact?.name);
                setPhoneNumber(response?.data?.contact?.number); // preserve the phone number with the '+' symbol
            })
            .catch(error => {
                console.error('Error fetching contact:', error);
            });
    }, [id]);
};

const Page = ({ params }: { params: { id: string } }) => {
    const router = useRouter();
    const { register, setValue, handleSubmit, formState: { errors } } = useForm();
    const [loading, setLoading] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState(''); // manage the phone number with '+'

    useFetchContact(params.id, setValue, setPhoneNumber);

    const submit = (data: any) => {
        setLoading(true);

        
        const formattedPhoneNumber = phoneNumber.startsWith('+') ? phoneNumber.slice(1) : phoneNumber;

        axios.post(`/api/contacts/update`, {
            name: data.name,
            number: '+'+formattedPhoneNumber, // include the phone number with the '+' symbol
            id: params.id
        }).then(response => {
            toast.success(response.data?.msg);
            setTimeout(() => {
                setLoading(false);
                router.push('/contact');
            });
        }).catch(e => {
            toast.error(e.data?.error);
            setLoading(false);
            console.log(e);
        });
    };

    return (
            <Card className=" mt-4  p-4">
                <form className='w-full gap-4' onSubmit={handleSubmit(submit)}>
                    <div className='w-full3'>
                        <Label htmlFor='name'>Name</Label>
                        <Input
                            type='text'
                            {...register('name', { required: true })}
                            className='w-full mt-2'
                            placeholder='Full Name'
                        />
                        {errors.name && <span className="text-red-500">This field is required</span>}
                    </div>
                    <div className='w-full mt-4'>
                        <Label htmlFor='number'>Phone Number</Label>
                        <PhoneInput
                            country={'us'} // default country code
                            value={phoneNumber}
                            inputStyle={{
                                width : '100%'
                            }}
                            onChange={(phone) => setPhoneNumber(phone)}
                            inputClass="w-full mt-2" // apply custom class to match styling
                            placeholder='+1 (555) 555-5555' // keep the '+'
                        />
                        {errors.number && <span className="text-red-500">This field is required</span>}
                    </div>
                    <div className='w-full mt-4'>
                        <FormButton state={loading} text="Update this Contact" />
                    </div>
                </form>
            </Card>
    );
};

export default Page;
