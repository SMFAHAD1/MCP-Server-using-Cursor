import { McpServer } from '@modelcontextprotocol/server';
import { StdioServerTransport } from '@modelcontextprotocol/server/stdio';
import dotenv from 'dotenv';
import { google } from 'googleapis';
import * as z from 'zod/v4';

// quiet: true keeps dotenv from printing to stdout, which would corrupt the stdio MCP stream
dotenv.config({ quiet: true });

// create the MCP server
const server = new McpServer({
    name: "Fahad Calendar",
    version: '1.0.0'
});

// tool function
async function getMyCalendarDataByDate(date) {
    const calendar = google.calendar({
        version: 'v3',
        auth: process.env.GOOGLE_PUBLIC_API_KEY
    });

    // Calculate the start and end of the given date (UTC)
    const dayStart = new Date(date);
    dayStart.setUTCHours(0, 0, 0, 0);
    const dayEnd = new Date(dayStart);
    dayEnd.setUTCDate(dayEnd.getUTCDate() + 1);

    try {
        const res = await calendar.events.list({
            calendarId: process.env.CALENDAR_ID,
            timeMin: dayStart.toISOString(),
            timeMax: dayEnd.toISOString(),
            maxResults: 10,
            singleEvents: true,
            orderBy: 'startTime'
        });

        const events = res.data.items || [];
        const meetings = events.map(event => {
            const eventStart = event.start.dateTime || event.start.date;
            return `${event.summary} at ${eventStart}`;
        });

        return { meetings };
    } catch (err) {
        return { error: err.message };
    }
}

// register the tool to MCP
server.registerTool(
    'getMyCalendarDataByDate',
    {
        description: "Get Fahad calendar meetings for a given date (UTC day)",
        inputSchema: z.object({
            date: z.string().refine(val => !Number.isNaN(Date.parse(val)), {
                message: 'Invalid date format. Please provide a valid date string.'
            })
        })
    },
    async ({ date }) => {
        const result = await getMyCalendarDataByDate(date);

        return {
            content: [{ type: 'text', text: JSON.stringify(result) }],
            ...(result.error && { isError: true })
        };
    }
);

// set transport
async function main() {
    const transport = new StdioServerTransport();
    await server.connect(transport);
}

main();