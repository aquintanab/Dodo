document.addEventListener("DOMContentLoaded", () => {

  // LÓGICA PARA ABRIR EL CHAT
  const chatWidget = document.querySelector("#chatWidget");
  const chatBubble = document.querySelector("#chatBubble");
  const closeChatBtn = document.querySelector("#closeChatBtn");

  // Cerrar chat => mostrar burbuja
  closeChatBtn.addEventListener("click", () => {
    chatWidget.classList.add("hidden");
    chatBubble.classList.add("show");
  });

  // Abrir chat => ocultar burbuja
  chatBubble.addEventListener("click", () => {
    chatWidget.classList.remove("hidden");
    chatBubble.classList.remove("show");
  });




  // LÓGICA PARA PASAR LA GUÍA DE PASOS
  const slides = document.querySelectorAll(".guia-paso-slide");
  const indicator = document.querySelector("#slide-indicator");
  const prevBtn = document.querySelector(".prev-btn");
  const nextBtn = document.querySelector(".next-btn");

  let currentSlide = 0;

  // Función para mostrar slide
  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.toggle("active", i === index);
    });
    indicator.textContent = `${index + 1} / ${slides.length}`;
  }

  // Botón siguiente
  nextBtn.addEventListener("click", () => {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  });

  // Botón anterior
  prevBtn.addEventListener("click", () => {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
  });

  // Mostrar la primera slide al cargar
  showSlide(currentSlide);




  //LÓGICA PARA EL CARRITO DE COMPRAS
  const cartButton = document.querySelector("#cartButton");
  const cartDrawer = document.querySelector("#cartDrawer");
  const closeCartBtn = document.querySelector("#closeCartBtn");
  const bubbleCount = document.querySelector(".bubble-count");
  const cartItemsContainer = document.querySelector("#cartItems");
  const cartTotal = document.querySelector("#cartTotal");

  let cart = []; // esta variable en lista va a guardar los items 

  // abrir y cerrar drawer del arrito
  cartButton.addEventListener("click", (e) => {
    e.preventDefault();
    cartDrawer.classList.add("show");
  });

  closeCartBtn.addEventListener("click", () => {
    cartDrawer.classList.remove("show");
  });

  // función para agregar al carrito
  window.addToCart = function () {
    const product = {
      id: Date.now(),
      name: "Camiseta estampada",
      price: 35000,
      size: "M",
      image: "../Images/shirt-front.png"  
    };
    cart.push(product);
    updateCart();
  };

  // actualizar contador y drawer
  function updateCart() {
    bubbleCount.textContent = cart.length;
    bubbleCount.style.display = cart.length > 0 ? "flex" : "none";

    cartItemsContainer.innerHTML = "";

    if (cart.length === 0) {
      cartItemsContainer.innerHTML = "<p class='empty-cart'>Tu carrito está vacío.</p>";
      cartTotal.textContent = "Total: $0";
      return;
    }

    let total = 0;

    cart.forEach(item => {
      const div = document.createElement("div");
      div.classList.add("cart-item");
      div.innerHTML = `
        <div class="item-img">
            <img src="../Images/shirt-front.png" alt="camiseta">
        </div>
        <div class="item-description">
            <div>
                <h4>${item.name}</h4>
                <p>Talla: ${item.size}</p>
            </div>
            <p class="cart-item-price">$${item.price.toLocaleString()}</p>
        </div>
      `;
      cartItemsContainer.appendChild(div);

      total += item.price;
    });

    cartTotal.textContent = `Total: $${total.toLocaleString()}`;
  }

  // iniciar en 0
  updateCart();




  //LÓGICA PARA ABRIR MODAL
  const modal = document.querySelector("#sizeModal");
  const modalBody = document.querySelector("#modalBody");
  const closeModal = document.querySelector("#closeModal");

  // Aquí vamos a poner el contenido que se debe abrir con cada función
  const modalContents = {
    tallas: `
      <h3>Guía de Tallas</h3>
      <div class="guia-tallas">
        <div class="talla-hombre">
          <h4>Hombres</h4>
          <table>
            <tr><th>Tallas</th><th>Alto</th><th>Pecho</th></tr>
            <tr><td>S</td><td>62</td><td>43</td></tr>
            <tr><td>M</td><td>65</td><td>46</td></tr>
            <tr><td>L</td><td>68</td><td>49</td></tr>
          </table>
        </div>
        <div class="talla-mujer">
          <h4>Mujeres</h4>
          <table>
            <tr><th>Tallas</th><th>Alto</th><th>Pecho</th></tr>
            <tr><td>S</td><td>62</td><td>43</td></tr>
            <tr><td>M</td><td>65</td><td>46</td></tr>
            <tr><td>L</td><td>68</td><td>49</td></tr>
          </table>
        </div>
      </div>
    `,
    preview: `<h3>Vista previa</h3><p>Aquí se va mostrar cómo se ve el diseño completo.</p>`,
    zoom: `<h3>Zoom</h3><p>Añadir luego función para zoom.</p>`,
    texto: `<h3>Agregar texto</h3><input type="text" placeholder="Escribe tu texto">`,
    imagen: `<div class="add-image">
      <h3>Agregar imagen</h3>
      <div class="shirt-stamp">
        <img src="../Images/shirt-stamp.png" />
      </div>
    </div>`,
    guardar: `<h3>Guardar diseño</h3><p>Tu diseño se ha guardado exitosamente.</p>`
  };

  document.querySelectorAll(".sidebar-item").forEach(item => {
    item.addEventListener("click", () => {
      const modalType = item.dataset.modal;
      modalBody.innerHTML = modalContents[modalType] || "<p>Contenido no disponible</p>";
      modal.classList.add("show");
    });
  });

  closeModal.addEventListener("click", () => {
    modal.classList.remove("show");
  });

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.remove("show");
    }
  });
});


// LÓGICA PARA CAMBIAR LA VISTA DE LA CAMISETA
function switchTab(button, view) {
  // Remover clase active de todos los botones
  document
    .querySelectorAll(".tab-btn")
    .forEach((btn) => btn.classList.remove("active"));
  // Agregar clase active al botón clickeado
  button.classList.add("active");

  // Cambiar imagen de la camiseta según la vista
  const tshirtImage = document.querySelector(".tshirt-image");
  if (view === "front") {
    tshirtImage.src = "../Images/shirt-front.png";
    tshirtImage.alt = "Camiseta - Vista frontal";
  } else if (view === "back") {
    tshirtImage.src = "../Images/shirt-back.png";
    tshirtImage.alt = "Camiseta - Vista trasera";
  }
  console.log("Vista cambiada a:", view);
}
