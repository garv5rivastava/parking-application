document.addEventListener('DOMContentLoaded', () => {
  console.log('login.js loaded');

  const loginForm = document.getElementById('loginForm');
  if (!loginForm) {
    console.warn('loginForm not found');
    return;
  }

  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();                          

    
    const email    = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
      const res  = await fetch('/users/login', {
        method : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body   : JSON.stringify({ email, password })
      });

      const data = await res.json();
      console.log('Server response:', data);      
      if (res.ok && data.token) {
        
        localStorage.setItem('token', data.token);

        window.location.href = 'dashboard.html';  
      } else {
        alert(`Login failed: ${data.error || data.message}`);
      }
    } catch (err) {
      console.error('Login error:', err);
      alert('Something went wrong. Check console for details.');
    }
  });
});
