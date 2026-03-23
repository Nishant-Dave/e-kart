# Design System: Modern E-commerce Redesign

Your custom design system specifically tailored for the high-end, minimalist e-commerce product listing page.

## 🎨 Color Palette

We utilize a high-contrast, strictly neutral color palette to let the product imagery stand out.

* **Primary Background:** Pure White (`#ffffff`) - The canvas for all content.
* **Surface/Border:** Ultra-light Gray (`#f9fafb`) - Used for filter sidebars, subtle dividing lines, and card containers.
* **Action/Accent:** Obsidian Black (`#111827`) - Used for active states, checkboxes, "Quick Add" buttons, and prominent interactive elements.
* **Text Primary:** Near Black (`#1f2937`) - High legibility for headings, product names, and pricing.
* **Text Secondary:** Cool Gray (`#6b7280`) - Used for categories, search placeholders, breadcrumbs, and less critical information.

## ✍️ Typography

A clean, geometrical sans-serif font creates a sleek, easy-to-read hierarchy.

* **Font Family:** Inter, Roboto, or similar neo-grotesque sans-serif.
* **Headings (H1/H2):** Bold (700 weight), tightly tracked for a crisp, structural feel.
* **Body Text:** Regular (400 weight), optimized for readability at 14px-16px.
* **Overlines/Categories:** Uppercase, slight letter-spacing (e.g., 0.05em), bold (600 or 700 weight), 12px or smaller for subtle distinction.
* **Prices:** Bold (700 weight), larger than the product name to immediately convey value.

## 📐 Spacing & Layout

Spacing is critical in minimalist design. Rather than relying on heavy borders, we use whitespace to define sections.

* **Base Unit:** 8px (a classic 8pt grid system).
* **Card Margins:** 24px-32px gaps between grid items to avoid clutter.
* **Internal Padding:** Generous padding (at least 16px to 24px) within components like sidebars and filter accordions.
* **Gutter Width:** The gap between the main grid and the left sidebar should be clearly defined (e.g., 40px-48px).

## ✨ Component Styles & Interactions

* **Borders & Geometry:** Clean and precise. Elements should have sharp or subtly rounded corners (`border-radius: 4px` or `6px`) to maintain a sleek aesthetic. Avoid excessive pill shapes (except for specific elements like the search bar).
* **Shadows/Elevation:** Flat by default to maintain the clean look.
* **Hover States (Micro-interactions):**
  * **Product Cards:** Introduce a very soft, diffuse shadow (`10% black opacity, large blur radius`) on hover.
  * **Images:** A slight, smooth scale effect (`transform: scale(1.03)`) on the product image during hover.
  * **Buttons:** "Quick Add" buttons smoothly fade in and overlay on the product image when the card is hovered. Active actions should feel snappy and responsive.
