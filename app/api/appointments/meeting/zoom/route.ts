import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import qs from "qs";

export async function POST(req: NextRequest) {
    const { name, time } = await req.json();

    const clientId = '40gz_BIJQPbON_s9VwkTQ'; // Replace with actual client ID
    const clientSecret = 'kQsaqWZR0WqFuVgmepdydg1TkmtF1B7c'; // Replace with actual client secret
    const accountId = 'eFkPEItwQhO_VkB8BT7Ffg'; // Replace with your Zoom account ID
    const base64Credentials = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

    try {
        // Fetch Zoom access token
        const tokenResponse = await axios.post(
            'https://zoom.us/oauth/token',
            qs.stringify({
                grant_type: 'account_credentials', // Use the correct grant type
                account_id: accountId,
            }),
            {
                headers: {
                    'Authorization': `Basic ${base64Credentials}`,
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            }
        );

        const accessToken = tokenResponse.data.access_token;

        if (!accessToken) {
            return NextResponse.json({ error: 'No access token returned' }, { status: 500 });
        }

        // Prepare meeting data
        const meetingData = {
            topic: name,
            type: 2, // Scheduled meeting
            start_time: time, // Ensure this is in ISO 8601 format
            duration: 30,
            agenda: 'Meeting Agenda',
            settings: {
                host_video: true,
                participant_video: true,
                join_before_host: true,
                mute_upon_entry: false,
                watermark: false,
                use_pmi: false,
                approval_type: 0,
                audio: 'both',
                auto_recording: 'none',
            },
        };

        // Request to create a Zoom meeting
        const response = await axios.post(
            'https://api.zoom.us/v2/users/me/meetings',
            meetingData,
            {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        return NextResponse.json(response.data, { status: 200 });
    } catch (error: any) {
        console.error('Error creating Zoom meeting:', error.message);
        return NextResponse.json({ error: error.response ? error.response.data : 'An error occurred' }, { status: 500 });
    }
}
