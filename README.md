# Shrink-URL

Shrink-URL is a small URL-shortening web app: a static frontend for creating short links and a Node.js backend that creates, stores, and resolves shortened URLs.

### Stack
- **Language(s):** JavaScript (frontend and backend), CSS, HTML  
- **Framework / runtime:** Node.js (Express-style HTTP API for the backend)  
- **Notable libraries:** Express (backend HTTP), a database driver configured in `backend/src/config/Database.js`, and standard middleware (CORS / body parsing / configuration via env). See `backend/package.json` for exact dependencies.

## What’s in this repo
Top-level:
- `backend/` — Node.js API and server code
- `frontend/` — static frontend (HTML/CSS/JS)
- `README.md` — this file

Repository layout (annotated)
```
backend/
  package.json            # backend manifest (dependencies & scripts)
  src/
    app.js                # Express app setup (middleware, routing)
    server.js             # server entrypoint (starts the app)
    config/
      Database.js         # DB connection/configuration
    controllers/
      urlControllers.js   # request handlers for URL endpoints
    routes/
      urlRoutes.js        # API route definitions
    services/
      urlServices.js      # business logic for creating/resolving URLs
    models/
      urlModel.js         # data model for URL records
    middleware/
      validationMiddleware.js  # request validation helpers
    utils/                # misc helpers
frontend/
  index.html              # UI to create and manage shortened URLs (static)
  (CSS/JS assets)         # styles and client-side behavior
```

How it fits together
- The frontend is a static web UI that calls the backend API to create and resolve short links.
- The backend exposes routes defined in `backend/src/routes/urlRoutes.js`. Routes delegate to controllers in `backend/src/controllers/`, which call services in `backend/src/services/`. Services persist and retrieve URL mappings using the model in `backend/src/models/urlModel.js`. Database connection and configuration live in `backend/src/config/Database.js`.

## How to run it (shortest path)
1. Clone the repository
   ```bash
   git clone https://github.com/abitimalsina-glitch/Shrink-URL.git
   cd Shrink-URL
   ```

2. Backend (API)
   ```bash
   cd backend
   npm install
   # Provide required environment variables (see backend/src/config/Database.js).
   # Common vars: a DB connection string (e.g., DB_URI), PORT
   npm start
   ```
   If the package.json does not define `start`, you can run directly:
   ```bash
   node src/server.js
   ```

3. Frontend (static)
   - Option A (open directly): open `frontend/index.html` in your browser.
   - Option B (serve on a local static server):
     ```bash
     cd frontend
     # using a simple static server (install once if needed)
     npx http-server . -p 8080
     # or
     python -m http.server 8080
     ```
   - The frontend will call the backend API endpoints (the API base URL is configured in the client code or expected to be on the same host/port).

Example API usage (adjust paths to match how the server is configured)
- Create a short URL (example request body; check `backend/src/routes/urlRoutes.js` for exact endpoint and param names):
  ```bash
  curl -X POST http://localhost:PORT/api/urls \
    -H "Content-Type: application/json" \
    -d '{"longUrl":"https://example.com/very/long/path"}'
  ```
- Resolve / redirect:
  ```bash
  # open in browser: http://localhost:PORT/<shortId>
  curl -I http://localhost:PORT/<shortId>
  ```

Notes and troubleshooting
- Check `backend/src/config/Database.js` to see what environment variables are required and which DB is expected.
- If the frontend fails to reach the backend, confirm the backend `PORT` and CORS/middleware settings in `backend/src/app.js`.
- For exact dependencies and scripts, open `backend/package.json`.

## Development tips
- Routes are defined in `backend/src/routes/urlRoutes.js`; add or modify endpoints there.
- Business logic is in `backend/src/services/urlServices.js`; keep controllers thin and put heavier logic into services.
- Data model and persistence are in `backend/src/models/urlModel.js`.

## Try asking
- "Where is the DB connection string read from — what env variables does backend/src/config/Database.js expect?"
- "What endpoints and parameter names does backend/src/routes/urlRoutes.js expose for creating and resolving short URLs?"
- "Can you walk me through urlServices.js — how is a short id generated and validated (backend/src/services/urlServices.js)?"
