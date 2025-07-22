# CSS Organization

This document explains the organization of CSS files for Christian Paul Gastardo's portfolio website.

## File Structure

The CSS is organized into the following files:

### Main File
- `main.css` - The main CSS file that imports all other CSS files

### Base Styles
- `variables.css` - CSS variables for colors, spacing, shadows, etc.
- `base.css` - Base styles, resets, and common elements
- `typography.css` - Typography styles for headings, paragraphs, links, etc.
- `buttons.css` - Button styles and variations

### Layout Components
- `header.css` - Header and navigation styles
- `footer.css` - Footer styles

### UI Components
- `components/modal.css` - Modal dialog styles for certificate viewer

### Section-specific Styles
- `sections/hero.css` - Hero section styles
- `sections/skills.css` - Skills section styles
- `sections/education.css` - Education section styles
- `sections/certifications.css` - Certifications section styles
- `sections/awards.css` - Awards section styles
- `sections/experience.css` - Experience section styles
- `sections/work.css` - Work/portfolio section styles
- `sections/contact.css` - Contact section styles
- `sections/recommendations.css` - Recommendations section styles

### Utilities
- `responsive.css` - Media queries and responsive design adjustments

## How to Use

1. All styles are imported through `main.css`, so you only need to include this file in your HTML.
2. To modify a specific section, navigate to the corresponding CSS file.
3. For global changes to colors, spacing, etc., modify the variables in `variables.css`.
4. For responsive design adjustments, modify `responsive.css`.

## Best Practices

1. Keep section-specific styles in their respective files.
2. Use CSS variables from `variables.css` for consistency.
3. Add new component styles to the appropriate file or create a new file if needed.
4. Update the imports in `main.css` if you add new CSS files.