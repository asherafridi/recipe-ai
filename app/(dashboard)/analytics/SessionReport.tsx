"use client";

import { useSessionReportFetch } from "@/hooks/analyticsHook";
import ConnectGoogle from "./Connect";
import { Skeleton } from "@/components/ui/skeleton";
import SelectProperty from "./SelectProperty";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import { Line } from "react-chartjs-2";
import { Card } from "@/components/ui/card";

// Register required Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function SessionReport() {
  const { analytics, analyticsLoader } = useSessionReportFetch();

  if (analyticsLoader) {
    return <Skeleton />;
  }
  if (analytics.error) {
    console.log(analytics.error);

    if (analytics.error == "Google Not Connected") {
      return <ConnectGoogle />;
    }

    if (analytics.error == "Property Id Not Found") {
      return <SelectProperty />;
    }
    return analytics.error;
  }

  const report = analytics.response.report;

  // Prepare data for the chart
  const labels = report.rows.map((row:any) => row.dimensionValues[0]?.value); // Dates
  const dataValues = report.rows.map((row:any) => Number(row.metricValues[0]?.value)); // Metrics (e.g., sessions)

  const chartData = {
    labels: labels, // X-axis labels (dates)
    datasets: [
      {
        label: "Sessions",
        data: dataValues, // Y-axis values (sessions)
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderWidth: 2,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { display: true, position: "top" },
      title: { display: true, text: "Sessions Over Time" },
    },
    scales: {
      x: { title: { display: true, text: "Date" } },
      y: { title: { display: true, text: "Sessions" }, beginAtZero: true },
    },
  };

  return (
    <Card className="p-4">
      <h1 className="text-xl font-bold mb-4">Session Report</h1>

      <div>
        <Line data={chartData} options={chartOptions} className="w-full" />
      </div>
    </Card>
    
  );
}
