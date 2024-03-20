const Usuario = require("../models/usuario");
const Producto = require("../models/producto");

function socket(io) {
    io.on("connection", (socket) => {
        //MOSTRAR USUARIOS
        mostrarUsuarios();
        async function mostrarUsuarios() {
            const usuarios = await Usuario.find();
            io.emit("servidorEnviarUsuarios", usuarios);
        }
        
        //Guardar usuario
        socket.on("clienteGuardarUsuario", async (usuario) => {
            try {
                await new Usuario(usuario).save();
                io.emit("servidorUsuarioGuardado", "Usuario guardado");
                console.log("Usuario guardado");
            } catch (error) {
                console.log(error);
            }
        });

        //MOSTRAR PRODUCTOS
        mostrarProductos();
        async function mostrarProductos() {
            const productos = await Producto.find();
            io.emit("servidorEnviarProductos", productos);
        }
        
        //Guardar PRODUCTO
        socket.on("clienteGuardarProducto", async (producto) => {
            try {
                await new Producto(producto).save();
                io.emit("servidorProductoGuardado", "Producto guardado");
                console.log("Producto guardado");
            } catch (error) {
                console.log(error);
            }
        });

    });//Fin de io.on("connection")
}


module.exports = socket;



