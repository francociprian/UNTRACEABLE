let cantidad = 0
let carrito = ""
let continuar = ""
let precioFinal = 0


function Agregado() {
    console.log(`Agregaste ${carrito} x ${cantidad} a tu carrito.`);
}
 
function Cantidad() {
    cantidad = Number(prompt("¿Cuantas unidades te gustaría agregar?"));
}

function mostrar() {
    console.log(producto1.nombre + " $" + producto1.precio);
    console.log(producto2.nombre + " $" + producto2.precio);
    console.log(producto3.nombre + " $" + producto3.precio);
}

class productos {
    constructor(nombre, precio) {
        this.nombre = nombre;
        this.precio = precio;
    }
}

const producto1 = new productos("Gorra", 15);
const producto3 = new productos("Buzo", 60);
const producto2 = new productos("Remera", 35);

mostrar()

do {
    let inicio = prompt("¿Elije una opción: \n\n1.Comprar \n2.Limpiar Carrito");
    switch (inicio) {
        case "1":
            do {
                carrito = prompt("¿Que quieres agregar al carrito?");
                switch (carrito) {
                    case "gorra":
                        Cantidad()
                        precioFinal += 15 * cantidad
                        Agregado()
                        break
                    case "remera":
                        Cantidad()
                        precioFinal += 35 * cantidad
                        Agregado()
                        break
                    case "buzo":
                        Cantidad()
                        precioFinal += 60 * cantidad
                        Agregado()
                        break
                    default:
                        alert("Ingresa un producto valido.")
                        break
                }
                continuar = prompt("¿Quiere agregar algo más? \n\nSi \nNo");
            } while (continuar == "si")
            alert(`El precio final es de: USD ${precioFinal}`);
            console.log(`El precio final es de: USD ${precioFinal}`);
            break
        case "2":
            console.clear();
            mostrar();
            break
        default:
            alert("Ingresa una opción válida")
            break
    }
    continuar = prompt("¿Quieres hacer algo mas? \n\nSi \nNo.").toLowerCase()
} while (continuar == "si")