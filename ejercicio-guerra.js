
var delta = crearEquipo("delta");
var aguila = crearEquipo("aguila");
var equipoGanador = {};
var equipoAtacante = {};
var equipoAtacado = {};
definirTurnoInicial();
comenzarGuerra();

function crearEquipo(nombreEquipo){
    var equipo = {
        nombre: nombreEquipo,
        ejercito: [],
    }
    //crear unidades del ejercito:
    var cantidadSubmarinos = aleatorio(1,2);
    var submarinos = crearUnidades(cantidadSubmarinos, "submarino", 1/1, 1/1);
    var cantidadSoldadosRegulares = aleatorio(500, 1000);
    var soldadosRegulares = crearUnidades(cantidadSoldadosRegulares, "soldadoRegular",2/12, 1/14);
    var cantidadSoldadosProfesionales = aleatorio(500, 1000);
    var soldadosProfesionales = crearUnidades(cantidadSoldadosProfesionales, "soldadoProfesional", 3/12, 2/14);
    var cantidadSoldadosElite = aleatorio(200, 300);
    var soldadosElite = crearUnidades(cantidadSoldadosElite, "soldadoElite", 4/12, 3/14);
    var cantidadCarroTanques = aleatorio(50, 100);
    var carroTanques = crearUnidades(cantidadCarroTanques, "carroTanque", 7/12, 4/14);
    var cantidadHelicopteros = aleatorio(30, 50);
    var Helicopteros = crearUnidades(cantidadHelicopteros,"helicoptero", 8/12, 5/14);
    var CantidadAvionesCombate = aleatorio(50, 75);
    var avionesCombate = crearUnidades(CantidadAvionesCombate, "avionCombate", 10/12, 6/14);
    //agregar ejercito al array
    equipo.ejercito = [...submarinos, ...soldadosRegulares, ...soldadosProfesionales, ... soldadosElite, ...carroTanques, ...Helicopteros, ...avionesCombate];
    console.log(equipo);
    return equipo;
}

function crearUnidades(cantidadUnidades, tipoUnidad, porcentajeVida, porcentajeAtaque){
    var cantidadVida = 2500 * porcentajeVida;
    var cantidadAtaque = 500 * porcentajeAtaque;
    var unidades = [];
    for(i = 0; i < cantidadUnidades; i++){
        var unidad = {
            tipo: tipoUnidad,
            vidaMaxima: cantidadVida,
            vidaRestante: cantidadVida,
            ataqueMaximo: cantidadAtaque,
            ataquesEfectivos: 0,
            ataquesFuerzaMaxima: 0
        };

        unidades.push(unidad)
    } 

    return unidades;
}

function comenzarGuerra(){
    var turno = 1;
    var unidadesVivas = true;
    while(unidadesVivas == true){
        console.log("Turno #" + turno);
        console.log("equipo atacante: " + equipoAtacante.nombre);
        console.log("equipo atacado: " + equipoAtacado.nombre);

        //recorrer el ejercito del quipo atacante:
        for(u = 0; u < equipoAtacante.ejercito.length; u++){
            var unidadAtacante = equipoAtacante.ejercito[u];
            var posicionRandomUnidadAtacada = aleatorio(0, equipoAtacado.ejercito.length-1);
            var unidadAtacada = equipoAtacado.ejercito[posicionRandomUnidadAtacada];
            console.log("equipo " + equipoAtacante.nombre + " atacando... ");
            if(unidadAtacada.vidaRestante > 0){
                unidadAtacada, unidadAtacante  = atacar(unidadAtacante, unidadAtacada);
            }
        } 
        
        //como va la guerra (reporte del turno)
        console.log("Reporte - Turno #" + turno);
        mostrarReporteTurno(equipoAtacante);
        mostrarReporteTurno(equipoAtacado);
        
        turno = turno + 1;
        unidadesVivas = equipoAtacado.ejercito.some(u => u.vidaRestante > 0);
        if(unidadesVivas) {
            [equipoAtacante, equipoAtacado] = [equipoAtacado, equipoAtacante];
        }
    }

    console.log("FIN DE LA GUERRA (" + turno +") turnos");
    equipoGanador = equipoAtacante;
    mostrarReporteFinal();

}

function definirTurnoInicial(){
    var numero = aleatorio(1, 2);
    if(numero == 1){
         equipoAtacante = delta;
         equipoAtacado = aguila;
    } else {
        equipoAtacado = delta;
        equipoAtacante = aguila;
    }

}

function atacar(atacante, atacado){
    var ataqueRandom = aleatorio(1, atacante.ataqueMaximo);
    var inclemenciaClima = aleatorio(0, 0.3);
    var ataqueFinal = ataqueRandom - (ataqueRandom * inclemenciaClima);
    if (atacado.vidaRestante < ataqueFinal) {
        atacado.vidaRestante = 0;
    } else{
        atacado.vidaRestante = atacado.vidaRestante - ataqueFinal;
    }
    if(ataqueFinal == atacante.ataqueMaximo){
      atacante.ataquesFuerzaMaxima = atacante.ataquesFuerzaMaxima + 1;
    }
    atacante.ataquesEfectivos = atacante.ataquesEfectivos + 1;
    console.log({
        atacante: atacante.tipo,
        atacado: atacado.tipo,
        fuerzaAtaque: ataqueFinal,
        vidaMaximaAtacado: atacado.vidaMaxima,
        vidaRestanteAtacado: atacado.vidaRestante
    })
    return atacado, atacante;
}

function mostrarReporteTurno(equipo){
    const unidadesVivas = equipo.ejercito.filter(u => u.vidaRestante > 0); // filtrar primero unidades vivas

    var cantidadSubmarinosVivos = unidadesVivas.filter(u => u.tipo == "submarino").length;
    var cantidadSoldadosRegularesVivos = unidadesVivas.filter(u => u.tipo == "soldadoRegular").length;
    var cantidadSoldadosProfesionalesVivos = unidadesVivas.filter(u => u.tipo == "soldadoProfesional").length;
    var cantidadSoldadosEliteVivos = unidadesVivas.filter(u => u.tipo == "soldadoElite").length;
    var cantidadCarroTanquesVivos = unidadesVivas.filter(u => u.tipo == "carroTanque").length;
    var cantidadHelicopterosVivos = unidadesVivas.filter(u => u.tipo == "helicoptero").length;
    var cantidadAvionesCombateVivos = unidadesVivas.filter(u => u.tipo == "avionCombate").length;

    console.table({
        "Equipo": equipo.nombre,
        "Submarinos Vivos": cantidadSubmarinosVivos,
        "Soldados Regulares Vivos": cantidadSoldadosRegularesVivos,
        "Soldados Profesionales Vivos": cantidadSoldadosProfesionalesVivos,
        "Soldados Elite Vivos": cantidadSoldadosEliteVivos,
        "Carro Tanques Vivos": cantidadCarroTanquesVivos,
        "Helicopteros Vivos": cantidadHelicopterosVivos,
        "Aviones Combate Vivos": cantidadAvionesCombateVivos
    })
}

function mostrarReporteFinal() {
    const unidadesFuerzaMax = equipoGanador.ejercito.filter(u => u.ataquesFuerzaMaxima > 0);
    console.log(unidadesFuerzaMax);

    var cantidadAtaquesFuerzaMax = 0;
    for(i = 0; i < unidadesFuerzaMax.length; i++) {
        var unidad = unidadesFuerzaMax[i];
        cantidadAtaquesFuerzaMax = cantidadAtaquesFuerzaMax + unidad.ataquesFuerzaMaxima;
    }
    const ataquesEfectivos = equipoGanador.ejercito.filter(u => u.ataquesEfectivos > 0);
    console.log(ataquesEfectivos);

    var cantidadAtaquesEfectivos = 0;
    for(i = 0; i < ataquesEfectivos.length; i++) {
        var ataque = ataquesEfectivos[i];
        cantidadAtaquesEfectivos = cantidadAtaquesEfectivos + ataque.ataquesEfectivos;
    }
    const cantidadUnidadesPerdidas = equipoGanador.ejercito.filter(u => u.vidaRestante > 0);
    
    console.table({
        "equipo ganador": equipoAtacante.nombre,
        "cantidad de ataques con fuerza máx": cantidadAtaquesFuerzaMax,
        "equipo ganador": equipoAtacante.nombre,
        "cantidad de ataques efectivos": cantidadAtaquesEfectivos
    });

   
}

function aleatorio(min, max){
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
