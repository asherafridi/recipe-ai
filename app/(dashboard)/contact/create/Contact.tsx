import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useForm } from 'react-hook-form'
import React, { useState } from 'react'
import FormButton from '@/components/FormButton'
import axios from 'axios'
import toast from 'react-hot-toast'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

const Contact = () => {
    const { register, setValue, handleSubmit, formState: { errors } } = useForm();
    const [loading, setLoading] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState('');

    const submit = (data: any) => {
        setLoading(true);

        const formattedPhoneNumber = phoneNumber.startsWith('+') ? phoneNumber.slice(1) : phoneNumber;
        const contactData = {
            ...data,
            number: '+'+formattedPhoneNumber // include the formatted phone number with country code
        };

        axios.post('/api/contacts/create', contactData).then(response => {
            toast.success(response.data?.msg);
            setTimeout(() => {
                setLoading(false);
                setValue('name', "");
                setPhoneNumber(''); // reset the phone number
            });
        }).catch(e => {
            toast.error(e.data?.error);
            setLoading(false);
            console.log(e);
        });
    };

    return (
        <form className='w-full mt-5 gap-4' onSubmit={handleSubmit(submit)}>
            <div className='w-full'>
                <Label htmlFor='name'>Name</Label>
                <Input type='text' {...register('name', { required: true })} className='w-full mt-2' placeholder='John' />
                {errors.name && <span className="text-red-500">This field is required</span>}
            </div>
            <div className='w-full mt-4'>
                <Label htmlFor='number'>Phone Number</Label>
                <PhoneInput
                    country={'us'} // default country code
                    value={phoneNumber}
                    onChange={(phone) => setPhoneNumber(phone)}
                    inputClass="w-full mt-2"
                    inputStyle={{
                        width:'100%'
                    }} // apply custom class to match styling
                    placeholder='+1 (555) 555-5555'
                    inputProps={{
                        name: 'phoneNumber',
                        required: true,
                    }}
                />
                {errors.number && <span className="text-red-500">This field is required</span>}
            </div>
            <div className='w-full mt-4'>
                <FormButton state={loading} text='Add New Contact' />
            </div>
        </form>
    );
}

export default Contact;
