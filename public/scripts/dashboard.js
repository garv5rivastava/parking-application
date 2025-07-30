// document.addEventListener('DOMContentLoaded', async () => {
//   const token = localStorage.getItem('token');

//   if (!token) {
//     alert('Not logged in. Redirecting...');
//     window.location.href = 'index.html';
//     return;
//   }

//   try {
    
//     const res = await fetch('http://localhost:5000/users/me', {   
//   method: 'GET',
//   headers: {
//     Authorization: `Bearer ${token}`,
//     'Content-Type': 'application/json'
//   }
// });


//     const data = await res.json();

//     if (res.ok && data.user && data.user.name) {
//       const name = data.name.split(' ')[0]; 
//       document.getElementById('welcomeText').textContent = `Welcome to UrbanSlot, ${name}!`;
//     } else {
//       throw new Error(data.error || 'Invalid token or session expired');
//     }

//   } catch (err) {
//     console.error('Dashboard error:', err);
//     alert('Session expired or failed to load user.');
//     localStorage.removeItem('token');
//     window.location.href = 'index.html';
//   }
// });
