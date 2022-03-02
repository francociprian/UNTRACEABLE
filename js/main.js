// VARIABLES
const contenedorProductos = document.querySelector('.stock__productos');
const contenedorCarrito = document.querySelector('.carrito__container');
const contenedorFavoritos = document.querySelector('.contenedor__favoritos');
const limpiarCarrito = document.querySelector('.limpiar__carrito');
const limpiarFavoritos = document.querySelector('.limpiar__favoritos');
const cantidadCarrito = document.querySelector('.carrito__cantidad');
const iconCarrito = document.querySelector('.carrito__cantidad--icon');
const totalCarrito = document.querySelector('.carrito__total');


let carrito = [];
let favoritos = [];

// EVENTOS
document.addEventListener('DOMContentLoaded', () => {
    mostrarProductos();
});

limpiarCarrito.addEventListener('click', limpiarElCarrito);
limpiarFavoritos.addEventListener('click', limpiarLosFavoritos);


// FUNCIONES
carritoAlert = () => {
    const Toast = Swal.mixin({
        toast: true,
        position: 'bottom-end',
        showConfirmButton: false,
        timer: 1500
    })
    Toast.fire({
        icon: 'success',
        title: 'Se Agrego al Carrito'
    })
}
favoritosAlert = () => {
    const Toast = Swal.mixin({
        toast: true,
        position: 'bottom-start',
        showConfirmButton: false,
        timer: 1500
    })
    Toast.fire({
        icon: 'success',
        title: 'Se Agrego a Favoritos'
    })
}

mostrarProductos = () => {
    for (const producto of stockProductos) {
        const divProducto = document.createElement('div');
        divProducto.classList.add('stock__card');

        const imgProducto = document.createElement('img');
        imgProducto.classList.add('stock__card--image');
        imgProducto.src = producto.img;

        const favProducto = document.createElement('div');
        favProducto.classList.add('stock__card--fav');
        favProducto.innerHTML = `<i class="fa-regular fa-heart"></i>`
        favProducto.onclick = () => {
            agregarFavoritos(producto.id);
            favoritosAlert();
        }

        const nombreProducto = document.createElement('h2');
        nombreProducto.classList.add('stock__card--nombre');
        nombreProducto.textContent = producto.name;

        const btnAgregarProducto = document.createElement('button');
        btnAgregarProducto.classList.add('stock__card--btn');
        btnAgregarProducto.textContent = `$${producto.price}`;
        btnAgregarProducto.onclick = () => {
            agregarAlCarrito(producto.id);
            carritoAlert();
        }

        divProducto.appendChild(imgProducto);
        divProducto.appendChild(favProducto);
        divProducto.appendChild(nombreProducto);
        divProducto.appendChild(btnAgregarProducto);

        contenedorProductos.appendChild(divProducto);
    }
}

agregarAlCarrito = (id) => {

    const productosAgregados = stockProductos.find(producto => producto.id === id);
    carrito.push(productosAgregados);
    mostrarCarrito(carrito);
    cantidadEnCarrito();
    precioTotal();

    sessionStorage.setItem('carrito', JSON.stringify(carrito));

}

recuperarStorage = () => {
    let recuperarLS = JSON.parse(localStorage.getItem('favoritos'));
    if (recuperarLS) {
        recuperarLS.forEach(element => (
            agregarFavoritos(element.id)
        ))
    }
}
recuperarStorage();

function mostrarFavoritos() {

    contenedorFavoritos.innerHTML = "";
    for (const favorito of favoritos) {
        const divCard = document.createElement('div');
        divCard.classList.add('favoritos__card');

        const imgProducto = document.createElement('img');
        imgProducto.classList.add('favoritos__card--image');
        imgProducto.src = favorito.img;

        const nombreProducto = document.createElement('h2');
        nombreProducto.classList.add('favoritos__card--nombre');
        nombreProducto.textContent = favorito.name;

        divCard.appendChild(imgProducto);
        divCard.appendChild(nombreProducto);

        contenedorFavoritos.appendChild(divCard);
    }
}

function agregarFavoritos(id) {
    const productosFavoritos = stockProductos.find(producto => producto.id === id);
    favoritos.push(productosFavoritos);
    mostrarFavoritos(favoritos);

    localStorage.setItem('favoritos', JSON.stringify(favoritos));
}

function limpiarLosFavoritos() {
    favoritos = [];
    contenedorFavoritos.innerHTML = "";
    localStorage.clear();
}

function mostrarCarrito() {

    contenedorCarrito.innerHTML = "";
    for (const producto of carrito) {
        const divCard = document.createElement('div');
        divCard.classList.add('carrito__card');

        const imgProducto = document.createElement('img');
        imgProducto.classList.add('carrito__card--image');
        imgProducto.src = producto.img;

        const divClass = document.createElement('div');
        divClass.classList.add('carrito__card--card');

        const nombreProducto = document.createElement('h2');
        nombreProducto.classList.add('carrito__card--nombre');
        nombreProducto.textContent = producto.name;

        const typeProducto = document.createElement('p');
        typeProducto.classList.add('carrito__card--type');
        typeProducto.textContent = producto.type;

        const priceProducto = document.createElement('p');
        priceProducto.classList.add('carrito__card--price');
        priceProducto.textContent = `$${producto.price}`;

        const amountProducto = document.createElement('p');
        amountProducto.classList.add('carrito__card--amount');
        amountProducto.innerHTML = `<div class="carrito__card--amount">
                                            <i class="fa-regular fa-square-plus"></i>
                                            <p> ${producto.amount} </p>
                                            <i class="fa-regular fa-square-minus"></i>
                                        </div>`;


        divCard.appendChild(imgProducto);
        divCard.appendChild(divClass);
        divClass.appendChild(nombreProducto);
        divClass.appendChild(typeProducto);
        divClass.appendChild(priceProducto);
        divClass.appendChild(amountProducto);

        contenedorCarrito.appendChild(divCard);
    }
}

function precioTotal() {
    let sumarProductos = carrito.reduce((acumulador, e) => acumulador + e.price, 0);
    console.log(sumarProductos);
    totalCarrito.textContent = `TOTAL: $${sumarProductos}`;
}

function cantidadEnCarrito() {
    let cantidadEnElCarrito = carrito.length
    iconCarrito.textContent = `${cantidadEnElCarrito}`;
}

function limpiarElCarrito() {
    carrito = [];
    contenedorCarrito.innerHTML = "";
    totalCarrito.textContent = ` `;
    iconCarrito.innerHTML = "";

    sessionStorage.clear();
}