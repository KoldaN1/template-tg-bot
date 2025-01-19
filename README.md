![Preview](https://github.com/KoldaN1/template-tg-bot/blob/main/assets/preview.png)

# Template Telegram Bot

This project provides a TypeScript-based template for creating a complete Telegram bot with flexible command handling, callback queries, database integration, and multilingual support.

## Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Folder Structure](#folder-structure)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Available Commands](#available-commands)
- [Database Options](#database-options)
- [License](#license)

## Features
- TypeScript for type safety and better developer experience.
- Supports both MongoDB and JSON-based databases.
- Modular structure for commands, handlers, and services.
- Environment variable configuration.
- Multi-language support using `locales`.
- Logging using `reclogger`.

## Technologies Used
- [node-telegram-bot-api](https://github.com/yagop/node-telegram-bot-api)
- [mongoose](https://mongoosejs.com/)
- [dotenv](https://www.npmjs.com/package/dotenv)
- [ts-node](https://www.npmjs.com/package/ts-node)
- [reclogger](https://www.npmjs.com/package/reclogger)

## Folder Structure
```
├── assets
│   └── preview.png
├── src
│   ├── commands
│   │   ├── author.ts
│   │   ├── index.ts
│   │   ├── language.ts
│   │   ├── preview.ts
│   │   └── start.ts
│   ├── database
│   │   ├── db.ts
│   │   ├── jsonDB.ts
│   │   ├── mongoDB.ts
│   │   └── users.json
│   ├── handlers
│   │   ├── callbackQueryHandler.ts
│   │   ├── errorHandler.ts
│   │   ├── index.ts
│   │   └── messageHandler.ts
│   ├── models
│   │   ├── logger.ts
│   │   └── User.ts
│   ├── queryCallbacks
│   │   ├── author.ts
│   │   ├── index.ts
│   │   ├── langChoose.ts
│   │   ├── langMenu.ts
│   │   └── menu.ts
│   ├── services
│   │   └── userService.ts
│   ├── utils
│   │   ├── keyboards
│   │   │   ├── author.ts
│   │   │   ├── index.ts
│   │   │   ├── language.ts
│   │   │   └── menu.ts
│   │   ├── locales
│   │   │   ├── en.json
│   │   │   ├── i18n.ts
│   │   │   └── ru.json
│   ├── index.ts
├── .env
├── .gitattributes
├── .gitignore
├── LICENSE
├── package-lock.json
├── package.json
├── README.md
└── tsconfig.json
```

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/KoldaN1/template-tg-bot.git
   cd template-tg-bot
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

## Configuration
1. Create a `.env` file in the root directory:
   ```env
   TG_TOKEN="your-telegram-bot-token"
   BOT_NAME="Template"
   DB_TYPE="mongodb" # json / mongodb

   # JSON DATABASE
   JSOB_DB_NAME="users.json"
   JSON_DB_INTERVAL="5000"
   JSON_DB_SAVE_NOTIFY="true"

   # MONGO DATABASE
   MONGO_URL="your-mongodb-url"
   ```
2. Replace `your-telegram-bot-token` and `your-mongodb-url` with your actual credentials.

## Usage
- For development:
  ```bash
  npm run dev
  ```
- For production:
  ```bash
  npm run build
  npm start
  ```

## Available Commands
- `/start` or `/menu` - Start the bot or show the main menu.
- `/author` - Display author information.
- `/language` - Open the language selection menu.
- `/preview` - Show a bot preview.

## Database Options
- **MongoDB**: Set `DB_TYPE="mongodb"` and provide a valid `MONGO_URL`.
- **JSON**: Set `DB_TYPE="json"` to use a file-based JSON database.

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

Feel free to contribute by submitting issues or pull requests on [GitHub](https://github.com/KoldaN1/template-tg-bot).

