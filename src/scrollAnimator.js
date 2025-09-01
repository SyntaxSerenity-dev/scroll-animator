/**
 * ╔═══════════════════════════════════════════════════════════════════════════════════════════════════════════════════╗
 * ║                                                                                                                   ║
 * ║  ███████╗██╗   ██╗███╗   ██╗████████╗ █████╗ ██╗  ██╗███████╗█████╗██████╗ █████╗███╗   ██╗██╗████████╗██╗   ██╗  ║
 * ║  ██╔════╝╚██╗ ██╔╝████╗  ██║╚══██╔══╝██╔══██╗╚██╗██╔╝██╔════╝██╔══╝██╔══██╗██╔══╝████╗  ██║██║╚══██╔══╝╚██╗ ██╔╝  ║
 * ║  ███████╗ ╚████╔╝ ██╔██╗ ██║   ██║   ███████║ ╚███╔╝ ███████╗█████╗██████╔╝█████╗██╔██╗ ██║██║   ██║    ╚████╔╝   ║
 * ║  ╚════██║  ╚██╔╝  ██║╚██╗██║   ██║   ██╔══██║ ██╔██╗ ╚════██║██╔══╝██╔══██╗██╔══╝██║╚██╗██║██║   ██║     ╚██╔╝    ║
 * ║  ███████║   ██║   ██║ ╚████║   ██║   ██║  ██║██╔╝ ██╗███████║█████╗██║  ██║█████╗██║ ╚████║██║   ██║      ██║     ║
 * ║  ╚══════╝   ╚═╝   ╚═╝  ╚═══╝   ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝╚════╝╚═╝  ╚═╝╚════╝╚═╝  ╚═══╝╚═╝   ╚═╝      ╚═╝     ║
 * ║                                R E L I A B I L I T Y   I N   E V E R Y   L I N E                                  ║
 * ║                                              O F   C O D E                                                        ║
 * ║                                                                                                                   ║
 * ╚═══════════════════════════════════════════════════════════════════════════════════════════════════════════════════╝
 *
 * File: scrollAnimator.js
 *
 * Description: 
 *
 *     Advanced scroll-triggered animation system with intelligent UX optimizations. Provides smooth, performant animations
 *  that adapt to user scroll behavior, device capabilities, and accessibility preferences. Features dynamic threshold
 *  adjustment, GPU-accelerated transforms, velocity-based animation tuning, and comprehensive device detection for
 *  optimal user experience across all platforms.
 * 
 *  Key Features:
 * 
 *  - Adaptive animation thresholds based on scroll velocity
 *  - GPU-accelerated transforms using translate3d
 *  - Device performance detection and optimization
 *  - Respects user motion preferences (prefers-reduced-motion)
 *  - Preload animations for elements near viewport
 *  - Priority-based animation processing
 *  - Comprehensive preset configurations for different use cases
 * 
 * Structure:
 *
 *  - Configuration Management (default options, device detection)
 *  - Scroll Velocity Tracking (performance-optimized listeners)
 *  - Adaptive Animation System (dynamic thresholds, smart delays)
 *  - GPU-Accelerated Transforms (optimized for modern browsers)
 *  - Intersection Observer Integration (efficient viewport detection)
 *  - Accessibility Compliance (respects motion preferences)
 *  - Device Capability Detection (automatic performance tuning)
 *  - Animation Presets (curated configurations for different use cases)
 *
 * Dependencies: 
 * 
 *  - Intersection Observer API (modern browsers)
 *  - requestAnimationFrame for smooth scroll tracking
 *  - CSS transforms and transitions
 *  - Device APIs (navigator.deviceMemory, navigator.hardwareConcurrency)
 *  - Media queries for motion preferences
 * 
 * @description Advanced scroll-triggered animation system with intelligent UX optimizations
 * @version 2.1.0
 * @author Syntax Serenity <fs.developerfullstack@gmail.com>
 * @license MIT
 * @copyright 2024 Syntax Serenity
 * @repository https://github.com/syntax-serenity/scroll-animator
 * @website https://syntaxserenity.
 * 
 * Released under the MIT License - see LICENSE file for details
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
*/
const ScrollAnimator = {
 // UX-OPTIMIZED DEFAULT STTINGS
 defaultOptions: {
     // Basic classes
      targetClass: 'scroll-animate',
      activeClass: 'animate-in',
      inactiveClass: 'animate-out',
        
     // Default animation
       direction: 'up',
       animationDuration: 0.6,
       animationDistance: 40,
       easing: 'ease-out',
        
     // Dynamic threshold based on scroll
        visibilityThreshold: 15,
        fastScrollThreshold: 5,
        slowScrollThreshold: 25,

     // Optimized delays
        triggerDelay: 0,
        fastScrollDelay: 0,
        staggerDelay: 80,
        maxStaggerDelay: 300,
        
     // Scroll settings
        scrollVelocityThreshold: 50,
        preloadDistance: 200,
        adaptiveThreshold: true,
        
     // Performance
        rootMargin: '50px 0px -30px 0px',
        once: true,
        removeOnExit: false,
        
     // specific UX
        prioritizeViewport: true,
        instantOnSlow: false,
        respectMotionPreference: true,
        
     // Callbacks
        onEnter: null,
        onExit: null,
        onScrollStart: null,
        onScrollEnd: null,
        
     // Debug
        debug: false
 },

 // Internal state
    options: {},
    observer: null,
    observedElements: [],
    
 // NEW: Scroll States
    scrolling: false,
    scrollVelocity: 0,
    lastScrollY: 0,
    lastScrollTime: Date.now(),
    scrollEndTimer: null,
    
 // Optimized easing mapping
 easingMap: {
     'instant': 'steps(1, end)',
     'ease': 'ease',
     'ease-in': 'ease-in',
     'ease-out': 'ease-out',
     'ease-in-out': 'ease-in-out',
     'linear': 'linear',
     'bounce': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
     'elastic': 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
     'swift': 'cubic-bezier(0.4, 0, 0.2, 1)',
     'smooth': 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
 },

 /**
     * PURPOSE OF THE FUNCTION: Initializes the ScrollAnimator system with custom options and optimizations.
     * DESCRIPTION:
     *    - Merges custom options with default configurations and validates them
     *    - Detects device capabilities and adjusts settings accordingly
     *    - Sets up scroll velocity tracking and intersection observer
     *    - Begins observing elements with the target class
     *    - Enables debug logging if debug mode is active
     * 
     * DEPENDENCIES:
     *    - validateOptions()
     *    - detectDeviceCapability()
     *    - setupScrollListeners()
     *    - setupObserver()
     *    - observeElements()
     * 
     * @param {Object} customOptions Optional configuration object to override defaults
     * @return {Object} Returns the ScrollAnimator instance for method chaining
     * 
     * @link https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
     * @link https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia
     * @author syntax serenity <fs.developerfullstack@gmail.com>
 */
 init(customOptions = {}) {
     this.options = { ...this.defaultOptions, ...customOptions };
     this.validateOptions();
     this.detectDeviceCapability();
     this.setupScrollListeners();
     this.setupObserver();
     this.observeElements();
     if (this.options.debug) {
         console.log('ScrollAnimator Otimizado inicializado:', this.options);
     }
     return this;
 },

 /**
     * PURPOSE OF THE FUNCTION: Detects device capabilities and adjusts animation settings for optimal performance.
     * DESCRIPTION:
     *    - Checks for user motion preferences and applies reduced motion settings
     *    - Detects low-end devices and optimizes animation parameters
     *    - Adjusts animation duration, delays, and thresholds based on device performance
     *    - Ensures accessibility compliance with motion preferences
     * 
     * DEPENDENCIES:
     *    - isLowEndDevice()
     *    - window.matchMedia for motion preferences
     *    - Navigator APIs for device detection
     * 
     * @return void
     * 
     * @link https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion
     * @link https://developer.mozilla.org/en-US/docs/Web/API/Navigator/deviceMemory
     * @link https://developer.mozilla.org/en-US/docs/Web/API/Navigator/hardwareConcurrency
     * @author syntax serenity <fs.developerfullstack@gmail.com>
 */
 detectDeviceCapability() {
     const isLowEnd = this.isLowEndDevice();
     if (this.options.respectMotionPreference && 
         window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
         this.options.animationDuration = 0.2;
         this.options.staggerDelay = 0;
         this.options.instantOnSlow = true;
     }
     if (isLowEnd || this.options.instantOnSlow) {
         this.options.animationDuration = Math.min(this.options.animationDuration, 0.4);
         this.options.staggerDelay = Math.min(this.options.staggerDelay, 50);
         this.options.visibilityThreshold = Math.max(this.options.visibilityThreshold, 10);
     }
 },

 /**
     * PURPOSE OF THE FUNCTION: Determines if the current device has limited performance capabilities.
     * DESCRIPTION:
     *    - Analyzes multiple performance metrics including device memory, CPU cores, and connection type
     *    - Checks for slow network connections and outdated user agents
     *    - Returns true if device meets criteria for low-end classification
     *    - Uses a scoring system requiring at least 2 indicators for classification
     * 
     * DEPENDENCIES:
     *    - Navigator APIs (deviceMemory, hardwareConcurrency, connection)
     *    - User agent string analysis
     * 
     * @return {boolean} Returns true if device is classified as low-end, false otherwise
     * 
     * @link https://developer.mozilla.org/en-US/docs/Web/API/Navigator/deviceMemory
     * @link https://developer.mozilla.org/en-US/docs/Web/API/Navigator/hardwareConcurrency
     * @link https://developer.mozilla.org/en-US/docs/Web/API/Navigator/connection
     * @author syntax serenity <fs.developerfullstack@gmail.com>
 */
 isLowEndDevice() {
     const checks = [];
     if (navigator.deviceMemory) {
         checks.push(navigator.deviceMemory <= 4);
     }

     if (navigator.hardwareConcurrency) {
         checks.push(navigator.hardwareConcurrency <= 4);
     }
     
     if (navigator.connection) {
         const slowConnections = ['slow-2g', '2g', '3g'];
         checks.push(slowConnections.includes(navigator.connection.effectiveType));
     }
     
     const lowEndUA = /Android.*(?:4\.[0-3]|[0-3]\.|Opera Mini|Android 2\.|Android 3\.)/.test(navigator.userAgent);
     checks.push(lowEndUA);
     
     return checks.filter(Boolean).length >= 2;
 },

 /**
     * PURPOSE OF THE FUNCTION: Sets up scroll event listeners to track scroll velocity and timing.
     * DESCRIPTION:
     *    - Implements throttled scroll event handling using requestAnimationFrame
     *    - Calculates real-time scroll velocity in pixels per millisecond
     *    - Tracks scroll start/end events with configurable timeouts
     *    - Triggers callback functions for scroll start and end events
     *    - Uses passive event listeners for optimal performance
     * 
     * DEPENDENCIES:
     *    - requestAnimationFrame for throttling
     *    - window.pageYOffset or document.documentElement.scrollTop
     *    - setTimeout for scroll end detection
     * 
     * @return void
     * 
     * @link https://developer.mozilla.org/en-US/docs/Web/API/Window/requestAnimationFrame
     * @link https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener
     * @author syntax serenity <fs.developerfullstack@gmail.com>
 */
 setupScrollListeners() {
     let ticking = false;
     
     const updateScrollMetrics = () => {
         const currentTime = Date.now();
         const currentScrollY = window.pageYOffset || document.documentElement.scrollTop;
         const timeDelta = currentTime - this.lastScrollTime;
         const scrollDelta = Math.abs(currentScrollY - this.lastScrollY);
         
         if (timeDelta > 0) {
             this.scrollVelocity = scrollDelta / timeDelta;
         }
         
         this.lastScrollY = currentScrollY;
         this.lastScrollTime = currentTime;
    
         if (!this.scrolling) {
             this.scrolling = true;
             if (this.options.onScrollStart) {
                 this.options.onScrollStart(this.scrollVelocity);
             }
         }
         
         clearTimeout(this.scrollEndTimer);
         this.scrollEndTimer = setTimeout(() => {
             this.scrolling = false;
             this.scrollVelocity = 0;
             if (this.options.onScrollEnd) {
                 this.options.onScrollEnd();
             }
         }, 150);
         
         ticking = false;
     };
     
     const onScroll = () => {
         if (!ticking) {
             requestAnimationFrame(updateScrollMetrics);
             ticking = true;
         }
     };
     
     window.addEventListener('scroll', onScroll, { passive: true });
 }, 
 
 /**
     * PURPOSE OF THE FUNCTION: Configures the Intersection Observer with adaptive thresholds for optimal animation triggering.
     * DESCRIPTION:
     *    - Creates Intersection Observer with multiple threshold values for different scroll speeds
     *    - Sets up root margin for early triggering of animations
     *    - Configures callback function for handling intersection events
     *    - Enables preload animations for elements near viewport
     * 
     * DEPENDENCIES:
     *    - Intersection Observer API
     *    - handleIntersectionOptimized() callback
     *    - Configuration options (rootMargin, threshold values)
     * 
     * @return void
     * 
     * @link https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
     * @link https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver
     * @author syntax serenity <fs.developerfullstack@gmail.com>
 */
 setupObserver() {
     const observerOptions = {
         rootMargin: this.options.rootMargin,
         // NOVO: Múltiplos thresholds para diferentes velocidades
         threshold: [
             0.01, // Para preload
             this.options.fastScrollThreshold / 100,
             this.options.visibilityThreshold / 100,
             this.options.slowScrollThreshold / 100
         ]
     }; 
     this.observer = new IntersectionObserver((entries) => {
         this.handleIntersectionOptimized(entries);
     }, observerOptions);
 },

 /**
     * PURPOSE OF THE FUNCTION: Handles intersection observer entries with priority-based processing for optimal performance.
     * DESCRIPTION:
     *    - Separates elements into high and normal priority based on viewport position
     *    - Processes high-priority elements immediately for better UX
     *    - Delays normal priority elements by one frame to prevent blocking
     *    - Uses preload distance to determine element priority
     *    - Optimizes animation timing based on element visibility
     * 
     * DEPENDENCIES:
     *    - getBoundingClientRect() for element positioning
     *    - processEntries() for animation execution
     *    - Configuration options (prioritizeViewport, preloadDistance)
     * 
     * @param {Array} entries Array of IntersectionObserverEntry objects
     * @return void
     * 
     * @link https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect
     * @link https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserverEntry
     * @author syntax serenity <fs.developerfullstack@gmail.com>
 */
 handleIntersectionOptimized(entries) {
     const highPriority = [];
     const normalPriority = [];
     
     entries.forEach(entry => {
         const element = entry.target;
         const elementRect = element.getBoundingClientRect();
         const viewportHeight = window.innerHeight;
         const isInViewport = elementRect.top < viewportHeight && elementRect.bottom > 0;
         const isNearViewport = elementRect.top < viewportHeight + this.options.preloadDistance;
         
         if (isInViewport || this.options.prioritizeViewport) {
             highPriority.push(entry);
         } else if (isNearViewport) {
             normalPriority.push(entry);
         }
     });
     this.processEntries(highPriority, true);
     if (normalPriority.length > 0) {
         setTimeout(() => {
             this.processEntries(normalPriority, false);
         }, 16); // ~1 frame de delay
     }
 },

 /**
     * PURPOSE OF THE FUNCTION: Processes intersection entries and triggers optimized animations based on scroll velocity.
     * DESCRIPTION:
     *    - Determines optimal animation configuration based on current scroll velocity
     *    - Applies different animation settings for fast vs slow scrolling
     *    - Handles element entry and exit animations with proper cleanup
     *    - Manages observer unobserving for once-only animations
     *    - Triggers callback functions for animation events
     * 
     * DEPENDENCIES:
     *    - getOptimalAnimationConfig() for velocity-based settings
     *    - animateInOptimized() for entry animations
     *    - animateOut() for exit animations
     *    - Intersection Observer API
     * 
     * @param {Array} entries Array of IntersectionObserverEntry objects
     * @param {boolean} isHighPriority Whether elements should be processed with high priority
     * @return void
     * 
     * @link https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserverEntry
     * @author syntax serenity <fs.developerfullstack@gmail.com>
 */
 processEntries(entries, isHighPriority = false) {
     entries.forEach((entry, index) => {
         const element = entry.target;
         const elementIndex = parseInt(element.getAttribute('data-animation-index')) || 0;
         
         if (entry.isIntersecting) {
             const config = this.getOptimalAnimationConfig(entry);
             this.animateInOptimized(element, elementIndex, config, isHighPriority);
             
             if (this.options.onEnter) {
                 this.options.onEnter(element, entry);
             }
             
             if (this.options.once) {
                 this.observer.unobserve(element);
             }
         } else if (!this.options.once && this.options.removeOnExit) {
             this.animateOut(element, elementIndex);
             
             if (this.options.onExit) {
                 this.options.onExit(element, entry);
             }
         }
     });
 },

 /**
     * PURPOSE OF THE FUNCTION: Determines optimal animation configuration based on current scroll context and element visibility.
     * DESCRIPTION:
     *    - Analyzes current scroll velocity to determine if fast scroll optimizations should be applied
     *    - Adjusts animation duration, delay, and easing based on scroll speed
     *    - Considers element intersection ratio for visibility-based optimizations
     *    - Returns configuration object with optimized animation parameters
     *    - Ensures smooth animations during fast scrolling while maintaining quality
     * 
     * DEPENDENCIES:
     *    - scrollVelocity property for speed detection
     *    - Configuration options (scrollVelocityThreshold, animationDuration)
     *    - IntersectionObserverEntry intersectionRatio
     * 
     * @param {IntersectionObserverEntry} entry The intersection observer entry containing element and visibility data
     * @return {Object} Returns optimized animation configuration object
     * 
     * @link https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserverEntry/intersectionRatio
     * @author syntax serenity <fs.developerfullstack@gmail.com>
 */
 getOptimalAnimationConfig(entry) {
     const isFastScroll = this.scrollVelocity > this.options.scrollVelocityThreshold;
     const intersectionRatio = entry.intersectionRatio;
     
     let config = {
         duration: this.options.animationDuration,
         delay: this.options.triggerDelay,
         easing: this.options.easing
     };
     
     if (isFastScroll) {
         config.duration = Math.min(config.duration, 0.3);
         config.delay = this.options.fastScrollDelay;
         config.easing = 'swift';
     }
     
     if (intersectionRatio < 0.1) {
         config.duration *= 0.8;
     } else if (intersectionRatio > 0.5) {
         config.duration *= 0.6;
         config.delay = 0;
     }
     return config;
 },

 /**
     * PURPOSE OF THE FUNCTION: Configures individual elements for scroll animation with custom attributes and styling.
     * DESCRIPTION:
     *    - Sets data attributes for animation tracking and configuration
     *    - Reads custom animation settings from data attributes or uses defaults
     *    - Applies initial styles and transforms to prepare elements for animation
     *    - Configures CSS custom properties for animation parameters
     *    - Adds direction-specific CSS classes for styling
     * 
     * DEPENDENCIES:
     *    - applyElementStyles() for style application
     *    - Data attributes (data-direction, data-duration, data-delay, etc.)
     *    - Configuration options for default values
     * 
     * @param {HTMLElement} element The DOM element to configure for animation
     * @param {number} index The animation index for stagger timing
     * @return void
     * 
     * @link https://developer.mozilla.org/en-US/docs/Web/API/Element/dataset
     * @link https://developer.mozilla.org/en-US/docs/Web/API/Element/setAttribute
     * @author syntax serenity <fs.developerfullstack@gmail.com>
 */
 setupElement(element, index) {
     element.setAttribute('data-animation-index', index);
        
     // Usar data attributes ou configurações padrão
        const elementDirection = element.dataset.direction || this.options.direction;
        const elementDuration = parseFloat(element.dataset.duration) || this.options.animationDuration;
        const elementDelay = parseFloat(element.dataset.delay) || this.options.triggerDelay;
        const elementDistance = parseInt(element.dataset.distance) || this.options.animationDistance;
        const elementEasing = element.dataset.easing || this.options.easing;

     this.applyElementStyles(element, {
         direction: elementDirection,
         duration: elementDuration,
         delay: elementDelay,
         distance: elementDistance,
         easing: elementEasing
     });
 },

 /**
     * PURPOSE OF THE FUNCTION: Applies optimized styles and transforms to elements for smooth scroll animations.
     * DESCRIPTION:
     *    - Sets CSS custom properties for animation timing and distance
     *    - Applies initial transform state with GPU acceleration using translate3d
     *    - Configures transition properties for smooth animations
     *    - Sets performance optimizations (will-change, backface-visibility, perspective)
     *    - Ensures elements start in hidden state with proper transforms
     * 
     * DEPENDENCIES:
     *    - getInitialTransform() for direction-based transforms
     *    - getOptimizedTransform() for GPU acceleration
     *    - easingMap for timing function mapping
     *    - CSS custom properties and transforms
     * 
     * @param {HTMLElement} element The DOM element to style
     * @param {Object} config Configuration object with animation parameters
     * @return void
     * 
     * @link https://developer.mozilla.org/en-US/docs/Web/CSS/transform
     * @link https://developer.mozilla.org/en-US/docs/Web/CSS/transition
     * @link https://developer.mozilla.org/en-US/docs/Web/CSS/will-change
     * @author syntax serenity <fs.developerfullstack@gmail.com>
 */
 applyElementStyles(element, config) {
     const { direction, duration, delay, distance, easing } = config;
     element.style.setProperty('--scroll-anim-duration', `${duration}s`);
     element.style.setProperty('--scroll-anim-delay', `${delay}s`);
     element.style.setProperty('--scroll-anim-distance', `${distance}px`);
     element.style.setProperty('--scroll-anim-timing', this.easingMap[easing] || easing); 
     const initialTransform = this.getInitialTransform(direction, distance);
     element.style.opacity = '0';
     element.style.transform = initialTransform;
     const optimizedTransform = this.getOptimizedTransform(initialTransform);
     element.style.transform = optimizedTransform;
     const timingFunction = this.easingMap[easing] || easing;
     element.style.transition = `opacity ${duration}s ${timingFunction} ${delay}s, transform ${duration}s ${timingFunction} ${delay}s`;
     element.style.willChange = 'opacity, transform';
     element.style.backfaceVisibility = 'hidden';
     element.style.perspective = '1000px'; 
     element.classList.add(`anim-${direction}`);
 },

 /**
     * PURPOSE OF THE FUNCTION: Converts 2D transforms to 3D transforms for GPU acceleration and better performance.
     * DESCRIPTION:
     *    - Replaces translateX/Y with translate3d to enable hardware acceleration
     *    - Converts translate() to translate3d() for consistent GPU usage
     *    - Ensures smooth animations by leveraging GPU processing
     *    - Maintains visual consistency while improving performance
     *    - Uses regex patterns to safely transform CSS transform strings
     * 
     * DEPENDENCIES:
     *    - Regular expressions for transform string manipulation
     *    - CSS transform3d property support
     * 
     * @param {string} transform The CSS transform string to optimize
     * @return {string} Returns the optimized transform string with 3D transforms
     * 
     * @link https://developer.mozilla.org/en-US/docs/Web/CSS/transform
     * @link https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/translate3d
     * @author syntax serenity <fs.developerfullstack@gmail.com>
 */
 getOptimizedTransform(transform) {
     return transform
         .replace(/translateX\(([^)]+)\)/, 'translate3d($1, 0, 0)')
         .replace(/translateY\(([^)]+)\)/, 'translate3d(0, $1, 0)')
         .replace(/translate\(([^,]+),\s*([^)]+)\)/, 'translate3d($1, $2, 0)');
 },

 /**
     * PURPOSE OF THE FUNCTION: Generates initial transform values based on animation direction and distance.
     * DESCRIPTION:
     *    - Creates appropriate transform strings for different animation directions
     *    - Supports multiple animation types: up, down, left, right, scale, rotate, fade
     *    - Uses distance parameter to determine transform magnitude
     *    - Returns CSS transform strings ready for application
     *    - Provides fallback to 'up' direction for invalid inputs
     * 
     * DEPENDENCIES:
     *    - CSS transform functions (translateY, translateX, scale, rotate)
     *    - Distance parameter for transform magnitude
     * 
     * @param {string} direction The animation direction ('up', 'down', 'left', 'right', 'scale', 'rotate', 'fade')
     * @param {number} distance The distance in pixels for the transform
     * @return {string} Returns the CSS transform string for the initial state
     * 
     * @link https://developer.mozilla.org/en-US/docs/Web/CSS/transform
     * @link https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function
     * @author syntax serenity <fs.developerfullstack@gmail.com>
 */
 getInitialTransform(direction, distance) {
     switch (direction) {
         case 'up': return `translateY(${distance}px)`;
         case 'down': return `translateY(-${distance}px)`;
         case 'left': return `translateX(${distance}px)`;
         case 'right': return `translateX(-${distance}px)`;
         case 'scale': return `scale(0.8)`;
         case 'rotate': return `rotate(5deg) scale(0.9)`;
         case 'fade': return `translateY(${distance * 0.3}px)`;
         default: return `translateY(${distance}px)`;
     }
 },

 /**
     * PURPOSE OF THE FUNCTION: Executes optimized entry animations with velocity-based timing and priority handling.
     * DESCRIPTION:
     *    - Calculates optimal delay based on element index and scroll velocity
     *    - Applies dynamic animation configuration for different scroll speeds
     *    - Uses setTimeout for precise timing control
     *    - Applies final animation state with GPU-optimized transforms
     *    - Manages CSS classes for animation states
     *    - Provides debug logging for development purposes
     * 
     * DEPENDENCIES:
     *    - setTimeout for animation timing
     *    - CSS transitions and transforms
     *    - Configuration options (staggerDelay, maxStaggerDelay)
     *    - scrollVelocity for speed-based optimizations
     * 
     * @param {HTMLElement} element The DOM element to animate
     * @param {number} index The animation index for stagger timing
     * @param {Object} config The animation configuration object
     * @param {boolean} isHighPriority Whether this is a high-priority animation
     * @return void
     * 
     * @link https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setTimeout
     * @link https://developer.mozilla.org/en-US/docs/Web/CSS/transition
     * @author syntax serenity <fs.developerfullstack@gmail.com>
 */
 animateInOptimized(element, index, config, isHighPriority = false) {
     const baseStaggerDelay = isHighPriority ? 
         Math.min(index * this.options.staggerDelay, this.options.maxStaggerDelay) :
         index * this.options.staggerDelay;
        
     const elementDelay = config.delay * 1000;
     const totalDelay = Math.min(baseStaggerDelay + elementDelay, this.options.maxStaggerDelay);
     const finalDelay = this.scrollVelocity > this.options.scrollVelocityThreshold * 2 ? 
         Math.min(totalDelay, 100) : totalDelay;

     setTimeout(() => {
         if (config.duration !== this.options.animationDuration) {
             element.style.transitionDuration = `${config.duration}s`;
         }
            
         if (config.easing !== this.options.easing) {
             const timingFunction = this.easingMap[config.easing] || config.easing;
             element.style.transitionTimingFunction = timingFunction;
         }

         element.style.opacity = '1';
         element.style.transform = 'translate3d(0, 0, 0) scale(1) rotate(0deg)';
         element.classList.add(this.options.activeClass);
            
         if (this.options.inactiveClass) {
             element.classList.remove(this.options.inactiveClass);
         }

         if (this.options.debug) {
             console.log(`Elemento animado após ${finalDelay}ms:`, element, `Velocidade: ${this.scrollVelocity.toFixed(2)}`);
         }
     }, finalDelay);
 },

 /**
     * PURPOSE OF THE FUNCTION: Sets up observation of DOM elements with the target class for scroll animations.
     * DESCRIPTION:
     *    - Queries DOM for elements with the configured target class
     *    - Configures each element with animation settings and data attributes
     *    - Adds elements to the intersection observer for visibility tracking
     *    - Maintains a list of observed elements for management
     *    - Provides debug logging for development and monitoring
     * 
     * DEPENDENCIES:
     *    - document.querySelectorAll for element selection
     *    - setupElement() for element configuration
     *    - Intersection Observer API
     *    - Configuration options (targetClass)
     * 
     * @return void
     * 
     * @link https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelectorAll
     * @link https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver/observe
     * @author syntax serenity <fs.developerfullstack@gmail.com>
 */
 observeElements() {
     const elements = document.querySelectorAll(`.${this.options.targetClass}`);
     
     elements.forEach((element, index) => {
         this.setupElement(element, index);
         this.observer.observe(element);
         this.observedElements.push(element);
     }); 
     if (this.options.debug) {
         console.log(`ScrollAnimator Otimizado: Observando ${elements.length} elementos`);
     }
 },

 /**
     * PURPOSE OF THE FUNCTION: Forces immediate animation of critical elements without waiting for scroll triggers.
     * DESCRIPTION:
     *    - Accepts CSS selector or DOM element for targeted animation
     *    - Applies instant animation with minimal duration for immediate visual feedback
     *    - Sets final animation state (opacity: 1, transform: none)
     *    - Adds active class to indicate animation completion
     *    - Useful for hero elements, headers, or critical UI components
     * 
     * DEPENDENCIES:
     *    - document.querySelectorAll for element selection
     *    - CSS transitions and transforms
     *    - Configuration options (targetClass, activeClass)
     * 
     * @param {string|HTMLElement} selector CSS selector string or DOM element
     * @return void
     * 
     * @link https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelectorAll
     * @link https://developer.mozilla.org/en-US/docs/Web/API/Element/classList
     * @author syntax serenity <fs.developerfullstack@gmail.com>
 */
 forceImmediateAnimation(selector) {
     const elements = typeof selector === 'string' ? 
         document.querySelectorAll(selector) : [selector];
     
     elements.forEach(element => {
         if (element && element.classList.contains(this.options.targetClass)) {
             element.style.transitionDuration = '0.1s';
             element.style.opacity = '1';
             element.style.transform = 'translate3d(0, 0, 0) scale(1) rotate(0deg)';
             element.classList.add(this.options.activeClass);
         }
     });
 },

 /**
     * PURPOSE OF THE FUNCTION: Animates elements that are already visible in the viewport on page load.
     * DESCRIPTION:
     *    - Scans all elements with the target class for current visibility
     *    - Checks if elements are within the viewport bounds
     *    - Triggers immediate animation for already-visible elements
     *    - Improves initial page load experience
     *    - Prevents elements from appearing unanimated when page loads
     * 
     * DEPENDENCIES:
     *    - getBoundingClientRect() for element positioning
     *    - window.innerHeight for viewport dimensions
     *    - forceImmediateAnimation() for instant animation
     *    - Configuration options (targetClass)
     * 
     * @return void
     * 
     * @link https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect
     * @link https://developer.mozilla.org/en-US/docs/Web/API/Window/innerHeight
     * @author syntax serenity <fs.developerfullstack@gmail.com>
 */
 preAnimateVisible() {
     const elements = document.querySelectorAll(`.${this.options.targetClass}`);   
     elements.forEach(element => {
         const rect = element.getBoundingClientRect();
         const viewportHeight = window.innerHeight;    
         if (rect.top < viewportHeight && rect.bottom > 0) {
             this.forceImmediateAnimation(element);
         }
     });
 },

 /**
     * PURPOSE OF THE FUNCTION: Validates configuration options and applies fallbacks for invalid values.
     * DESCRIPTION:
     *    - Checks animation direction against valid options and applies fallback
     *    - Validates visibility threshold range and corrects out-of-bounds values
     *    - Provides console warnings for invalid configurations
     *    - Ensures system stability by preventing invalid settings
     *    - Maintains backward compatibility with default values
     * 
     * DEPENDENCIES:
     *    - console.warn for validation warnings
     *    - Configuration options validation
     * 
     * @return void
     * 
     * @link https://developer.mozilla.org/en-US/docs/Web/API/Console/warn
     * @author syntax serenity <fs.developerfullstack@gmail.com>
 */
 validateOptions() {
     const validDirections = ['up', 'down', 'left', 'right', 'scale', 'rotate', 'fade'];
     if (!validDirections.includes(this.options.direction)) {
         console.warn(`ScrollAnimator: Direção '${this.options.direction}' inválida. Usando 'up'.`);
         this.options.direction = 'up';
     } 
     if (this.options.visibilityThreshold < 1 || this.options.visibilityThreshold > 100) {
         console.warn(`ScrollAnimator: visibilityThreshold deve estar entre 1 e 100. Usando 15.`);
         this.options.visibilityThreshold = 15;
     }
 },

 /**
     * PURPOSE OF THE FUNCTION: Dynamically adds new elements to the scroll animation system with custom configuration.
     * DESCRIPTION:
     *    - Accepts various input types: CSS selector, NodeList, or single HTMLElement
     *    - Applies custom configuration to new elements via data attributes
     *    - Sets up elements with proper animation configuration
     *    - Adds elements to the intersection observer for tracking
     *    - Maintains element index for proper stagger timing
     * 
     * DEPENDENCIES:
     *    - document.querySelectorAll for selector processing
     *    - setupElement() for element configuration
     *    - Intersection Observer API
     *    - Data attributes for custom configuration
     * 
     * @param {string|NodeList|HTMLElement} elements Elements to add (selector, NodeList, or single element)
     * @param {Object} customConfig Custom configuration object for the elements
     * @return void
     * 
     * @link https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelectorAll
     * @link https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver/observe
     * @author syntax serenity <fs.developerfullstack@gmail.com>
 */
 addElements(elements, customConfig = {}) {
     let elementList = []; 
     if (typeof elements === 'string') {
         elementList = document.querySelectorAll(elements);
     } else if (elements instanceof NodeList) {
         elementList = Array.from(elements);
     } else if (elements instanceof HTMLElement) {
         elementList = [elements];
     } 
     elementList.forEach((element, index) => {
         const newIndex = this.observedElements.length + index;
         
         if (customConfig.direction) element.dataset.direction = customConfig.direction;
         if (customConfig.duration) element.dataset.duration = customConfig.duration;
         if (customConfig.delay) element.dataset.delay = customConfig.delay;
         if (customConfig.distance) element.dataset.distance = customConfig.distance;
         if (customConfig.easing) element.dataset.easing = customConfig.easing;
         
         element.classList.add(this.options.targetClass);
         this.setupElement(element, newIndex);
         
         this.observer.observe(element);
         this.observedElements.push(element);
     });
 },

 /**
     * PURPOSE OF THE FUNCTION: Removes elements from the scroll animation system and cleans up observers.
     * DESCRIPTION:
     *    - Accepts various input types: CSS selector, NodeList, or single HTMLElement
     *    - Unobserves elements from the intersection observer
     *    - Removes elements from the internal tracking array
     *    - Cleans up memory and prevents memory leaks
     *    - Useful for dynamic content management
     * 
     * DEPENDENCIES:
     *    - document.querySelectorAll for selector processing
     *    - Intersection Observer API (unobserve)
     *    - Array management for observed elements
     * 
     * @param {string|NodeList|HTMLElement} elements Elements to remove (selector, NodeList, or single element)
     * @return void
     * 
     * @link https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver/unobserve
     * @author syntax serenity <fs.developerfullstack@gmail.com>
 */
 removeElements(elements) {
     let elementList = [];
     if (typeof elements === 'string') {
         elementList = document.querySelectorAll(elements);
     } else if (elements instanceof NodeList) {
         elementList = Array.from(elements);
     } else if (elements instanceof HTMLElement) {
         elementList = [elements];
     } 
     elementList.forEach(element => {
         this.observer.unobserve(element);
         const index = this.observedElements.indexOf(element);
         if (index > -1) {
             this.observedElements.splice(index, 1);
         }
     });
 },

 /**
     * PURPOSE OF THE FUNCTION: Completely disconnects the scroll animation system and cleans up all resources.
     * DESCRIPTION:
     *    - Disconnects the intersection observer to stop all observations
     *    - Clears the observed elements array to free memory
     *    - Clears scroll end timer to prevent memory leaks
     *    - Removes all event listeners and observers
     *    - Prepares system for complete shutdown or reinitialization
     * 
     * DEPENDENCIES:
     *    - Intersection Observer API (disconnect)
     *    - clearTimeout for timer cleanup
     *    - Array management for memory cleanup
     * 
     * @return void
     * 
     * @link https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver/disconnect
     * @link https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/clearTimeout
     * @author syntax serenity <fs.developerfullstack@gmail.com>
 */
 disconnect() {
     if (this.observer) {
         this.observer.disconnect();
         this.observedElements = [];
     }
     clearTimeout(this.scrollEndTimer);
 },

 /**
     * PURPOSE OF THE FUNCTION: Refreshes the scroll animation system by reinitializing all components.
     * DESCRIPTION:
     *    - Disconnects current system to clean up existing resources
     *    - Reinitializes scroll listeners and intersection observer
     *    - Reobserves all elements with current configuration
     *    - Useful for configuration changes or DOM updates
     *    - Maintains system state while updating components
     * 
     * DEPENDENCIES:
     *    - disconnect() for cleanup
     *    - setupScrollListeners() for reinitialization
     *    - setupObserver() for observer setup
     *    - observeElements() for element observation
     * 
     * @return void
     * 
     * @link https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver
     * @author syntax serenity <fs.developerfullstack@gmail.com>
 */
 refresh() {
     this.disconnect();
     this.setupScrollListeners();
     this.setupObserver();
     this.observeElements();
 }
};

/**
 * PURPOSE OF THE SECTION: Predefined configuration presets optimized for different use cases and scenarios.
 * DESCRIPTION:
 *    - Provides ready-to-use configurations for common animation scenarios
 *    - Optimized settings for different content types (content, ecommerce, landing pages)
 *    - Performance-focused presets for various device capabilities
 *    - Ensures consistent animation behavior across different project types
 *    - Reduces configuration time and improves development efficiency
 * 
 * DEPENDENCIES:
 *    - ScrollAnimator.defaultOptions for base configuration
 *    - Device capability detection for mobile optimization
 *    - Performance considerations for different use cases
 * 
 * @link https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
 * @author syntax serenity <fs.developerfullstack@gmail.com>
*/
ScrollAnimator.presets = {
 // Optimized UX - recommended for most cases
 optimal: {
     direction: 'up',
     visibilityThreshold: 15,
     fastScrollThreshold: 5,
     animationDuration: 0.5,
     triggerDelay: 0,
     staggerDelay: 60,
     maxStaggerDelay: 200,
     adaptiveThreshold: true,
     prioritizeViewport: true
 },
   
 // For content sites (blogs, articles)
 content: {
     direction: 'fade',
     visibilityThreshold: 20,
     fastScrollThreshold: 8,
     animationDuration: 0.4,
     staggerDelay: 40,
     easing: 'ease-out'
 },

 // For e-commerce (products, cards)
 ecommerce: {
     direction: 'scale',
     visibilityThreshold: 25,
     animationDuration: 0.3,
     staggerDelay: 80,
     easing: 'swift'
 },

 // For landing pages (visual impact)
 landing: {
     direction: 'up',
     visibilityThreshold: 30,
     animationDuration: 0.6,
     animationDistance: 60,
     staggerDelay: 120,
     easing: 'bounce'
 },

 // For mobile devices (optimized)
 mobile: {
     direction: 'up',
     visibilityThreshold: 10,
     fastScrollThreshold: 3,
     animationDuration: 0.3,
     animationDistance: 25,
     staggerDelay: 30,
     maxStaggerDelay: 100,
     instantOnSlow: true
 },

 // Maximum performance (without sacrificing UX)
 performance: {
     direction: 'fade',
     visibilityThreshold: 5,
     animationDuration: 0.2,
     triggerDelay: 0,
     staggerDelay: 20,
     maxStaggerDelay: 80,
     easing: 'linear'
 }
};

/**
 * PURPOSE OF THE SECTION: Exports the ScrollAnimator object for use in different JavaScript environments.
 * DESCRIPTION:
 *    - Provides CommonJS module export for Node.js environments
 *    - Attaches ScrollAnimator to global window object for browser usage
 *    - Ensures compatibility with both module and global script loading
 *    - Enables flexible integration in various project setups
 *    - Maintains backward compatibility with different loading methods
 * 
 * DEPENDENCIES:
 *    - module.exports for CommonJS compatibility
 *    - window object for global browser access
 *    - Environment detection for appropriate export method
 * 
 * @link https://nodejs.org/api/modules.html#modules_module_exports
 * @link https://developer.mozilla.org/en-US/docs/Web/API/Window
 * @author syntax serenity <fs.developerfullstack@gmail.com>
*/
if (typeof module !== 'undefined' && module.exports) {module.exports = ScrollAnimator;}
if (typeof window !== 'undefined') {window.ScrollAnimator = ScrollAnimator;}