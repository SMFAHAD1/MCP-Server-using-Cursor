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

| | |
|---|---|
| **Runtime** | Node.js (ES modules) |
| **MCP SDK** | `@modelcontextprotocol/server` |
| **Data source** | Google Calendar API via `googleapis` |
| **Validation** | `zod` |
| **Config** | `dotenv` + environment variables |

## 📁 Project Structure

```
MCP-Server-using-Cursor/
├── MCP_Server.js        # MCP server entry point
├── mcp.example.json     # Cursor config template (copy → .cursor/mcp.json)
├── .env.example         # Environment variable template
├── .gitignore           # Keeps secrets out of git
├── package.json         # Dependencies & scripts
├── LICENSE              # MIT
└── README.md
```

## 🚀 Quick Start

### 1. Clone and install

```bash
git clone https://github.com/SMFAHAD1/MCP-Server-using-Cursor.git
cd MCP-Server-using-Cursor
npm install
```

### 2. Configure environment variables

```bash
cp .env.example .env
```

Then edit `.env`:

| Variable | Description |
|---|---|
| `GOOGLE_PUBLIC_API_KEY` | Google Cloud API key with the **Google Calendar API** enabled |
| `CALENDAR_ID` | The ID of the calendar to read (must be **public** for API-key access) |

> 🔑 Create a key in the [Google Cloud Console](https://console.cloud.google.com/apis/credentials) and restrict it to the Calendar API.

### 3. Run it

```bash
npm start
```

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

## 🧰 Tools

<!-- Fill this in from MCP_Server.js -->

| Tool | Description | Parameters |
|---|---|---|
| _your_tool_name_ | _What it does_ | _`param: type`_ |

## 🛠 Development

```bash
npm start          # run the server
npm test           # syntax-check the server file
```

Debug interactively with the MCP Inspector:

```bash
npx @modelcontextprotocol/inspector node MCP_Server.js
```

## 🔒 Security

- **Never commit `.env` or real keys.** Both are git-ignored.
- Restrict your Google API key (API restrictions + optional IP/app restrictions).
- Rotate any key that was ever pushed to a public repository.

## 🗺 Roadmap

- [ ] Add more calendar tools (search, date-range queries)
- [ ] Add example prompts / screenshots
- [ ] Add automated tests

## 📄 License

Released under the [MIT License](LICENSE).
