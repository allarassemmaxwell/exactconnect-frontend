# 🛍️ Product Management Dashboard (Frontend)

This is the **frontend** of the Product Management Dashboard built with **React 19**, **TailwindCSS**, and **Vite**. It enables authenticated users to view, filter, order products, view their orders, and download order reports.

This dashboard was developed as part of a technical assessment for an internship opportunity at Exactconnect.

## ✨ Features

✅ **User Authentication**  
Secure login system using `react-auth-kit` and JWT.

✅ **Product Listing**  
View a list of products retrieved from a public API.

✅ **Product Filtering**  
Users can filter the product list by name or price range.

✅ **Order Products**  
Place orders for available products with a defined quantity.

✅ **View My Orders**  
Display all products that the logged-in user has previously ordered.

✅ **Download Reports**  
Download a PDF report of ordered products including pricing.

---

## 🛠 Tech Stack

- **React 19**
- **TailwindCSS 4**
- **Vite**
- **TypeScript**
- **React Router 7**
- **Axios** for API communication
- **React-Auth-Kit** for authentication
- **React Toastify** for notifications
- **html2pdf.js** to export ordered products to PDF

---

## 🧪 Scripts

Run the following commands to use the project locally:

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build the project
npm run build

# Preview production build
npm run preview

# Lint the code
npm run lint
```

🔐 Environment Variables

You can set up the backend URL in the content/index.js file as follows:
```bash
const backendUrl = "http://your-backend-api-url";
```

Alternatively, you can configure this through an .env file in the root directory, by adding:
```bash
VITE_API_BASE_URL=http://your-backend-api-url
```
Both methods are supported to configure the backend API URL.


📁 Folder Structure

The key sections of the UI implemented include:

* Dashboard: Main entry point after login.
* Products: View and filter products from API.
* Orders: Place and view previous orders.
* Report: Generate and download PDF of ordered products.
* Other menu items like User Profile and Change Password are template placeholders and not functional for now.

📦 Package.json Overview

Includes key dependencies:
```bash
"react": "^19.0.0",
"tailwindcss": "^4.0.8",
"axios": "^1.8.4",
"react-auth-kit": "^3.1.3",
"react-router-dom": "^7.5.0",
"html2pdf.js": "^0.10.3",
```


Dev setup includes:
```bash
"vite": "^6.1.0",
"typescript": "~5.7.2",
"eslint": "^9.19.0"
```
🚀 Deployment

You can view the live application here:

Product Management Dashboard - Vercel

The project has been deployed using Vercel. You can also access the source code on GitHub.

🔗 Related Repos

🔧 Backend Repository: https://github.com/allarassemmaxwell/exactconnect-backend


