# Hostel Management System

## Description

This is a fully functional **Hostel Management System** built with the **MERN Stack** (MongoDB, Express.js, React.js, Node.js). The system allows administrators to manage student meals and food reviews while enabling students to log in, view, and review meals.

### Key Features:

- **Student Login**: Secure login for students with JWT authentication.
- **Meal Management by Admins**: Admin can manage meals and meal categories.
- **CRUD Operations**: Students and admins can perform CRUD operations on meal reviews.
- **Premium Membership**: Silver, Gold, and Platinum packages with Stripe integration for payments.
- **Meal Request**: Students can request meals based on their subscription level.
- **Meal Liking**: Students can like upcoming meals based on their subscription.

---

## Tech Stack

- **Frontend**: React.js, React Router, Tailwind CSS, Daisy UI, React Hook Form, React Query
- **Backend**: Node.js, Express.js, MongoDB
- **Payment Integration**: Stripe
- **Authentication**: JWT (JSON Web Token)
- **Database**: MongoDB
- **Image Upload**: ImageBB API

---

## Features

1. **Home Page**:

   - Navbar with logo, home, meals, upcoming meals, notifications, and join us button.
   - Banner section with a slider and search functionality.
   - Meals by Category with tabs: Breakfast, Lunch, Dinner, All Meals.
   - Membership section with Premium upgrade options (Silver, Gold, Platinum).
   - Footer section with useful links.

2. **Meal Detail Page**:

   - Displays meal details, including image, distributor name, description, ingredients, rating, and reviews.
   - Like button and meal request button (based on user subscription).

3. **Meals Page**:

   - Displays all meals with search functionality.
   - Filters by category and price range.
   - Infinite scrolling for loading more meals.

4. **Upcoming Meals**:

   - Premium users can like meals, and all upcoming meals are displayed as cards.

5. **Checkout Page**:

   - Allows purchasing packages (Silver, Gold, Platinum) with Stripe integration.
   - Confirmation modal/toast after successful payment.

6. **Join Us Page**:

   - Registration and login forms, social login options, and validation using React Hook Form.

7. **User Dashboard**:

   - Profile management with badges (Bronze, Gold).
   - Requested Meals and Reviews table with status, likes, and review details.
   - Payment History table.

8. **Admin Dashboard**:
   - Admin profile with meal management (add, update, delete).
   - Manage users, make admins, and view subscription status.
   - Manage meals (sort, add, update, delete).
   - Manage reviews, serve meals, and publish upcoming meals.

---

9. **Admin**:
   - Admin Email: saawalid@gmail.com,admin@gmail.com,
   - Password: Wa@123

## Environment Variables

- `MONGO_URI`: MongoDB connection string.
- `FIREBASE_API_KEY`: Firebase API key for authentication.
- `STRIPE_SECRET_KEY`: Stripe secret key for payment integration.
- `JWT_SECRET`: Secret key for JWT token generation.

> Ensure that `.env` files are not pushed to GitHub. Use environment variables to store sensitive information.

---

## Installation & Setup

1. Clone the repositories:

   - **Frontend**: `git clone <client-repository-link>`
   - **Backend**: `git clone <server-repository-link>`

2. Navigate to the backend directory and install dependencies:
   ```bash
   cd backend
   npm install
   ```
