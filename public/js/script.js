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
    ddocument.getElementById('loginForm').addEventListener('submit', async (e) => {
         e.preventDefault();
         const username = document.getElementById('loginUsername').value;
         const password = document.getElementById('loginPassword').value;

         const response = await fetch('https://cozy-corner-coffee-shop.herokuapp.com/login', {
             method: 'POST',
             headers: { 'Content-Type': 'application/json' },
             body: JSON.stringify({ username, password })
         });

         const result = await response.json();
         alert(result.message);
     });


      if (response.ok) {
        alert('Registration successful!');
      } else {
        alert('Registration unsuccessful!');
      }
    });
