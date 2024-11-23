import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";


interface Keyword {
    id:string;
    name:string;
    number:string;
}
const useAllFavouritesFetch = () => {
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



  
const useFavouriteDelete = async (id: string): Promise<void> => {

    try {
      const response = await axios.post(`/api/contacts/remove`, { id });
      toast.success(response?.data?.msg);
    } catch (error:any) {
      console.log(error);
      toast.error(error?.response?.data?.error || 'An error occurred while deleting the contact.');
    }
  };

  export { useFavouriteDelete, useAllFavouritesFetch};