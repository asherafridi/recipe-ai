import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";


interface Number {
  created_at : string;
  phone_number : string;
  last_initiated : string;
}
const useNumberFetch = () => {
  const [number, setData] = useState<Number[]>([]);
  const [numberLoader, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/number');
        setData(response.data.outbound_numbers);
        setLoading(false);
        
      } catch (error) {
        toast.error('Something Went Wrong!');
        setLoading(false);
        console.log(error);
      }
    };

    fetchData();
  }, ['']);

  return { number, numberLoader };
};

interface InboundNumber {
  created_at: string;
    phone_number: string;
    prompt: string;
    webhook: string;
    voice_id: number;
    dynamic_data: any[]; 
    interruption_threshold: number | null;
    first_sentence: string | null;
    reduce_latency: boolean;
    transfer_phone_number: string | null;
    voice_settings: any | null; 
    record: boolean;
    max_duration: number;
};

const useInboundNumberFetch = () => {
  const [inboundNumber, setData] = useState<InboundNumber[]>([]);
  const [inboundNumberLoader, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/number/inbound-number');
        setData(response.data);
        setLoading(false);
        
      } catch (error) {
        toast.error('Something Went Wrong!');
        setLoading(false);
        console.log(error);
      }
    };

    fetchData();
  }, ['']);

  return { inboundNumber, inboundNumberLoader };
};
  

  export {useNumberFetch,useInboundNumberFetch};