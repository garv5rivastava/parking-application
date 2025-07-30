document.addEventListener('DOMContentLoaded', function () {
  console.log("signup.js loaded");

  const signupForm = document.getElementById('signupForm');

  if (signupForm) {
    signupForm.addEventListener('submit', async function (e) {
      e.preventDefault();
       

      const name = document.getElementById('name').value;
      const phone = document.getElementById('phone').value;
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;

      try {
        const res = await fetch('/users/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, phone, email, password })
        });

        const data = await res.json();
        console.log('Server Response:', data);

        if (res.ok) {
          window.location.href = 'index.html'; 
        } else {
          alert(`Error: ${data.error || data.message}`);
        }
      } catch (err) {
        console.error('Signup error:', err);
        alert('Something went wrong. Please try again.');
      }
    });
  }
});
