# Copilot Instructions for ThucHanhCodeWeb

## Project Overview

ThucHanhCodeWeb is a collection of front-end learning projects demonstrating HTML, CSS, and JavaScript fundamentals. Each sub-project is self-contained with its own assets folder containing styles and scripts.

### Project Structure

```
Weather_app/       - Interactive weather application with sidebar navigation
Display_/          - Layout and responsive design demonstrations
  Reponsive-Grid-Layout/  - CSS Grid layout example
```

## Key Conventions & Patterns

### CSS Class Naming & Utility Classes

- **Flexbox utilities**: Use prefixed classes for layout (`.d-flex`, `.justify-content-*`, `.align-items-*`)
  - Direction: `.flex-direction-column` for vertical layouts
  - Spacing: `.gap-10`, `.gap-20` (10px, 20px gaps)
  - Margins: `.margin-*-{size}` (e.g., `.margin-top-10`, `.margin-bottom-20`)
- **Sizing**: Use `.container-fluid` for full-width flex containers
- **Examples**: See [Weather_app/assets/Styles.css](Weather_app/assets/Styles.css#L7-L20) and [Display\_/Reponsive-Grid-Layout/assets/Styles.css](Display_/Reponsive-Grid-Layout/assets/Styles.css#L1-L10)

### Grid Layout Pattern

- CSS Grid layout examples use `grid-area` for semantic positioning
- Grid templates defined at desktop and mobile breakpoints (max-width: 678px)
- Example: [Display\_/Reponsive-Grid-Layout/assets/Styles.css](Display_/Reponsive-Grid-Layout/assets/Styles.css#L40-L80)

### JavaScript Interaction Pattern

- DOM manipulation via `querySelector()` for element selection
- Event-driven architecture: buttons trigger functions like `toggleSidebar()`
- Toggle classes on elements using `.classList.toggle()`
- Keep JS minimal; focus on user interactions and state changes
- Example: [Weather_app/assets/JavaScript.js](Weather_app/assets/JavaScript.js)

### File & Folder Structure

- Each project lives in its own root folder with `Index.html` (capitalized)
- Assets folder contains `Styles.css` and `JavaScript.js` (capitalized)
- Inline SVG in HTML or referenced assets in image folders
- Path references use relative paths (e.g., `./assets/styles.css`)

### HTML Structure Conventions

- Use semantic `<header>`, `<main>`, `<aside>`, `<footer>` elements
- Apply utility classes directly to elements for layout control
- Inline event handlers for simple interactions (`onclick="toggleSidebar()"`)
- Meta tags for responsive design: `viewport` with `width=device-width, initial-scale=1.0`

### Responsive Design Approach

- Mobile-first mentality: desktop grid defined first, media queries adjust for mobile
- Common breakpoint: `max-width: 678px` for mobile views
- CSS Grid adapts from multi-column desktop layouts to single-column mobile layouts
- Example: [Display\_/Reponsive-Grid-Layout/assets/Styles.css](Display_/Reponsive-Grid-Layout/assets/Styles.css#L53-L71)

## Developer Workflow

### No Build System

- This is a static HTML/CSS/JS project—no build step required
- Open `Index.html` files directly in a browser to test
- All styling uses vanilla CSS (no preprocessors)
- All scripting uses vanilla JavaScript (no frameworks)

### Testing & Preview

- Use browser DevTools to inspect elements and debug CSS
- Console for testing JavaScript functions
- Live Server extension in VS Code simplifies development (open HTML and auto-refresh)

### Common Development Patterns

1. **Adding new components**: Create HTML structure, add utility CSS classes, write interaction JS
2. **Adjusting layouts**: Modify grid template areas or flexbox properties in CSS
3. **Responsive tweaks**: Add media query rules in corresponding `Styles.css` file

## Files of Importance

- [Weather_app/Index.html](Weather_app/Index.html) - Main weather app UI with sidebar and toolbar
- [Weather_app/assets/Styles.css](Weather_app/assets/Styles.css) - Utility class system and component styles
- [Display\_/Reponsive-Grid-Layout/assets/Styles.css](Display_/Reponsive-Grid-Layout/assets/Styles.css) - Grid layout reference implementation
