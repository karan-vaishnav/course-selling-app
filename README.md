# Course Selling App - Backend

## Overview
This is the backend for the Course Selling App. It provides user authentication, course management, and purchasing functionality for users and admins.

## Features
- User Functionality:
  - Signup
  - Login
  - View Courses
  - Make Purchases
 
- Admin Functionality:
  - Create courses
  - Update courses
  - Delete courses
  - Get all courses created by the admin

## Prerequisites

Before you start, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or higher)
- [MongoDB](https://www.mongodb.com/) (or use MongoDB Atlas for cloud DB)
- [npm](https://www.npmjs.com/) (Node Package Manager)

## Setup

1. Clone the repository:

    ```bash
    git clone https://github.com/karan-vaishnav/course-selling-app.git
    cd course-selling-app
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Copy `.env.example` to `.env` and add your MongoDB credentials and JWT secret:

    ```bash
    cp .env.example .env
    ```

4. Update the `.env` file with your credentials:

    ```env
    MONGO_URI=mongodb+srv://your-mongo-credentials
    JWT_USER_SECRET=your-jwt-secret
    JWT_ADMIN_SECRET=your-admin-jwt-secret
    ```

## Running the Development Server

1. Start the development server:

    ```bash
    npm run dev
    ```

2. The server should now be running at `http://localhost:4000`.

## API Endpoints

### User Routes
- **POST** /signup: Create a new user.
    - Required fields: `email`, `password`, `firstName`, `lastName`
- **POST** /login: User login and get a JWT token.
    - Required fields: `email`, `password`
- **POST** /purchases: Get all purchases made by the user (requires authentication).
    - Headers: `Authorization`

### Admin Routes (Requires Admin Authentication)
- **POST** /admin/course: Create a new course (requires admin authentication).
    - Required fields: `title`, `description`, `price`, `imageUrl`
- **PUT** /admin/course: Update an existing course (requires admin authentication).
    - Required fields: `courseId`, `title`, `description`, `price`, `imageUrl`
- **DELETE** /admin/course: Delete a course (requires admin authentication).
    - Required fields: `courseId`
- **GET** /admin/course: Get all courses created by the admin (requires admin authentication).

## User Authentication Middleware
- All the routes under `/user/purchases` require a user to be authenticated via a JWT token, which should be included in the request header.

## Admin Authentication Middleware
- All the routes under `/admin/*` require an admin to be authenticated via the `JWT_ADMIN_SECRET`.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
