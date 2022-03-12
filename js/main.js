/* VARIABLES */
const contenedorProductos = document.getElementById('stock__productos')
const contenedorCarrito = document.getElementById('carrito__container')
const contenedorFavoritos = document.querySelector('.contenedor__favoritos')
const totalCarrito = document.getElementById('footer')

const iconCarrito = document.querySelector('.carrito__cantidad--icon');

const templateCard = document.getElementById('template-card').content
const templateFooter = document.getElementById('template-footer').content
const templateCarrito = document.getElementById('template-carrito').content
const templateFavoritos = document.getElementById('template-favoritos').content

const fragment = document.createDocumentFragment()
let carrito = {}
let favoritos = {}

// EVENTOS 
document.addEventListener('DOMContentLoaded', e => {
    dataFetch()
});
contenedorProductos.addEventListener('click', e => {
    addCarrito(e)
    addFavoritos(e)
});
contenedorCarrito.addEventListener('click', e => {
    btnAumentarDisminuir(e)
});

// SWEETALERT PARA LAS NOTIFICACIONES 
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

// Traer productos
const dataFetch = async () => {
    try {
        const respuesta = await fetch('js/api.json');
        const data = await respuesta.json();
        // console.log(data)
        pintarCards(data);
    } catch (error) {
        console.log(error);
    }
}
// ---------------- CARDS ----------------
// Pintar productos
const pintarCards = (data) => {
    data.forEach(producto => {
        contenedorProductos.innerHTML = "";
        templateCard.querySelector('h5').textContent = producto.title + " " + producto.size;
        templateCard.querySelector('p').textContent = producto.price;
        templateCard.querySelector('.card-img-top').src = producto.image;
        templateCard.querySelector('.btn-dark').dataset.id = producto.id;
        templateCard.querySelector('.btn__favoritos').dataset.id = producto.id

        const clone = templateCard.cloneNode(true);
        fragment.appendChild(clone);
    })
    contenedorProductos.appendChild(fragment);
}

// ---------------- CARRITO ----------------
// Agregar al carrito
const addCarrito = e => {
    if (e.target.classList.contains('btn-dark')) {
        setCarrito(e.target.parentElement);
        carritoAlert();
    }
    e.stopPropagation()
}
// Pintar en Carrito
const pintarCarrito = () => {
    contenedorCarrito.innerHTML = '';

    Object.values(carrito).forEach(producto => {
        // Informacion
        templateCarrito.querySelector('th').textContent = producto.id;
        templateCarrito.querySelectorAll('td')[0].textContent = producto.title;
        templateCarrito.querySelectorAll('td')[2].textContent = producto.cantidad;

        // Total
        templateCarrito.querySelector('span').textContent = producto.price * producto.cantidad;
        console.log(templateCarrito.querySelector('span').textContent = producto.price * producto.cantidad);

        // Botones para sumar o restar productos
        templateCarrito.querySelector('.btn-plus').dataset.id = producto.id;
        templateCarrito.querySelector('.btn-minus').dataset.id = producto.id;

        const clone = templateCarrito.cloneNode(true);
        fragment.appendChild(clone);
    })
    contenedorCarrito.appendChild(fragment);

    pintarFooter();

    localStorage.setItem('carrito', JSON.stringify(carrito));
}
// Pintar Footer del Carrito
const pintarFooter = () => {
    totalCarrito.innerHTML = '';
    if (Object.keys(carrito).length === 0) {
        totalCarrito.innerHTML =
            `<th scope="row" colspan="5">Carrito vacío</th>`

        return
    }

    // sumar unidades a comprar y total
    const sumaCantidad = Object.values(carrito).reduce((acc, {cantidad}) => acc + cantidad, 0);
    const precioTotal = Object.values(carrito).reduce((acc, {cantidad,price}) => acc + cantidad * price, 0);
    console.log(sumaCantidad)

    templateFooter.querySelectorAll('td')[0].textContent = sumaCantidad;
    templateFooter.querySelector('span').textContent = precioTotal;
    // Icono arriba del carrito con las unidades 
    iconCarrito.textContent = sumaCantidad;

    const clone = templateFooter.cloneNode(true);
    fragment.appendChild(clone);

    totalCarrito.appendChild(fragment);

    const boton = document.querySelector('#vaciar-carrito')
    boton.addEventListener('click', () => {
        iconCarrito.textContent = '';
        carrito = {}
        pintarCarrito()
    })

}
const setCarrito = objeto => {
    const producto = {
        id: objeto.querySelector('.btn-dark').dataset.id,
        title: objeto.querySelector('h5').textContent,
        price: objeto.querySelector('p').textContent,
        cantidad: 1
    };

    if (carrito.hasOwnProperty(producto.id)) {
        producto.cantidad = carrito[producto.id].cantidad + 1
    }

    carrito[producto.id] = { ...producto }
    
    pintarCarrito()
}
// Botones para agregar o quitar productos
const btnAumentarDisminuir = e => {
    // console.log(e.target.classList.contains('btn-plus'))
    if (e.target.classList.contains('btn-plus')) {
        const producto = carrito[e.target.dataset.id];
        producto.cantidad +=1;

        carrito[e.target.dataset.id] = {...producto};
        pintarCarrito();
    }
    // console.log(e.target.classList.contains('btn-minus'))
    if (e.target.classList.contains('btn-minus')) {
        const producto = carrito[e.target.dataset.id];
        producto.cantidad -=1;

        producto.cantidad === 0 ? delete carrito[e.target.dataset.id] : carrito[e.target.dataset.id] = {...producto};
        pintarCarrito()
    }
    e.stopPropagation()
}

// ---------------- FAVORITOS ----------------
// Agregar a favoritos
const addFavoritos = e => {
    if (e.target.classList.contains('btn__favoritos')) {
        setFavoritos(e.target.parentElement);
        favoritosAlert()
    }
    e.stopPropagation()
}
// Pintar en Favoritos
const pintarFavoritos = () => {
    contenedorFavoritos.innerHTML = ""; 

    Object.values(favoritos).forEach(producto => {
        // templateFavoritos.querySelector('.favoritos__card--image').setAttribute("src", producto.image)
        templateFavoritos.querySelector('.favoritos__card--image').src = producto.image;
        templateFavoritos.querySelector('h5').textContent = producto.title

        const clone = templateFavoritos.cloneNode(true);
        fragment.appendChild(clone);
    })
    contenedorFavoritos.appendChild(fragment);

    const btnFavoritos = document.querySelector('#limpiar__favoritos')
    btnFavoritos.addEventListener('click', () => {
        favoritos = {};
        pintarFavoritos();
    })

    localStorage.setItem('favoritos', JSON.stringify(favoritos));
}
const setFavoritos = items => {
    const producto = {
        id: items.querySelector('.btn__favoritos').dataset.id,
        title: items.querySelector('h5').textContent
    };

    favoritos[producto.id] = { ...producto }
    
    pintarFavoritos()
}


document.addEventListener('DOMContentLoaded', e => {
    dataFetch();
    if (localStorage.getItem('carrito')) {
        carrito = JSON.parse(localStorage.getItem('carrito'));
        pintarCarrito();
    }
    if (localStorage.getItem('favoritos')) {
        favoritos = JSON.parse(localStorage.getItem('favoritos'));
        pintarFavoritos();
    }
})