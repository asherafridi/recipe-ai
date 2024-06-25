import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

type Call = {
  batch_id: string
  created_at :string
  label :string
}

const useAllCampaignFetch = () => {
    const [campaignData, setCampaignData] = useState<Call[]>([]);
    const [campaignLoading, setCampaignLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/api/campaign');
                setCampaignData(response.data.campaign);
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
  try {
    const response = await axios.post(`/api/campaign/stop`, { id: campaignId });
    toast.success(response?.data?.msg);
  } catch (error: any) {
    console.log(error);
    toast.error(error?.data?.error || 'Campaign already Completed.');
  }
  }

  
interface ExtBatch {
  batch_params : any,
  analysis :any,
  call_data : any

}
    

const useFetchCampaign = (id: string) => {
    const [batchLoader,setBatchLoader] = useState(true);
    const [batches,setBatches] = useState<ExtBatch>();

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.post(`/api/campaign/read`,{id :id});
          setBatches(response.data.batch);
          setBatchLoader(false);
          
        } catch (error) {
          setBatchLoader(false);
          console.log(error);
        }
      };
  
      fetchData();
    }, [id]);
    return {batches,batchLoader};
};
export {useAllCampaignFetch,useStopBatch, useFetchCampaign};