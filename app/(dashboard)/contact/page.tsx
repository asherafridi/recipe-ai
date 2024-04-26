"use client"
import Breadcrumb from '@/components/Breadcrumb'
import React, { useEffect, useState } from 'react'
import { DataTable } from './data-table';
import axios from 'axios';
import { columns} from './columns';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const useContactsFetch = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/contacts');
        setData(response.data.contacts);
        setLoading(false);
        
      } catch (error) {
        toast.error('Something Went Wrong!');
        setLoading(false);
        console.log(error);
      }
    };

    fetchData();
  }, ['']);

  return { data, loading };
};


const Page = () => {
  const {data,loading} = useContactsFetch();

  
  return (
    <div className='p-5 min-h-screen'>
        <Breadcrumb title="Contacts" />
        <div className="bg-white mt-4 rounded p-4">
          {loading ?  'Loading...' : <DataTable columns={columns} data={data}  />}
        
        </div>
    </div>
  )
}

export default Page