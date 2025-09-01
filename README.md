# 🚀 ScrollAnimator.js

> **Advanced scroll-triggered animation system with intelligent UX optimizations**

[![Version](https://img.shields.io/badge/version-2.1.0-blue.svg)](https://github.com/SyntaxSerenity-dev/scroll-animator)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Author](https://img.shields.io/badge/author-syntax%20serenity-green.svg)](mailto:fs.developerfullstack@gmail.com)
[![Build Status](https://img.shields.io/badge/build-passing-brightgreen.svg)]()

## 📋 Table of Contents

- [🎯 Overview](#-overview)
- [✨ Features](#-features)
- [🚀 Installation](#-installation)
- [📖 Quick Start](#-quick-start)
- [⚙️ Configuration](#️-configuration)
- [🎨 Animation Directions](#-animation-directions)
- [🔧 Advanced Methods](#-advanced-methods)
- [📱 Practical Examples](#-practical-examples)
- [🎨 Custom CSS](#-custom-css)
- [📊 Performance](#-performance)
- [🌐 Compatibility](#-compatibility)
- [📝 Changelog](#-changelog)
- [📄 License](#-license)

---

## 🎯 Overview

**ScrollAnimator.js** is a modern JavaScript library that creates smooth and performant scroll-based animations. It automatically detects device capabilities, respects user accessibility preferences, and optimizes animations for an exceptional visual experience.

### 🎯 What makes ScrollAnimator special?

- **🔄 Adaptive**: Automatically adjusts based on scroll velocity
- **⚡ Performant**: Uses GPU acceleration and intelligent optimizations
- **♿ Accessible**: Respects `prefers-reduced-motion`
- **📱 Responsive**: Optimized for all devices
- **🎨 Flexible**: 8 ready-made presets + custom configuration

---

## ✨ Features

### 🚀 Performance

- ✅ **GPU Acceleration** with 3D transforms
- ✅ **Adaptive thresholds** based on scroll velocity
- ✅ **RequestAnimationFrame** for smooth scrolling
- ✅ **Intersection Observer** for efficient detection

### 🎨 Smart UX

- ✅ **Device detection** with automatic optimizations
- ✅ **Animation preload** for nearby elements
- ✅ **Priority processing** for better experience
- ✅ **Intelligent delays** based on context

### 🔧 Development

- ✅ **Zero dependencies** - Works natively
- ✅ **Predefined presets** for common cases
- ✅ **Debug mode** for development
- ✅ **Simple API** and intuitive

---

## 🚀 Installation

### 1. Direct Download

```html
<!-- Add CSS -->
<link rel="stylesheet" href="path/to/scrollAnimator.css" />

<!-- Add JavaScript -->
<script src="path/to/scrollAnimator.js"></script>
```

### 2. As ES6 Module

```javascript
import ScrollAnimator from "./scrollAnimator.js";
```

### 3. Via CDN (when available)

```html
<link rel="stylesheet" href="https://cdn.example.com/scrollAnimator.css" />
<script src="https://cdn.example.com/scrollAnimator.js"></script>
```

---

## 📖 Quick Start

### 🎯 Step 1: Initialization

```javascript
// Basic initialization
ScrollAnimator.init();

// Or with custom settings
ScrollAnimator.init({
  targetClass: "animate-on-scroll",
  direction: "up",
  animationDuration: 0.5
});
```

### 🎯 Step 2: HTML

```html
<!-- Basic element -->
<div class="scroll-animate">
  This element will be animated when it enters the viewport
</div>

<!-- With custom settings -->
<div class="scroll-animate" data-direction="left" data-delay="0.2">
  Element with specific configurations
</div>
```

### 🎯 Step 3: CSS (Optional)

```css
/* Basic styles already included in scrollAnimator.css */
.scroll-animate {
  opacity: 0;
  transform: translateY(40px);
}

.scroll-animate.animate-in {
  opacity: 1;
  transform: translateY(0);
}
```

**🎉 Done!** Your elements now have smooth scroll-based animations.

---

## ⚙️ Configuration

### 🔧 Complete Configuration

```javascript
ScrollAnimator.init({
  // Basic classes
  targetClass: "scroll-animate", // Target elements class
  activeClass: "animate-in", // Class when animated
  inactiveClass: "animate-out", // Class when not animated

  // Animation
  direction: "up", // Default direction
  animationDuration: 0.6, // Duration in seconds
  animationDistance: 40, // Distance in pixels
  easing: "ease-out", // Easing function

  // Thresholds (when to animate)
  visibilityThreshold: 15, // % visible for trigger
  fastScrollThreshold: 5, // % for fast scroll
  slowScrollThreshold: 25, // % for slow scroll

  // Delays
  triggerDelay: 0, // Trigger delay
  staggerDelay: 80, // Delay between elements (ms)
  maxStaggerDelay: 300, // Maximum delay (ms)

  // Performance
  rootMargin: "50px 0px -30px 0px", // Observer margin
  once: true, // Animate only once
  removeOnExit: false, // Remove on exit

  // UX
  prioritizeViewport: true, // Prioritize visible elements
  respectMotionPreference: true, // Respect prefers-reduced-motion

  // Callbacks
  onEnter: null, // Callback on enter
  onExit: null, // Callback on exit
  onScrollStart: null, // Callback on scroll start
  onScrollEnd: null, // Callback on scroll end

  // Debug
  debug: false // Debug mode
});
```

### 🎨 Predefined Presets

#### 1. **Optimized UX** (Recommended for most cases)

```javascript
ScrollAnimator.init(ScrollAnimator.presets.optimal);
```

#### 2. **Content** (Blogs, articles, text)

```javascript
ScrollAnimator.init(ScrollAnimator.presets.content);
```

#### 3. **E-commerce** (Products, cards, galleries)

```javascript
ScrollAnimator.init(ScrollAnimator.presets.ecommerce);
```

#### 4. **Landing Pages** (Visual impact)

```javascript
ScrollAnimator.init(ScrollAnimator.presets.landing);
```

#### 5. **Mobile** (Optimized for mobile devices)

```javascript
ScrollAnimator.init(ScrollAnimator.presets.mobile);
```

#### 6. **Performance** (Maximum performance)

```javascript
ScrollAnimator.init(ScrollAnimator.presets.performance);
```

---

## 🎨 Animation Directions

### 📍 Available Directions

| Direction | Description        | Visual Effect             |
| --------- | ------------------ | ------------------------- |
| `up`      | From bottom to top | Element rises             |
| `down`    | From top to bottom | Element descends          |
| `left`    | From right to left | Element slides from right |
| `right`   | From left to right | Element slides from left  |
| `scale`   | Scale              | Element grows             |
| `rotate`  | Rotation + scale   | Element rotates and grows |
| `fade`    | Subtle fade        | Element appears smoothly  |

### 🎯 HTML with Data Attributes

```html
<!-- Animation from bottom to top -->
<div class="scroll-animate" data-direction="up">
  Animation from bottom to top
</div>

<!-- Animation from right to left -->
<div class="scroll-animate" data-direction="left">
  Animation from right to left
</div>

<!-- Scale animation -->
<div class="scroll-animate" data-direction="scale">Scale animation</div>

<!-- Fade animation -->
<div class="scroll-animate" data-direction="fade">Fade animation</div>
```

### ⚙️ Per-Element Configuration

```html
<div
  class="scroll-animate"
  data-direction="up"
  data-duration="0.8"
  data-delay="0.3"
  data-distance="60"
  data-easing="bounce"
>
  Element with complete configurations
</div>
```

**📝 Note:** Per-element configurations override global settings.

---

## 🔧 Advanced Methods

### ➕ Add Elements Dynamically

```javascript
// Add by CSS selector
ScrollAnimator.addElements(".new-elements");

// Add NodeList
const elements = document.querySelectorAll(".my-elements");
ScrollAnimator.addElements(elements);

// Add single element
const element = document.getElementById("my-element");
ScrollAnimator.addElements(element);

// Add with custom configuration
ScrollAnimator.addElements(".elements", {
  direction: "scale",
  duration: 0.5,
  delay: 0.1
});
```

### ➖ Remove Elements

```javascript
// Remove by selector
ScrollAnimator.removeElements(".elements-to-remove");

// Remove NodeList
const elements = document.querySelectorAll(".elements");
ScrollAnimator.removeElements(elements);

// Remove single element
const element = document.getElementById("element");
ScrollAnimator.removeElements(element);
```

### ⚡ Force Immediate Animation

```javascript
// Animate critical elements immediately
ScrollAnimator.forceImmediateAnimation(".hero-title");

// Animate specific element
const element = document.querySelector(".important");
ScrollAnimator.forceImmediateAnimation(element);
```

### 👁️ Animate Already Visible Elements

```javascript
// Animate elements already visible on page load
ScrollAnimator.preAnimateVisible();
```

### 🔄 State Management

```javascript
// Reload after DOM changes
ScrollAnimator.refresh();

// Disconnect completely
ScrollAnimator.disconnect();

// Reconfigure with new options
ScrollAnimator.disconnect();
ScrollAnimator.init({
  targetClass: "new-class",
  direction: "scale"
});
```

### 📞 Scroll Callbacks

```javascript
ScrollAnimator.init({
  onScrollStart: (velocity) => {
    console.log("Scroll started, velocity:", velocity);
    // Hide elements during fast scroll
    if (velocity > 100) {
      document.body.classList.add("scrolling-fast");
    }
  },

  onScrollEnd: () => {
    console.log("Scroll ended");
    document.body.classList.remove("scrolling-fast");
  },

  onEnter: (element, entry) => {
    console.log("Element entered:", element);
    element.classList.add("visible");
  },

  onExit: (element, entry) => {
    console.log("Element exited:", element);
    element.classList.remove("visible");
  }
});
```

---

## 📱 Practical Examples

### 🛍️ 1. Product Gallery (E-commerce)

```html
<div class="products-grid">
  <div
    class="product-card scroll-animate"
    data-direction="scale"
    data-delay="0.1"
  >
    <img src="product1.jpg" alt="Product 1" />
    <h3>Product 1</h3>
    <p>Product description</p>
  </div>

  <div
    class="product-card scroll-animate"
    data-direction="scale"
    data-delay="0.2"
  >
    <img src="product2.jpg" alt="Product 2" />
    <h3>Product 2</h3>
    <p>Product description</p>
  </div>

  <!-- More products... -->
</div>
```

```javascript
ScrollAnimator.init(ScrollAnimator.presets.ecommerce);
```

### 📄 2. Content Sections (Blog/Article)

```html
<section class="content-section">
  <h2 class="scroll-animate" data-direction="up">Section Title</h2>
  <p class="scroll-animate" data-direction="fade" data-delay="0.2">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
  </p>
  <div class="scroll-animate" data-direction="left" data-delay="0.4">
    <img src="image.jpg" alt="Image" />
  </div>
</section>
```

```javascript
ScrollAnimator.init(ScrollAnimator.presets.content);
```

### 🎯 3. Landing Page Hero

```html
<div class="hero-section">
  <h1 class="scroll-animate" data-direction="up">Main Title</h1>
  <p class="scroll-animate" data-direction="up" data-delay="0.3">
    Impactful subtitle
  </p>
  <button class="scroll-animate" data-direction="scale" data-delay="0.6">
    Call to Action
  </button>
</div>
```

```javascript
ScrollAnimator.init(ScrollAnimator.presets.landing);
```

### ⏱️ 4. Timeline/Process

```html
<div class="timeline">
  <div class="timeline-item scroll-animate" data-direction="left">
    <h3>Step 1</h3>
    <p>Description of the first step</p>
  </div>

  <div
    class="timeline-item scroll-animate"
    data-direction="right"
    data-delay="0.2"
  >
    <h3>Step 2</h3>
    <p>Description of the second step</p>
  </div>

  <div
    class="timeline-item scroll-animate"
    data-direction="left"
    data-delay="0.4"
  >
    <h3>Step 3</h3>
    <p>Description of the third step</p>
  </div>
</div>
```

```javascript
ScrollAnimator.init({
  direction: "up",
  staggerDelay: 200,
  animationDuration: 0.8,
  easing: "bounce"
});
```

---

## 🎨 Custom CSS

### 🎯 Basic Styles

```css
/* Elements with animation */
.scroll-animate {
  opacity: 0;
  transform: translateY(40px);
  transition: opacity 0.6s ease-out, transform 0.6s ease-out;
}

/* Animated state */
.scroll-animate.animate-in {
  opacity: 1;
  transform: translateY(0);
}

/* Specific directions */
.anim-up {
  transform: translateY(40px);
}
.anim-down {
  transform: translateY(-40px);
}
.anim-left {
  transform: translateX(40px);
}
.anim-right {
  transform: translateX(-40px);
}
.anim-scale {
  transform: scale(0.8);
}
.anim-rotate {
  transform: rotate(5deg) scale(0.9);
}
.anim-fade {
  transform: translateY(12px);
}
```

### 🎨 CSS Custom Variables

```css
.scroll-animate {
  --scroll-anim-duration: 0.6s;
  --scroll-anim-delay: 0s;
  --scroll-anim-distance: 40px;
  --scroll-anim-timing: ease-out;

  transition: opacity var(--scroll-anim-duration) var(--scroll-anim-timing) var(--scroll-anim-delay),
    transform var(--scroll-anim-duration) var(--scroll-anim-timing) var(--scroll-anim-delay);
}
```

### 📱 Responsiveness

```css
/* Mobile optimizations */
@media (max-width: 768px) {
  .scroll-animate {
    --scroll-anim-duration: 0.4s;
    --scroll-anim-distance: 25px;
  }
}

/* Small mobile optimizations */
@media (max-width: 480px) {
  .scroll-animate {
    --scroll-anim-duration: 0.3s;
    --scroll-anim-distance: 20px;
  }
}
```

### ♿ Accessibility

```css
/* Respect reduced motion preference */
@media (prefers-reduced-motion: reduce) {
  .scroll-animate {
    --scroll-anim-duration: 0.1s !important;
    --scroll-anim-delay: 0s !important;
    transition: opacity 0.1s ease !important;
  }

  .scroll-animate.animate-in {
    opacity: 1 !important;
    transform: translate3d(0, 0, 0) scale(1) !important;
  }
}
```

---

## 📊 Performance

### 🚀 Automatic Optimizations

- **GPU Acceleration**: Uses `translate3d` for hardware acceleration
- **Adaptive Threshold**: Automatically adjusts based on scroll velocity
- **RequestAnimationFrame**: Optimized throttling for scroll events
- **Intersection Observer**: Native API for visibility detection
- **Memory Management**: Automatic resource cleanup

### ⚡ Optimization Tips

#### For many elements:

```javascript
ScrollAnimator.init({
  visibilityThreshold: 5,
  staggerDelay: 50,
  maxStaggerDelay: 200
});
```

#### For mobile devices:

```javascript
ScrollAnimator.init({
  animationDuration: 0.3,
  animationDistance: 25,
  instantOnSlow: true
});
```

#### For fast scrolling:

```javascript
ScrollAnimator.init({
  fastScrollThreshold: 3,
  scrollVelocityThreshold: 30,
  maxStaggerDelay: 150
});
```

### 🔍 Debug and Troubleshooting

```javascript
// Enable debug mode
ScrollAnimator.init({
  debug: true
});

// Check observed elements
console.log("Observed elements:", ScrollAnimator.observedElements);

// Check current settings
console.log("Current settings:", ScrollAnimator.options);
```

---

## 🌐 Compatibility

### ✅ Supported Browsers

| Browser | Minimum Version |
| ------- | --------------- |
| Chrome  | 51+             |
| Firefox | 55+             |
| Safari  | 12.1+           |
| Edge    | 79+             |
| Opera   | 38+             |

### 🔧 APIs Used

- **Intersection Observer API** - Visibility detection
- **requestAnimationFrame** - Smooth scrolling
- **CSS Transforms** - Animations
- **CSS Custom Properties** - CSS variables
- **Navigator APIs** - Device detection (optional)

---

## 📝 Changelog

### v2.1.0 (2024-12-19)

- ✨ **New version** with UX optimizations
- ✨ **Adaptive thresholds** based on scroll velocity
- ✨ **Device detection** with automatic optimizations
- ✨ **8 predefined presets** for different use cases
- ✨ **Respects preferences** for reduced motion
- ✨ **GPU acceleration** with optimized 3D transforms
- ✨ **Animation preload** for elements near viewport
- ✨ **Priority processing** for better UX

### v1.0.0 (2024-09-15)

- 🎉 **Initial release**
- ✨ Scroll-based animation system
- ✨ Performance optimizations
- ✨ Predefined presets
- ✨ Device detection
- ✨ Respects accessibility preferences

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

### What this means:

- ✅ **Free to use** in personal and commercial projects
- ✅ **Modify** and **distribute** as you wish
- ✅ **Sell** products that include this library
- ⚠️ **Include** the original copyright notice
- 🚫 **No warranty** - use at your own risk

---

## 👨‍💻 Author

**Syntax Serenity**

- 📧 Email: [fs.developerfullstack@gmail.com](mailto:fs.developerfullstack@gmail.com)
- 🌐 Website: [https://www.syntaxserenity.co.ao](https://www.syntaxserenity.co.ao)
- 🐙 GitHub: [@SyntaxSerenity-dev](https://github.com/SyntaxSerenity-dev)

---

## 🤝 Contributing

1. **Fork** the project
2. **Create** a branch for your feature (`git checkout -b feature/AmazingFeature`)
3. **Commit** your changes (`git commit -m 'Add some AmazingFeature'`)
4. **Push** to the branch (`git push origin feature/AmazingFeature`)
5. **Open** a Pull Request

## 📞 Support

For support and questions:

- 📧 **Email**: [fs.developerfullstack@gmail.com](mailto:fs.developerfullstack@gmail.com)
- 🐛 **Issues**: [GitHub Issues](https://github.com/SyntaxSerenity-dev/scroll-animator/issues)

---

⭐ **If this project helped you, consider giving it a star!**

---

**Made with ❤️ by Syntax Serenity**
