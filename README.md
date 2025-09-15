# Blog Session

[Live preview → https://blog-session-pr.onrender.com](https://blog-session-pr.onrender.com)

> A small Express + EJS blog session project (server-rendered pages). Live site hosted at the link above.

---

## Table of contents

* [About](#about)
* [Features](#features)
* [Tech stack](#tech-stack)
* [Quick demo](#quick-demo)
* [Getting started (local)](#getting-started-local)
* [Environment / config](#environment--config)
* [Run scripts](#run-scripts)
* [Deployment notes (Render / Heroku / others)](#deployment-notes-render--heroku--others)
* [Project structure (high level)](#project-structure-high-level)
* [Contributing](#contributing)
* [License](#license)

---

## About

This repository contains a small server-rendered blog/session application built with Express and EJS. It includes basic session handling, passport support, file uploads, and routing.

Note: the repository's `server.js` initializes Express, sets the view engine to EJS, serves static files, configures session and passport, mounts the app router, and starts a server on port `8003`.&#x20;

---

## Features

* Server-rendered views using **EJS**
* Body parsing and JSON handling
* Static file serving (public + uploads)
* Session support with `express-session`
* Passport authentication initialized
* Flash messages (`connect-flash`)
* Basic routing organized via `./routers`

---

## Tech stack

* Node.js
* Express
* EJS (templating)
* Passport (authentication)
* connect-flash
* express-session
* Any DB (see `./config/database` in project)

---

## Quick demo

Open the live preview:
**[https://blog-session-pr.onrender.com](https://blog-session-pr.onrender.com)**

---

## Getting started (local)

1. Clone the repo

```bash
git clone https://github.com/<your-username>/<your-repo>.git
cd <your-repo>
```

2. Install dependencies

```bash
npm install
```

3. Configure environment (see next section)

4. Start locally (development)

```bash
npm run dev
# or
npm start
```

Open [http://localhost:8003](http://localhost:8003) (or the port you set) in your browser.

---

## Environment / config

This project references configuration files in `./config` (for example `config/database`). If you want your app to work on services like Render or Heroku, make sure you add environment variables for DB connection strings, session secrets, and any other credentials.

**Note about port:** your current `server.js` uses a hardcoded `port = 8003` when listening. For cloud deployments it’s common to use the host-provided `PORT` environment variable. You can change the code in `server.js` to fall back to `8003` like this:

```js
const port = process.env.PORT || 8003;
app.listen(port, () => {
  // ...
})
```

This change is recommended for Deploy-to-Render / Heroku. See `server.js` for the current behavior.&#x20;

### Suggested environment variables

```
PORT= (optional; set if you changed code to use process.env.PORT)
DB_URI=mongodb+srv://...
SESSION_SECRET=your-session-secret
SOME_OAUTH_CLIENT_ID=...
SOME_OAUTH_CLIENT_SECRET=...
```

---

## Run scripts

Add these to `package.json` (if not already present):

```json
"scripts": {
  "start": "node server.js",
  "dev": "nodemon server.js"
}
```

Run:

```bash
npm run dev   # development (with nodemon)
npm start     # production
```

---

## Deployment notes (Render, Heroku, etc.)

* If deploying to Render / Heroku, ensure your code reads `process.env.PORT` as described above.
* Push the repo to GitHub, then connect the repo to Render/Heroku and set required environment variables (DB URI, session secret, etc.) in the service dashboard.
* For Render: choose a `web service`, set the start command to `npm start` (or `node server.js`), and ensure any build commands are set if you use a build step.
* Ensure your `uploads/` folder is handled appropriately (cloud ephemeral filesystems may lose uploaded files) — consider cloud storage (S3, Cloudinary) for production file uploads.

---

## Project structure (high level)

```
.
├─ config/
│  └─ database.js
├─ routers/
│  └─ index.js
├─ controllers/
│  └─ ...
├─ public/           # static assets
├─ uploads/          # uploaded files (served via /uploads)
├─ views/            # EJS templates
├─ server.js
├─ package.json
└─ README.md
```

(Exact file/folder names may differ — this is a general overview.)

---

## Helpful commands

Start the server:

```bash
npm start
```

Start with nodemon:

```bash
npm run dev
```

Run lint/test (if you add them):

```bash
npm run lint
npm run test
```

---

## Known issues / tips

* If you see a `PORT` related error on cloud deployment, change `server.js` to use `process.env.PORT || 8003`.&#x20;
* Uploaded files in `uploads/` are served statically (`app.use("/uploads", express.static('uploads'))`) — be mindful of storage size and persistence on your host.

---

## Contributing

Contributions are welcome! To propose changes:

1. Fork the repo
2. Create a feature branch
3. Open a PR with a clear description of changes

---

## License

Add your license here (e.g., MIT)

---

## Footer

Live preview: [https://blog-session-pr.onrender.com](https://blog-session-pr.onrender.com)

---

Which would you like next?
