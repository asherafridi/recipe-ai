import { authOption } from "@/lib/auth";
import prisma from "@/lib/db";
import axios from "axios";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const session = await getServerSession(authOption);

    if (!session?.user) {
        return NextResponse.json({ msg: 'Authentication Error' }, { status: 401 });
    }

    const callType = req.nextUrl.searchParams.get('inbound');
    const batch = req.nextUrl.searchParams.get('batch');
    const startDate = req.nextUrl.searchParams.get('start_date');
    const endDate = req.nextUrl.searchParams.get('end_date');

    const params = {
        inbound: callType,
        batch_id: batch,
        start_date: startDate,
        end_date: endDate,
    };

    try {
        const options = {
            method: 'GET',
            headers: {
                authorization: session.user.key_token,
            }
        };

        const response = await axios.get('https://api.bland.ai/v1/calls', options);

        const data = response.data;

        // Calculate total number of calls (redundant as it's already provided)
        const totalCalls = data.calls.length;

        // Calculate the total call duration and average call duration
        const totalDuration = data.calls.reduce((acc:any, call:any) => acc + call.call_length, 0);
        const averageCallDuration = totalDuration / totalCalls;

        // Count the number of completed calls
        const completedCalls = data.calls.filter((call:any) => call.completed).length;

        // Count the number of calls answered by a human
        const humanAnsweredCalls = data.calls.filter((call:any) => call.answered_by === "human").length;


        // Distribution of call durations
        const callDurationDistribution = data.calls.reduce((acc:any, call:any) => {
            const duration = Math.floor(call.call_length); // Round down to nearest minute
            acc[duration] = (acc[duration] || 0) + 1;
            return acc;
        }, {});

        // Count calls with error messages
        const callsWithErrors = data.calls.filter((call:any) => call.error_message !== null).length;

        const inboundCalls = data.calls.filter((call:any) => call.inbound).length;
        const totalInboundRevenue = data.calls.reduce((total:any=0, call:any) => total + call.price, 0);

        // Combine insights into a single array of objects
        const insights = {
            totalCalls: totalCalls,
            averageCallDuration: parseFloat(averageCallDuration.toFixed(2)), // Convert back to a number
            completedCalls: completedCalls,
            humanAnsweredCalls: humanAnsweredCalls,
            callDurationDistribution: callDurationDistribution,
            callsWithErrors: callsWithErrors,
            inboundCalls : inboundCalls,
            totalCost : totalInboundRevenue
        };

        return NextResponse.json({ insights : insights }, { status: 200 });
    } catch (error: any) {
        console.error('Error fetching calls:', error);
        const errorMessage = error.response?.data?.message || 'Data Not Found';
        return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
}
