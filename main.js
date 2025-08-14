document.addEventListener('DOMContentLoaded', function () {
    const hamburger = document.querySelector('.hamburger-menu');
    const navContainer = document.querySelector('.nav-container');

    // Comprobamos que ambos elementos existen antes de añadir el evento
    if (hamburger && navContainer) {
        hamburger.addEventListener('click', function () {
            // Esta línea añade o quita la clase 'active' al contenedor del menú
            navContainer.classList.toggle('active');
        });
    }
});