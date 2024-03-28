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
                if (usuario.id == ""){
                    await new Usuario(usuario).save();
                    io.emit("servidorUsuarioGuardado", "Usuario guardado");
                    console.log("Usuario guardado");
                }
                else{
                    await Usuario.findByIdAndUpdate(usuario.id, usuario);
                    io.emit("servidorUsuarioGuardado", "Usuario modificado");
                    console.log("Usuario Modificado");
                }
                mostrarUsuarios();
            }
            catch (error) {
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
                if(producto.id == ""){
                    await new Producto(producto).save();
                    io.emit("servidorProductoGuardado", "Producto guardado");
                    console.log("Producto guardado");
                }
                else{
                    await Producto.findByIdAndUpdate(producto.id, producto);
                    io.emit("servidorProductoGuardado","Producto modificado");
                    console.log("Producto modificado");
                    
                }
                mostrarProductos()
            } catch (error) {
                console.log("Error al registrar al producto"+error);
            }
        });


        //OBTENER USUARIO POR ID
        socket.on("clienteObtenerUsuarioPorID", async(id)=>{
            const usuario = await Usuario.findById(id);
            io.emit("servidorObtenerUsuarioPorID", usuario);

        });

        //BORRAR USUARIO POR ID
        socket.on("clienteBorrarUsuario", async(id)=>{
            await Usuario.findByIdAndDelete(id);
            io.emit("servidorUsuarioGuardado", "Usuario borrado");
            mostrarUsuarios();
        });

        //OBTENER PRODUCTO POR ID
        socket.on("clienteObtenerProductoPorID", async(id)=>{
            const producto = await Producto.findById(id);
            io.emit("servidorObtenerProductoPorID", producto);

        });

        //BORRAR PRODUCTO POR ID
        socket.on("clienteBorrarProducto", async(id)=>{
            await Producto.findByIdAndDelete(id);
            io.emit("servidorProductoGuardado", "Producto borrado");
            mostrarProductos();
        });

    });//Fin de io.on("connection")
}


module.exports = socket;



