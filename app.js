//delaracion e inicializacion de variables
let numeroSecreto = 0;
let intentos = 1;
let listaNumerosSorteados = [];
let numeroMaximo = 10;
let intentosMaximo = 3;

//setear texto a elementos html
function asignarTextoElemento(selector, texto) {
  let elemento = document.querySelector(selector);
  elemento.innerHTML = texto;
  return;
}

//verificacamos nuestra jugada
function verificarIntento() {
  let numeroDeUsuario = parseInt(document.getElementById("valorUsuario").value);
  // console.log(numeroSecreto);
  // console.log(typeof numeroSecreto);
  // console.log(numeroDeUsuario);
  // console.log(typeof numeroDeUsuario);
  console.log(numeroDeUsuario == numeroSecreto);
  //si el usuario acierta ...
  if (numeroDeUsuario == numeroSecreto) {
    asignarTextoElemento(
      "p",
      `!En Hora Buena Has Acertado¡ ,en ${intentos} ${
        intentos == 1 ? "vez" : "veces"
      }`
    );
    document.querySelector("#reiniciar").removeAttribute("disabled");
  } else if (intentos == intentosMaximo) {
    asignarTextoElemento(
      "p",
      `has llegado al limite de intentos ${intentosMaximo}`
    );
  } else {
    //si usuario no acerto...
    if (numeroDeUsuario > numeroSecreto) {
      asignarTextoElemento("p", "!El numero secreto es Menor¡");
    } else {
      asignarTextoElemento("p", "!El numero secreto es Mayor¡");
    }
  }

  //inicremetamos los intentos y limpiamos la caja
  intentos++;
  limpiarCaja();

  return;
}

//obtenemos un numero aleatorio
function generarNumeroSecreto() {
  let numeroGenerado = Math.floor(Math.random() * numeroMaximo) + 1;

  console.log(numeroGenerado);
  console.log(listaNumerosSorteados);

  //si ya sorteamos todos los numeros esto nos irve para salir de la recursividad y no nos genere un bucle
  if (listaNumerosSorteados.length == numeroMaximo) {
    asignarTextoElemento("p", "ya se sortearon todos los numeros");
  } else {
    // si el numero generado esta incluido
    if (listaNumerosSorteados.includes(numeroGenerado)) {
      //generamos un nuevo numero
      return generarNumeroSecreto();
      //si no se encuentra incluido en la lista
    } else {
      listaNumerosSorteados.push(numeroGenerado);

      //retornamos el numero pseudoaleatorio
      return numeroGenerado;
    }
  }
}

//limpiamos la caja
function limpiarCaja() {
  let valorCaja = document.querySelector("#valorUsuario");
  valorCaja.value = "";
}

//valores iniciales
function condicionesIniciales() {
  asignarTextoElemento("h1", "Juego del Numero Secreto!");
  asignarTextoElemento("p", `Indica un numero del 1 al ${numeroMaximo}`);
  numeroSecreto = generarNumeroSecreto();
}

//resetea nuestro juego
function reiniciarJuego() {
  //limpiar caja
  limpiarCaja();
  //indicar mensaje de intervalo de numeros
  condicionesIniciales();
  //generar el numero aleatorio
  numeroSecreto = generarNumeroSecreto();
  //inicializar el numero de intentos
  intentos = 1;
  //desabilitar el boton de nuevo juego
  document.querySelector("#reiniciar").setAttribute("disabled", true);
}

condicionesIniciales();
