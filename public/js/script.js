const socket = io();
var mensajeDiv = document.getElementById("mensaje");
var datos = document.getElementById("datos");
var datosP = document.getElementById("datosP");


//Mostrar datos de MongoDB
socket.on("servidorEnviarUsuarios", (usuarios)=>{
    console.log(usuarios);
    var tr = "";
    usuarios.forEach((usuario,idLocal)=>{
        tr= tr + `
        <tr>
            <td>${idLocal+1}</td>
            <td>${usuario.nombre}</td>
            <td>${usuario.usuario}</td>
            <td>${usuario.password}</td>
            <td>
                <a href="#" onClick="editarUsuario('${usuario._id}')">Editar</a>
                <a href="#" onClick="borrarUsuario('${usuario._id}')">Borrar</a>
            </td>
        </tr>
        `;
    });
    datos.innerHTML = tr;
});

//Mostrar datos de productos MongoDB
socket.on("servidorEnviarProductos", (productos)=>{
    console.log(productos);
    var tr = "";
    productos.forEach((producto,idLocal)=>{
        tr= tr + `
        <tr>
            <td>${idLocal+1}</td>
            <td>${producto.nombre}</td>
            <td>${producto.precio}</td>
            <td>${producto.cantidad}</td>
            <td>
                <a href="#" onClick="editarProducto('${producto._id}')">Editar</a>
                <a href="#" onClick="borrarProducto('${producto._id}')">Borrar</a>
            </td>
        </tr>
        `;
    });
    datosP.innerHTML = tr;
});


//Guardar datos de MongoDB
var enviarDatos = document.getElementById("enviarDatos");
enviarDatos.addEventListener("submit", (e)=>{
    e.preventDefault();
    var usuario = {
        nombre: document.getElementById("nombre").value,
        usuario: document.getElementById("usuario").value,
        password: document.getElementById("password").value
    }
    socket.emit("clienteGuardarUsuario", usuario);
    socket.on("servidorUsuarioGuardado", (mensaje)=>{
        console.log(mensaje);
        mensajeDiv.innerHTML = mensaje;
        setTimeout(() => {
            mensajeDiv.innerHTML = "";
        }, 2000);
    });

    document.getElementById("nombre").value = "";
    document.getElementById("usuario").value = "";
    document.getElementById("password").value = "";
    document.getElementById("nombre").focus()

});

//Guardar datos de productos MongoDB
var enviarDatosP = document.getElementById("enviarDatosP");
enviarDatosP.addEventListener("submit", (e)=>{
    e.preventDefault();
    var producto = {
        nombre: document.getElementById("nombreP").value,
        precio: document.getElementById("precio").value,
        cantidad: document.getElementById("cantidad").value
    }
    socket.emit("clienteGuardarProducto", producto);
    socket.on("servidorProductoGuardado", (mensaje)=>{
        console.log(mensaje);
        mensajeDiv.innerHTML = mensaje;
        setTimeout(() => {
            mensajeDiv.innerHTML = "";
        }, 2000);
    });

    document.getElementById("nombreP").value = "";
    document.getElementById("precio").value = "";
    document.getElementById("cantidad").value = "";
    document.getElementById("nombreP").focus()

});


//Modificar un registro de MongoDB
function editarUsuario(id) {
    console.log(id);
}
//Eliminar un registro de MongoDB
function borrarUsuario(id) {
    console.log(id);
}

//Modificar un registro de PRODUCTOS MongoDB
function editarProducto(id) {
    console.log(id);
}
//Eliminar un registro de PRODUCTOS MongoDB
function borrarProducto(id) {
    console.log(id);
}