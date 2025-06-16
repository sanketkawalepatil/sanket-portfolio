// Smooth scrolling and navigation
document.addEventListener('DOMContentLoaded', function() {
  // Navigation functionality
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section');
  
  // Update active nav link on scroll
  function updateActiveNav() {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (scrollY >= (sectionTop - 200)) {
        current = section.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  }
  
  // Smooth scroll for navigation links
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      
      if (targetSection) {
        const offsetTop = targetSection.offsetTop - 80;
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // Mobile navigation toggle
  const navToggle = document.querySelector('.nav-toggle');
  const navLinksContainer = document.querySelector('.nav-links');
  
  if (navToggle && navLinksContainer) {
    navToggle.addEventListener('click', function() {
      navLinksContainer.classList.toggle('active');
      this.classList.toggle('active');
    });
  }
  
  // Scroll animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);
  
  // Observe elements for animation
  const animateElements = document.querySelectorAll('.project-card, .timeline-item, .skill-category');
  animateElements.forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
  });
  
  // Parallax effect for floating cards
  document.addEventListener('mousemove', function(e) {
    const cards = document.querySelectorAll('.floating-card');
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    
    cards.forEach((card, index) => {
      const speed = (index + 1) * 0.5;
      const x = (mouseX - 0.5) * speed * 20;
      const y = (mouseY - 0.5) * speed * 20;
      
      card.style.transform = `translate(${x}px, ${y}px)`;
    });
  });
  
  // Typing animation for hero title
  function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
      if (i < text.length) {
        element.innerHTML += text.charAt(i);
        i++;
        setTimeout(type, speed);
      }
    }
    
    type();
  }
  
  // Initialize typing animation
  const heroTitle = document.querySelector('.hero-title .highlight');
  if (heroTitle) {
    const originalText = heroTitle.textContent;
    setTimeout(() => {
      typeWriter(heroTitle, originalText, 150);
    }, 1000);
  }
  
  // Project card interactions
  const projectCards = document.querySelectorAll('.project-card');
  projectCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0) scale(1)';
    });
  });
  
  // Form submission
  const form = document.querySelector('.form');
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form data
      const formData = new FormData(this);
      const name = this.querySelector('input[type="text"]').value;
      const email = this.querySelector('input[type="email"]').value;
      const message = this.querySelector('textarea').value;
      
      // Simple validation
      if (name && email && message) {
        // Simulate form submission
        const submitBtn = this.querySelector('.form-submit');
        const originalText = submitBtn.innerHTML;
        
        submitBtn.innerHTML = '<span>Sending...</span>';
        submitBtn.disabled = true;
        
        setTimeout(() => {
          submitBtn.innerHTML = '<span>Message Sent!</span><div class="submit-arrow">✓</div>';
          submitBtn.style.background = '#48bb78';
          
          setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.style.background = '#1a1a1a';
            submitBtn.disabled = false;
            this.reset();
          }, 2000);
        }, 1500);
      }
    });
  }
  
  // Scroll progress indicator
  function updateScrollProgress() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    
    // Update navigation background opacity based on scroll
    const nav = document.querySelector('.nav');
    if (nav) {
      if (scrollTop > 100) {
        nav.style.background = 'rgba(250, 250, 250, 0.98)';
        nav.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
      } else {
        nav.style.background = 'rgba(250, 250, 250, 0.95)';
        nav.style.boxShadow = 'none';
      }
    }
  }
  
  // Event listeners
  window.addEventListener('scroll', function() {
    updateActiveNav();
    updateScrollProgress();
  });
  
  // Initialize
  updateActiveNav();
  updateScrollProgress();
  
  // Add loading animation
  document.body.style.opacity = '0';
  window.addEventListener('load', function() {
    document.body.style.transition = 'opacity 0.5s ease';
    document.body.style.opacity = '1';
  });
  
  // Add click ripple effect
  function createRipple(event) {
    const button = event.currentTarget;
    const circle = document.createElement('span');
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;

    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
    circle.style.top = `${event.clientY - button.offsetTop - radius}px`;
    circle.classList.add('ripple');

    const ripple = button.getElementsByClassName('ripple')[0];
    if (ripple) {
      ripple.remove();
    }

    button.appendChild(circle);
  }
  
  // Add ripple to buttons
  const buttons = document.querySelectorAll('.form-submit, .project-card');
  buttons.forEach(button => {
    button.addEventListener('click', createRipple);
  });
  
  // Add CSS for ripple effect
  const style = document.createElement('style');
  style.textContent = `
    .ripple {
      position: absolute;
      border-radius: 50%;
      background-color: rgba(255, 255, 255, 0.3);
      transform: scale(0);
      animation: ripple-animation 0.6s linear;
      pointer-events: none;
    }
    
    @keyframes ripple-animation {
      to {
        transform: scale(4);
        opacity: 0;
      }
    }
    
    .form-submit, .project-card {
      position: relative;
      overflow: hidden;
    }
  `;
  document.head.appendChild(style);
});

// Performance optimization
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Optimized scroll handler
const optimizedScrollHandler = debounce(function() {
  // Scroll-based animations and effects
}, 10);