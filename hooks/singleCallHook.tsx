import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";


const useAllCallFetch = (params:any) => {
  const [call, setCall] = useState([]);
  const [callLoader, setCallLoader] = useState(true);

  // Memoize the params object to prevent unnecessary re-renders
  const memoizedParams = useMemo(() => params, [JSON.stringify(params)]);

  useEffect(() => {
    const fetchData = async () => {
      setCallLoader(true); // Set loader true when fetching starts
      try {
        const response = await axios.get('/api/call', { params: memoizedParams });
        setCall(response.data.calls);
      } catch (error) {
        console.error('Error fetching calls:', error);
        toast.error('Failed to fetch calls');
      } finally {
        setCallLoader(false); // Always set loader false when fetching ends
      }
    };

    fetchData();
  }, [memoizedParams]);

  return { call, callLoader };
};

const useStopCall = async (callId: string) => {
  try {
    const response = await axios.post(`/api/call/stop`, { id: callId });
    toast.success(response?.data?.msg);
  } catch (error: any) {
    console.log(error);
    toast.error(error?.data?.error || 'Call already Completed.');
  }
}

interface Transcript {
  id: string;
  user: string;
  text: string;
}
interface ExtCall {
  call_id: string;
  from: string;
  to: string;
  started_at: string;
  completed: string;
  answered_by: string;
  call_length: string;
  summary: string;
  recording_url: string;
  transcripts: Transcript[];

}
const useFetchCall = (id: string) => {
  const [callLoader, setLoader] = useState(true);
  const [call, setData] = useState<ExtCall>();
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(`/api/call/read`,{id :id});
        
        setData(response.data.call);
        setLoader(false);
        
      } catch (error) {
        setLoader(false);
        console.log(error);
      }
    };

    fetchData();
  }, ['']);
  return { call, callLoader };
};

export { useFetchCall, useAllCallFetch, useStopCall };