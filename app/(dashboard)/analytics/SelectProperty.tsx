"use client";

import { usePropertyFetch } from "@/hooks/analyticsHook";
import ConnectGoogle from "./Connect";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function SelectProperty() {
  const { properties, propertiesLoader } = usePropertyFetch();
  const router = useRouter();

  if (propertiesLoader) {
    return <Skeleton />;
  }

  const selectProperty = (property:string) => {
    axios.post('/api/analytics/properties/select-property',{
      property :property
    }).then((res)=>{
      toast.success(res.data.msg);
      router.refresh();
    }).catch((e)=>{
      toast.error(e.response.data.error);
    })
  };

  console.log(properties);

  return (
    <Card className="p-4">
      <h2>Select Property</h2>
      {properties.response.accounts.map((item:any, index:any) => (
        <Card key={index} className="w-1/3 mt-4 border-gray-700">
          <CardHeader>
            <CardTitle className="text-lg">{item.displayName}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Currency : {item.currencyCode}</p>
            <p>Industry : {item.industryCategory}</p>
            <p>Timezone : {item.timeZone}</p>
          </CardContent>
          <CardFooter>
            <Button className="w-full" onClick={() => selectProperty(item.name)}>
              Select
            </Button>
          </CardFooter>
        </Card>
      ))}
    </Card>
  );
}
