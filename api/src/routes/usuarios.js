//Seteo del entorno de trabajo para la creacion de rutas
const express = require("express");
const router = express.Router();
const path = require("path");
const bcrypt = require('bcryptjs');

//Requiero Multer, ya que voy a permitir que el usuario que se registre suba su avatar
const multer = require('multer');

const db = require('../database/models')
const users = db.User;
const adminAuthMiddleware = require("../middlewares/adminAuth");

//Requiero el paquete express-validator que ya habiamos instalado. Como a esta constante le vamos a pasar mas de un parametro lo hacemos dentro de un objeto literal
const {
    check,//-> Este parametro nos va a indicar si nuestros campos tienen o no tienen algun tipo de deatlle.
    validationResult, //--> Almacena los errores si es que llegan a existir.
    body//--> Guarda el dato que estaria viajando desde nuestro formulario
  }
 = require('express-validator');

//debo requerir el modulo del controlador:

const controllersUsuarios = require(path.resolve(__dirname, "..", "controllers", "controllersUsuarios.js"))

// Aqui dispongo lo referido al nombre del archivo y donde lo vamos a guardar:
const storage2 = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(__dirname,'..','..','public','images','usuarios'));
  },
  filename: function (req, file, cb) {
    cb(null, "usuario" + req.body.nombre + '-' + req.body.apellido + '-' + Date.now() + path.extname(file.originalname));
  }
})
 
const upload2 = multer({ storage: storage2 });

//Aquí se incorpora lo referido a la carga de la imagen

//Aquí dispongo la información del storage para tratamiento de guardado imagenes
//https://www.npmjs.com/package/multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(__dirname, '../../public/images/usuarios'));    //Aquí deben indicar donde van a guardar la imagen
  },
  filename: function (req, file, cb) {
    cb(null, "usuario" + req.body.nombre + '-' + req.body.apellido + '-' + Date.now() + path.extname(file.originalname));
  }
})
 
const upload= multer({ storage })

// Métodos en nuestros controladores: index - show - edit - delete- update -logout
//Aquí disppongo mis rutas
router.get('/registro', controllersUsuarios.registro);

//------------------------------------------------------------------------------------------

module.exports = (req, res, next) => {
  if (!req.session.usuario || req.session.usuario.role !== 9) {
    return res.redirect('/login');
  }
  return next();
}

//Aqui en esta ruta envio al controlador todo el registro del usuario así como las respectivas validaciones

router.post('/registro', upload.single('avatar'),[
  //Aca se hace la primera validacion para que el campo de llenar el nombre no este vacio. NOTA: El valor del "first_name" viene de lo que viaje por el atributo name en el formulario en la vista. 
  check('nombre').isLength({
    min: 1
  }).withMessage('El campo nombre no puede estar vacío'),
  //Aca se hace la primera validacion para que el campo de llenar el apellido no este vacio.
  check('apellido').isLength({min: 1
    }).withMessage('El campo apellido no puede estar vacío'),
  check('username').isLength({min: 1
    }).withMessage('El campo apellido no puede estar vacío'),
  //Aca se hace la primera validacion para que el campo de llenar el email no este vacio.
  check('email').isEmail().withMessage('Agregar un email válido'),
  //Aquí incoporé otras validaciones, para que las tengan de guía en sus proyectos

  //Aquí valido si el usuario ya está registrado en nuestro archivo JSON, esta es una forma
  body('email').custom( async value => {
    return users.findOne({
      where: {
        email: value
      }
    })
    .then(userEncontrado => !userEncontrado ? Promise.resolve() : Promise.reject())
    }).withMessage('Usuario ya se encuentra registrado...'),

    //Aquí valido el Password   
    check('password').isLength({min: 6 }).withMessage('La contraseña debe tener un mínimo de 6 caractéres'),
    
    //Aquí valido la confimación del password dispuesto por el usuario. El mismo debe tener como minimo 6 caracteres
    check('confirm_password').isLength({min: 6 }).withMessage('La confirmación de la contraseña debe tener un mínimo de 6 caractéres'),

    //Aquí valido si las contraseñas son iguales o no
    //El ( value ) viene a ser el valor que viaje en el name del del input del campo 
    //El valor { req } corresponde a lo que viene desde el formulario

    body('confirm_password').custom((value, {req}) =>{
        if(req.body.password == value ){
            return true    // Si yo retorno un true  no se muestra el error     
        }else{
            return false   // Si retorno un false si se muestra el error
        }    
    }).withMessage('Las contraseñas deben ser iguales'),

    //Aquí obligo a que el usuario seleccione su avatar
    body('avatar').custom((value, {req}) =>{
        if(req.file != undefined){
            return true
        }
        return false;
    }).withMessage('Debe elegir su avatar y debe ser un archivo con formato: .JPG ó JPEG ó PNG')
  ], controllersUsuarios.create);

//----------Aca empiezan las rutas para el LOGIN-----------------------------------------

router.get('/login', controllersUsuarios.login);
//Dentro de la ruta vamos a armar los middlewares de validacion. Estos middlewares van a ser muy similares a los que usamos para el registro de los usuarios.
// Notese que vamos a cambiar el nombre al metodo ya que este va a ser el que va a servir para "ingresar a la plataforma" 

router.post('/login', [
  //Aca empiezan las verificaciones de los datos del email
  //En esta validacion verificamos si el email ingresado es valido. Osea que este bien escrito. 
  check('email').isEmail().withMessage('Agregar un email válido'),
  
  //Aca verifico que el password tenga como minimo 6 caracteres.
  check('password').isLength({min: 6 }).withMessage('La confirmación de la contraseña debe tener un mínimo de 6 caractéres'),
  
  //Buscamos el usuario de la base de datos con ese email
   
  // Verificamos que exist 
  body('email').custom(value => {
    return users.findOne({
      where: {
        email: value
      }
    })
    .then(userEncontrado => userEncontrado ? Promise.resolve() : Promise.reject())
  }).withMessage('El Usuario no se encuentra registrado...'),

  // Aca empiezan las verificaciones del password

  // En este caso verificamos que las constrasenas coincidan con la que esta guardada en el objeto Json . El {req} esta asi porque lo que viaja es un objeto literal. 
  body('password').custom((value, {req}) => {
    return users.findOne({
      where: {
        email: req.body.email
      }
    })
    .then(userEncontrado => bcrypt.compareSync(value,userEncontrado.password) ? Promise.resolve() : Promise.reject())
   //De no coincidir el password entonces si se muestra el mensaje de error
  }).withMessage('El password no coincide con el de nuestros registros. Por favor intentelo nuevamente...') ] , controllersUsuarios.ingresar );

router.get('/logout', controllersUsuarios.logout);

//-----------------A pertir de aca vamos a hacer las rutas para el CRUD de usuarios------------------------------------



//Armo mis rutas
router.get("/adminUsers",adminAuthMiddleware, controllersUsuarios.indexUsers);
router.get("/createUser",adminAuthMiddleware, controllersUsuarios.createUser);
router.post("/createUser",adminAuthMiddleware, upload2.any("avatar"),controllersUsuarios.saveUsers);
router.get("/detailUsers/:id",adminAuthMiddleware, controllersUsuarios.showUsers);
router.get("/deleteUsers/:id",adminAuthMiddleware, controllersUsuarios.destroyUsers);
router.get("/editUsers/:id", adminAuthMiddleware,controllersUsuarios.editUsers);
router.put("/editUsers/:id",adminAuthMiddleware,upload2.any("avatar"),controllersUsuarios.updateUsers);


module.exports = router;