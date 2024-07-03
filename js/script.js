document.addEventListener('DOMContentLoaded', () => {
    console.log('JavaScript is running...');

    const form = document.querySelector('form');
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        alert('Thank you for your message!');
        form.reset();
    });
});
