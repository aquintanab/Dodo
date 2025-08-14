document.addEventListener('DOMContentLoaded', function () {
    const hamburger = document.querySelector('.hamburger-menu');
    const navContainer = document.querySelector('.nav-container');

    // Comprobamos que ambos elementos existen antes de añadir el evento
    if (hamburger && navContainer) {
        hamburger.addEventListener('click', function () {
            // Esto permite que se vea o no el menu hamburguesa
            navContainer.classList.toggle('active');
        });
    }
});