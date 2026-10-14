This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

# 🛡️ CommandOS — Tactical Command & Control Dashboard

> A high-performance, real-time situational awareness and fleet telemetry dashboard designed for C2 (Command & Control) operations, asset tracking, and mission-critical data visualization.

![CommandOS Preview](https://via.placeholder.com/1200x600/0f172a/f8fafc?text=CommandOS+Tactical+Dashboard)

[![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38bdf8?logo=tailwindcss)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-emerald.svg)](LICENSE)

---

## ⚡ Features

- 🗺️ **Tactical Map View:** Interactive dark-mode map powered by Leaflet & CartoDB for real-time asset position tracking.
- 📡 **Live Telemetry Stream:** Dynamic data ingestion charts using Recharts with simulated WebSocket updates (1 Hz refresh).
- 🛸 **Fleet Management:** Filterable, search-driven sidebar tracking drone status, battery levels, speed, and ping rates.
- 🎨 **Control Room UX:** High-contrast, dark-theme layout engineered to reduce cognitive load during high-density data supervision.
- 🔒 **Type-Safe Architecture:** Strict TypeScript data modeling for multi-asset telemetry and status state machines.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
