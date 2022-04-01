class Carrito{

    comprarProducto(e){
        if(e.target.classList.contains('add-to-cart')){
            const producto = e.target.parentElement.parentElement;
            this.leerDatosProducto(producto);
        }
        e.preventDefault();
        this.iconNavBar()
    }

    leerDatosProducto(producto){
        const infoProducto = {
            id: producto.querySelector('.add-to-cart').dataset.id,
            title: producto.querySelector('h3').textContent,
            price: producto.querySelector('.price').textContent,
            image: producto.querySelector('.pic-1').src,
            cantidad: 1
        }

        let productosLS;
        productosLS = this.obtenerProductosLocalStorage();
        productosLS.forEach(function (productoLS){
            if(productoLS.id === infoProducto.id){
                productosLS = productoLS.id;
            }
        });

        if(productosLS === infoProducto.id){
            Swal.fire({
                icon: 'warning',
                title: 'Oops...',
                text: 'The product has already been added',
                showConfirmButton: false,
                timer: 1000
            })
        } else {
            this.insertarCarrito(infoProducto);

            const Toast = Swal.mixin({
                toast: true,
                position: 'bottom-end',
                showConfirmButton: false,
                timer: 1500,
                background: '#ffffff',
                color: '#3c3442'
            })
            Toast.fire({
                icon: 'success',
                title: 'Added to Cart'
            })
        }

    }
    
    insertarCarrito(producto){
        const row = document.createElement('div');
        row.classList.add('pushbar__items');
        row.innerHTML = `
                <img class="pushbar__image" src="${producto.image}" alt="${producto.title}">
                <div class="pushbar__container">
                    <button class="pushbar__container--delete text-decoration-none text-light">
                        <i class="bi bi-x" data-id="${producto.id}"></i>
                    </button> 
                    <div>
                        <p class="pushbar__container--name">${producto.title}</p>
                        <p class="pushbar__container--price">$<span>${producto.price}</span></p>
                    </div>
                </div
        `;
        listaProductos.appendChild(row);
        this.guardarProductosLocalStorage(producto);
        this.totalIndex();
    }

    iconNavBar(){
        let items = this.obtenerProductosLocalStorage();
        let iconCart = items.reduce((acc, {cantidad}) => acc + cantidad, 0)
        iconCarrito.innerText = iconCart
    }
    
    eliminarProducto(e){
        // e.preventDefault();
        let producto, productoID;
        if(e.target.classList.contains('bi-x')){
            e.target.parentElement.parentElement.parentElement.remove();
            producto = e.target.parentElement.parentElement.parentElement;
            productoID = producto.querySelector('i').getAttribute('data-id');
        }
        this.eliminarProductoLocalStorage(productoID);
        // this.calcularTotal();
        this.totalIndex();
        this.iconNavBar();
    }

    vaciarCarrito(e){
        e.preventDefault();
        while(listaProductos.firstChild){
            listaProductos.removeChild(listaProductos.firstChild);
        }
        this.vaciarLocalStorage();
        this.totalIndex();
        this.iconNavBar();

        return false;
    }

    guardarProductosLocalStorage(producto){
        let productos;
        productos = this.obtenerProductosLocalStorage();
        productos.push(producto);
        localStorage.setItem('productos', JSON.stringify(productos));
    }

    obtenerProductosLocalStorage(){
        let productoLS;

        if(localStorage.getItem('productos') === null){
            productoLS = [];
        }
        else {
            productoLS = JSON.parse(localStorage.getItem('productos'));
        }
        return productoLS;
    }

    leerLocalStorage(){
        let productosLS;
        productosLS = this.obtenerProductosLocalStorage();
        productosLS.forEach(function (producto){
            const row = document.createElement('div');
            row.classList.add('pushbar__items');
            row.innerHTML = `
                <img class="pushbar__image" src="${producto.image}" alt="">
                <div class="pushbar__container">
                    <button class="pushbar__container--delete text-decoration-none text-light" data-id="${producto.id}">
                        <i class="bi bi-x"></i>
                    </button> 
                    <div>
                        <p class="pushbar__container--name">${producto.title}</p>
                        <p class="pushbar__container--price">$<span>${producto.price * producto.cantidad}</span></p>
                    </div>
                </div
                `;
            listaProductos.appendChild(row);
        });
        this.totalIndex();
        this.iconNavBar();
    }
    
    leerLocalStorageCompra(){
        let productosLS;
        productosLS = this.obtenerProductosLocalStorage();
        productosLS.forEach(function (producto){
            const row = document.createElement('tr');
            row.classList.add('align-middle')
            row.innerHTML = `
                <td>
                    <img src="${producto.image}">
                </td>
                <td>${producto.title}</td>
                <td>$${producto.price}</td>
                <td>
                    <input type="number" class="form-control cantidad" min="1" value=${producto.cantidad}>
                </td>
                <td id='subtotales'>$${producto.price * producto.cantidad}</td>
                <td>
                    <button class="pushbar__container--delete text-decoration-none text-light">
                        <i class="bi bi-x" data-id="${producto.id}"></i>
                    </button> 
                </td>
                `;
            listaCompra.appendChild(row);
        });
    }
    
    eliminarProductoLocalStorage(productoID){
        let productosLS;

        productosLS = this.obtenerProductosLocalStorage();

        productosLS.forEach(function(productoLS, index){
            if(productoLS.id === productoID){
                productosLS.splice(index, 1);
            }
        });

        localStorage.setItem('productos', JSON.stringify(productosLS));
    }

    vaciarLocalStorage(){
        localStorage.clear();
    }

    procesarElPedido(e){
        e.preventDefault();
        if(this.obtenerProductosLocalStorage().length === 0){
            const Toast = Swal.mixin({
                toast: true,
                position: 'bottom-end',
                showConfirmButton: false,
                timer: 1900,
                background: '#ffffff',
                color: '#3c3442',
                width: '25rem'
            })
            Toast.fire({
                icon: 'warning',
                title: 'The cart is empty, add a product'
            })
        }
        else {
            location.href = "checkout.html";
        }
    }

    calcularTotal(){
        let productosLS;
        let total = 0;
        productosLS = this.obtenerProductosLocalStorage();
        productosLS.map(producto => {
            total += producto.price * producto.cantidad;

            // return
        })

        const calcularTotalCheckout = document.getElementById('total');
        calcularTotalCheckout.value = `U$D ${total.toFixed(2)}`;
    }

    totalIndex() {
        let productosLS;
        let total = 0;
        productosLS = this.obtenerProductosLocalStorage();

        productosLS.map(producto => {
            total += producto.price * producto.cantidad;

            // return
        })

        const totalIndex = document.getElementById('preTotal');
        totalIndex.textContent = `U$D ${parseFloat(total)}`;
    }

    obtenerEvento(e) {
        e.preventDefault();
        let id, cantidad, producto, productosLS;
        if (e.target.classList.contains('cantidad')) {
            producto = e.target.parentElement.parentElement;
            id = producto.querySelector('i').getAttribute('data-id');
            cantidad = producto.querySelector('input').value;
            let actualizarMontos = document.querySelectorAll('#subtotales');

            productosLS = this.obtenerProductosLocalStorage();
            productosLS.forEach(function (productoLS, index) {
                if (productoLS.id === id) {
                    productoLS.cantidad = cantidad;                    
                    actualizarMontos[index].innerHTML = `$${Number(cantidad * productosLS[index].price)}`;
                    console.log(`$${Number(cantidad * productosLS[index].price)}`)
                }    
            });
            localStorage.setItem('productos', JSON.stringify(productosLS));
            
        } else {
            console.log("click afuera");
        }
        this.calcularTotal();
    }
}
