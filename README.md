# ImageKit Product Showcase Gallery

A React application that demonstrates ImageKit's powerful features for product imagery in e-commerce scenarios.

## Features

- Product grid display with responsive design
- Background removal and swapping capability
- Interactive zoom functionality for product details
- Color variant selection
- Optimized image loading with lazy loading and LQIP (Low Quality Image Placeholders)

## Technologies Used

- React
- ImageKit React SDK
- Tailwind CSS for styling
- Vite for build tooling

## Setup Instructions

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Update the ImageKit configuration in `src/config/imagekit.js` with your own API keys
4. Start the development server:
   ```bash
   npm run dev
   ```

## Key Components

- **ProductGrid**: Displays a responsive grid of product cards
- **ProductCard**: Renders individual product cards with optimized images
- **ProductDetail**: Shows detailed product view with zoom capability and background swapping

## ImageKit Features Utilized

- Background removal/replacement
- Image transformations (resizing, optimization)
- Lazy loading
- LQIP (Low Quality Image Placeholders)
- High-resolution zoom functionality

## Customization

You can modify the product data in `src/data/products.js` to showcase your own products.
