![build](https://github.com/chhex/spring-boot-react-crud-revisited/actions/workflows/build.yml/badge.svg?branch=main)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
![PRs welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)

# Revisited Baeldung Tutorial – React & Spring Boot CRUD

Revisited Baeldung Tutorial CRUD Application with React and Spring Boot — see https://www.baeldung.com/spring-boot-react-crud — **with versions pinned** so it actually works with today’s ecosystem.

The original article is ~4 years old and mixes libraries whose majors changed since.

The versions which actually worked without changing the code, where:

- **React**: `18.3.1
- **react-dom**: `18.3.1`
- **react-router-dom**: `5.3.4` (v5 API used in the tutorial)
- **reactstrap**: `^9` (required for Bootstrap 5)
- **bootstrap**: `^5` (CSS only; load in `index.js`)
- **@popperjs/core**: `^2` (Bootstrap’s dependency)
- **react-cookie**: `4.1.1` (as in tutorial)

> The Key upgrade I initally made vs the article: **reactstrap v9** (not v8) to match **Bootstrap 5**.
> Also recommended, i found out **React 18** (not 19) for max compatibility with Router v5. Otherwise the Navigation will not work reliable.

The goal is to "modernize" the React Frontend to
use React V19, Router V6 and Bootstrap 5

In this version, i migrated:

- **Npm to use Vite**

- **React 19**
  
  - `npm i --save-exact react@19 react-dom@19`
  - Fixed any peer-dep warnings
  - 
- **Convert classes → function components + hooks**
  
  - `useState`, `useEffect`, `useNavigate` (v6)

## Project layout

```
reactboot/               # Maven Spring Boot backend
└── frontend/            # React app (npm)
```

## Dev setup

### Single Artifact

Running the Application as Single Artifact with Spring Boot

```bash
./mvnw clean spring-boot:run -Psingle-art
```

### Frontend and Backend seperate Process

Backend (Spring Boot(

bash
./mvnw clean spring-boot:run
``

Frontend (port 3000, proxies to 8080):

```bash
cd reactboot/frontend
npm ci
npm start
```

Open: http://localhost:3000

> **Note:** In development, `package.json` may contain `"proxy": "http://localhost:8080"`.

## Fresh install (freezing the working versions)

The following helped me to get around the version "mess" i encountered. Full disclosure: i am a newbie to the Javascript Eco culture.

From `reactboot/frontend`:

```bash
# Clean any previous installs
rm -rf node_modules package-lock.json

# Install exact React + Router v5
npm i --save-exact react@18.3.1 react-dom@18.3.1 react-router-dom@6

# Install Bootstrap 5 compatible UI stack
npm i reactstrap@^9 bootstrap@^5 @popperjs/core@^2 react-cookie@4.1.1

# Create a fresh lockfile reflecting the above
npm install

# (In src/index.js or main.jsx) load Bootstrap CSS once:
# import 'bootstrap/dist/css/bootstrap.min.css';
```

**Commit both** `package.json` **and** `package-lock.json`.
On CI/fresh clones use `npm ci` for reproducible installs.

## Next Steps

- **Testing**
  
  - Unit/UI: Jest + React Testing Library
  - Backend: Spring Boot Test
- **CI**
  
  - Or only via Maven
- **Infra (Optional)**
  
  - Env vars for API base (`REACT_APP_API_BASE=/api`)
  - NGINX/Ingress with `/api` proxy, SPA fallback

## Credits

Based on: Baeldung “Spring Boot + React: CRUD” (linked above), adapted to a compatible dependency set and with notes for upgrade paths.

