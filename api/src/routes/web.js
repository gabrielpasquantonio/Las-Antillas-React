//Seteo del entorno de trabajo para la creacion de rutas
const express = require("express");
const router = express.Router();
const path = require("path");

//debo requerir el controlador:

const controllersWeb = require(path.resolve(__dirname, "..", "controllers", "controllersWeb.js"))

//Armo mis rutas
router.get("/", controllersWeb.index);
router.get("/mantenimiento", controllersWeb.mantenimiento);
module.exports = router;