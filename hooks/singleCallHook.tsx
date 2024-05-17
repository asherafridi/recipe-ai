import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";


const useAllCallFetch = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get('/api/call');
          setData(response.data.agents);
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
  const useStopCall= async (callId:string)=>{
    const options = {method: 'POST', headers: {authorization: 'sk-ix1uv15q05edyjxb2oqdporz1okqchzq5zvjvi9271f2cixopa3d71ulo0ppky3969'}};
    try {
      const response = await axios.post(`https://api.bland.ai/v1/calls/${callId}/stop`,'',options);
      const statusUpdate = await axios.post(`/api/call/stop`,{id:callId});
      toast.success(response?.data?.message);
    } catch (error:any) {
      toast.error(error?.data?.status || 'An error occurred while Stoping the call.');
    }
  }
  
  interface Transcript {
    id:string;
    user:string;
    text :string;
  }
interface ExtCall {
  call_id :string;
  from : string;
  to : string;
  started_at:string;
  completed : string;
  answered_by : string;
  call_length: string;
  summary : string;
  recording_url : string;
  transcripts :Transcript[];

}
const useFetchCall = (id: string) => {
    const [loader,setLoader] = useState(true);
    const [data,setData] = useState<ExtCall>();
    useEffect(() => {
      const options = {method: 'GET', headers: {authorization: 'sk-ix1uv15q05edyjxb2oqdporz1okqchzq5zvjvi9271f2cixopa3d71ulo0ppky3969'}};

        axios.get(`https://api.bland.ai/v1/calls/${id}`,options)
            .then(response => {
                setData(response.data);
                console.log(response.data);
                setLoader(false);
            })
            .catch(error => {
                console.error('Error fetching contact:', error);
                setLoader(false);
            });
    }, [id]);
    return {data,loader};
};

export { useFetchCall,useAllCallFetch ,useStopCall};