## 📚 About

This is an e-commerce project built with **Next.js 15**, **Tailwind CSS**, and **Prisma**. It features both an **Admin Panel** for managing categories and products, and a **Customer-facing Shop Interface** with product sorting, filtering, pagination, and detailed product pages.

![Screenshot](/public/screenshot.webp)

## ⚡ Features

### 🛍️ **Shop Page**

- **Product Sorting**: Sort products by various criteria such as price, name, or popularity.
- **Filtering by Category**: Filter products by category, price range, and attributes like size or color.
- **Pagination**: Products are paginated for a better browsing experience.
- **Searchbox**: A search bar to find products based on user input.

### 🏷️ **Product Details Page**

- **Detailed Info**: Customers can view comprehensive details for each product, including attributes like size and color.
- **Reviews**: Signed-in users can create reviews. The page displays ratings and reviews in an appealing format.

### 🛒 **Server-Side Cart**

- **Guests**: Cart is stored using a cookie (cartToken) for the session.
- **Signed-in Users**: Cart is saved in the database and can be accessed across devices.
