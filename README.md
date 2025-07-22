# Christian Paul Gastardo - Portfolio Website

A modern, responsive portfolio website showcasing the skills, experience, and projects of Christian Paul Gastardo, a Full Stack Developer specializing in Angular, Spring Boot, and modern web technologies.

## Overview

This portfolio website presents Christian's professional identity as a Full Stack Developer with 5+ years of experience spanning from Android development to enterprise Angular applications. The site features a sophisticated design with smooth scroll animations, interactive elements, and a comprehensive showcase of technical expertise and featured projects across various industries including government systems, laboratory research, and enterprise solutions.

## Features

- **Advanced Image Optimization**: Complete WebP implementation with up to 70% file size reduction, smart fallback strategy using `<picture>` elements, and comprehensive performance optimization
- **Custom Branding**: Professional SVG favicon with gradient design featuring personal initials (CP)
- **Hero Section**: Professional introduction with statistics (5+ years experience, 20+ projects, 2.4K+ Upwork hours)
- **Skills Showcase**: Three main specializations - Frontend Development, Backend Development, and Cloud & DevOps
- **Professional Experience Timeline**: Interactive timeline with alternating layout on desktop, fully responsive mobile layout with optimized positioning and visual timeline connector, detailed career progression showcasing six key roles with specific achievements and metrics from 2019 to present
- **Education Section**: Academic background showcase featuring Bachelor's degree in Computer Engineering with university logo and program highlights in an interactive card layout
- **Certifications Section**: Interactive showcase of key certifications including Angular and Lean Six Sigma credentials with clickable certificate images that open in a modal viewer for detailed viewing, featuring responsive card layout with column-based design for optimal mobile viewing
- **Awards & Recognition Section**: Professional achievements showcase featuring industry recognition including Upwork Top Rated Plus Badge and Fujitsu STARS Award with detailed descriptions, achievement highlights, enhanced visual styling with improved hover effects, consistent spacing, and refined color scheme using CSS variables for better brand consistency
- **Featured Work Portfolio**: Four highlighted projects including Laboratory Inventory Management, Tax System, Project Management Platform, and Sweet Cow Mobile
- **Client Recommendations Slider**: Automated carousel showcasing client testimonials with navigation controls, touch/swipe support, auto-advance functionality (5-second intervals), and pause-on-hover behavior
- **Interactive Contact Form**: Integrated with Formspree for direct inquiries with loading states, success feedback, and comprehensive error handling
- **Social Media Integration**: Links to LinkedIn, Upwork, and GitHub profiles
- **Smooth Scroll Navigation**: Fixed header with smooth scrolling to sections and active section highlighting
- **Mobile Navigation**: Fully functional hamburger menu toggle with animated transitions, body scroll prevention, click-outside-to-close, and escape key support
- **Fade-in Animations**: Intersection Observer API for scroll-triggered animations with optimized thresholds
- **Certificate Modal Viewer**: Full-screen modal for viewing certification images with keyboard (Escape) and click-outside-to-close functionality, body scroll prevention
- **Interactive Elements**: Hover effects on skill tags with scale transforms, work technology tags, and social links with smooth transitions
- **Responsive Design**: Mobile-first approach with optimized layouts including stacked certification cards on mobile, fully responsive navigation menu with staggered animations, and adaptive grid systems for all screen sizes
- **Modern UI**: Clean aesthetics with CSS variables for consistent theming, properly formatted CSS with consistent spacing and indentation

## Technical Stack

- **HTML5**: Semantic markup with modern elements (header, main, section, footer) and accessibility features
  - **Advanced Image Handling**: Complete implementation of `<picture>` elements with WebP sources and optimized fallbacks across all images
  - **Performance Resource Hints**: Comprehensive preload directives for critical images with proper MIME type specifications (`image/webp`, `image/jpeg`), plus DNS prefetch for external resources
  - **SEO Optimization**: Descriptive alt attributes and keyword-rich image filenames for improved search visibility
  - **Character Encoding**: Proper UTF-8 encoding with correct Unicode character display
- **CSS3**: Advanced styling with CSS Grid, Flexbox, CSS variables, custom animations, and responsive design patterns
  - **Modular CSS**: Organized into separate files by component and functionality with CSS imports
  - **CSS Variables**: Centralized theming with variables for colors, shadows, and spacing
- **Vanilla JavaScript**: ES6+ features including Intersection Observer API, Fetch API, DOM manipulation, modal functionality, touch/swipe gesture support, automated slider functionality, and form handling with loading states
- **SVG**: Custom favicon with personal branding (CP initials)
- **Font Awesome 6.0**: Comprehensive icon library for UI elements and navigation
- **Google Fonts**: 'Inter' font family with multiple weights (300-800) for optimal typography
- **Formspree**: Third-party service for contact form handling and email delivery

## Project Structure

```
/
├── index.html           # Main HTML file and entry point
├── favicon.svg          # Custom SVG favicon
├── css/                 # CSS stylesheets
│   ├── main.css         # Main CSS file that imports all other CSS files
│   ├── variables.css    # CSS variables for theming
│   ├── base.css         # Base styles
│   ├── typography.css   # Typography styles
│   ├── buttons.css      # Button styles
│   ├── header.css       # Header styles
│   ├── footer.css       # Footer styles
│   ├── responsive.css   # Responsive design styles
│   ├── sections/        # Section-specific styles
│   │   ├── hero.css     # Hero section styles
│   │   ├── skills.css   # Skills section styles
│   │   ├── education.css # Education section styles
│   │   ├── certifications.css # Certifications section styles
│   │   ├── awards.css   # Awards section styles
│   │   ├── experience.css # Experience section styles
│   │   ├── work.css     # Work section styles
│   │   ├── contact.css  # Contact section styles
│   │   └── recommendations.css # Recommendations section styles
│   └── styles.css       # Legacy stylesheet (being phased out)
├── js/                  # JavaScript files
│   └── script.js        # Main script file with all functionality
├── assets/              # Static assets
│   ├── images/          # Image files including profile photo and certification images
│   │   ├── optimized/   # Compressed JPG/PNG versions with SEO-friendly filenames
│   │   └── webp/        # WebP format versions for modern browsers (up to 70% smaller)
│   └── fonts/           # Custom font files (currently empty)
└── .vscode/             # VS Code configuration
```

## Key Sections

- **Header & Navigation**: Fixed header with brand identity, navigation menu, and mobile hamburger toggle
- **Hero Section**: Introduction with professional statistics and call-to-action buttons
- **Skills Section**: Three specialized areas with technology tags and hover effects
- **Experience Section**: Timeline-based professional experience with detailed achievements and metrics
- **Education Section**: Academic background showcase featuring Bachelor's degree in Computer Engineering with university logo and program highlights
- **Certifications Section**: Interactive showcase of key certifications including Angular and Lean Six Sigma credentials with clickable certificate images that open in a modal viewer
- **Awards Section**: Professional achievements and industry recognition showcase with detailed award descriptions and highlights
- **Work Section**: Featured project showcase with technology stacks and descriptions
- **Recommendations Section**: Client testimonials carousel with automatic slideshow, manual navigation, and touch/swipe support
- **Contact Section**: Professional contact form with Formspree integration and social media links

## Local Development

To run this project locally:

1. Clone the repository
2. Open the project folder
3. Open `index.html` in your browser

Alternatively, you can use a simple HTTP server:

```bash
# Using Python
python -m http.server

# Using Node.js
npx serve
```

## Deployment

This is a static website that can be deployed to any web hosting service such as:

- GitHub Pages
- Netlify
- Vercel
- Any traditional web hosting

## Browser Compatibility

The site is designed to work on modern browsers with full support for:

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

Uses modern web features including CSS Grid, Flexbox, CSS Variables, Intersection Observer API, and ES6+ JavaScript.

## Recent Updates

- **Complete Image Optimization Overhaul**: Fully implemented WebP image support with fallback for older browsers using the `<picture>` element across all images, optimized image sizes with significant compression, and implemented comprehensive resource hints for performance
- **Advanced Image Delivery**: All profile photos, certification images, and logos now use modern `<picture>` elements with WebP sources and optimized fallbacks, improving loading performance by up to 70%
- **Enhanced Performance Optimization**: Added proper preload directives with MIME type specifications for both WebP (`image/webp`) and JPEG (`image/jpeg`) versions of critical images, implemented DNS prefetch for external resources, and optimized image loading strategies
- **Universal WebP Implementation**: Complete migration of all images to use `<picture>` elements including hero profile image, education logo, and all certification images with proper WebP sources and fallback support
- **SEO-Friendly Image Naming**: Implemented descriptive, keyword-rich filenames for all images (e.g., `christian-paul-gastardo-profile-photo.jpg`, `hackerrank-angular-intermediate-certificate.jpg`)
- **Automated Image Management**: Created comprehensive PowerShell scripts for image optimization, WebP conversion, HTML updates, auditing, and cleanup processes
- **CSS Architecture Refactoring**: Implemented modular CSS structure with separate files for components and sections, improving maintainability and organization
- **CSS Variables Extraction**: Moved CSS variables to a dedicated variables.css file for centralized theming
- **Button Styling Enhancement**: Improved primary button styling with consistent border properties for better visual consistency and hover state transitions
- **Awards Section Implementation**: Added comprehensive Awards & Recognition section showcasing professional achievements including Upwork Top Rated Plus Badge and Fujitsu STARS Award with detailed descriptions and achievement highlights
- **Navigation Enhancement**: Updated navigation menu to include Awards section link for improved site structure and user experience
- **Custom Favicon Implementation**: Added professional SVG favicon featuring personal branding (CP initials) for enhanced browser tab identification and professional appearance
- **Mobile Navigation Enhancement**: Fully functional hamburger menu toggle with animated transitions, body scroll prevention, click-outside-to-close, escape key support, and comprehensive interaction handling
- **Code Quality Improvements**: Enhanced HTML formatting, proper character encoding fixes, and improved code structure for better maintainability

## Development Status

The portfolio website is actively maintained with ongoing improvements to user experience, performance, and mobile responsiveness. All major features are fully implemented and functional across desktop and mobile devices.

### Image Optimization

The project implements comprehensive modern image optimization techniques:

1. **Complete WebP Implementation**: All images now have WebP versions for modern browsers with significant file size reductions (up to 70% smaller)
2. **Smart Fallback Strategy**: Optimized JPG/PNG versions for browsers without WebP support, ensuring universal compatibility
3. **Advanced Picture Elements**: Using HTML5 `<picture>` elements with `<source>` for automatic format negotiation across all images
4. **Performance Resource Hints**: Preload directives for both WebP and JPEG versions of critical images with proper MIME type specifications (`image/webp`, `image/jpeg`), plus DNS prefetch for external resources
5. **SEO-Optimized Filenames**: Descriptive, keyword-rich image filenames that improve search engine visibility
6. **Organized Asset Structure**: Separate directories for optimized (`/optimized/`) and WebP (`/webp/`) versions for clean organization
7. **Comprehensive Automation**: Complete suite of PowerShell scripts for optimization, conversion, HTML updates, auditing, and cleanup
8. **Quality-Optimized Compression**: Different quality settings per image type (85% for photos, 90% for certificates/logos) for optimal balance

### CSS Architecture Transition

The project is currently transitioning from a single monolithic CSS file (`styles.css`) to a modular architecture using CSS imports. The new structure uses `main.css` as the entry point that imports all other CSS files. During this transition period, both approaches coexist:

1. The HTML file still references `styles.css` directly
2. The new modular structure with `main.css` is being set up in parallel

Once the transition is complete, the HTML will be updated to reference `main.css` instead of `styles.css`, and the monolithic `styles.css` file will be phased out.

## License

All rights reserved © 2025 Christian Paul Gastardo

## Image Optimization Scripts

The project includes a comprehensive suite of PowerShell scripts for complete image optimization workflow:

- **optimize-images.ps1**: Core optimization script that compresses images with quality settings, creates WebP versions, and renames files with SEO-friendly descriptive names
- **setup-webp-and-optimize.ps1**: Complete setup script that configures WebP tools from Downloads folder, adds them to PATH, and runs full optimization with detailed progress reporting
- **update-html-images.ps1**: Automatically updates HTML to use optimized images with WebP fallback using `<picture>` elements, ensuring all references point to optimized versions
- **image-audit.ps1**: Comprehensive audit tool that checks image inventory, optimization status, WebP versions, alt text compliance, filename descriptiveness, and compression results
- **cleanup-images.ps1**: Intelligent cleanup script that removes duplicate and unoptimized images while preserving only essential optimized versions, includes HTML reference updates

### Script Features:

- **Automated WebP Conversion**: Uses Google's cwebp tool for high-quality WebP generation
- **Quality-Based Compression**: Different compression settings for different image types (profiles: 85%, certificates: 90%, logos: 90%)
- **Size Reporting**: Detailed before/after file size comparisons and compression statistics
- **Error Handling**: Comprehensive error checking and user-friendly progress reporting
- **HTML Integration**: Automatic HTML updates to use optimized images with proper fallback structure

These scripts provide a complete automated workflow for maintaining optimal image performance and following modern web best practices for image delivery.
