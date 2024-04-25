import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useForm } from 'react-hook-form'
import React, { useState } from 'react'
import FormButton from '@/components/FormButton'
import axios from 'axios'
import toast from 'react-hot-toast'

const Contact = () => {
    const { register,setValue, handleSubmit, formState:{errors}} = useForm();
    const [loading,setLoading] = useState(false);

    const submit = (data: any) => {
        setLoading(true);
        axios.post('/api/contacts/create',data).then(response=>{
            toast.success(response.data?.msg);
            setTimeout(()=>{
                setLoading(false);
                setValue('name',"");
                setValue('number',"");
            })
        }).catch(e=>{
            toast.error(e.data?.error);
            setLoading(false);
            console.log(e);
        });
    }

    return (

        <form className='w-full mt-5 gap-4' onSubmit={handleSubmit(submit)}>
            <div className='w-1/3'>
                <Label htmlFor='name' >Name</Label>
                <Input type='text' {...register('name')} className='w-full mt-2' placeholder='John' />
                {errors.exampleRequired && <span>This field is required</span>}
            </div>
            <div className='w-1/3 mt-4'>
                <Label htmlFor='name' >Phone Number</Label>
                <Input type='text' {...register('number')} className='w-full mt-2' placeholder='+18084422108' />
            </div>
            <div className='w-1/3 mt-4'>
                <FormButton state={loading}/>
            </div>
        </form>
    )
}

export default Contact