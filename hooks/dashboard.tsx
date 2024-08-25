import React,{useState,useEffect} from 'react'
import axios from 'axios';

interface Insight {
    insights : any;
}

const useFetchInsightsHook = () => {
    const [data, setData] = useState<Insight>([]);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get('/api/dashboard');
          setData(response.data);
          setLoading(false);
          
        } catch (error) {
          setLoading(false);
          console.log(error);
        }
      };
  
      fetchData();
    }, ['']);
  
    return { data, loading };
  };

  export {useFetchInsightsHook};