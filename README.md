
# 📦 Script & Scroll – Stationery Shop Backend

This is the backend for the Script & Scroll Stationery Shop web application. It's built using **Node.js**, **Express.js**, **TypeScript**, **MongoDB**, and **Zod** for schema validation.

---

## 🔧 Tech Stack

- Node.js
- Express.js
- TypeScript
- MongoDB (Mongoose)
- Zod (for request body validation)
- Cors
- Dotenv
- Nodemon

---

## 📁 Folder Structure

```
/src
  /app
    /modules           → Modular structure for features (products, users, orders, etc.)
    /middlewares       → Custom middleware functions
    /utils             → Utility and helper functions
    /config            → Database and app config
    /routes            → Route aggregators
  /server.ts           → Entry point
```

---

## 🚀 Features

- Product management (create, read, update, delete)
- User authentication and authorization (Admin & User roles)
- Order processing
- Category-wise product browsing
- Zod-based request validation
- Modular, scalable architecture

---

## ⚙️ Installation

```bash
git clone https://github.com/your-username/script-and-scroll.git
cd script-and-scroll/backend
npm install
```

---

## 📌 Environment Variables

Create a `.env` file in the `backend` folder:

```env
PORT=5000
DATABASE_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

---

## 🧪 Run the Server

```bash
# Development
npm run dev

# Production
npm run build
npm start
```


---

## 🛠️ Developer Notes

- Make sure MongoDB is running locally or use MongoDB Atlas.
- Use Postman or Thunder Client for testing routes.
- All input validations are handled by Zod.

---

## 📃 License

This project is licensed under the MIT License.
