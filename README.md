# osu-player-info-cli

A simple CLI tool to fetch and display osu! player information using the osu-api-extended.

## Features

- Fetches osu! player information (username, rank, badges, etc.)
- Supports all osu! game modes (`osu`, `taiko`, `fruits`, `mania`)

## Installation

First, clone the repository and install the required packages:

```bash
git clone https://github.com/artorias305/osu-player-info-cli.git
cd osu-player-info-cli
npm install
```

Make sure you have an .env file with your CLIENT_ID and CLIENT_SECRET from the osu! API:
```bash
CLIENT_ID=your-client-id
CLIENT_SECRET=your-client-secret
```

## Usage
To run the CLI, use:
```bash
node main.mjs
```

## Dependencies
- [osu-api-extended](https://www.npmjs.com/package/osu-api-extended)
- [@clack/prompts](https://www.npmjs.com/package/@clack/prompts)
- [chalk](https://www.npmjs.com/package/chalk)
