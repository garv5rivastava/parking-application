document.addEventListener('DOMContentLoaded', () => {
  /* ── Hamburger toggle ─────────────────────────────── */
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('navMenu');
  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      navMenu.classList.toggle('open');
    });
  }

  /* ── Load user name for greeting in nav ───────────── */
  const userGreeting = document.getElementById('userGreeting');
  const token = localStorage.getItem('token');
  if (userGreeting && token) {
    fetch('http://localhost:4000/users/me', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((r) => r.json())
      .then((d) => {
        if (d.user && d.user.name) {
          const firstName = d.user.name.split(' ')[0];
          userGreeting.textContent = `Hello, ${firstName}`;
        }
      })
      .catch(console.error);
  }

  /* ── Logout button ────────────────────────────────── */
  const logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', (e) => {
      e.preventDefault();
      localStorage.removeItem('token');
      window.location.href = 'index.html';
    });
  }

  /* ── Location Button Logic ────────────────────────── */
  let latitude = null;
  let longitude = null;

  const locatBtn = document.getElementById('getLocation');
  if (locatBtn) {
    locatBtn.addEventListener('click', () => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          latitude = position.coords.latitude;
          longitude = position.coords.longitude;
          alert('Location captured!');
        },
        () => {
          alert('Failed to get location. Please allow location access.');
        }
      );
    });
  }

  

  /* ── ADD‑PARKING FORM SUBMIT ──────────────────────── */
  const parkingForm = document.getElementById('parkingForm');
  if (parkingForm) {
    parkingForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      if (!token) {
        alert('Session expired. Please log in again.');
        window.location.href = 'index.html';
        return;
      }

      if (!latitude || !longitude) {
        alert('Please allow location access or click "Use My Location" button.');
        return;
      }

      const body = {
        title: document.getElementById('title').value.trim(),
        address: document.getElementById('address').value.trim(),
        pricePerHour: Number(document.getElementById('pricePerHour').value) || 0,
        description: document.getElementById('description').value.trim(),
        available: true,
        location: {
          type: 'Point',
          coordinates: [longitude, latitude]
        }
      };

      try {
        const res = await fetch('http://localhost:4000/parkings/add', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify(body)
        });

        const data = await res.json();
        if (res.ok) {
          alert('Parking spot added successfully!');
          window.location.href = 'dashboard.html';
        } else {
          alert(data.error || 'Failed to add parking spot.');
        }
      } catch (err) {
        console.error('Add parking error:', err);
        alert('Network error. Please try again.');
      }
    });
  }
});
