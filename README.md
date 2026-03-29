# HealthSync

A B2B Healthcare SaaS dashboard for managing patients, tracking analytics, and monitoring critical cases in real time.

## Tech Stack

- **React 18 + TypeScript** — component architecture with full type safety
- **Redux Toolkit** — global state for auth, patients, and notifications
- **Firebase Authentication** — email/password login with session persistence
- **React Router v6** — protected routes with session-aware redirects
- **Tailwind CSS** — responsive utility-first styling
- **Recharts** — analytics charts derived live from patient state
- **Service Worker + Notifications API** — OS-level push notifications
- **Vite** — build tooling

## Features

- Login with Firebase auth and persistent session
- Patient management with grid/list view, search, filter, sort, and pagination
- Update patient status from the detail modal — dashboard and analytics sync instantly
- In-app notification panel with unread badge; OS notifications fire on critical status changes
- Analytics charts (condition distribution, status breakdown, admissions trend) all derived from live Redux state

## Getting Started

```bash
npm install
npm run dev
```

Add a `.env` file with your Firebase config keys (`VITE_FIREBASE_API_KEY`, etc.).

## Test Credentials

```
Email:    TestId123@gmail.com
Password: Test123
```

## Live Demo
https://health-sync-kybd-git-main-tanishq-07s-projects.vercel.app/
