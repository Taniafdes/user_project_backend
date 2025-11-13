# user_project_backend

## 1. Project Overview
This is the backend for a **Notes application** built with **Node.js, Express, and MongoDB**.  
It provides **user authentication** using JWT and APIs for **creating, fetching, and deleting notes**.

---

## 2. Features
- User registration & login with JWT authentication.  
- Protected routes: only logged-in users can access notes.  
- CRUD operations for notes:
  - Create note
  - Fetch notes (with optional search by title/content)
  - Delete note
- Tags support for notes.  
- Notes filtering and search functionality.  

---

## 3. Tech Stack
- Node.js  
- Express.js  
- MongoDB Atlas  
- Mongoose  
- JWT for authentication  

---
## 5. Environment Variables

Create a `.env` file in the backend root with the following variables: