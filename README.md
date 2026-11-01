<div align="center">

# 📅 MCP Calendar Server for Cursor

**A Node.js [Model Context Protocol](https://modelcontextprotocol.io) server that lets Cursor's AI agent read your Google Calendar.**

![Node](https://img.shields.io/badge/node-%3E%3D18-339933?logo=node.js&logoColor=white)
![MCP](https://img.shields.io/badge/protocol-MCP-6E56CF)
![Google Calendar](https://img.shields.io/badge/Google-Calendar%20API-4285F4?logo=googlecalendar&logoColor=white)
![License](https://img.shields.io/badge/license-MIT-green)

</div>

---

## ✨ Overview

This project exposes calendar data to Cursor through the Model Context Protocol (MCP). Once connected, you can ask Cursor's Agent things like *"What's on my calendar this week?"* and it will call this server to find out.


## 🚀 Quick Start

| Variable | Description |
|---|---|
| `GOOGLE_PUBLIC_API_KEY` | Google Cloud API key with the **Google Calendar API** enabled |
| `CALENDAR_ID` | The ID of the calendar to read (must be **public** for API-key access) |

> 🔑 Create a key in the [Google Cloud Console](https://console.cloud.google.com/apis/credentials) and restrict it to the Calendar API.

## 🔌 Connect to Cursor

1. Copy `mcp.example.json` into your Cursor config (`~/.cursor/mcp.json` for global, or `.cursor/mcp.json` per project).
2. Replace the path and placeholder values.
3. Restart Cursor and switch to **Agent mode**.

```json
{
  "mcpServers": {
    "MyCalendarData": {
      "command": "node",
      "args": ["/absolute/path/to/MCP_Server.js"],
      "env": {
        "GOOGLE_PUBLIC_API_KEY": "<your-api-key>",
        "CALENDAR_ID": "<your-calendar-id>"
      }
    }
  }
}
```

## 🔒 Security

- **Never commit `.env` or real keys.** Both are git-ignored.
- Restrict your Google API key (API restrictions + optional IP/app restrictions).
- Rotate any key that was ever pushed to a public repository.

## 📄 License

Released under the [MIT License](LICENSE).
