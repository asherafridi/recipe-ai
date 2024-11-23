import { NextRequest, NextResponse } from 'next/server';
import { BetaAnalyticsDataClient } from '@google-analytics/data';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();


// Initialize Google Analytics Data API client
// const analyticsClient = new BetaAnalyticsDataClient({
//   credentials: {
//     client_email: process.env.GOOGLE_CLIENT_EMAIL,
//     private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
//   },
// });

// GA4 property ID from environment
const propertyId = "464534433";

// Function to fetch report data based on specified metrics and dimensions
// async function getReportData(metrics = ['screenPageViews'], dimensions = []) {
//   try {
//     const [response] = await analyticsClient.runReport({
//       property: `properties/${propertyId}`,
//       dateRanges: [{ startDate: '30daysAgo', endDate: 'today' }],
//       metrics: metrics.map(metric => ({ name: metric })),
//       dimensions: dimensions.map(dimension => ({ name: dimension })),
//     });

//     // Format response data
//     const rows = response.rows?.map(row => {
//       const metricsData = row.metricValues.map(metric => metric.value);
//       const dimensionsData = row.dimensionValues.map(dimension => dimension.value);
//       return { metrics: metricsData, dimensions: dimensionsData };
//     });

//     return {
//       message: 'Report fetched successfully',
//       data: rows || [],
//     };
//   } catch (error) {
//     console.error('Error fetching report data:', error.message);
//     throw new Error('Failed to fetch Google Analytics data');
//   }
// }

// Next.js API route handler
export async function GET(req: NextRequest) {
  // try {
  //   // Example with default metrics for page views; adjust as needed
  //   const metrics = ['screenPageViews'];
  //   const dimensions = ['pagePath', 'source'];  // Example dimensions for page path and source
    
  //   const report = await getReportData(metrics);
  // } catch (error) {
  //   return NextResponse.json(
  //     { error: error.message },
  //     { status: 500 }
  //   );
  // }

  
    return NextResponse.json({ result:"Success" }, { status: 200 });
}
