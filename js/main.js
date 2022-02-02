// Ciclo de operaciones matematicas

let pregunta = prompt('Quieres hacer una operación matemática? si/no');

while (pregunta == "si") {
    if (pregunta == "si") {
        let tipo = prompt('Suma ,resta, multiplicación o división? +, -, * o / ');
        let numero_uno = prompt('Digita el primer numero:');
        let numero_dos = prompt('Digita el segundo numero:');
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
    if (pregunta == "no"){
        alert('Nos vemos la proxima!!');
    }
};