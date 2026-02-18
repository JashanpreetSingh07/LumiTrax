# Vault — Personal Finance Tracker

A modern, professional Personal Finance Tracker built with React and Firebase. Features a unique teal/emerald fintech theme, dark/light mode, charts, and smooth animations.

![Vault Finance Tracker](https://img.shields.io/badge/React-18-blue) ![Firebase](https://img.shields.io/badge/Firebase-Auth_%26_Firestore-orange) ![Tailwind](https://img.shields.io/badge/Tailwind-3-38bdf8)

## Features

- **Authentication** — Email/password & Google sign-in via Firebase Auth
- **Dashboard** — Summary cards (Balance, Income, Expenses), transaction list, spending pie chart
- **Add/Edit/Delete** — Full CRUD for transactions
- **Filters & Search** — Filter by type, category, and search by title
- **Dark/Light Mode** — Toggle with system preference support
- **Charts** — Pie chart for spending by category (Recharts)
- **Responsive** — Mobile-first, works on all screen sizes
- **Animations** — Framer Motion for smooth transitions
- **Unique Design** — Teal/emerald theme, custom cards, hover effects

## Quick Start

### 1. Install dependencies

```bash
npm install
```

### 2. Set up Firebase

1. Create a project at [Firebase Console](https://console.firebase.google.com)
2. Enable **Authentication** (Email/Password and Google)
3. Create **Firestore Database**
4. Add a Firestore composite index:
   - Collection: `transactions`
   - Fields: `userId` (Ascending), `date` (Descending)

### 3. Configure environment

Copy `.env.example` to `.env` and add your Firebase config:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

### 4. Run the app

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

## Project Structure

```
src/
├── components/       # UI components
│   ├── Navbar.jsx
│   ├── SummaryCards.jsx
│   ├── Filters.jsx
│   ├── TransactionList.jsx
│   ├── TransactionModal.jsx
│   ├── TransactionForm.jsx
│   ├── SpendingChart.jsx
│   └── FloatingAddButton.jsx
├── context/          # Auth & Theme context
├── firebase/         # Firebase config
├── hooks/            # useTransactions
├── pages/            # Dashboard, Login, Signup, Profile, AddTransaction
├── App.jsx
└── main.jsx
```

## Tech Stack

- **React 18** + Vite
- **React Router 6**
- **Firebase** (Auth + Firestore)
- **Tailwind CSS**
- **Recharts**
- **Framer Motion**
- **Lucide React** (icons)

## Deploy

```bash
npm run build
```

Deploy the `dist/` folder to Vercel, Netlify, or Firebase Hosting.
