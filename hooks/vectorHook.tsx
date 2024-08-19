import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface Vector {
  vector_id : string;
  name:string;
  description:string;
  text:string;
}

interface Tool {
  tool_id : string;
  tool:any;
}

const useVectorFetch = ()=>{
  const [vector, setVectors] = useState<Vector[]>([]);
  const [vectorLoader, setVectorLoader] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/vector');
        setVectors(response.data.vectors);
        setVectorLoader(false);
        
      } catch (error) {
        setVectorLoader(false);
        console.log(error);
      }
    };

    fetchData();
  }, ['']);

  return { vector, vectorLoader };
}

const useToolsFetch = ()=>{
  const [tools, setVectors] = useState<Tool[]>([]);
  const [toolsLoader, setVectorLoader] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/tools');
        setVectors(response.data.tools);
        setVectorLoader(false);
        
      } catch (error) {
        setVectorLoader(false);
        console.log(error);
      }
    };

    fetchData();
  }, ['']);

  return { tools, toolsLoader };
}

const useFetchVectorDetail = (id:string)=>{

  const [vector, setVectors] = useState<Vector>();
  const [vectorLoader, setVectorLoader] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(`/api/vector/read`,{id :id});
        
        setVectors(response.data.vector);
        setVectorLoader(false);
        
      } catch (error) {
        setVectorLoader(false);
        console.log(error);
      }
    };

    fetchData();
  }, ['']);

  return { vector, vectorLoader };
}


const useVectorDelete = async (id: string): Promise<void> => {
  try {
    const response = await axios.post(`/api/vector/remove`, { id });
    toast.success(response?.data?.msg);
  } catch (error:any) {
    toast.error(error?.data?.error || 'An error occurred while deleting the contact.');
  }
};
export {useVectorFetch,useFetchVectorDetail,useVectorDelete, useToolsFetch};