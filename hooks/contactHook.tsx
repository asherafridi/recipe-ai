import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

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

  
const useContactDelete = async (id: string): Promise<void> => {
    try {
      const response = await axios.post(`/api/contacts/remove`, { id });
      toast.success(response?.data?.msg);
    } catch (error:any) {
      toast.error(error?.data?.error || 'An error occurred while deleting the contact.');
    }
  };

  export { useContactDelete, useContactsFetch};