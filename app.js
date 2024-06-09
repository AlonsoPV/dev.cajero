const user = [
    { usuario: "Alonso", contrasena: "alonso12", saldo: 1000, clabe: "12345" },
    { usuario: "Andrea", contrasena: "andrea26", saldo: 2000, clabe: "67891" }
];

var username;
var monto_dep;
var userInputValue;
var usuario_externo;
var userInputValueGlobal;
var saldoValueGlobal;
var formularioOperaciones;
var saldo_actual;
var saldo_final;
var usuarioEncontrado = false;
var i = 0;
// Una funcion de solo validar
// type="password"
var formularioOperaciones = `
<h2>Seleccione una operación:</h2>
<div class="lista_menu">
<ul>
    <li><button class="operacion"  onclick="consultarSaldo();">Consultar saldo</button></li>
    <li><button class="operacion"  onclick="depositar()">Depositar</button></li>
    <li><button class="operacion"  onclick="retirar()">Retirar</button></li>
</ul>
<div>
`;
var formularioHTML = `
<input type="text" class="form" id="UserInput" placeholder="Ingresa usuario">
<input   type="text" class="form" id="contrasena" placeholder="Ingresa Contraseña">
<button id="btnEnviar" >Enviar</button>

`;
var form_deposito = `
<div class="formulario_cuentas" >
<h2>Seleccione la cuenta a depositar:</h2>

    <button id="btn_micuenta" >Mi cuenta</button>
    <button id="btn_otracuenta" >Otra cuenta</button>
</div>
`;
var cant_deposito = `
<div class="formulario" style="display:block;margin:auto;text-align: center;">
    <input type="text" class="form" id="btn_cant_dep" placeholder="Cantidad de depositar">
    <button id="btn_cant_envio">Ingrese</button>
</div>
`;
var cant_ret = `
<div class="formulario" style="display:block;margin:auto;text-align: center;">
    <input type="text" class="form" id="btn_cant_ret" placeholder="Cantidad a retirar">
    <button id="btn_cant_envio">Ingrese</button>
</div>
`;
var formularioOtra_cuenta = `
<div class="formulario_cuentas" >
    <input type="text" class="form" id="UserInput" placeholder="Ingresa usuario">
    <button id="btnEnviar_otro" >Enviar</button>
</div>
`;
// <p>El saldo actual es de ${saldoValueGlobal}</p>
var cant_ret = `
<div class="formulario" style="display:block;margin:auto;text-align: center;">

    <input type="text" class="form" id="btn_cant_ret" placeholder="Cantidad a retirar">
    <button id="btn_cant_retiro">Ingrese</button>
</div>
`;
function inicio() {

    document.getElementById("form_id").innerHTML = formularioHTML;
    document.getElementById('btnEnviar').addEventListener('click', function () {
        var userInputValue = document.getElementById('UserInput').value.toUpperCase();
        var contrasenaValue = document.getElementById('contrasena').value;
        var inputBtn = document.getElementById('btnEnviar').value;
        let usuarioEncontrado = false;

        for (var i = 0; i < user.length; i++) {
            if (userInputValue.toUpperCase() == user[i].usuario.toUpperCase() && contrasenaValue == user[i].contrasena) {
                usuarioEncontrado = true;
                userInputValueGlobal = user[i].usuario;
                saldoValueGlobal = user[i].saldo;
                document.getElementById("username").textContent = `U: ${userInputValueGlobal}`;
                document.getElementById("form_id").innerHTML = formularioOperaciones;  
            }
            else {
                document.getElementById("username").textContent = `U: Usuario ${userInputValueGlobal} o contraseña incorrectos`;

            }

            return i
        }
       

    });
    return userInputValueGlobal;
    
}





function consultarSaldo() {
    document.getElementById("form_id").innerHTML = `Su saldo actual es de: $ ${saldoValueGlobal}`;
    usuarioEncontrado = true;
    return saldoValueGlobal;
}

function depositar() {
    document.getElementById("form_id").innerHTML = form_deposito;

    var dep_micuenta = document.getElementById('btn_micuenta');
    var dep_otracuenta = document.getElementById('btn_otracuenta');

    dep_micuenta.addEventListener('click', function () {
        document.getElementById("form_id").innerHTML = cant_deposito;

        btn_cant_envio.addEventListener('click', function () {
            var cant_micuenta = parseFloat(document.getElementById('btn_cant_dep').value);
            if (cant_micuenta === "" || isNaN(cant_micuenta)) {
                alert("Ingrese una cantidad válida")
                depositar();
            }
            else {
                saldoValueGlobal += cant_micuenta;
                document.getElementById("form_id").innerHTML = `Su saldo actual es de: $ ${saldoValueGlobal}`;
                usuarioEncontrado = true;
                return saldoValueGlobal;


            }


        })

    });

    dep_otracuenta.addEventListener('click', function () {
        document.getElementById("form_id").innerHTML = formularioOtra_cuenta;

        btnEnviar_otro.addEventListener('click', function () {
            var usuario_externo = document.getElementById('UserInput').value.toUpperCase();
      
            for (var i = 0; i < user.length; i++) {
                if (usuario_externo.toUpperCase() == user[i].usuario.toUpperCase()) {
                    usuarioEncontrado = true;
                    usuario_externo = user[i].usuario;
                    saldo_externo = user[i].saldo;
                    document.getElementById("form_id").innerHTML = cant_deposito;

                    btn_cant_envio.addEventListener('click', function () {
                        var cant_micuenta = parseFloat(document.getElementById('btn_cant_dep').value)
                        if (cant_micuenta === "" || isNaN(cant_micuenta)) {

                            alert("Ingrese una cantidad válida")
                            depositar();
                        }
                        else {
                           ;
                            saldo_externo += cant_micuenta;
                            saldoValueGlobal -= cant_micuenta;
                            document.getElementById("form_id").innerHTML = `El saldo actual de ${usuario_externo} es de:<br>$ ${saldo_externo}<br><br>Su saldo actual es de <br>$ ${saldoValueGlobal}`;
                            return usuario_externo.saldo;
                        }
                    })
                    return usuario_externo;
                    return saldo_externo;
                }
                else {
                    document.getElementById("form_id").textContent = `Usuario ${usuario_externo} no encontrado`;

                }

            }

            var cant_micuenta = parseFloat(document.getElementById('btn_cant_dep').value);
            user[i].saldo += cant_micuenta;
            document.getElementById("form_id").innerHTML = `Su saldo actual es de: $ ${user[i].saldo}`;
            return user[i].saldo;
        });

    });
}

function retirar() {
    consultarSaldo()
    document.getElementById("form_id").innerHTML = cant_ret;

    btn_cant_retiro.addEventListener('click', function () {
        var cant_retiro = parseFloat(document.getElementById('btn_cant_ret').value);
        if (cant_retiro > saldoValueGlobal) {
            document.getElementById("form_id").innerHTML = `Saldo insuficiente`;
            usuarioEncontrado = true;
        }
        else {
            saldoValueGlobal -= cant_retiro;
            document.getElementById("form_id").innerHTML = `Su saldo actual es de: $ ${saldoValueGlobal}`;
            usuarioEncontrado = true;
        }
        return saldoValueGlobal;

    });
    return saldoValueGlobal


}

function regresar() {
    if (usuarioEncontrado == true) {

        document.getElementById("form_id").innerHTML = formularioOperaciones;
        usuarioEncontrado = true;

    } else {
        document.getElementById("form_id").innerHTML = "Ingrese usuario para empezar";
    }

}