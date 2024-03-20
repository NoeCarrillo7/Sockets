const {mongoose} = require('../database/conexion');
const productoSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    precio:{
        type: String,
        required: true
    },
    cantidad: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        default: true
    }
});


module.exports = mongoose.model('producto', productoSchema);