
Built by https://www.blackbox.ai

---

```markdown
# Zomato Clone

Zomato Clone is a web application that allows users to explore and order food from various restaurants based on their cuisine and dietary preferences. The application features an intuitive interface with restaurant cards, detailed menu items, nutrition information, and a functional shopping cart.

## Project Overview

This project aims to replicate some functionalities of the popular food ordering platform, Zomato. It showcases the power of front-end technologies and provides a smooth user experience. Users can search for restaurants, filter by cuisine and dietary preferences, and manage their orders through a cart system.

## Installation

To set up the project locally, follow these steps:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/zomato-clone.git
   ```
2. **Navigate to the project directory:**
   ```bash
   cd zomato-clone
   ```
3. **Open the `index.html` file in your web browser.**

   You can also use a local server for better performance and functionality (especially for handling local storage). You can use Live Server extension in VSCode or any preferred method.

## Usage

1. **Explore:** Navigate through the application to explore different restaurants and their menus.
2. **Search:** Use the search bar to find restaurants or dishes by name.
3. **Filter:** Utilize the diet preference buttons to filter restaurants that match your dietary needs (e.g., vegan, gluten-free).
4. **Add to Cart:** Select menu items and adjust quantities to add to your cart.
5. **View Cart:** Access the cart via the cart icon to review your selected items and proceed to checkout.

## Features

- **Responsive Design:** The application is mobile-friendly and adapts to different screen sizes.
- **Dynamic Restaurant Cards:** Each restaurant displays detailed information including name, cuisine, rating, delivery time, and menu items.
- **Intuitive Search and Filter Options:** Easily find what you are looking for with search functionality and dietary filters.
- **Cart Management:** Users can add, remove, and modify quantities of their selected items.
- **Nutrition Information:** Each menu item includes detailed nutritional values and allergen information.

## Dependencies

The project uses the following dependencies, as specified in `package.json` or directly referenced in the HTML files:
- **Tailwind CSS** for styling
- **Font Awesome** for icons
- **Poppins** font for a modern look

You may need to install additional dependencies if you are expanding the project with more features or frameworks.

## Project Structure

Here’s an overview of the main files and their functions:

```
.
├── index.html          # Main HTML file for the application
├── cart.html           # Page for viewing and managing the cart
├── data.js             # JavaScript file containing restaurant data and constants
├── script.js           # Main JavaScript logic for interactive features
├── style.css           # CSS file for custom styles
├── app.js              # Basic application logic for handling states
├── cart.js             # Logic for managing cart interactions
├── utils.js            # Utility functions for common tasks
├── constants.js        # Contains constant values used across the application
└── restaurant-card.js   # Code for rendering restaurant card components
```

Each functionality is neatly organized into respective JavaScript files to maintain clarity and ease of debugging.

## Conclusion

This Zomato clone serves as a great starting point for anyone looking to build a food ordering application or delve into web development. It showcases the essentials of a dynamic web application with user interactivity.
```