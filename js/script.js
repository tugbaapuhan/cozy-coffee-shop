document.addEventListener('DOMContentLoaded', () => {
    console.log('JavaScript is running...');

    // Handle contact form submission
    const contactForm = document.querySelector('#contact form');
    contactForm.addEventListener('submit', (event) => {
        event.preventDefault();
        alert('Thank you for your message!');
        contactForm.reset();
    });

    // Handle registration form submission
    const registerForm = document.getElementById('register-form');
    registerForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const username = document.getElementById('register-username').value;
        const password = document.getElementById('register-password').value;

        const response = await fetch('/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        if (response.ok) {
            alert('Registration successful!');
            registerForm.reset();
        } else {
            alert('Registration unsuccessful!');
        }
    });

    // Handle login form submission
    document.getElementById('register-form').addEventListener('submit', async (event) => {
      event.preventDefault();

      const username = document.getElementById('username').value;
      const password = document.getElementById('password').value;

      const response = await fetch('https://tugbaapuhan.github.io/cozy-coffee-shop/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        alert('Registration successful!');
      } else {
        alert('Registration unsuccessful!');
      }
    });
