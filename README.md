# 📦 BazaarTracker BD

**BazaarTracker BD** is a modern web application for tracking daily prices of essential items in local markets across Bangladesh. Users can view, compare, and track price changes while vendors can submit new prices and advertise products. The platform supports user interaction, purchases, and admin moderation.

---

## 🎯 Project Objective

- Help users stay updated with daily local market prices.
- Allow vendors to submit daily price data.
- Visualize price trends with charts.
- Provide user-specific dashboards (User, Vendor, Admin).
- Enable product purchases and ad promotions.

---

## 🌐 Live Links

-** [https://bazaar-tracker--bd.web.app/]


---

## 🌟 Key Features

- 🔐 **Authentication & Authorization**
  - Firebase-based user signup/login
  - JWT session handling
  - Role-based access control (Admin, Vendor, User)

- 🏪 **Public Features**
  - View all products with filtering and sorting
  - Product details (price list, vendor info, reviews)
  - Watchlist (for users)
  - Compare prices over time (Recharts)

- 📊 **User Dashboard**
  - Price trend charts
  - Watchlist management
  - My order history

- 🧑‍🌾 **Vendor Dashboard**
  - Add/manage products with multiple price entries by date
  - Submit and manage advertisements
  - View rejection feedback

- 🛠️ **Admin Dashboard**
  - Manage all users, products, ads, and orders
  - Approve/reject vendor submissions
  - View and assign roles
  - Post special market offers (optional feature)

- 💳 **Stripe Payment Integration**
  - Users can purchase products
  - Orders saved to database with toast notifications

- ⚙️ **Extra Utilities**
  - Framer Motion animations
  - Toast notifications
  - Responsive design (mobile, tablet, desktop)
  - Custom error and loading pages
  - Pagination and search functionality

---

## 📦 Used NPM Packages

> Below are some major packages used in this project:

- `react`
- `react-router-dom`
- `firebase`
- `axios`
- `react-hook-form`
- `react-toastify`
- `recharts`
- `framer-motion`
- `react-datepicker`
- `jsonwebtoken` (server)
- `express`, `cors`, `dotenv`, `mongoose` (server-side)
- `stripe` (server-side)
- `bcryptjs` (if using hashed passwords)

---

## 📁 Folder Structure (Client)

