# Shrink-URL

Shrink-URL is a small URL-shortening web app with a static frontend and a Node.js backend. The frontend lets users create short links and the backend creates, stores, and resolves them.


## Language composition
- JavaScript: 45.6%
- CSS: 29.5%
- HTML: 24.9%


## Features
- Create short URLs from long URLs
- Resolve short URLs to their original destinations
- Simple REST API for creating and resolving links
- Static frontend (HTML/CSS/JS) that consumes the backend API


## Tech stack
- Language: JavaScript (frontend + backend)
- Runtime: Node.js
- HTTP framework: Express (backend)
- Database: configured via `backend/src/config/Database.js`
- Middleware: CORS, body parsing, environment-based configuration


## Repo layout
Top-level:

- `backend/` — Node.js API and server code
- `frontend/` — static frontend (HTML/CSS/JS)
- `README.md` — this file

Annotated layout:

```
Shrink-URL/
├── backend/
│   ├── .gitignore
│   ├── package-lock.json
│   ├── package.json
│   └── src/
│       ├── app.js                # Express app setup (middleware, routing)
│       ├── server.js             # server entrypoint (starts the app)
│       ├── config/
│       │   └── Database.js       # DB connection/configuration
│       ├── controllers/
│       │   └── urlControllers.js # request handlers for URL endpoints
│       ├── middleware/
│       │   └── validationMiddleware.js  # request validation helpers
│       ├── models/
│       │   └── urlModel.js       # data model for URL records
│       ├── routes/
│       │   └── urlRoutes.js      # API route definitions
│       ├── services/
│       │   └── urlServices.js    # business logic for creating/resolving URLs
│       └── utils/                # misc helpers
├── frontend/
│   ├── css/                      # styles
│   ├── html/                     # HTML pages
│   ├── images/                   # image assets
│   └── js/                       # client-side JavaScript
└── README.md
```


## Getting started (development)
These are the steps to run the project locally. There are separate steps for backend and frontend.

Prerequisites
- Node.js (12+ recommended)
- A database supported/configured in `backend/src/config/Database.js` (e.g. SQLite, PostgreSQL, MongoDB depending on configuration)


### Backend
1. cd into the backend directory:
   - cd backend
2. Install dependencies:
   - npm install
3. Configure environment variables. Create a `.env` file (or set env vars) with values similar to:

```
PORT=3000
DATABASE_URL=<your-database-connection-string>
NODE_ENV=development
```

4. Start the server (development):
   - npm run dev   # or `node src/server.js` depending on package.json scripts

The backend exposes an API (see API section below).


### Frontend
The frontend is static. You can serve the files from any static server or open the HTML directly in a browser during development.

1. Open `frontend/html/index.html` (or the main HTML file) in your browser, or serve the `frontend/` directory using a static server.
2. Ensure the frontend is configured to call the backend API (adjust base URL in `frontend/js` if necessary).


## API (example)
The project usually exposes endpoints similar to the following (confirm actual routes in `backend/src/routes/urlRoutes.js`):

- POST /api/urls
  - Create a new short URL
  - Body: { "url": "https://example.com/very/long/path" }
  - Response: { "short": "abc123", "url": "https://example.com/..." }

- GET /:short
  - Redirects to the original URL associated with `:short` (status 302/301 depending on implementation)

- GET /api/urls/:short
  - Optional: return metadata about the short URL (original URL, createdAt, hits, etc.)


## Database
Database connection details are in `backend/src/config/Database.js`. Check that file to see which DB is used and how to configure connection strings. For quick/local development you can use a file-based DB (e.g., SQLite) if supported.