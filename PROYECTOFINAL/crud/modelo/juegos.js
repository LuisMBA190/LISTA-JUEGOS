const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const JuegoSchema = new Schema({
    nombre: {
        type: String,
        required: true
    },
    genero: {
        type: String,
        required: true
    },
    director: {
        type: String,
        required: true
    },
    anio: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Juego', JuegoSchema);