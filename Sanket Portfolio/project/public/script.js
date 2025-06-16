// Welcome page animations and interactions
if (document.querySelector('.welcome-page')) {
  // Add particle effect for welcome page
  function createParticles() {
    const particleContainer = document.createElement('div');
    particleContainer.className = 'particles';
    particleContainer.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 1;
    `;
    document.body.appendChild(particleContainer);

    for (let i = 0; i < 50; i++) {
      const particle = document.createElement('div');
      particle.style.cssText = `
        position: absolute;
        width: 2px;
        height: 2px;
        background: rgba(255, 255, 255, 0.6);
        border-radius: 50%;
        animation: float ${Math.random() * 3 + 2}s ease-in-out infinite;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        animation-delay: ${Math.random() * 2}s;
      `;
      particleContainer.appendChild(particle);
    }
  }

  // Add floating animation CSS
  const style = document.createElement('style');
  style.textContent = `
    @keyframes float {
      0%, 100% {
        transform: translateY(0px) translateX(0px);
        opacity: 0.6;
      }
      50% {
        transform: translateY(-20px) translateX(10px);
        opacity: 1;
      }
    }
  `;
  document.head.appendChild(style);

  // Initialize particles
  window.addEventListener('load', createParticles);

  // Add mouse movement effect
  document.addEventListener('mousemove', (e) => {
    const welcomeContent = document.querySelector('.welcome-content');
    if (welcomeContent) {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      welcomeContent.style.transform = `translate(${x}px, ${y}px)`;
    }
  });
}

// Portfolio page interactions
if (document.querySelector('.portfolio-page')) {
  // Smooth scroll reveal animation
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        
        // Animate children elements with stagger
        const children = entry.target.querySelectorAll('.skill-item, .area-card, .exp-card');
        children.forEach((child, index) => {
          setTimeout(() => {
            child.style.opacity = '1';
            child.style.transform = 'translateY(0)';
          }, index * 100);
        });
      }
    });
  }, observerOptions);

  // Observe all sections
  document.querySelectorAll('.skills-overview, .project-areas, .experience-highlight, .contact-section').forEach(section => {
    observer.observe(section);
  });

  // Add hover effects for cards
  document.querySelectorAll('.skill-item, .area-card, .exp-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-8px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0) scale(1)';
    });
  });

  // Add parallax effect to background
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.3;
    document.body.style.backgroundPosition = `center ${rate}px`;
  });

  // Add typing animation to portfolio header
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

  // Initialize typing animation when page loads
  window.addEventListener('load', () => {
    const title = document.querySelector('.portfolio-header h1');
    if (title) {
      const originalText = title.textContent;
      typeWriter(title, originalText, 120);
    }
  });
}

// Common functionality for both pages
document.addEventListener('DOMContentLoaded', function() {
  // Add loading screen
  const loader = document.createElement('div');
  loader.id = 'loader';
  loader.innerHTML = `
    <div class="loader-content">
      <div class="loader-spinner"></div>
      <p>Loading...</p>
    </div>
  `;
  
  const loaderStyles = `
    #loader {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.9);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 10000;
      opacity: 1;
      transition: opacity 0.5s ease-out;
    }
    
    .loader-content {
      text-align: center;
      color: white;
    }
    
    .loader-spinner {
      width: 50px;
      height: 50px;
      border: 3px solid rgba(255,255,255,0.3);
      border-top: 3px solid #667eea;
      border-radius: 50%;
      animation: spin 1s linear infinite;
      margin: 0 auto 20px;
    }
    
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `;
  
  const loaderStyleSheet = document.createElement('style');
  loaderStyleSheet.textContent = loaderStyles;
  document.head.appendChild(loaderStyleSheet);
  
  document.body.appendChild(loader);
  
  // Hide loader after content loads
  window.addEventListener('load', () => {
    setTimeout(() => {
      loader.style.opacity = '0';
      setTimeout(() => {
        if (loader.parentNode) {
          loader.parentNode.removeChild(loader);
        }
      }, 500);
    }, 1000);
  });
});

// Add click ripple effect to buttons
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

// Add ripple effect to enter button
document.addEventListener('DOMContentLoaded', () => {
  const enterButton = document.querySelector('.enter-button');
  if (enterButton) {
    enterButton.addEventListener('click', createRipple);
  }
});

// Add CSS for ripple effect
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
  .enter-button {
    position: relative;
    overflow: hidden;
  }
  
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
`;
document.head.appendChild(rippleStyle);