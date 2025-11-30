# Craftify E-Commerce Website

## Project Information

**Repository:** [i220637_i253025_FinalProject_IICT](https://github.com/i220637-dev/i220637_i253025_FinalProject_IICT.git)

**Project Type:** Final Project - IICT (Introduction to Information and Communication Technology)

**Description:** A fully functional e-commerce website for handmade crafts and artisanal products, featuring product browsing, filtering, shopping cart, checkout, and user account management.

---

## Project Structure

```
IICT_Project/
├── index.html                          # Home page
├── products.html                        # Products listing page
├── item.html                           # Product detail page
├── shopping-cart.html                  # Shopping cart page
├── checkout.html                       # Checkout page
├── confirmation.html                   # Order confirmation page
├── user.html                           # User profile page
├── login.html                          # Login page
├── signup.html                         # Sign up page
├── about.html                          # About us page
├── contact.html                        # Contact page
├── styles/
│   ├── main.css                        # Main stylesheet
│   └── logo.css                        # Logo animations
├── scripts/
│   └── main.js                         # Main JavaScript functionality
├── images/                             # Image assets and icons
├── Feature_Implementation_Documentation.md
├── Phase6_Alerts_and_Console_Logs_Documentation.md
└── Pages_Inventory.md
```

---

## Features

### Fully Implemented Features

1. **Shopping Cart System**
   - Add/remove items from cart
   - Update item quantities
   - Calculate subtotal, tax, shipping, and total
   - Persistent cart using localStorage
   - Dynamic cart count display in navigation

2. **Product Filtering System**
   - Filter by category (All, Home Decor, Jewelry, Textiles, Pottery)
   - Filter by price range (Under $20, $20-$50, $50-$100, Over $100)
   - Search functionality
   - Combined filtering (category + price + search)

3. **Product Sorting System**
   - Sort by price (Low to High, High to Low)
   - Sort by rating
   - Sort by popularity
   - Dynamic DOM reordering

4. **User Interface**
   - Responsive design
   - Modern and clean layout
   - Consistent navigation across all pages
   - Interactive elements and animations

5. **Form Validation**
   - Contact form validation
   - Login/Signup form validation
   - Checkout form validation
   - User feedback via alerts

### Modeled Implementation Features

1. **Product Recommendation Engine**
   - Displays recommended products based on viewing history
   - Uses localStorage to track viewed products
   - Shows suggestions on product detail page

---

## Technical Details

### Technologies Used

- **HTML5** - Structure and semantic markup
- **CSS3** - Styling, animations, and responsive design
- **Vanilla JavaScript** - All functionality without frameworks
- **LocalStorage API** - Cart persistence and user preferences

### Key JavaScript Features

- DOM manipulation and event handling
- Form validation and submission
- Dynamic content rendering
- Local storage management
- URL parameter handling
- Product filtering and sorting algorithms

### Browser Compatibility

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Responsive design for desktop, tablet, and mobile devices

---

## Setup Instructions

### Prerequisites

- A modern web browser
- A local web server (optional, for testing)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/i220637-dev/i220637_i253025_FinalProject_IICT.git
   ```

2. Navigate to the project directory:
   ```bash
   cd i220637_i253025_FinalProject_IICT
   ```

3. Open `index.html` in a web browser, or use a local server:
   ```bash
   # Using Python 3
   python -m http.server 8000
   
   # Using Node.js (http-server)
   npx http-server
   ```

4. Access the website at `http://localhost:8000` (or the port specified)

---

## Usage

### Navigation

- **Home**: Main landing page with featured products
- **Products**: Browse all products with filtering and sorting options
- **Cart**: View and manage items in shopping cart
- **User**: Access user profile and account settings
- **About**: Learn about Craftify
- **Contact**: Contact form for inquiries

### Shopping Flow

1. Browse products on the Products page
2. Use filters to narrow down products by category or price
3. Sort products by price, rating, or popularity
4. Click "Add to Cart" to add items to cart
5. View cart and adjust quantities
6. Proceed to checkout
7. Fill in shipping and billing information
8. Place order and receive confirmation

---

## Documentation

### Available Documentation Files

1. **Feature_Implementation_Documentation.md**
   - Detailed explanation of all features
   - Distinction between fully implemented and modeled features
   - Technical implementation details

2. **Phase6_Alerts_and_Console_Logs_Documentation.md**
   - Complete list of all alerts and console logs
   - Location and purpose of each implementation
   - How they enhance UX and aid debugging

3. **Pages_Inventory.md**
   - Complete list of all HTML pages
   - Navigation links and page status
   - Active and unused pages

---

## Debugging and Development

### Console Logs

The project includes comprehensive console logging for:
- Page load tracking
- Form submission data
- Search queries
- Cart contents and calculations
- Product filtering and sorting operations
- User interactions

### Alerts

User-facing alerts are implemented for:
- Form submission success/errors
- Cart item removal confirmation
- Add to cart confirmations
- Checkout confirmation dialogs

---

## File Descriptions

### HTML Pages

- **index.html**: Home page with hero section and featured products
- **products.html**: Product grid with filtering and sorting
- **item.html**: Individual product detail page
- **shopping-cart.html**: Shopping cart with item management
- **checkout.html**: Checkout form and order summary
- **confirmation.html**: Order confirmation page
- **user.html**: User profile with CRM-style layout
- **login.html**: User login form
- **signup.html**: User registration form
- **about.html**: About us page
- **contact.html**: Contact form page

### JavaScript

- **scripts/main.js**: Contains all JavaScript functionality including:
  - Cart management
  - Product filtering and sorting
  - Form validation
  - Search functionality
  - Dynamic content rendering
  - LocalStorage operations

### CSS

- **styles/main.css**: Main stylesheet with:
  - Global styles and variables
  - Component styles
  - Responsive design rules
  - Animations and transitions

- **styles/logo.css**: Logo-specific animations and styles

---

## Contributing

This is a final project submission for IICT. For questions or issues, please refer to the project documentation or contact the project maintainers.

---

## License

This project is created for educational purposes as part of the IICT course requirements.

---

## Authors

- Student ID: i220637
- Student ID: i253025

---

## Version History

- **Version 1.0** - Final Project Submission
  - Complete e-commerce functionality
  - Product filtering and sorting
  - Shopping cart system
  - User interface and navigation
  - Documentation and reporting

---

## Notes

- All product data is currently static (hardcoded in HTML)
- Cart data persists using browser localStorage
- No backend server is required for basic functionality
- The website is fully client-side and can run without a server

