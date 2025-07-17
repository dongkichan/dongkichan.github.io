# Project Structure

This portfolio website follows a simple and traditional web project structure with clear separation of concerns.

## Directory Organization

```
/
├── index.html           # Main HTML file and entry point
├── css/                 # CSS stylesheets
│   └── styles.css       # Main stylesheet with all styles
├── js/                  # JavaScript files
│   └── script.js        # Main script file with all functionality
├── assets/              # Static assets
│   ├── images/          # Image files including profile photo and project images
│   └── fonts/           # Custom font files (if any)
└── .vscode/             # VS Code configuration (optional)
```

## Code Organization

### HTML Structure
- Semantic HTML5 elements (`header`, `main`, `section`, `footer`, etc.)
- Organized by sections (hero, skills, work, contact)
- BEM-inspired class naming convention (block__element--modifier)

### CSS Organization
- CSS variables for theming at the root level
- Base styles for typography and common elements
- Component-specific styles grouped together
- Media queries for responsive design at the end
- Comments to separate major sections

### JavaScript Organization
- Event-driven architecture
- DOM manipulation for interactive elements
- Grouped by functionality (navigation, animations, form handling)
- No external libraries or frameworks

## Naming Conventions

### CSS Classes
- Use kebab-case for class names (e.g., `hero-section`, `nav-link`)
- Follow component-based naming (e.g., `component-name__element-name`)
- Use descriptive names that reflect purpose rather than appearance

### File Naming
- Use lowercase with hyphens for multi-word filenames
- Use descriptive names that reflect content or purpose

## Best Practices
- Keep HTML, CSS, and JS in separate files
- Maintain a flat directory structure for simplicity
- Use relative paths for all internal links and resources
- Optimize images for web before adding to the project