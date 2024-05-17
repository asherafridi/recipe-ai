import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

type Data ={
    name:string,
    voice:string,
    id:number
}

const useAllAgentFetch = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get('/api/agent');
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

const useFetchAgent = (id: string) => {
    const [loader,setLoader] = useState(true);
    const [data,setData] = useState(null);
    useEffect(() => {
        axios.post(`/api/agent/read`, {
            id: id
        })
            .then(response => {
                setData(response.data.agent);
                setLoader(false);
            })
            .catch(error => {
                console.error('Error fetching contact:', error);
                setLoader(false);
            });
    }, [id]);
    return {data,loader};
};

const useAgentDelete = async (id: string): Promise<void> => {
    try {
      const response = await axios.post(`/api/agent/remove`, { id });
      toast.success(response?.data?.msg);
    } catch (error:any) {
      toast.error(error?.data?.error || 'An error occurred while deleting the contact.');
    }
  };

  const useFetchVoice=  ()=>{
    const [voice,setVoice] =useState<any>([]);
    const [voiceLoader,setVoiceLoader] = useState(true);

    useEffect(()=>{
      const options = {
        method: 'GET',
        headers: {
          authorization: 'sk-ix1uv15q05edyjxb2oqdporz1okqchzq5zvjvi9271f2cixopa3d71ulo0ppky3969'
        }
      };
    
    axios.get('https://api.bland.ai/v1/voices', options)
      .then(response => {
        setVoice(response.data.voices);
        setVoiceLoader(false);
      })
      .catch(error => {
        console.error(error);
        setVoiceLoader(false);
      });
    },[]);
    return {voice,voiceLoader};
  }

  const useFetchNumber=  ()=>{
    const [number,setNumber] =useState([]);
    const [numberLoader,setNumberLoader] = useState(true);

    useEffect(()=>{
    
      const fetchData = async () => {
        try {
          const response = await axios.get('/api/number');
          setNumber(response.data.numbers);
          setNumberLoader(false);
          
        } catch (error) {
          setNumberLoader(false);
          console.log(error);
        }
      };
  
      fetchData();
    },[]);
    return {number,numberLoader};
  }

  const useAllContactFetch = () => {
    const [contact, setContact] = useState([]);
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

  

export { useFetchAgent,useAllAgentFetch ,useAgentDelete,useFetchVoice,useFetchNumber,useAllContactFetch};