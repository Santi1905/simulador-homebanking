// Selección de elementos del DOM
const carritoListaUl = document.getElementById('carrito-lista-ul');
const vaciarCarritoBtn = document.getElementById('vaciar-carrito-btn');
const comprarBtn = document.getElementById('comprar-btn');
const totalCarritoSpan = document.getElementById('total-carrito-span');
const loginForm = document.getElementById('login-form');
const registroForm = document.getElementById('registro-form');
const productoListaUl = document.getElementById('producto-lista-ul');

// Objeto para almacenar los productos en el carrito
let carrito = {};

// Array con los productos disponibles
const productos = [
  { id: 1, nombre: 'Producto 1', descripcion: 'Descripción del Producto 1', precio: 10.99 },
  { id: 2, nombre: 'Producto 2', descripcion: 'Descripción del Producto 2', precio: 5.99 },
  { id: 3, nombre: 'Producto 3', descripcion: 'Descripción del Producto 3', precio: 7.99 },
  { id: 4, nombre: 'Producto 4', descripcion: 'Descripción del Producto 4', precio: 12.99 },
  { id: 5, nombre: 'Producto 5', descripcion: 'Descripción del Producto 5', precio: 8.99 }
];

// Función para mostrar los productos disponibles en la tienda
function mostrarProductos() {
  // Limpiamos la lista de productos antes de renderizar
  productoListaUl.innerHTML = '';

  // Iteramos sobre el array de productos y generamos el HTML
  productos.forEach(producto => {
    const li = document.createElement('li');
    li.innerHTML = `
      <h3>${producto.nombre}</h3>
      <p>Descripción: ${producto.descripcion}</p>
      <p>Precio: $${producto.precio.toFixed(2)}</p>
      <button class="agregar-carrito-btn" data-producto-id="${producto.id}">Agregar al carrito</button>
    `;
    productoListaUl.appendChild(li);
  });

  // Reasignar eventos a los botones dinámicos
  asignarEventosAgregar();
}

// Función para asignar eventos a los botones "Agregar al carrito"
function asignarEventosAgregar() {
  const agregarCarritoBtns = document.querySelectorAll('.agregar-carrito-btn');
  agregarCarritoBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const productoId = btn.getAttribute('data-producto-id');
      agregarAlCarrito(productoId);
    });
  });
}

// Función para agregar un producto al carrito
function agregarAlCarrito(productoId) {
  // Convertir el ID a número y buscar el producto
  const producto = productos.find(prod => prod.id === parseInt(productoId));

  if (!producto) return; // Si no se encuentra el producto, no hacemos nada

  // Si ya existe en el carrito, aumentamos la cantidad
  if (carrito[productoId]) {
    carrito[productoId].cantidad++;
  } else {
    // Si no está en el carrito, lo añadimos con cantidad 1
    carrito[productoId] = {
      producto: producto,
      cantidad: 1
    };
  }

  // Actualizamos la lista del carrito y el total
  actualizarCarritoLista();
  actualizarTotalCarrito();
}

// Función para actualizar la lista del carrito en el DOM
function actualizarCarritoLista() {
  // Limpiamos el contenido actual del carrito
  carritoListaUl.innerHTML = '';

  // Iteramos sobre los productos del carrito
  Object.keys(carrito).forEach(productoId => {
    const item = carrito[productoId];
    const li = document.createElement('li');
    li.innerHTML = `
      <h3>${item.producto.nombre}</h3>
      <p>Cantidad: ${item.cantidad}</p>
      <p>Precio Unitario: $${item.producto.precio.toFixed(2)}</p>
      <p>Subtotal: $${(item.cantidad * item.producto.precio).toFixed(2)}</p>
      <button class="eliminar-producto-btn" data-producto-id="${productoId}">Eliminar</button>
    `;
    carritoListaUl.appendChild(li);
  });

  // Reasignamos eventos a los botones "Eliminar" en el carrito
  asignarEventosEliminar();
}

// Función para asignar eventos a los botones "Eliminar" en el carrito
function asignarEventosEliminar() {
  const eliminarProductoBtns = document.querySelectorAll('.eliminar-producto-btn');
  eliminarProductoBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const productoId = btn.getAttribute('data-producto-id');
      eliminarProductoDelCarrito(productoId);
    });
  });
}

// Función para eliminar un producto del carrito
function eliminarProductoDelCarrito(productoId) {
  // Eliminamos el producto del objeto carrito
  delete carrito[productoId];

  // Actualizamos la lista y el total
  actualizarCarritoLista();
  actualizarTotalCarrito();
}

// Función para calcular y actualizar el total del carrito
function actualizarTotalCarrito() {
  let total = 0;

  // Sumamos el subtotal de cada producto
  Object.keys(carrito).forEach(productoId => {
    const item = carrito[productoId];
    total += item.cantidad * item.producto.precio;
  });

  // Actualizamos el total en el DOM
  totalCarritoSpan.textContent = `$${total.toFixed(2)}`;
}

// Función para vaciar el carrito
function vaciarCarrito() {
  // Eliminamos todos los productos del carrito
  carrito = {};
  actualizarCarritoLista();
  actualizarTotalCarrito();
}

// Función para procesar la compra
function procesarCompra() {
  if (Object.keys(carrito).length === 0) {
    alert('El carrito está vacío. Añade productos antes de comprar.');
    return;
  }
  alert('¡Gracias por su compra!');
  vaciarCarrito(); // Vaciamos el carrito después de la compra
}

// Eventos relacionados con el formulario de login
if (loginForm) {
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const clave = document.getElementById('clave').value;
    // Implementar lógica de autenticación
    alert(`Bienvenido, ${email}!`);
  });
}

// Eventos relacionados con el formulario de registro
if (registroForm) {
  registroForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const nombre = document.getElementById('nombre').value;
    const apellido = document.getElementById('apellido').value;
    const email = document.getElementById('email').value;
    const clave = document.getElementById('clave').value;
    // Implementar lógica de registro
    alert(`Registro exitoso, ${nombre} ${apellido}!`);
  });
}

// Eventos principales
vaciarCarritoBtn.addEventListener('click', vaciarCarrito);
comprarBtn.addEventListener('click', procesarCompra);

// Inicializamos mostrando los productos
mostrarProductos();
