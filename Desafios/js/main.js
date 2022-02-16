let cantidad = 0
let carrito = ""
let continuar = ""
let precioFinal = 0

class Productos {
    constructor(id, nombre, precio, categoria,) {
        this.id = id;
        this.nombre = nombre;
        this.precio = parseFloat(precio);
        this.categoria = categoria;
        this.vendido = false;
    }
}

const stockProductos = [
    {
        id: 1,
        nombre: 'gorra',
        precio: 15,
        categoria: 'ropa'
    },
    {
        id: 2,
        nombre: 'remera',
        precio: 35,
        categoria: 'ropa'
    },
    {
        id: 3,
        nombre: 'buzo',
        precio: 60,
        categoria: 'ropa'
    },
    {
        id: 4,
        nombre: 'campera',
        precio: 110,
        categoria: 'ropa'
    },
    {
        id: 5,
        nombre: 'pantalon',
        precio: 75,
        categoria: 'ropa'
    },
    {
        id: 6,
        nombre: 'sneakers',
        precio: 90,
        categoria: 'ropa'
    }
];

// Esta funcion muestra los agregados al carrito y la cantidad de unidades
const productosAgregados = function () {
    console.log(`Agregaste ${carrito} x ${cantidad} a tu carrito.`);
}

// Esta funcion permite especificar cuantas unidades del producto quieres agregar al carrito
const cantidadUnidades = () => {
    cantidad = Number(prompt("¿Cuantas unidades te gustaría agregar?"));
}

// Esta funcion muestra el nombre del producto y el precio correspondiente a cada uno
const mostrarStockCompleto = () => {
    for (const Producto of stockProductos) {
        console.log(Producto.nombre + " $" + Producto.precio);
    }
}

// Esta funcion permite al usuario mediante un prompt preguntar si el producto esta o no en stock
const existe = () => {
    let pregunta = prompt("¿Que producto quieres averiguar?");
    let existe = stockProductos.some((el) => el.nombre == pregunta);
    if (existe == true) {
        console.log(`${pregunta} está en stock`);
    } else if (existe != true) {
        console.log(`Ese producto no está en nuestro catalogo`);
    }
}

mostrarStockCompleto();

do {
    let inicio = prompt("¿Elije una opción: \n\n1. Compra \n2. Buscar Producto \n3. Limpiar Carrito");
    switch (inicio) {
        case "1":
            do {
                carrito = prompt("¿Que quieres agregar al carrito?");
                switch (carrito) {
                    case "gorra":
                        cantidadUnidades();
                        precioFinal += 15 * cantidad;
                        productosAgregados();
                        break
                    case "remera":
                        cantidadUnidades();
                        precioFinal += 35 * cantidad;
                        productosAgregados();
                        break
                    case "buzo":
                        cantidadUnidades();
                        precioFinal += 60 * cantidad;
                        productosAgregados();
                        break
                    case "campera":
                        cantidadUnidades();
                        precioFinal += 110 * cantidad;
                        productosAgregados();
                        break
                    case "pantalon":
                        cantidadUnidades();
                        precioFinal += 75 * cantidad;
                        productosAgregados();
                        break
                    case "sneakers":
                        cantidadUnidades();
                        precioFinal += 90 * cantidad;
                        productosAgregados();
                        break
                    default:
                        alert("Ingresa un producto valido.");
                        break
                }
                continuar = prompt("¿Quiere agregar algo más? \n\nSi \nNo");
            } while (continuar == "si")  // Esta codicion hace que podamos seguir agregando cosas al carrito
            alert(`El precio final es de: USD ${precioFinal}`);
            console.log(`El precio final es de: USD ${precioFinal}`); //Suma total del precio de todos lo productos agregados al carrito
            break
        case "2":
            do {
                existe();
                continuar = prompt("¿Quieres averiguar otro producto? \n\nSi \nNo")
            } while (continuar == "si")
        case "3":
            console.clear();
            mostrarStockCompleto();
            break
        default:
            alert("Ingresa una opción válida");
            break
    }
    continuar = prompt("¿Quieres hacer algo mas? \n\nSi \nNo.");
} while (continuar == "si")