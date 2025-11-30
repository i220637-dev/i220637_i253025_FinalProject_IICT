# Craftify Website - Pages Inventory

## Currently Used Pages (13 Total)

### ✅ Main Navigation Pages

1. **index.html** - **Home Page** (Main Landing Page)
   - Primary landing page
   - Featured products section
   - Hero banner with "Shop Now" button
   - Links to: products.html, item.html, about.html, contact.html
   - **Status:** ✅ Active - Main entry point

2. **products.html** - **Products Listing Page**
   - Product grid with 8 products
   - Category and price filters
   - Product sorting functionality
   - "Add to Cart" and "View Details" buttons
   - Links to: item.html, shopping-cart.html
   - **Status:** ✅ Active - Core functionality

3. **item.html** - **Product Detail Page**
   - Individual product view
   - Product images, details, ratings
   - Quantity selector
   - "Add to Cart" functionality
   - **Status:** ✅ Active - Linked from products page

4. **shopping-cart.html** - **Shopping Cart Page**
   - Cart items display
   - Quantity controls
   - Order summary with calculations
   - "Proceed to Checkout" button
   - Links to: checkout.html, products.html
   - **Status:** ✅ Active - Core e-commerce functionality

5. **checkout.html** - **Checkout Page**
   - Billing and shipping information forms
   - Order summary
   - "Place Order" button
   - Links to: confirmation.html
   - **Status:** ✅ Active - Part of purchase flow

6. **confirmation.html** - **Order Confirmation Page**
   - Order confirmation display
   - **Status:** ✅ Active - Final step in purchase flow

### ✅ User Account Pages

7. **user.html** - **User Profile Page**
   - User profile with contact details
   - Activity timeline
   - Recent orders list
   - Marketing tags
   - **Status:** ✅ Active - Linked from navigation

8. **login.html** - **Login Page**
   - User login form
   - Links to: signup.html, index.html
   - **Status:** ✅ Active - Linked from navigation

9. **signup.html** - **Sign Up Page**
   - User registration form
   - Links to: login.html
   - **Status:** ✅ Active - Linked from navigation

### ✅ Information Pages

10. **about.html** - **About Us Page**
    - Company information
    - **Status:** ✅ Active - Linked from navigation

11. **contact.html** - **Contact Page**
    - Contact form
    - Contact information
    - **Status:** ✅ Active - Linked from navigation

### ⚠️ Unused/Minimal Pages

12. **home.html** - **Alternative Home Page**
    - Simple welcome page
    - Basic navigation (different from index.html)
    - **Status:** ⚠️ Exists but NOT linked in main navigation
    - **Note:** Appears to be a placeholder or alternative version

13. **crate.html** - **Crate Page**
    - Minimal content (just "Crate" heading)
    - **Status:** ⚠️ Exists but NOT actively used
    - **Note:** Referenced in user.html but page is mostly empty

---

## Navigation Structure

### Main Navigation (Present on All Pages)
- **Home** → index.html
- **Products** → products.html
- **Cart** → shopping-cart.html
- **About** → about.html
- **Contact** → contact.html

### Account Navigation (Slide Menu)
- **My Profile** → user.html
- **Login** → login.html
- **Sign Up** → signup.html

### User Flow
1. **Browsing:** index.html → products.html → item.html
2. **Shopping:** products.html → shopping-cart.html → checkout.html → confirmation.html
3. **Account:** login.html / signup.html → user.html

---

## Page Usage Summary

| Page | Status | Linked In Nav | Functionality |
|------|--------|---------------|---------------|
| index.html | ✅ Active | Yes | Main homepage with featured products |
| products.html | ✅ Active | Yes | Product listing with filters & sorting |
| item.html | ✅ Active | Via products | Product detail page |
| shopping-cart.html | ✅ Active | Yes | Shopping cart with calculations |
| checkout.html | ✅ Active | Via cart | Checkout form |
| confirmation.html | ✅ Active | Via checkout | Order confirmation |
| user.html | ✅ Active | Yes | User profile & orders |
| login.html | ✅ Active | Yes | User login |
| signup.html | ✅ Active | Yes | User registration |
| about.html | ✅ Active | Yes | About page |
| contact.html | ✅ Active | Yes | Contact form |
| home.html | ⚠️ Unused | No | Alternative home (not linked) |
| crate.html | ⚠️ Minimal | No | Empty/minimal content |

---

## Recommendations

1. **home.html** - Consider removing or merging with index.html if not needed
2. **crate.html** - Either implement full crate functionality or remove if not needed
3. All other pages are actively used and integrated into the site navigation

---

## Active Features by Page

- **index.html:** Hero banner, featured products, navigation
- **products.html:** Product grid, filtering, sorting, add to cart
- **item.html:** Product details, quantity selector, add to cart
- **shopping-cart.html:** Cart management, quantity updates, checkout
- **checkout.html:** Billing/shipping forms, order summary
- **confirmation.html:** Order confirmation
- **user.html:** Profile display, activity timeline, order history
- **login.html / signup.html:** Authentication forms
- **about.html / contact.html:** Information pages

