# Freelance Hub Backend

A production-style **NestJS REST API** powering a freelance marketplace platform:
auth, gigs, orders, payments, real-time messaging, and notifications behind a
typed contract.

## Tech Stack

- **Backend**: NestJS 10 + TypeScript
- **Database**: PostgreSQL 15 + Prisma + TypeORM entity mirror
- **Auth**: JWT (Passport), bcrypt, role-based access (`CLIENT` / `FREELANCER`)
- **Payments**: Stripe (payment intents + webhook-friendly records)
- **Realtime**: Socket.io per-user chat rooms
- **Security**: Helmet, rate limiting, configurable CORS, httpOnly cookie flows
- **Deployment**: Docker, CI workflow documented in `docs/ci-guide.md`

## Key Features

- **Auth**: register / login / refresh, JWT + Passport strategies, role guards.
- **Gigs**: listings with pricing, contract type (`FIXED` / `HOURLY`), delivery
  window, and skill tags.
- **Orders**: typed lifecycle `PENDING → IN_PROGRESS → COMPLETED | CANCELLED`.
- **Payments**: Stripe payment intents persisted against orders; webhook handlers
  drive order state.
- **Messaging**: Socket.io chat scoped per user room.
- **Notifications**: per-user feed with read/unread tracking.
- **Observability**: structured errors, request-scoped logging, validation pipes.

## Repository Layout

```
freelance-hub-backend/
├── src/                  # NestJS modules (auth, users, gigs, orders, payments, …)
│   ├── auth/
│   ├── users/
│   ├── gigs/
│   ├── orders/
│   ├── payments/
│   ├── messages/
│   └── notifications/
├── app.module.ts
├── main.ts
├── nest-cli.json
├── tsconfig.json
├── package.json
├── docker-compose.yml    # Postgres + Redis for local dev
├── docs/                 # CI guide, demo plans
├── LICENSE               # MIT
└── README.md
```

## Getting Started

### Prerequisites

- Node.js 20+
- npm or yarn
- PostgreSQL 15+ (or use the bundled `docker-compose.yml`)
- Stripe API keys (test mode is fine)

### Installation

```bash
git clone https://github.com/matheus24scc/freelance-hub-backend.git
cd freelance-hub-backend
npm install
npm run start:dev
```

### Environment

Create `.env` from `.env.example` (not tracked). Required vars include
`DATABASE_URL`, `JWT_SECRET`, `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`,
and `PORT`.

### Build & Test

```bash
npm run build         # compile to dist/
npm run start:prod    # run dist/main.js
npm test              # Jest unit tests
npm run test:e2e      # end-to-end suite
```

## API Surface (REST)

| Endpoint            | Method | Description                                |
|---------------------|--------|--------------------------------------------|
| `/auth/register`    | POST   | Create account (`CLIENT` or `FREELANCER`)  |
| `/auth/login`       | POST   | Issue JWT                                   |
| `/users`            | GET    | List / search users                         |
| `/gigs`             | GET    | List gigs                                   |
| `/gigs`             | POST   | Create gig                                  |
| `/orders`           | POST   | Open order against a gig                    |
| `/orders/:id`       | PATCH  | Transition lifecycle state                  |
| `/payments/intent`  | POST   | Create Stripe payment intention             |
| `/messages`         | WS     | Socket.io scoped per user room              |
| `/notifications`    | GET    | Notifications for current user              |

## Deployment

The app can be deployed as a Docker container hitting a managed Postgres
instance, or directly to a Node-capable host. See `docs/ci-guide.md` for the
documented GitHub Actions workflow.

## License

MIT — see `./LICENSE`.
