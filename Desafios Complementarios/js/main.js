// Ciclo de operaciones matematicas

let pregunta = prompt('Quieres hacer una operación matemática?\n SI / NO');

while (pregunta.toUpperCase() == "SI") {
    if (pregunta.toUpperCase() == "SI") {
        let tipo = prompt('Suma ,resta, multiplicación o división?\n +, -, * o / ');
        let numero_uno = prompt('Digita el primer numero:');
        let numero_dos = prompt('Digita el segundo numero:');
        if (isNaN(numero_uno) || isNaN(numero_dos)) {
            alert(`Esto no es un numero, vuelve a digitar!`);
            numero_uno = prompt('Vuelve a digita el primer numero:');
            numero_dos = prompt('Vuelve a digita el segundo numero:');
        }
        switch (tipo) {
            case "+":
                resultado = parseInt(numero_uno) + parseInt(numero_dos);
                break;
            case "-":
                resultado = parseInt(numero_uno) - parseInt(numero_dos);
                break;
            case "*":
                resultado = parseInt(numero_uno) * parseInt(numero_dos);
                break;
            case "/":
                resultado = parseInt(numero_uno) / parseInt(numero_dos);
                break
        }
        alert(`El resultado de tu operación es ${resultado}`);
    }
    pregunta = prompt('Otra operación matemática? si/no');
    if (pregunta == "NO") {
        alert('Nos vemos la proxima!!');
    }
};