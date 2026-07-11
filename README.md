# Markist — Warehouse Management System

Markist is a warehouse management application for tracking inventory, shipments, and day-to-day operations across one or more warehouse locations.

## Features

- 📦 **My Suite** — Personal dashboard with your assigned tasks, saved views, and quick actions.
- 🚚 **History Shipping** — Full log of past shipments, statuses, and tracking details.
- 📊 **Inventory Overview** — Real-time stock levels across warehouses and bins.
- 🔔 **Notifications** — Alerts for low stock, delayed shipments, and pending approvals.
- 👥 **User Roles** — Role-based access for admins, warehouse staff, and shipping partners.

## Navigation Tabs

| Tab                  | Description                                               |
| -------------------- | --------------------------------------------------------- |
| **My Suite**         | Personalized workspace: tasks, favorites, recent activity |
| **History Shipping** | Historical record of all inbound/outbound shipments       |
| ...                  | Additional tabs (add as the project grows)                |

## Getting Started

### Prerequisites

- Node.js (v22+) / or your chosen backend runtime
- Database (e.g., PostgreSQL / MySQL / MongoDB)
- Package manager: npm / yarn / pnpm

### Installation

```bash
git clone https://github.com/moeinmnia80/warehouse.git
cd markist
npm install
```

### Configuration

Create a `.env` file in the root directory backend:

```env
CLIENT_HOST=http://localhost:3000
PORT=
DB_HOST=
DB_PORT=3306
DB_NAME=
DB_USER=
DB_PASSWORD=
DB_UNIQUE_ID=
DB_PRIVATE_KEY=
DB_EXPIRED_KEY=7d
```

Create a `.env` file in the root directory fronend:
or you can set in vite.config,js
```env
VITE_API_URL="http://localhost:3000"
```

### Running the App
frontend
```bash
npm run dev
```
backend
```bash
npm run server
```
The app will be available at `http://localhost:3000`.

## Project Structure

```
Project - warehouse - Markist/
├── src/
│   ├── feature/
│   │   ├── suite/
│   │   ├── dashboard/
│   │   └── ...
│   │
│   ├── pages/
│   │   ├── HomePage.tsx
│   │   ├── LoginPage.jsx/
│   │   └── ...
│   │
│   └── shared/
│       ├── component/
│       ├── layout/
│       └── ...
│
│
│
├── public/
├── index.html
├── package.json
├── tsconfig.json
├── README.md
└── ...
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'Add your feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.

## Contact

For questions or support, please open an issue in this repository.
