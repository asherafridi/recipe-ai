import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";


const useAllCampaignFetch = () => {
    const [campaignData, setCampaignData] = useState([]);
    const [campaignLoading, setCampaignLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/api/campaign');
                setCampaignData(response.data.agents);
                setCampaignLoading(false);

            } catch (error) {
                setCampaignLoading(false);
                console.log(error);
            }
        };

        fetchData();
    }, ['']);

    return { campaignData, campaignLoading };
};


const useStopBatch= async (campaignId:string)=>{
    const options = {method: 'POST', headers: {authorization: 'sk-ix1uv15q05edyjxb2oqdporz1okqchzq5zvjvi9271f2cixopa3d71ulo0ppky3969'}};
    try {
      const response = await axios.post(`https://api.bland.ai/v1/batches/${campaignId}/stop`,'',options);
    //   const statusUpdate = await axios.post(`/api/call/stop`,{id:callId});
      toast.success(response?.data?.message);
    } catch (error:any) {
      toast.error(error?.data?.status || 'An error occurred while Stoping the call.');
    }
  }

    

const useFetchCampaign = (id: string) => {
    const [batchLoader,setBatchLoader] = useState(true);
    const [batches,setBatches] = useState(null);
    useEffect(() => {
      const options = {method: 'GET', headers: {authorization: 'sk-ix1uv15q05edyjxb2oqdporz1okqchzq5zvjvi9271f2cixopa3d71ulo0ppky3969'}};

        axios.get(`https://api.bland.ai/v1/batches/${id}`,options)
            .then(response => {
                setBatches(response.data);
                console.log(response.data);
                setBatchLoader(false);
            })
            .catch(error => {
                console.error('Error fetching contact:', error);
                setBatchLoader(false);
            });
    }, [id]);
    return {batches,batchLoader};
};
export {useAllCampaignFetch,useStopBatch, useFetchCampaign};