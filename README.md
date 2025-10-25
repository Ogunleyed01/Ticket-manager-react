
# TicketApp — React 19 (HNG Stage 2) — Tailwind v4

This project is a complete React implementation of the HNG Stage 2 ticket app using React 19 and Tailwind v4 (zero-config).

## Features
- Landing page with wave hero and decorative circle.
- Authentication (login/signup) simulated using localStorage key `ticketapp_session`.
- Protected routes for Dashboard and Tickets.
- Dashboard statistics (total, open, closed).
- Ticket Management with full CRUD (create, edit modal, delete confirm).
- Inline validation and toast notifications.
- LocalStorage persistence; frontend-only implementation.

## Setup
1. Extract the archive.
2. `cd ticketapp_react_v19`
3. `npm install`
   - Installs React 19, Vite, and Tailwind v4 (`tailwindcss@next`).
4. `npm run dev`
5. Open `http://localhost:5173`

## Notes
- Tailwind v4 uses `@import "tailwindcss";` in `src/styles/index.css`. No PostCSS config required.
- Session key: `ticketapp_session`.
- Example credentials: any email, password >= 4 chars.

## Files
- `src/services/auth.js` — auth simulation
- `src/services/tickets.js` — ticket CRUD & validation
- `src/components` — Toast, Modal, Navbar, ProtectedRoute
- `src/pages` — Landing, Auth, Dashboard, Tickets
