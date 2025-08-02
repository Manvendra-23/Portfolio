// Mobile menu toggle
const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

menuBtn.addEventListener('click', () => {
  mobileMenu.classList.toggle('hidden');
  mobileMenu.classList.toggle('fade-in');
});

// Close mobile menu when clicking a link
document.querySelectorAll('#mobile-menu a').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.add('hidden');
  });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();

    const targetId = this.getAttribute('href');
    if (targetId === '#') return;

    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  });
});


const observerOptions = {
  threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

document.querySelectorAll('.animate-on-scroll').forEach(element => {
  observer.observe(element);
});

// Form submission with loading 
const contactForm = document.querySelector('form');
const formSuccess = document.getElementById('form-success');

if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      alert('Please enter a valid email address.');
      document.getElementById('email').focus();
      return;
    }

    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalBtnContent = submitBtn.innerHTML;

    // Show loading state
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> Sending...';
    submitBtn.disabled = true;

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, subject, message })
      });

      const data = await res.json();

      if (data.success) {
        // Show success animation and reset
        submitBtn.innerHTML = '<i class="fas fa-check mr-2"></i> Message Sent!';
        submitBtn.classList.add('bg-green-500', 'pulse-glow');

        if (formSuccess) {
          formSuccess.classList.remove('hidden');
          setTimeout(() => {
            formSuccess.classList.add('hidden');
            contactForm.reset();
            submitBtn.innerHTML = originalBtnContent;
            submitBtn.classList.remove('bg-green-500', 'pulse-glow');
            submitBtn.disabled = false;
          }, 3000);
        }
      } else {
        alert('Failed to send message. Please try again.');
        submitBtn.innerHTML = originalBtnContent;
        submitBtn.disabled = false;
      }
    } catch (err) {
      console.error('Error:', err);
      alert('Server error. Please try again later.');
      submitBtn.innerHTML = originalBtnContent;
      submitBtn.disabled = false;
    }
  });
}

// floating animation to profile image
const profileImage = document.querySelector('.glow-border');
if (profileImage) {
  profileImage.classList.add('animate-float');
}

// Form input 
const inputs = document.querySelectorAll('.input-animate');
inputs.forEach(input => {
  input.addEventListener('focus', () => {
    input.parentElement.classList.add('animate-pulse');
  });

  input.addEventListener('blur', () => {
    input.parentElement.classList.remove('animate-pulse');
  });
});

// Contact 
const contactIcons = document.querySelectorAll('.icon-hover');
contactIcons.forEach(icon => {
  icon.addEventListener('mouseenter', () => {
    icon.classList.add('animate-bounce');
  });

  icon.addEventListener('mouseleave', () => {
    icon.classList.remove('animate-bounce');
  });
});

// Skill card
const skillCards = document.querySelectorAll('.skill-card');
skillCards.forEach(card => {
  card.addEventListener('mouseenter', () => {
    card.style.transform = 'perspective(1000px) rotateY(10deg) rotateX(5deg)';
    card.style.boxShadow = '0 25px 50px rgba(99, 102, 241, 0.4)';
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(1000px)';
    card.style.boxShadow = '';
  });
});
