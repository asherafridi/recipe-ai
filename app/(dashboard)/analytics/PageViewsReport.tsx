"use client";

import { useScreenViewsReportFetch } from "@/hooks/analyticsHook";
import ConnectGoogle from "./Connect";
import { Skeleton } from "@/components/ui/skeleton";
import SelectProperty from "./SelectProperty";
import { Card } from "@/components/ui/card";

export default function Analytics() {
  const { analytics, analyticsLoader } = useScreenViewsReportFetch();

  if (analyticsLoader) {
    return <Skeleton className="w-1/2 mt-4 h-[400px]" />;
  }

  if (analytics.error) {
    console.log(analytics.error);

    if (analytics.error === "Google Not Connected") {
      return <ConnectGoogle />;
    }

    if (analytics.error === "Property Id Not Found") {
      return <SelectProperty />;
    }
    return "" ;
  }

  const report = analytics.response.report;

  // Prepare data for the table (page views per page)
  const rows = report.rows.map((row, index) => ({
    page: row.dimensionValues[0]?.value || "Unknown Page",
    pageViews: row.metricValues[0]?.value || 0,
  }));

  return (
    <>
      <Card className="p-4 mt-4 w-1/2">
        <h1 className="text-xl font-bold mb-4">Views Per Page</h1>

        {/* Table for page views per page */}
        <div className="mb-8">
          <table className="table-auto border-collapse border border-gray-400 w-full">
            <thead>
              <tr>
                <th className="border border-gray-300 px-4 py-2">Page Path</th>
                <th className="border border-gray-300 px-4 py-2">Screen Page Views</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, index) => (
                <tr key={index}>
                  <td className="border border-gray-300 px-4 py-2">{row.page}</td>
                  <td className="border border-gray-300 px-4 py-2">{row.pageViews}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </>
  );
}
