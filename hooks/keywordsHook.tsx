import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";


interface Keyword {
    id:string;
    name:string;
    number:string;
    contactGroup:any;
}
const useAllKeywordsFetch = () => {
  const [keywords, setKeywords] = useState<Keyword[]>([]);
  const [keywordLoader, setKeywordLoader] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/keywords');
        setKeywords(response.data.contacts);
        setKeywordLoader(false);
        
      } catch (error) {
        setKeywordLoader(false);
        console.log(error);
      }
    };

    fetchData();
  }, ['']);

  return { keywords, keywordLoader };
};

const useAllContactFetchByGroup = (groupId="") => {
  const [contact, setContact] = useState<Keyword[]>([]);
  const [contactLoader, setContactLoader] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/contacts/filter?groupId=${groupId}`);
        setContact(response.data.contacts);
        setContactLoader(false);
        
      } catch (error) {
        setContactLoader(false);
        console.log(error);
      }
    };

    fetchData();
  }, [groupId]);

  return { contact, contactLoader,setContact };
};


  
const useContactDelete = async (id: string): Promise<void> => {

    try {
      const response = await axios.post(`/api/contacts/remove`, { id });
      toast.success(response?.data?.msg);
    } catch (error:any) {
      console.log(error);
      toast.error(error?.response?.data?.error || 'An error occurred while deleting the contact.');
    }
  };

  export { useContactDelete, useAllKeywordsFetch};