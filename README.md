# MCP Server using Cursor

A simple Node.js MCP (Model Context Protocol) server that connects to the Cursor IDE.

## Setup

```bash
git clone https://github.com/SMFAHAD1/MCP-Server-using-Cursor.git
cd MCP-Server-using-Cursor
npm install
cp .env.example .env   # add your own values
node MCP_Server.js
```

## Connect to Cursor

Add this to `~/.cursor/mcp.json`:

```json
{
  "mcpServers": {
    "my-mcp-server": {
      "command": "node",
      "args": ["/absolute/path/to/MCP_Server.js"]
    }
  }
}
```

Restart Cursor and use Agent mode.

## Files

- `MCP_Server.js` – the server
- `mcp.json` – Cursor config
- `.env.example` – environment variable template

## License

MIT
