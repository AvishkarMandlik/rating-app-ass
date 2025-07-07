# 🏬 Store Ratings System

A full-stack web application to manage and rate stores with role-based access for Admins, Owners, and Users.

---

## 🛠️ Technologies Used

### Backend
- **Framework:** Express.js
- **Database:** MySQL
- **ORM/Driver:** mysql2
- **Auth & Security:**
  - bcryptjs
  - jsonwebtoken
- **Environment Config:** dotenv

### Frontend
- **Library:** React.js
- **Styling:** Tailwind CSS
- **HTTP Client:** Axios

---

## 👑 Admin Panel

Admins have full access to all data and management features.

### ✨ Features
- View all users
- Delete users
- View all stores
- Manage ownerships

### 📸 Screenshots
> _Admin Dashboard, Users Table, Stores Table_

<img src="screenshots/Screenshot 2025-07-07 170819.png" width="250"/>
<img src="screenshots/Screenshot 2025-07-07 170912.png" width="250"/>
<img src="screenshots/Screenshot 2025-07-07 170928.png" width="250"/>
<img src="screenshots/Screenshot 2025-07-07 170939.png" width="250"/>
<img src="screenshots/Screenshot 2025-07-07 170948.png" width="250"/>

---

## 🧑‍💼 Store Owner Panel

Store Owners can manage their own stores and monitor ratings.

### ✨ Features
- View personal store info
- See average rating
- See detailed list of ratings from users

### 📸 Screenshots
> _Owner Dashboard, Store Ratings List, Rating Breakdown_

<img src="screenshots/Screenshot 2025-07-07 171346.png" width="250"/>
<img src="screenshots/Screenshot 2025-07-07 171355.png" width="250"/>

---

## 🙋‍♂️ User Panel

Users can explore stores and rate them.

### ✨ Features
- Browse stores
- Search and filter by name or address
- Submit or update their ratings

### 📸 Screenshots
> _Store List Page, Store Detail with Rating, Rate Store Popup_

<img src="screenshots/Screenshot 2025-07-07 171505.png" width="250"/>
<img src="screenshots/Screenshot 2025-07-07 171514.png" width="250"/>

---

## 🚀 Setup Instructions

1. **Clone the repository**
2. **Backend Setup**
   - `cd backend`
   - `npm install`
   - Configure `.env` (MySQL, JWT, etc.)
   - `npm start`

3. **Frontend Setup**
   - `cd frontend`
   - `npm install`
   - `npm run dev` or `npm start`

---

