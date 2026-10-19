# Smart Fuel Optimization & Resource Management

Responsive React interface for the Smart Fuel Figma screens. It includes the landing and authentication experiences, individual and organization workspaces, trip planning and optimized routes, vehicle and fuel management, budgets, analytics, crisis mode, notifications, and the admin dashboard. The landing page includes a responsive product overview, with the Figma urban-street image stored locally in `public/assets/`.

## Run locally

```powershell
npm.cmd install
npm.cmd run dev
```

Use **Explore the dashboard** on the landing page to enter the demo workspace. Registration and dashboard edits are client-side demo interactions; they are not connected to a backend or persisted between refreshes.

## Open a screen directly

The app keeps the active screen in the URL hash, so each implemented Figma frame can be opened and refreshed directly. For example, use `http://localhost:5173/#/dashboard`, `http://localhost:5173/#/trip-planner`, or `http://localhost:5173/#/optimized-route`.

## Screen components

The workspace shell and remaining organization workspace screens live in `src/App.jsx`. The landing, authentication, admin, dashboard, budget, crisis, trip-planning, vehicle, fuel-record, add-record, analytics, and notification screens are split into focused components under `src/pages/`, with shared icons, buttons, charts, and map preview primitives in `src/components/ui.jsx`. Mobile navigation and screen-specific responsive layouts are in `src/pages.css` and `src/styles.css`.

## Build

```powershell
npm.cmd run build
```
