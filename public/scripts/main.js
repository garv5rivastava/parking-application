document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', async function (e) {
      e.preventDefault();

      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;

      try {
        const res = await fetch('http://localhost:4000/users/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password })
        });

        const data = await res.json();
        console.log(data);

        if (res.ok && data.token) {
          localStorage.setItem('token', data.token);
          window.location.href = 'dashboard.html';
        } else {
          alert(`Login failed: ${data.error || data.message}`);
        }
      } catch (err) {
        console.error('Login failed:', err);
        alert('Login error. Please try again.');
      }
    });
  }

  const welcomeText = document.getElementById('welcomeText');
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('navMenu');
  const userGreeting = document.getElementById('userGreeting');
  const logoutBtn = document.getElementById('logoutBtn');
  const token = localStorage.getItem('token');

  if (welcomeText || userGreeting) {
    if (!token) {
      alert('Not logged in. Redirecting...');
      window.location.href = 'index.html';
      return;
    }

    fetch('http://localhost:4000/users/me', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data.user && data.user.name) {
          const name = data.user.name.split(' ')[0];
          if (welcomeText) {
            welcomeText.innerHTML = `Welcome to <span>UrbanBay</span>, ${name}!`;
          }
          if (userGreeting) {
            userGreeting.textContent = `Hello, ${name}`;
          }
        } else {
          throw new Error('Invalid token or session expired');
        }
      })
      .catch(err => {
        console.error('Dashboard error:', err);
        alert('Session expired or failed to load user.');
        localStorage.removeItem('token');
        window.location.href = 'index.html';
      });
  }


  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      navMenu.classList.toggle('open');
    });
  }


  if (logoutBtn) {
    logoutBtn.addEventListener('click', (e) => {
      e.preventDefault();
      localStorage.removeItem('token');
      window.location.href = 'index.html';
    });
  }
});


// Tab switching functionality
  function switchTab(tabType) {
      const parkerContent = document.getElementById('parker-content');
      const ownerContent = document.getElementById('owner-content');
      const tabButtons = document.querySelectorAll('.tab-btn');
      
      // Remove active class from all tabs
      tabButtons.forEach(btn => btn.classList.remove('active'));
      
      if (tabType === 'parker') {
          parkerContent.classList.remove('hidden');
          ownerContent.classList.add('hidden');
          tabButtons[0].classList.add('active');
      } else {
          ownerContent.classList.remove('hidden');
          parkerContent.classList.add('hidden');
          tabButtons[1].classList.add('active');
      }
  }

  // Modal functionality
  function openModal(type) {
      const modal = document.getElementById('authModal');
      const modalBody = document.getElementById('modalBody');
      
      if (type === 'login') {
          modalBody.innerHTML = `
              <div class="auth-form">
                  <h2>Welcome Back</h2>
                  <form>
                      <input type="email" placeholder="Email Address" required>
                      <input type="password" placeholder="Password" required>
                      <button type="submit" class="btn-primary">Login</button>
                      <p class="auth-switch">Don't have an account? <a href="#" onclick="openModal('signup')">Sign up</a></p>
                  </form>
              </div>
          `;
      } else {
          modalBody.innerHTML = `
              <div class="auth-form">
                  <h2>Join ParkSpot</h2>
                  <form>
                      <input type="text" placeholder="Full Name" required>
                      <input type="email" placeholder="Email Address" required>
                      <input type="password" placeholder="Password" required>
                      <input type="password" placeholder="Confirm Password" required>
                      <select required>
                          <option value="">I want to...</option>
                          <option value="park">Find parking spaces</option>
                          <option value="list">List my parking space</option>
                          <option value="both">Both</option>
                      </select>
                      <button type="submit" class="btn-primary">Sign Up</button>
                      <p class="auth-switch">Already have an account? <a href="#" onclick="openModal('login')">Login</a></p>
                  </form>
              </div>
          `;
      }
      
      modal.style.display = 'block';
  }

  function closeModal() {
      document.getElementById('authModal').style.display = 'none';
  }

  // Close modal when clicking outside
  window.onclick = function(event) {
      const modal = document.getElementById('authModal');
      if (event.target === modal) {
          modal.style.display = 'none';
      }
  }

  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
          e.preventDefault();
          const target = document.querySelector(this.getAttribute('href'));
          if (target) {
              target.scrollIntoView({
                  behavior: 'smooth',
                  block: 'start'
              });
          }
      });
  });

  // Mobile menu toggle
  document.addEventListener('DOMContentLoaded', function() {
      const hamburger = document.querySelector('.hamburger');
      const navMenu = document.querySelector('.nav-menu');
      const navButtons = document.querySelector('.nav-buttons');
      
      hamburger.addEventListener('click', function() {
          navMenu.classList.toggle('active');
          navButtons.classList.toggle('active');
      });
  });

  // Form submission handling
  // document.addEventListener('submit', function(e) {
  //     const form = e.target;
  //     if (form.closest('.auth-form')) {
  //         e.preventDefault();
  //         alert('Form submitted! Please integrate with your backend.');
  //         closeModal();
  //     }
  // });

  // Search functionality
  document.addEventListener('DOMContentLoaded', function() {
      const searchBtn = document.querySelector('.search-btn');
      const searchInput = document.querySelector('.search-input-container input');
      
      if (searchBtn && searchInput) {
          searchBtn.addEventListener('click', function() {
              const location = searchInput.value.trim();
              
              if (location) {
                  alert(`Searching for parking near: ${location}\n(Please integrate with your search functionality)`);
              } else {
                  alert('Please enter a location to search for parking.');
              }
          });
          
          searchInput.addEventListener('keypress', function(e) {
              if (e.key === 'Enter') {
                  searchBtn.click();
              }
          });
      }
  });

  // Add scroll animations
  function animateOnScroll() {
      const cards = document.querySelectorAll('.feature-card, .step-card, .type-card');
      
      cards.forEach(card => {
          const cardTop = card.getBoundingClientRect().top;
          const cardVisible = 150;
          
          if (cardTop < window.innerHeight - cardVisible) {
              card.classList.add('animate');
          }
      });
  }

  // Initialize scroll animations
  window.addEventListener('scroll', animateOnScroll);
  document.addEventListener('DOMContentLoaded', animateOnScroll);

  // Video background optimization
  document.addEventListener('DOMContentLoaded', function() {
      const video = document.getElementById('bgVideo');
      
      // Ensure video plays on mobile devices
      video.play().catch(function(error) {
          console.log('Video autoplay failed:', error);
      });
      
      // Pause video when not visible (performance optimization)
      document.addEventListener('visibilitychange', function() {
          if (document.hidden) {
              video.pause();
          } else {
              video.play();
          }
      });
  });
