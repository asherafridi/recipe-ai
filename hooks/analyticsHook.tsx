import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface Analytics {
  response: any;
  error: string | null;
}

const useSessionReportFetch = () => {
  const [analytics, setAnalytics] = useState<Analytics>({ response: null, error: null });
  const [analyticsLoader, setAnalyticsLoader] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setAnalyticsLoader(true);
      try {
        const response = await axios.get("/api/analytics/session-report");
        setAnalytics({ response: response.data, error: null });
      } catch (error: any) {
        console.log(error);
        const errorMsg = error.response?.data?.msg || "Something Went Wrong!";
        setAnalytics({ response: error.response, error: errorMsg });
      } finally {
        setAnalyticsLoader(false);
      }
    };

    fetchData();
  }, []);

  return { analytics, analyticsLoader };
};


const useScreenViewsReportFetch = () => {
  const [analytics, setAnalytics] = useState<Analytics>({ response: null, error: null });
  const [analyticsLoader, setAnalyticsLoader] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setAnalyticsLoader(true);
      try {
        const response = await axios.get("/api/analytics/page-views-report");
        console.log(response)
        setAnalytics({ response: response.data, error: null });
      } catch (error: any) {
        console.log(error);
        const errorMsg = error.response?.data?.msg || "Something Went Wrong!";
        setAnalytics({ response: error.response, error: errorMsg });
      } finally {
        setAnalyticsLoader(false);
      }
    };

    fetchData();
  }, []);

  return { analytics, analyticsLoader };
};



const usePropertyFetch = () => {
  const [properties, setAnalytics] = useState<Analytics>({ response: null, error: null });
  const [propertiesLoader, setAnalyticsLoader] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setAnalyticsLoader(true);
      try {
        const response = await axios.get("/api/analytics/properties");
        setAnalytics({ response: response.data, error: null });
      } catch (error: any) {
        console.log(error);
        const errorMsg = error.response?.data?.msg || "Something Went Wrong!";
        setAnalytics({ response: error.response, error: errorMsg });
      } finally {
        setAnalyticsLoader(false);
      }
    };

    fetchData();
  }, []);

  return { properties, propertiesLoader };
};



const useVectorDelete = async (id: string): Promise<void> => {
  try {
    const response = await axios.post(`/api/vector/remove`, { id });
    toast.success(response?.data?.msg);
  } catch (error:any) {
    toast.error(error?.data?.error || 'An error occurred while deleting the contact.');
  }
};
export {useSessionReportFetch,useVectorDelete,usePropertyFetch, useScreenViewsReportFetch};