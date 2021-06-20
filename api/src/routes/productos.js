//Seteo del entorno de trabajo para la creacion de rutas
const express = require("express");
const router = express.Router();
const path = require("path");

//debo requerir el controlador:

const controllersProductos = require(path.resolve(__dirname, "..", "controllers", "controllersProductos.js"))

//Armo mis rutas

router.get("/productDetailHabano", controllersProductos.productDetailHabano);
router.get("/productDetailCigarro", controllersProductos.productDetailCigarro);
router.get("/productDetailCigarrito", controllersProductos.productDetailCigarrito);
router.get("/productDetailTabacoParaPipa", controllersProductos.productDetailTabacoParaPipa);
router.get("/productDetailTabacoParaArmar", controllersProductos.productDetailTabacoParaArmar);
//router.get("/productDetailTabacoParaCigarro", controllersProductos.productDetailTabacoParaCigarro);
router.get("/habanos", controllersProductos.habanos);
router.get("/cigarros", controllersProductos.cigarros);
router.get("/cigarritos", controllersProductos.cigarritos);
router.get("/tabacosPipas", controllersProductos.tabaco_pipas);
router.get("/tabacosArmar", controllersProductos.tabaco_armar);
router.get("/allProducts", controllersProductos.allProducts);
// router.get("/carrito", controllersProductos.carrito);
module.exports = router;