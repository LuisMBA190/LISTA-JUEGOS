'use strict'

var juegoModelo = require('../modelo/juegos.js');
var juego = new juegoModelo();

function registrarJuego(req, res) {
    var params = req.body;
    var juego = new juegoModelo();
    console.log(params);
    juego.nombre = params.nombre;
    juego.genero = params.genero;
    juego.director = params.director;
    juego.anio = params.anio;

    if (juego.nombre != null && juego.genero != null && juego.director != null && juego.anio != null) {
        juego.save()
            .then(juegoAlmacenado => {
                if (!juegoAlmacenado) {
                    res.status(404).send({ message: 'No se ha registrado el juego' });
                } else {
                    res.status(200).send({
                        id: juegoAlmacenado._id,
                        nombre: juegoAlmacenado.nombre,
                        genero: juegoAlmacenado.genero,
                        director: juegoAlmacenado.director,
                        anio: juegoAlmacenado.anio
                    });
                    console.log(juegoAlmacenado);
                }
            })
            .catch(err => {
                res.status(500).send({ message: 'Error al guardar el juego', error: err.message });
            });
    } else {
        res.status(400).send({ message: 'Introduce todos los campos' });
    }
}


function actualizarJuego(req, res) {
    var juegoId = req.params.id;
    var update = req.body;

    juegoModelo
        .findByIdAndUpdate(juegoId, update, { new: true })
        .then(juegoActualizado => {
            if (!juegoActualizado) {
                res.status(404).send({ message: 'No se ha podido encontrar el juego' });
            } else {
                res.status(200).send({ juego: juegoActualizado });
            }
        })
        .catch(err => {
            res.status(500).send({ message: 'Error al actualizar el juego en el servidor', error: err.message });
        });
}


function eliminarJuego(req, res) {
    var juegoId = req.params.id;

    juegoModelo
        .findByIdAndDelete(juegoId)
        .then(juegoEliminado => {
            if (!juegoEliminado) {
                res.status(404).send({ message: 'No se encontró el juego' });
            } else {
                res.status(200).send({ message: 'Juego eliminado correctamente', juego: juegoEliminado });
            }
        })
        .catch(err => {
            res.status(500).send({ message: 'Error en el servidor al eliminar el juego', error: err.message });
        });
}


function obtenerJuego(req, res) {
    juegoModelo
        .find()
        .then(juegos => {
            res.json(juegos);
        })
        .catch(error => {
            console.log(error);
            res.status(500).send('Hubo un error');
        });
}

function obtenerJuegoPorId(req, res) {
    var juegoId = req.params.id;
    juegoModelo
        .findById(juegoId)
        .then(juegoEncontrado => {
            if (!juegoEncontrado) {
                res.status(404).send({ message: 'No se encontró el juego' });
            } else {
                res.status(200).send({ juego: juegoEncontrado });
            }
        })
        .catch(err => {
            res.status(500).send({ message: 'Error en el servidor al obtener el juego', error: err.message });
        });
}

module.exports = {
    registrarJuego,
    actualizarJuego,
    eliminarJuego,
    obtenerJuego,
    obtenerJuegoPorId
}