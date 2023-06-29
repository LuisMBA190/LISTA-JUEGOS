'use strict'

const express = require('express');
const juegoControl = require('../control/juegoControl');
const router = express.Router();

router.post('/', juegoControl.registrarJuego);
router.get('/', juegoControl.obtenerJuego);
router.get('/:id', juegoControl.obtenerJuego); // Ruta para obtener un solo juego
router.put('/:id', juegoControl.actualizarJuego);
router.delete('/:id', juegoControl.eliminarJuego);

module.exports = router;