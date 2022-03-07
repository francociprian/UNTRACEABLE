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
        timer: 1500,
        background: '#3C4245',
        color: '#F7F2E7'
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
        timer: 1500,
        background: '#3C4245',
        color: '#F7F2E7'
    })
    Toast.fire({
        icon: 'success',
        title: 'Se Agrego a Favoritos'
    })
}

function mostrarProductos(){

    contenedorProductos.innerHTML='';
    for (const producto of stockProductos) {
        const divProducto = document.createElement('div');
        divProducto.className = 'stock__card';
        divProducto.innerHTML += `  <img class="stock__card--image" src="${producto.img}">
                            <div id="btnAgregarFavoritos${producto.id}" class="stock__card--fav">
                                <i class="fa-regular fa-heart"></i>
                            </div>
                            <h2 class="stock__card--nombre">${producto.name}</h2>
                            <button id="btnAgregarProductos${producto.id}" class="stock__card--btn">$${producto.price}</button>`;

        contenedorProductos.appendChild(divProducto);

        const btnAgregarProducto = document.getElementById(`btnAgregarProductos${producto.id}`);
        btnAgregarProducto.addEventListener('click', () => {
            agregarAlCarrito(producto.id)
            carritoAlert()
        });

        const favProducto = document.getElementById(`btnAgregarFavoritos${producto.id}`);
        favProducto.addEventListener('click', () => {
            mostrarFavoritos(producto.id);
            favoritosAlert();
        })
    }
}

function agregarAlCarrito(id){
    let repetido = carrito.find(producto => producto.id == id)
    if (repetido){
        repetido.amount++;
        document.getElementById(`cantidad${repetido.id}`).innerHTML =`<p id=cantidad${repetido.id}>${repetido.amount}</p>`;
        actualizarCarrito();
        cantidadEnCarrito();

    } else{
        let productoAgregar = stockProductos.find(elemento => elemento.id == id);
        carrito.push(productoAgregar);
        actualizarCarrito();
        cantidadEnCarrito();

        const divCarrito = document.createElement('div');
        divCarrito.className = 'carrito__card';
        divCarrito.innerHTML += `                                
                                    <h2 class="carrito__card--nombre">${productoAgregar.name}</h2>
                                    <p class="carrito__card--price">$${productoAgregar.price}</p>
                                    <div class="carrito__card--amount">
                                        <i class="fa-regular fa-square-minus" id="restarProducto${productoAgregar.id}"></i>
                                        <p id=cantidad${productoAgregar.id}>${productoAgregar.amount}</p>
                                        <i class="fa-regular fa-square-plus" id="sumarProducto${productoAgregar.id}"></i>
                                    </div>
                                    <button id=btnEliminar${productoAgregar.id} class="carrito__card--eliminar">
                                        <i class="fa-regular fa-trash-can"></i>
                                    </button>`;

        contenedorCarrito.appendChild(divCarrito);

        const btnSumar = document.getElementById(`sumarProducto${productoAgregar.id}`);
        btnSumar.addEventListener('click', ()=> {
            productoAgregar.amount +=1;
            document.getElementById(`cantidad${productoAgregar.id}`).innerHTML = `<p id=cantidad${productoAgregar.id}>${productoAgregar.amount}</p>`;
            actualizarCarrito();
            cantidadEnCarrito();
        })

        const btnRestar = document.getElementById(`restarProducto${productoAgregar.id}`);
        btnRestar.addEventListener('click', ()=> {
            productoAgregar.amount -=1;
            document.getElementById(`cantidad${productoAgregar.id}`).innerHTML = `<p id=cantidad${productoAgregar.id}>${productoAgregar.amount}</p>`;
            actualizarCarrito();
            cantidadEnCarrito();
        })

        const btnEliminar = document.getElementById(`btnEliminar${productoAgregar.id}`);
        btnEliminar.addEventListener('click', ()=>{
            productoAgregar.amount--;
            document.getElementById(`cantidad${productoAgregar.id}`).innerHTML = `<p id=cantidad${productoAgregar.id}>${productoAgregar.amount}</p>`;
            actualizarCarrito();
            cantidadEnCarrito();

            if (productoAgregar.amount <=0){
                btnEliminar.parentElement.remove();
                carrito = carrito.filter(elemento => elemento.id != productoAgregar.id);
            }
            localStorage.setItem('carrito', JSON.stringify(carrito));
        })

        localStorage.setItem('carrito', JSON.stringify(carrito));

    }
}     

actualizarCarrito = () => {
    let sumarProductos = carrito.reduce((acumulador, e) => acumulador + (e.price * e.amount), 0);
    totalCarrito.textContent = `TOTAL: $${sumarProductos}`;
}
recuperarStorage = () => {
    let recuperarLS = JSON.parse(localStorage.getItem('carrito'));
    if (recuperarLS) {
        recuperarLS.forEach(element => (
            agregarAlCarrito(element.id)
        ))
    }
}
recuperarStorage();

function cantidadEnCarrito() {
    let cantCarrito = carrito.reduce((acumulador, e) => acumulador + e.amount, 0);
    iconCarrito.textContent = `${cantCarrito}`;
}

function limpiarElCarrito() {
    carrito = [];
    contenedorCarrito.innerHTML = "";
    totalCarrito.textContent = ` `;
    iconCarrito.innerHTML = "";

    localStorage.clear();
}
