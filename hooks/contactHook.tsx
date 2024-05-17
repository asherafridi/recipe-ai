import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";


interface Contact {
    id:string;
    name:string;
    number:string;
}
const useAllContactFetch = () => {
  const [contact, setContact] = useState<Contact[]>([]);
  const [contactLoader, setContactLoader] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/contacts');
        setContact(response.data.contacts);
        setContactLoader(false);
        
      } catch (error) {
        setContactLoader(false);
        console.log(error);
      }
    };

    fetchData();
  }, ['']);

  return { contact, contactLoader };
};


  
const useContactDelete = async (id: string): Promise<void> => {
    try {
      const response = await axios.post(`/api/contacts/remove`, { id });
      toast.success(response?.data?.msg);
    } catch (error:any) {
      toast.error(error?.data?.error || 'An error occurred while deleting the contact.');
    }
  };

  export { useContactDelete, useAllContactFetch};