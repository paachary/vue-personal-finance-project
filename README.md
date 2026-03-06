# Vue Personal Finance Project

A complete full-stack web application for managing personal finances. 
      
      Track your bank accounts, investments, and savings — all in one place. 
      
      Built with **Vue 3** on the frontend, **Node.js / Express** on the backend, and **Oracle Database** for persistent storage.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Database Setup](#database-setup)
- [Backend Setup](#backend-setup)
- [Frontend Setup](#frontend-setup)
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Database Schema](#database-schema)
- [Security](#security)

---

## Features

- **User Authentication** — Secure registration, login, logout, and password reset using JWT access tokens and refresh tokens (stored in Oracle DB).
- **Customer Management** — Register customers, view and edit customer profile details.
- **Bank Management** — Add, view, and manage bank records.
- **Account Management** — Link bank accounts to customers; view, edit, and delete account records.
- **Investment Tracking** — Record and manage savings and investment instruments (FD, SIP, MF, etc.) per account, including investment type, instrument type, amount, dates, and active status.
- **Investment Types & Instrument Types** — Maintain lookup tables for investment and instrument type codes.
- **Reports & Charts** — Visualize portfolio breakdown and monthly debit summaries using interactive Chart.js charts; export investment data to Excel.
- **Row-Level Security** — Oracle VPD (Virtual Private Database) policies ensure each user can only see their own data.
- **Token Refresh** — Access tokens are silently refreshed from the refresh token on expiry, ensuring a smooth user experience.

---

## Tech Stack

### Frontend
| Library | Version | Purpose |
|---------|---------|---------|
| [Vue 3](https://vuejs.org/) | ^3.2 | UI framework |
| [Vuex 4](https://vuex.vuejs.org/) | ^4.0 | State management |
| [Vue Router 4](https://router.vuejs.org/) | ^4.5 | Client-side routing |
| [Bootstrap 5](https://getbootstrap.com/) | ^5.3 | Responsive UI components |
| [Chart.js](https://www.chartjs.org/) + [vue-chartjs](https://vue-chartjs.org/) | ^4.5 / ^5.3 | Data visualization |
| [Axios](https://axios-http.com/) | ^1.9 | HTTP client |
| [vue-json-excel3](https://www.npmjs.com/package/vue-json-excel3) | ^1.0 | Excel export |
| [Font Awesome 4](https://fontawesome.com/v4/) | ^4.7 | Icons |

### Backend
| Library | Version | Purpose |
|---------|---------|---------|
| [Express 5](https://expressjs.com/) | ^5.1 | HTTP server / REST API |
| [oracledb](https://node-oracledb.readthedocs.io/) | ^6.8 | Oracle database driver |
| [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) | ^9.0 | JWT generation & verification |
| [bcrypt](https://github.com/kelektiv/node.bcrypt.js) | ^6.0 | Password hashing |
| [cors](https://github.com/expressjs/cors) | ^2.8 | Cross-Origin Resource Sharing |
| [cookie-parser](https://github.com/expressjs/cookie-parser) | ^1.4 | Cookie handling |
| [dotenv](https://github.com/motdotla/dotenv) | ^17.2 | Environment variable loading |
| [nodemon](https://nodemon.io/) | ^3.1 | Dev server auto-restart |

### Database
- **Oracle Database** (tested with Oracle 19c / 21c / 23ai)
- Uses connection pooling via `oracledb`
- Row-Level Security enforced through Oracle VPD (`DBMS_RLS`)

---

## Project Structure

```
vue-personal-finance-project/
├── public/                         # Static HTML assets (Vue CLI output)
├── src/
│   ├── App.vue                     # Root Vue component
│   ├── main.js                     # Vue app entry point
│   ├── frontend/
│   │   ├── assets/                 # Images, fonts, global CSS
│   │   ├── components/UI/          # Shared UI components
│   │   ├── mixins/                 # Vue mixins (shared logic)
│   │   ├── pages/
│   │   │   ├── authentication/     # Login, Logout, PasswordReset
│   │   │   ├── accounts/           # Account registration & listing
│   │   │   ├── banks/              # Bank entry & details view
│   │   │   ├── customers/          # Customer registration & edit
│   │   │   ├── home/               # Dashboard / home page
│   │   │   ├── investments/        # Investment details, types, instruments
│   │   │   ├── reports/investments/# AllInvestments & Monthly Debit reports
│   │   │   └── error/              # Error page
│   │   ├── router.js               # Vue Router configuration
│   │   ├── scripts/                # Utility scripts (token helpers, etc.)
│   │   └── store/                  # Vuex store (index + modules)
│   ├── backend/
│   │   ├── server.js               # Application entry point
│   │   ├── config/
│   │   │   ├── database.js         # Oracle DB pool configuration
│   │   │   └── web-server.js       # Express server configuration
│   │   ├── controllers/            # Request handler functions
│   │   │   ├── accounts.js
│   │   │   ├── banks.js
│   │   │   ├── context.js
│   │   │   ├── customer.js
│   │   │   ├── instrumentTypes.js
│   │   │   ├── investmentTypes.js
│   │   │   └── investments.js
│   │   ├── database/               # SQL / oracledb query functions
│   │   ├── services/
│   │   │   ├── database.js         # Pool init / teardown
│   │   │   ├── web-server.js       # Express app setup & route wiring
│   │   │   └── routers/            # Express routers per domain
│   │   └── util/                   # Error handler, JWT helpers, CustomError
│   └── SQLs/
│       ├── code_setup.sql          # Initial schema / seed data script
│       ├── tables/                 # DDL for all tables
│       ├── views/                  # DDL for database views
│       ├── constraints/            # Primary & foreign key constraints
│       ├── functions/              # PL/SQL functions
│       ├── package_specifications/ # PL/SQL package specs
│       ├── package_bodies/         # PL/SQL package bodies
│       └── vpd_scripts/            # VPD context & RLS policy scripts
├── babel.config.js
├── vue.config.js
└── package.json                    # Frontend dependencies & scripts
```

---

## Prerequisites

Before you begin, make sure you have the following installed:

- [Node.js](https://nodejs.org/) **≥ 16** (LTS recommended)
- [npm](https://www.npmjs.com/) **≥ 8** (bundled with Node.js)
- [Oracle Database](https://www.oracle.com/database/) **19c / 21c / 23ai** (local, Docker, or cloud — e.g. Oracle Autonomous DB)
- [Oracle Instant Client](https://www.oracle.com/database/technologies/instant-client.html) installed and on your `PATH` / `LD_LIBRARY_PATH`

---

## Database Setup

1. Connect to your Oracle instance as a user with `DBA` or schema-creation privileges.

2. Run the scripts in the `src/SQLs/` directory **in order**:

   ```sql
   -- 1. Core tables
   @src/SQLs/tables/CUSTOMERS.sql
   @src/SQLs/tables/BANKS_MASTER.sql
   @src/SQLs/tables/ACCOUNT_HOLDERS.sql
   @src/SQLs/tables/INVESTMENT_TYPES.sql
   @src/SQLs/tables/INSTRUMENT_TYPES.sql
   @src/SQLs/tables/INVESTMENT_DETAILS.sql
   @src/SQLs/tables/CUSTOMER_REFRESH_TOKEN_XREF.sql

   -- 2. Constraints
   -- (scripts in src/SQLs/constraints/)

   -- 3. Views
   @src/SQLs/views/ACCOUNT_HOLDER_DETAILS_VW.sql
   @src/SQLs/views/ACCOUNT_INVESTMENT_DETAILS_VW.sql

   -- 4. PL/SQL functions & packages
   -- (scripts in src/SQLs/functions/, package_specifications/, package_bodies/)

   -- 5. VPD / Row-Level Security
   @src/SQLs/vpd_scripts/context_setting.sql
   @src/SQLs/vpd_scripts/rls_policy.sql
   ```

3. You can also run the combined setup script if provided:
   ```sql
   @src/SQLs/code_setup.sql
   ```

---

## Backend Setup

```bash
cd src/backend
npm install
```

Create a `.env` file in `src/backend/` (copy from the template below and fill in your values):

```dotenv
# Oracle DB credentials
DB_USER=<your_db_username>
DB_PASSWORD=<your_db_password>
DB_CONNECTION_STRING=<host>:<port>/<service_name>

# Oracle DB connection pool sizing
DB_POOL_MIN=20
DB_POOL_MAX=20
DB_POOL_INCREMENT=0

# Express server
WEB_SERVER_HOST=localhost
WEB_SERVER_PORT=3000
WEB_SERVER_PROTOCOL=http
STATIC_FILES_PATH=public
ENABLE_COMPRESSION=true
ENABLE_CORS=true

# JWT secrets — use long, random strings in production
ACCESS_TOKEN_SECRET=<your_access_token_secret>
REFRESH_TOKEN_SECRET=<your_refresh_token_secret>
```

---

## Frontend Setup

```bash
# From the repository root
npm install
```

The Vue CLI development server is pre-configured to proxy API calls to `http://localhost:3000` (see `vue.config.js`).

---

## Environment Variables

| Variable | Location | Description |
|----------|----------|-------------|
| `DB_USER` | `src/backend/.env` | Oracle DB username |
| `DB_PASSWORD` | `src/backend/.env` | Oracle DB password |
| `DB_CONNECTION_STRING` | `src/backend/.env` | Oracle connect string (e.g. `localhost:1521/ORCLPDB`) |
| `DB_POOL_MIN` | `src/backend/.env` | Minimum Oracle connection pool size |
| `DB_POOL_MAX` | `src/backend/.env` | Maximum Oracle connection pool size |
| `DB_POOL_INCREMENT` | `src/backend/.env` | Pool increment when extra connections are needed |
| `WEB_SERVER_HOST` | `src/backend/.env` | Express host (e.g. `localhost`) |
| `WEB_SERVER_PORT` | `src/backend/.env` | Express port (e.g. `3000`) |
| `ACCESS_TOKEN_SECRET` | `src/backend/.env` | Secret used to sign JWT access tokens |
| `REFRESH_TOKEN_SECRET` | `src/backend/.env` | Secret used to sign JWT refresh tokens |

---

## Running the Application

### Start the backend

```bash
cd src/backend
npm run start-server
```

The Express API server will start at `http://localhost:3000`.

### Start the frontend (development)

```bash
# From the repository root
npm run serve
```

The Vue development server will start at `http://localhost:8080`.

### Build the frontend for production

```bash
npm run build
```

The compiled assets are written to the `dist/` folder and can be served by any static file host or placed in the Express `public/` folder.

### Lint the frontend

```bash
npm run lint
```

---

## API Endpoints

All endpoints (except registration and login) require a valid **JWT Bearer token** in the `Authorization` header and the **`Username`** header.

### Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/register-new-customer` | Register a new customer account |
| `POST` | `/customer/validate-customer/:userName` | Log in and receive access/refresh tokens |
| `POST` | `/access-token-refresh/:userName` | Refresh an expired access token |
| `POST` | `/set-application-context` | Set Oracle VPD application context |
| `POST` | `/clear-session` | Clear the server-side session context |

### Banks

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/banks` | List all banks |
| `POST` | `/banks` | Register a new bank |
| `GET` | `/banks/:bankId` | Get a specific bank |

### Accounts

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/accounts` | List all accounts |
| `POST` | `/accounts` | Register a new account |
| `PUT` | `/accounts` | Update account details |
| `DELETE` | `/accounts/:acctId` | Delete an account |
| `GET` | `/all-accounts/:userName` | Get all accounts for a user |

### Investments

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/investments/:id` | Get investment by ID |
| `GET` | `/investments/account/:accountNumber` | Get savings for an account |
| `POST` | `/investments/account/register` | Register a new investment/saving |
| `PUT` | `/investments/update-investment/:investmentId` | Update an investment |
| `DELETE` | `/investments/delete-investment/:investmentId` | Delete an investment |
| `GET` | `/all-investments/:userName` | Get all investments for a user (`allUsers` for admin) |
| `GET` | `/get-active-investment-summary/:userName` | Active investment summary |
| `GET` | `/get-active-investment-summary-for-investment-type/:userName` | Summary grouped by investment type |
| `GET` | `/get-active-investment-summary-for-instrument-type/:userName` | Summary grouped by instrument type |
| `GET` | `/get-monthly-debit-summary` | Monthly debit summary |

### Customers

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/customers` | List all customers |
| `PUT` | `/customer/:custId` | Update customer details |

### Lookup Tables

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/investment-types` | List all investment types |
| `POST` | `/investment-types` | Add an investment type |
| `GET` | `/instrument-types` | List all instrument types |
| `POST` | `/instrument-types` | Add an instrument type |

---

## Database Schema

### Core Tables

| Table | Description |
|-------|-------------|
| `CUSTOMERS` | Registered users with hashed passwords, personal details, and admin flag |
| `BANKS_MASTER` | Bank reference data |
| `ACCOUNT_HOLDERS` | Links customers to bank accounts |
| `INVESTMENT_DETAILS` | Individual investment/savings records per account |
| `INVESTMENT_TYPES` | Lookup for investment type codes (e.g. SIP, Lumpsum) |
| `INSTRUMENT_TYPES` | Lookup for instrument type codes (e.g. MF, FD, Stock) |
| `CUSTOMER_REFRESH_TOKEN_XREF` | Persisted JWT refresh tokens per user |

### Views

| View | Description |
|------|-------------|
| `ACCOUNT_HOLDER_DETAILS_VW` | Joined view of customers, accounts, and bank details |
| `ACCOUNT_INVESTMENT_DETAILS_VW` | Full investment details joined with account and customer info |

---

## Security

- **Password Hashing** — User passwords are hashed with [bcrypt](https://github.com/kelektiv/node.bcrypt.js) before being stored; plain-text passwords are never persisted.
- **JWT Authentication** — Stateless authentication using short-lived access tokens. Tokens are verified on every protected request via the `authenticate` middleware.
- **Token Refresh** — Refresh tokens are stored in Oracle DB (`CUSTOMER_REFRESH_TOKEN_XREF`) and used to silently re-issue access tokens when they expire, without requiring the user to log in again.
- **CORS** — The Express server enforces an allowlist of permitted origins (`http://localhost:8080`, `http://localhost:3000`, `http://localhost`). Requests from any other origin are rejected with HTTP 401 (as configured in the `cors` callback).
- **Oracle VPD (Row-Level Security)** — `DBMS_RLS` policies are applied to `ACCOUNT_HOLDERS`, `ACCOUNT_HOLDER_DETAILS`, and `ACCOUNT_INVESTMENT_DETAILS_VW`. The application context set by `/set-application-context` ensures each user can only read their own rows, even if they craft a direct SQL query.
- **Sensitive Credentials** — All database credentials and JWT secrets are loaded exclusively from environment variables (`.env`) and are never committed to source control.

