const compra = new Carrito();

const listaCompra = document.querySelector("#lista-compra tbody");

const carrito = document.getElementById('carrito');


const procesarCompraBtn = document.getElementById('procesar-compra');

const cliente = document.getElementById('cliente');
const correo = document.getElementById('correo');
const address = document.getElementById('address');


cargarEventos();

function cargarEventos() {

    document.addEventListener("DOMContentLoaded", () => {
		compra.leerLocalStorageCompra();
	});
    
    carrito.addEventListener('click', (e) => { 
        compra.eliminarProducto(e); 
    });
    
    compra.calcularTotal();

    procesarCompraBtn.addEventListener('click',(e) => procesarCompra(e));

    carrito.addEventListener('change', (e) => {
      compra.obtenerEvento(e) 
    });
    carrito.addEventListener('keyup', (e) => { 
      compra.obtenerEvento(e) 
    });
}


function generarTabla(productosLS) {

    let montoTotal = document.getElementById('total');

    let div = document.createElement("div");

    let tabla = document.createElement("table");
    tabla.style.borderCollapse = 'collapse';
    tabla.style.border = '4px solid #000'; 
    
    tabla.innerHTML += `<table class="table">
                            <thead>
                                <tr style="font-size: 1.2rem;" align="left">
                                    <th  style="width: 350px;">Name</th>
                                    <th  style="width: 100px;">Price</th>
                                    <th  style="width: 100px;">Amount</th>
                                    <th  style="width: 135px;">Subtotal</th>
                                </tr>
                            </thead>
                            <tbody>
                            </tbody>
                            <tfoot>
                                <tr>
                                    <td style="font-size: 1.2rem; font-weight: bold;" align="left">TOTAL:</td>
                                    <td></td>
                                    <td></td>
                                    <td style="border: 2px solid #000; font-size: 1.2rem; font-weight: bold;">${montoTotal.value}</td>
                                </tr>
                            </tfoot>
                        </table>`;

    const body = tabla.childNodes[3];

    productosLS.forEach(producto => {
        const row = document.createElement("tr");
        row.innerHTML += `
                            <td style="border: 2px solid #000;">${producto.title}</td>
                            <td style="border: 2px solid #000;">$ ${producto.price}</td>
                            <td style="border: 2px solid #000;">${producto.cantidad}</td>
                            <td style="border: 2px solid #000;">$ ${producto.price * producto.cantidad}</td>
                        `;
        body.appendChild(row);

    });

    tabla.appendChild(body);
    div.appendChild(tabla);
    return div;

}

function procesarCompra(e) {
    const emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;

    e.preventDefault()
    if (compra.obtenerProductosLocalStorage().length === 0) {
        Swal.fire({
            icon:'error',
            title: 'Oops...',
            text: 'There are no products in the cart, select one',
            showConfirmButton: false,
            timer: 3000
        }).then(function () {
            window.location = "index.html";
        })
    }
    else if (cliente.value === '' || correo.value === '' || address.value === '') {
        Swal.fire({
            icon:'error',
            title: 'Oops...',
            text: 'Enter all required fields',
            showConfirmButton: false,
            timer: 2000
        })
    }
    else if (emailRegex.test(correo.value) === false){
        Swal.fire({
            icon:'error',
            title: 'Oops...',
            text: 'Enter the email again',
            showConfirmButton: false,
            timer: 3000
        })

    } 
    else {

        emailjs.init('Lcx-Lrw2FTN0w-jsD')

        const textArea = document.createElement('textarea');
        textArea.id = "detalleCompra";
        textArea.name = "detalleCompra";
        textArea.cols = 60;
        textArea.rows = 10;
        textArea.hidden = true;
        productosLS = compra.obtenerProductosLocalStorage();

        textArea.innerHTML = generarTabla(productosLS).innerHTML;

        carrito.appendChild(textArea);
        
        
        document.getElementById('procesar-pago')    
            .addEventListener('click', function (event) {
                event.preventDefault();

                const cargandoGif = document.querySelector('#cargando');
                cargandoGif.style.display = 'block';
                cargandoGif.style.width = "100px"

                const enviado = document.createElement('img');
                enviado.src = 'media/mail-download.gif';
                enviado.style.display = 'block';
                enviado.style.width = '180px';;      

                const serviceID = 'default_service';
                const templateID = 'template_isi5fzm';

                emailjs.sendForm(serviceID, templateID, this)
                    .then(() => {
                        cargandoGif.style.display = 'none';
                        document.getElementById('loaders').appendChild(enviado);
                        
                        setTimeout(() => {
                            compra.vaciarLocalStorage();
                            enviado.remove();
                            window.location = "index.html";
                        }, 2000);
                    }, (err) => {
                        cargandoGif.style.display = 'none';
                        alert("Error al enviar el email\r\n Response:\n " + JSON.stringify(err));
                    });
        });

    }
}
