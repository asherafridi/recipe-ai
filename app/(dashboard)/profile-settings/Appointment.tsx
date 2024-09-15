import FormButton from '@/components/FormButton';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import axios from 'axios';
import { CircleDashed } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

interface User {
    ghlToken: string;
    ghlCalendar: string;
    name: string;
    email: string;
}

const Appointment = () => {
    const { control, handleSubmit, reset } = useForm<User>({
        defaultValues: {
            name: '',
            email: ''
        }
    });

    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState<User | null>(null);

    // Fetch the user profile when the component loads
    useEffect(() => {
        setLoading(true);
        axios.get('/api/user/profile')
            .then(response => {
                const fetchedUser = response.data.user;
                setUser(fetchedUser);
                reset(fetchedUser); // Populate the form with fetched data
            })
            .catch(error => {
                toast.error('Something Went Wrong!');
                console.error(error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [reset]);

    // Handle form submission
    const submit = async (data: User) => {
        setLoading(true);
        try {
            await axios.post('/api/user/profile/update', data);
            toast.success('Profile updated successfully!');
        } catch (error) {
            toast.error('Failed to update profile!');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    // Show skeleton loading state if no user data is fetched yet
    if (!user) {
        return <Skeleton className='w-full h-16' />;
    }

    return (
        <Card className='p-4'>
            <Form>
                <form onSubmit={handleSubmit(submit)} className="mt-4 flex w-full flex-wrap">
                    <FormField
                        control={control}
                        name="name"
                        render={({ field }) => (
                            <FormItem className='w-full md:w-1/2 lg:w-1/2 p-2'>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Name" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={control}
                        name="email"
                        render={({ field }) => (
                            <FormItem className='w-full md:w-1/2 lg:w-1/2 p-2'>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input placeholder="Email" disabled {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className='m-2'>
                        <Button type='submit' disabled={loading}>
                            {loading ? <CircleDashed className="m-2 w-[20px] animate-spin" /> : 'Update Changes'}
                        </Button>
                    </div>
                </form>
            </Form>
        </Card>
    );
};

export default Appointment;
