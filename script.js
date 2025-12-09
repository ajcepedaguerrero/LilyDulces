// Escrito por Alexander Cepeda

//LISTA DE PRODUCTOS

const productos = [

{
        id: "01",
        imagen: "imagenes/coquitos.png",
        alt:"coquitos",
        nombre: "Coquitos",
        titulo:"Coquitos" ,       
        precio: 5000,
    },
    {
        id: "02",
        imagen: "imagenes/abrillantados 2.png",
        alt:"abrillantados",
        nombre: "abrillantados",
        titulo:"Dulces abrillantados",
        precio: 5000,
    },
    {
        id: "03",
        imagen: "imagenes/bocadillosdeplatano.png",
        alt:"bocadillos de platano",
        nombre:"Bocadillos de platano",
        titulo:"Bocadillos de platano",
        precio: 5000,
    },
    {
        id: "04",
        imagen: "imagenes/besitosdecoco.png",
        alt:"besitos de coco",
        nombre: "Besitos de coco",
        titulo:"Besitos de coco",
        precio: 5000,
    },
]

// Captar click al comprar

function manejarClicComprar(evento) {    
    const productoId = evento.target.dataset.id;
    agregarProductoAlCarrito(productoId);    
}      


// AÑADIR PRODUCTOS 

function agregarProductos() {

    const artProductos = document.querySelector(".producto");
    for (let i = 0; i < productos.length; i++) {
        const producto = productos[i];
        const card = document.createElement("article");
        card.classList.add("card-producto");
        card.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.alt}" title="${producto.titulo}">
            <h3>${producto.nombre}</h3>
            <p>${producto.precio} $</p>
            <button class="btn-comprar" type="button" data-id="${producto.id}">Añadir a carrito</button>   
        `;
        artProductos.appendChild(card);
        card.querySelector(".btn-comprar").addEventListener("click", manejarClicComprar); 
    }
    
}      

// ACTUALIZAR CARRITO DE COMPRAS

function actualizarCarritoHTML() {
    const carritoCompras = document.querySelector(".carritoCompras");

    carritoCompras.innerHTML = `
        <h2>Tu Carrito de Compras</h2>
        <ul class="lista-carrito"></ul>
        <p class="total-carrito"></p>
        <p class="cantidad-carrito"></p>
    `;
    
    const listaCarrito = carritoCompras.querySelector(".lista-carrito");
    let totalPagar = 0;
    let cantidadProductosUnicos = 0;

    if (carritoCompras.length === 0) {
        listaCarrito.innerHTML = "<p>El carrito está vacío.</p>";
    } else {
        for (let i = 0; i < carrito.length; i++) {
            const item = carrito[i];
            const li = document.createElement("li");
            li.innerHTML = `
                <span>${item.nombre} - $${item.precio} x ${item.cantidad}</span>
                <div>
                    <button class="btn-cantidad" data-id="${item.id}" data-action="restar">-</button>
                    <button class="btn-cantidad" data-id="${item.id}" data-action="sumar">+</button>
                    <button class="btn-eliminar" data-id="${item.id}" data-action="eliminar">x</button>
                </div>
            `;
            listaCarrito.appendChild(li);
            totalPagar += item.precio * item.cantidad;
            cantidadProductosUnicos++;
        }
    }

    // Mostrar total a pagar
    carritoCompras.querySelector(".total-carrito").textContent = `Total a pagar: $${totalPagar}`;
    carritoCompras.querySelector(".cantidad-carrito").textContent = `Productos en carrito: ${cantidadProductosUnicos}`;

    // Configurar el Event Listener para los botones de cantidad y eliminar
    const nuevoListaCarrito = carritoCompras.querySelector(".lista-carrito");
    nuevoListaCarrito.addEventListener("click", manejarClicCarrito);
    
}

// AGREGAR PRODUCTO AL CARRITO 

let carrito = [];

// Agrega un producto al carrito o incrementa su cantidad si ya existe.

function agregarProductoAlCarrito(idProducto) {
        // Busca si el producto ya esta en el carrito
        let productoEnCarrito = null;
    for (let i = 0; i < carrito.length; i++) {
        if (carrito[i].id === idProducto) {
            productoEnCarrito = carrito[i];
            break; // Se usa para salir del bucle
        }
    }

    if (productoEnCarrito) {
        // Si el producto ya existe, incrementa la cantidad
        productoEnCarrito.cantidad++;
    } else {
        // Si no está, buscar el producto en el vector 'productos'
        let productoOriginal = null;
        for (let i = 0; i < productos.length; i++) {
            if (productos[i].id === idProducto) {
                productoOriginal = productos[i];
                break;
            }
        }        
        
        // Añadir el producto al carrito con cantidad 1
        carrito.push({ ...productoOriginal, cantidad: 1 });
    }
    actualizarCarritoHTML();
}


// Suma una unidad a la cantidad de un producto en el carrito.
function sumarCantidadProducto(idProducto) {
    let productoEnCarrito = null;

    // Buscar el producto en el carrito
    for (let i = 0; i < carrito.length; i++) {
        if (carrito[i].id === idProducto) {
            productoEnCarrito = carrito[i];
            break;
        }
    }

    if (productoEnCarrito) {
        productoEnCarrito.cantidad++;
        actualizarCarritoHTML(); // Actualizar el HTML del carrito
    }
}

// Resta una unidad a la cantidad de un producto en el carrito.
function restarCantidadProducto(idProducto) {
    let productoEnCarrito = null;
    // Buscar el producto en el carrito
    for (let i = 0; i < carrito.length; i++) {
        if (carrito[i].id === idProducto) {
            productoEnCarrito = carrito[i];
            break;
        }
    }

    if (productoEnCarrito) {
        productoEnCarrito.cantidad--;
        if (productoEnCarrito.cantidad <= 0) {
            eliminarProductoDelCarrito(idProducto); // Eliminar si la cantidad llega a 0
        } else {
            actualizarCarritoHTML(); // Solo actualizar si la cantidad aún es positiva
        }
    }
}

// Elimina completamente un producto del carrito.
function eliminarProductoDelCarrito(idProducto) {
    // Reconstruir el array carrito sin el producto a eliminar
    const nuevoCarrito = [];
    for (let i = 0; i < carrito.length; i++) {
        // Buscar los elementos distintos al que hay que eliminar
        if (carrito[i].id !== idProducto) {
            nuevoCarrito.push(carrito[i]);
        }
    }
    carrito = nuevoCarrito;
    actualizarCarritoHTML();
}

// Maneja el evento de clic en los botones de cantidad y eliminar del carrito.
function manejarClicCarrito(evento) {
    const target = evento.target;

    if (target.classList.contains("btn-cantidad") || target.classList.contains("btn-eliminar")) {
        const productoId = target.dataset.id;
        const accion = target.dataset.action;

        if (accion === "eliminar") {
            eliminarProductoDelCarrito(productoId);
        } else if (accion === "restar") {
            restarCantidadProducto(productoId);
        } else if (accion === "sumar") {
            sumarCantidadProducto(productoId);
        }
    }
}


/* ------------------ PROGRAMA PRINCIPAL ------------------*/

agregarProductos();
actualizarCarritoHTML();