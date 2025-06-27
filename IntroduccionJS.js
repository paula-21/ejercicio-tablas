console.time("contador");
let edad = 11;
var error = "Este es un error 400";
const nombre = "Paula";
var animal = "perro";
let active = true;
var casa; 
let telefono = null;
let sym = Symbol("Test");
let cedula = 1010025636;

// mostrar variables en consola:
console.log("Edad: " + edad);
console.error(error);
console.info("Nombre: " + nombre);
console.debug("Animal: " + animal);
console.group([nombre, animal, edad]);
console.groupCollapsed([telefono, active]);
console.groupEnd();
console.table(cedula);
console.timeEnd("contador");

//reasignacion de variables
edad = 14;
error = "Error 500";
animal = "gato";
active = false;
casa = 221;
telefono = 3015108586;
sym = Symbol("Otro test");
cedula = 1001343110;


// mostrar variables en consola por segunda vez:
console.log("VARIABLES REASIGNADAS: ");
console.log("Edad: " + edad);
console.error(error);
console.info("Nombre: " + nombre);
console.debug("Animal: " + animal);
console.group([nombre, animal, edad]);
console.groupCollapsed([telefono, active]);
console.groupEnd();
console.table(cedula);