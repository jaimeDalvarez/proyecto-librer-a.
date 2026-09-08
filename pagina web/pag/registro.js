function obtenerUsuarios() {
    return JSON.parse(localStorage.getItem("usuarios")) || [];
}

function guardarDatos(nombre, correo, contraseña, telefono) {
    var listaUsuarios = obtenerUsuarios();

    var nuevoUsuario = {
        nombre: nombre,
        correo: correo,
        contrasena: contraseña,
        telefono: telefono
    };

    listaUsuarios.push(nuevoUsuario);
    localStorage.setItem("usuarios", JSON.stringify(listaUsuarios));
}

var formRegistro = document.querySelector("#registrar");

if (formRegistro) {
    formRegistro.addEventListener("submit", function(event) {
        event.preventDefault();

        var nombre = document.getElementById("nombre").value.trim();
        var correo = document.getElementById("email").value.trim();
        var contraseña = document.getElementById("password").value.trim();
        var confirmarContraseña = document.getElementById("confirm_password").value.trim(); 
        var telefono = document.getElementById("telefono").value.trim();

        limpiarMensajes();

        if (!validarNombre(nombre)) {
            mostrarMensajeError("El nombre solo puede contener letras y espacios.");
            return;
        }

        if (!validarCorreo(correo)) {
            mostrarMensajeError("El correo electrónico no es válido.");
            return;
        }

        if (!contraseñaValida(contraseña)) {
            mostrarMensajeError("La contraseña debe tener al menos 8 caracteres, una letra y un número.");
            return;
        }

        if (contraseña !== confirmarContraseña) {
            mostrarMensajeError("Las contraseñas no coinciden.");
            return;
        }

        if (!validarTelefono(telefono)) {
            mostrarMensajeError("El número de teléfono debe contener solo números y tener 10 dígitos.");
            return;
        }

        guardarDatos(nombre, correo, contraseña, telefono);
        mostrarMensajeExito("¡Registro exitoso! Los datos se han guardado.");

        event.target.reset();

        setTimeout(function() {
            window.location.href = "usuario.html"; 
        }, 1500);
    });
}
var formlogin = document.querySelector("#inisesion");

if (formlogin) {
    formlogin.addEventListener("submit", function(event) {
        event.preventDefault();

        var usuarioIngresado = document.getElementById("usuario").value.trim();

        var inputPass = document.getElementById("contrasena") || document.getElementById("contraseña");
        var contraseñaIngresada = inputPass ? inputPass.value.trim() : "";


        var usuariosRegistrados = JSON.parse(localStorage.getItem("usuarios")) || [];

 
        var baseUsuarios = typeof usuariopordefecto !== 'undefined' ? usuariopordefecto : [];


        var listaUsuarios = baseUsuarios.concat(usuariosRegistrados);

   
        var usuarioEncontrado = listaUsuarios.find(function(user) {
            var coincideUsuario = (user.nombre === usuarioIngresado || user.correo === usuarioIngresado);
  
            var passEnObjeto = user.contrasena || user.contraseña;
            var coincidePass = (passEnObjeto === contraseñaIngresada);

            return coincideUsuario && coincidePass;
        });

        if (usuarioEncontrado) {
            localStorage.setItem("usuarioActivo", JSON.stringify(usuarioEncontrado));
            alert("¡Bienvenido " + usuarioEncontrado.nombre + "!");

   
            if (usuarioEncontrado.nombre.toLowerCase() === "admin" || usuarioEncontrado.correo.toLowerCase() === "admi@gmail.cl") {
                window.location.href = "admin.html";
            } else {
                window.location.href = "usuario.html"; 
            }
        } else {
            alert("Usuario o contraseña incorrectos.");
        }
    });
}

function validarNombre(nombre) {
    var regexNombre = /^[a-zA-ZA-ÿ\s]+$/;
    return regexNombre.test(nombre);
}

function validarCorreo(correo) {
    var regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regexCorreo.test(correo);
}

function contraseñaValida(contraseña) {
    var regexContraseña = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return regexContraseña.test(contraseña);
}

function validarTelefono(telefono) {
    var regexTelefono = /^\d{10}$/;
    return regexTelefono.test(telefono);
}

function mostrarMensajeError(mensaje) {
    var mensajeError = document.getElementById("mensajeError");
    if (mensajeError) {
        mensajeError.textContent = mensaje;
        mensajeError.style.display = "block";
    } else {
        alert(mensaje);
    }
}

function mostrarMensajeExito(mensaje) {
    var mensajeExito = document.getElementById("mensajeExito");
    if (mensajeExito) {
        mensajeExito.textContent = mensaje;
        mensajeExito.style.display = "block";
    } else {
        alert(mensaje);
    }
}

function limpiarMensajes() {
    var mensajeError = document.getElementById("mensajeError");
    var mensajeExito = document.getElementById("mensajeExito");
    if (mensajeError) mensajeError.style.display = "none";
    if (mensajeExito) mensajeExito.style.display = "none";
}