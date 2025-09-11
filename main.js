document.addEventListener('DOMContentLoaded', function () {
    // Lógica para el menú de hamburguesa
    const hamburger = document.querySelector('.hamburger-menu');
    const navContainer = document.querySelector('.nav-container');

    if (hamburger && navContainer) {
        hamburger.addEventListener('click', function () {
            navContainer.classList.toggle('active');
        });
    }

    // Lógica para la Guía de Pasos (el carrusel)
    const nextBtn = document.querySelector('.next-btn');
    const prevBtn = document.querySelector('.prev-btn');
    const slides = document.querySelectorAll('.guia-paso-slide');
    let currentSlide = 0;

    function showSlide(n) {
        slides.forEach(slide => slide.classList.remove('active'));
        slides[n].classList.add('active');
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            currentSlide = (currentSlide - 1 + slides.length) % slides.length;
            showSlide(currentSlide);
        });
    }
});

// JavaScript para la funcionalidad de la página Print On Demand

let currentSlide = 0;
const slides = document.querySelectorAll('.guia-paso-slide');
const totalSlides = slides.length;

// Función para mostrar slide específico
function showSlide(index) {
    slides.forEach(slide => slide.classList.remove('active'));
    slides[index].classList.add('active');
    document.getElementById('slide-indicator').textContent = `${index + 1} / ${totalSlides}`;
}

// Navegar al siguiente slide
function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    showSlide(currentSlide);
}

// Navegar al slide anterior
function previousSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    showSlide(currentSlide);
}

// Cambiar entre vista frontal y trasera de la camiseta
function switchTab(button, view) {
    // Remover clase active de todos los botones
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    // Agregar clase active al botón clickeado
    button.classList.add('active');
    
    // Cambiar imagen de la camiseta según la vista
    const tshirtImage = document.querySelector('.tshirt-image');
    if (view === 'front') {
        tshirtImage.src = '../Images/shirt-front.png';
        tshirtImage.alt = 'Camiseta - Vista frontal';
    } else if (view === 'back') {
        tshirtImage.src = '../Images/shirt-back.png';
        tshirtImage.alt = 'Camiseta - Vista trasera';
    }
    
    console.log('Vista cambiada a:', view);
}

// Mostrar tooltip/mensaje informativo
function showTooltip(message) {
    // Crear elemento de tooltip temporal
    const tooltip = document.createElement('div');
    tooltip.textContent = message;
    tooltip.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: #333;
        color: white;
        padding: 10px 15px;
        border-radius: 5px;
        font-size: 12px;
        z-index: 10000;
        animation: fadeInOut 2s ease-in-out;
    `;
    
    // Agregar animación CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeInOut {
            0% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
            20% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
            80% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
            100% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
        }
    `;
    document.head.appendChild(style);
    document.body.appendChild(tooltip);
    
    // Remover tooltip después de 2 segundos
    setTimeout(() => {
        document.body.removeChild(tooltip);
        document.head.removeChild(style);
    }, 2000);
}

// Agregar producto al carrito
function addToCart() {
    // Aquí implementarías la lógica real de agregar al carrito
    showTooltip('¡Producto agregado al carrito!');
    
    // Ejemplo de datos que podrías enviar
    const productData = {
        type: 'camiseta',
        design: 'custom',
        size: 'M', // esto vendría de la selección del usuario
        quantity: 1,
        timestamp: new Date().toISOString()
    };
    
    console.log('Producto agregado:', productData);
}

// Enviar mensaje en el chat
function sendMessage() {
    const input = document.querySelector('.chat-input-container input');
    const message = input.value.trim();
    
    if (message) {
        console.log('Mensaje enviado:', message);
        
        // Aquí implementarías la lógica real del chat
        // Por ejemplo, enviar a un servidor o bot de chat
        
        // Limpiar input
        input.value = '';
        
        // Mostrar confirmación temporal
        showTooltip('Mensaje enviado');
        
        // Ejemplo de respuesta automática (opcional)
        setTimeout(() => {
            addChatMessage('¡Gracias por tu mensaje! Un agente te responderá pronto.', 'bot');
        }, 1000);
    }
}

// Manejar Enter en el input del chat
function handleEnter(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}

// Función auxiliar para agregar mensajes al chat
function addChatMessage(message, sender = 'user') {
    const chatBody = document.querySelector('.chat-body');
    const messageElement = document.createElement('div');
    messageElement.style.cssText = `
        margin: 10px 0;
        padding: 8px 12px;
        border-radius: 15px;
        font-size: 12px;
        line-height: 1.3;
        ${sender === 'user' ? 
            'background: #8A2BE2; color: white; margin-left: 20px; text-align: right;' : 
            'background: #f0f0f0; color: #333; margin-right: 20px;'
        }
    `;
    messageElement.textContent = message;
    chatBody.appendChild(messageElement);
    
    // Scroll al final
    chatBody.scrollTop = chatBody.scrollHeight;
}

// Auto-advance slides (opcional - cada 5 segundos)
let autoSlideInterval;

function startAutoSlide() {
    autoSlideInterval = setInterval(() => {
        nextSlide();
    }, 5000);
}

function stopAutoSlide() {
    clearInterval(autoSlideInterval);
}

// Pausar auto-slide cuando el usuario interactúa
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar el primer slide
    showSlide(0);
    
    // Iniciar auto-slide
    startAutoSlide();
    
    // Pausar auto-slide cuando el usuario hace hover sobre la guía
    const guiaPanel = document.querySelector('.guia-pasos-panel');
    if (guiaPanel) {
        guiaPanel.addEventListener('mouseenter', stopAutoSlide);
        guiaPanel.addEventListener('mouseleave', startAutoSlide);
    }
    
    // Event listeners para navegación manual
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            stopAutoSlide();
            previousSlide();
            setTimeout(startAutoSlide, 3000); // Reiniciar después de 3 segundos
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            stopAutoSlide();
            nextSlide();
            setTimeout(startAutoSlide, 3000); // Reiniciar después de 3 segundos
        });
    }
});

// Funciones adicionales para funcionalidad futura

// Zoom functionality
function toggleZoom() {
    const tshirtImage = document.querySelector('.tshirt-image');
    tshirtImage.classList.toggle('zoomed');
    
    // CSS para zoom (agregar al CSS si no existe)
    if (!document.querySelector('#zoom-style')) {
        const style = document.createElement('style');
        style.id = 'zoom-style';
        style.textContent = `
            .tshirt-image.zoomed {
                transform: scale(1.5);
                transition: transform 0.3s ease;
                cursor: zoom-out;
            }
            .tshirt-image {
                cursor: zoom-in;
                transition: transform 0.3s ease;
            }
        `;
        document.head.appendChild(style);
    }
}

// Guardar diseño
function saveDesign() {
    const designData = {
        timestamp: new Date().toISOString(),
        view: document.querySelector('.tab-btn.active').textContent.toLowerCase(),
        // Aquí agregarías más datos del diseño actual
    };
    
    // Simular guardado (en una app real, enviarías al servidor)
    localStorage.setItem('saved_design_' + Date.now(), JSON.stringify(designData));
    showTooltip('¡Diseño guardado!');
    console.log('Diseño guardado:', designData);
}