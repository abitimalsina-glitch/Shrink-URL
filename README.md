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

For further details (run instructions, API examples, and development notes) I removed the longer "How to run" and related sections as you requested; tell me when you want them restored or updated with exact env vars and example requests.
