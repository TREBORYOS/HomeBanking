//Declaración de variables
var nombreUsuario = "Robert";
var saldoCuenta = 50000;
var limiteExtraccion = 20000;
var importe = 0;    //Variable global que almacena los importes ingresados por pantalla (Deposito, Extraccion o Transferencia) o del servicios a pagar
var operacion;      //Variable global que se pasa como parametro a la función actualizarSaldoEnPantalla para saber quien la llamo
                    //Se utiliza además para determinar que mensaje mostrar en pantalla de acuerdo al tipo de operación realizada.

//Ejecución de las funciones que actualizan los valores de las variables en el HTML.

function iniciarSesion(){

    var ClaveUsuario = "1234", claveIngresada;
    
    claveIngresada = prompt("INGRESE SU CLAVE DE USUARIO:");
    
    if (claveIngresada != ClaveUsuario){
        alert("LA CLAVE ES INCORRECTA. EL DINERO DISPONIBLE EN ESTA CUENTA SERÁ RETENIDO POR CUESTIONES DE SEGURIDAD.");
        alert("INGRESE LA CLAVE DE USUARIO PARA PODER OPERAR CON EL SISTEMA.\n ESTA VENTANA SERA CERRADA.");
        window.close(); //CIERRA LA VENTANA CUANDO LA CLAVE ES INCORRECTA PARA EVITAR QUE PUEDA OPERAR CON EL SISTEMA.
    }
    else{
        alert("BIENVENIDO "+nombreUsuario+" YA PUEDE COMENZAR A REALIZAR LAS OPERACIONES DISPONIBLES EN SU CUENTA");

    }
}

window.onload = function() {

        iniciarSesion();
        cargarNombreEnPantalla();
        actualizarSaldoEnPantalla();
        actualizarLimiteEnPantalla();
   
}

//SE LAMA A ESTA FUNCIÓN CUANDO EL USUARIO EN UN CUADRO DE TEXTO PRESIONA EL BOTON CANCELAR
function operacionCancelada (){
    alert("LA OPERACIÓN FUE CANCELADA");
}

//SE LLAMA A ESTA FUNCIÓN PARA INDICAR AL USUARIO QUE EN CASOS DE EXTRACCIÓN O DEPÓSITO SOLO PUEDE 
//OPERAR CON MONTOS QUE SEAN MÚLTIPLOS DE 100. EVITA ADEMAS QUE SE INGRESEN VALORES DECIMALES.
//TAMBIEN ALERTA CUANDO SE HAYA INGRESADO POR TECLADO UN VALOR ALFANUMERICO
function condicionDeOperacion (){
    alert("NO ES POSIBLE PROCESAR LA INFORMACIÓN\nESTE CAJERO SOLO OPERA CON BILLETES DE $100. \nEL MONTO INGRESADO DEBE SER MÚLTIPLO DE 100");    
}

function extraerDinero() {

    importe = prompt("INGRESE EL MONTO A EXTRAER");

    if (importe % 100 == 0 && importe > 0){   //EL VALOR INGRESADO DEBE SER MULTIPLO DE CIEN y MAYOR A CERO

            if (importe <= saldoCuenta && importe <= limiteExtraccion){

                importe = 0 - importe;
                operacion = "EXTRACCION";
                actualizarSaldo(operacion);
            }
            else{
                if (importe > limiteExtraccion)         //EL IMPORTE INGRESADO ES MAYOR AL LIMITE DE EXPTRACCION PERMITIDO
                    alert("EL MONTO QUE DESEA EXTRAER SUPERA EL LÍMITE MÁXIMO DE EXTRACCIÓN ASIGNADO A SU CUENTA"); 
                else
                    alert("NO TIENE SALDO SUFICIENTE PARA EXTRAER EL MONTO DESEADO");
                
            }
    }
    else{
        if (importe == null)        //EL VALOR DE LA VARIABLE importe SERA null CUANDO EL USUARIO PRESIONE EL BOTON CANCELAR
            operacionCancelada();
        else
            condicionDeOperacion(); //CUANDO EL USUSARIO INTENTA EXTRAER UN IMPORTE QUE NO SEA MULTIPLO DE CIEN, O CON DECIMALES
    }                               // O TAMBIEN CUANDO HAYA INGRESADO SIMBOLOS ALFANUMERICOS 
}


function depositarDinero() {

    importe = prompt("INGRESE EL IMPORTE A DEPOSITAR");

    if (importe % 100 == 0 && importe > 0){         //EL VALOR INGRESADO DEBE SER MULTIPLO DE CIEN y MAYOR A CERO
        operacion = "DEPOSITO"
        actualizarSaldo(operacion);
    }
    else{
        if (importe == null)            //EL VALOR DE LA VARIABLE importe SERA null CUANDO EL USUARIO PRESIONE EL BOTON CANCELAR
            operacionCancelada();
        else
            condicionDeOperacion(); //CUANDO EL USUSARIO INTENTA EXTRAER UN IMPORTE QUE NO SEA MULTIPLO DE CIEN, O CON DECIMALES
    }                               // O TAMBIEN CUANDO HAYA INGRESADO SIMBOLOS ALFANUMERICOS 
         
    
}

function pagarServicio() {

    var Agua = 350, Telefono = 425, Luz = 210, Internet = 570;
    var pagado = true;   //VARIABLE LOCAL QUE INDICA SI SE EFECTUA UN PAGO. EL VALOR POR DEFECTO ES true.
                         //SI NO SE EFECTUA ALGUN PAGO SE INDICA CON VALOR false PARA EVITAR ACTUALIZAR LOS SALDOS

    opcion = prompt("INGRESE LA OPCION DEL SERVICIO QUE DESEA ABONAR: \n 1 - AGUA \n 2 - TELEFONO \n 3 - LUZ \n 4 - INTERNET");

    switch (opcion){
        case "1" : { 
                        importe = Agua; 
                        operacion = "AGUA"; 
                        break;
                    }
        case "2" : { 
                        importe = Telefono; 
                        operacion = "TELEFONO"; 
                        break;
                    }
        case "3" : { 
                        importe = Luz; 
                        operacion = "LUZ"; 
                        break;
                    }
        case "4" : { 
                        importe = Internet; 
                        operacion = "INTERNET"; 
                        break;
                    }
        default :   {
                        if (opcion == null)
                            operacionCancelada();
                        else
                            alert("LA OPCIÓN SELECCIONADA NO ES VALIDA"); //CUANDO INGRESA UN VALOR DISTINTO A LAS OPCIONES DISPONIBLES
                                                                        
                        pagado = false;     //EN CASO DE NO HABER INGRESADO UN VALOR VALIDO LA VARIABLE pagado CAMBIA A false 
                                            //PAR EVITAR QUE SE LLAME A LA FUNCION actualizarSaldo()
                    }
    }
        if (pagado){
            if (saldoCuenta > importe){     //VERIFICA SI EXISTE FONDOS DISPONIBLES EN LA CUENTA DEL USUARIO
                importe = 0 - importe;      //ASIGNA A importe EL VALOR CON SIGNO NEGATIVO PARA PODER SUSTRAER DEL SALDO DE LA CUENTA
                actualizarSaldo(operacion);
            }
            else
                alert ("NO POSEE SALDO SUFICIENTE PARA ABONAR EL SERVICIO ELEGIDO");
        }            
}

function transferirDinero() {

    var cuentaAmiga1 = "1234567", cuentaAmiga2 = "7654321";
    var numeroDeCuenta;     //VARIABLE LOCAL QUE ALMACENA EL NUMERO DE CUENTA PARA TRANSFERIR
    var aprobado = false;  //VARIABLE LOCAL QUE VA A PERMITIR APROBAR LA TRANSFERENCIA SI LA CUENTA ESTÁ ASOCIADA CON EL CLIENTE

    importe = prompt("INGRESE MONTO DE LA TRASFERENCIA:");

    if (importe > 0 && importe <= saldoCuenta){

        numeroDeCuenta = prompt("INGRESE EL NÚMERO DE CUENTA A LA QUE DESEA TRASFERIR EL MONTO INGRESADO");

        switch (numeroDeCuenta){
            case cuentaAmiga1 : { aprobado = true; break;} //aprobado CAMBIA A true CUANDO SE TRATE DE UNA CUENTA AMIGA
            case cuentaAmiga2 : { aprobado = true; break;}
            default : alert("EL NUMERO DE CUENTA INGRESADO NO SE CORRESPONDE CON NINGUNA CUENTA AMIGA REGISTRADA. \n SOLAMENTE PUEDE TRANSFERIR A UNA CUENTA AMIGA");          
        }

        if (aprobado){
            operacion = "TRANSFERENCIA";
            alert("SERA TRANSFERIDO LA SUMA DE PESOS $"+importe+" A LA CUENTA Nº "+numeroDeCuenta);
            importe = 0 - importe;      //ASIGNA A importe EL VALOR CON SIGNO NEGATIVO PARA PODER SUSTRAER DEL SALDO DE LA CUENTA
            actualizarSaldo(operacion);
        }
    }
    else{
            if (importe == null)   //EL VALOR DE LA VARIABLE importe SERA null CUANDO EL USUARIO PRESIONE EL BOTON CANCELAR
                operacionCancelada();
            else
                if (importe > saldoCuenta)
                    alert("EL IMPORTE DE DINERO QUE DESEA TRANSFERIR ES SUPERIOR AL MONTO DISPONIBLE EN SU CUENTA");
                else
                    alert("NO ES POSIBLE PROCESAR LA INFORMACIÓN.\nINGRESE UN IMPORTE VALIDO");
    }     

}

function cambiarLimiteDeExtraccion() {
    
    importe = prompt("INGRESE NUEVO VALOR DEL LÍMITE DE EXTRACCIÓN");
    if (importe % 100 == 0 && importe >= 2000){  //EL IMPORTE DEBE SER MULTIPLO DE CIEN Y SE IMPONE COMO MINIMO EL VALOR DE DOS MIL

        limiteExtraccion = importe;
        actualizarLimiteEnPantalla();
        alert("EL IMPORTE DE SU LÍMITE DE EXTRACIÓN SE HA ACTUALIZADO. \nSU NUEVO LÍMITE DE EXTRACCIÓN ES: $"+limiteExtraccion);
    }
    else{
        if (importe == null)
            operacionCancelada();
        else
            if (importe % 100 != 0)
                condicionDeOperacion(); //EVITA QUE INGRESE UN VALOR QUE NO SEA MULTIPLO DE 100
            else
                alert("NO ES POSIBLE PROCESAR LA INFORMACION.\nEL MONTO MÍNIMO DE EXTRACCIÓN ES DE $2000.\nINGRESE UN MONTO VALIDO");
    }           //SE FIJA COMO MONTO MINIMO DE EXTRACCIÓN LA SUMA DE DOS MIL PESOS

}


function actualizarSaldo (operacion) {

    var saldoAnterior = saldoCuenta;

   // importe = parseInt(importe);            //NO PERMITE HACER TRANSFERENCIA DE DINERO CON DECIMALES
    importe = parseFloat(importe);           //CON ESTA FUNCIÓN PERMITE HACER TRANSFERENCIAS MAS PRECISAS USANDO DECIMALES

    saldoCuenta = saldoAnterior+importe;
   
    actualizarSaldoEnPantalla();

    if (operacion == "DEPOSITO" || operacion == "EXTRACCION" || operacion == "TRANSFERENCIA") //MUESTRA UN MENSAJE SIMILAR PARA ESAS FUNCIONES. SOLO CAMBIA EL TIPO DE OPERACIÓN.
        alert ("SALDO ANTERIOR: "+saldoAnterior+"\nTIPO DE MOVIMIENTO: "+operacion+"\nIMPORTE "+importe+"\nSALDO ACTUAL "+saldoCuenta.toFixed(2));
    else
        alert("SERVICIO ABONADO: "+operacion+"\nSALDO ANTERIOR: "+saldoAnterior+"\nIMPORTE DEBITADO "+importe+"\nSALDO ACTUAL "+saldoCuenta.toFixed(2));
        //EN ESTE CASO MUESTRA EL INFORME CUANDO SE PAGA ALGUN SERVICIO. SE MUESTRA QUE SERVICIO PAGO.
}

//Funciones que actualizan el valor de las variables en el HTML
function cargarNombreEnPantalla() {
    document.getElementById("nombre").innerHTML = "Bienvenido/a " + nombreUsuario;
}

function actualizarSaldoEnPantalla() {
    document.getElementById("saldo-cuenta").innerHTML = "$" + saldoCuenta.toFixed(2); //SE USA LA FUNCIÓN toFixed() PARA MOSTRAR SOLO DOS DECIMALES
    console.log(saldoCuenta);
}

function actualizarLimiteEnPantalla() {
    document.getElementById("limite-extraccion").innerHTML = "Tu límite de extracción es: $" + limiteExtraccion;
}