//Seteo del entorno de trabajo para la creacion de rutas
const express = require("express");
const router = express.Router();
const path = require("path");
const multer = require('multer');

const adminAuthMiddleware = require('../middlewares/adminAuth');

// Aqui dispongo lo referido al nombre del archivo y donde lo vamos a guardar:
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(__dirname,'..','..','public','images',`${(JSON.parse(req.body.tipo).name).toLowerCase()}`));
  },
  filename: function (req, file, cb) {
    cb(null, `${(JSON.parse(req.body.tipo).name).toLowerCase()}-`+ Date.now() + path.extname(file.originalname));
  }
})
 
const upload = multer({ storage });


//Aca requiero el controlador:

const controllersAdmin = require(path.resolve(__dirname, "..", "controllers", "controllersAdmin.js"))

//Armo mis rutas
router.get("/adminProductos", adminAuthMiddleware, controllersAdmin.indexProductos);
router.get("/createProductos", adminAuthMiddleware,controllersAdmin.createProductos);
router.post("/createProductos", adminAuthMiddleware, upload.any('imagen'), controllersAdmin.saveProductos);
router.get("/detailProductos/:id", adminAuthMiddleware, controllersAdmin.showProductos);
router.get("/deleteProductos/:id", adminAuthMiddleware, controllersAdmin.destroyProductos);
router.get("/editProductos/:id", adminAuthMiddleware, controllersAdmin.editProductos);
router.put("/editProductos/:id", adminAuthMiddleware, upload.any('imagen'), controllersAdmin.updateProductos);
module.exports = router;
