const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require("method-override");
//Requerir Sessión Cookies----------------
const session = require('express-session');
const cookies = require('cookie-parser');
//----------------------------------------
// Aca requiero el middleware de aplicacion
const cors = require("cors")
const acceso = require('./middlewares/acceso');




//--------------- ESTA ES LA SESION DE MIDDLEWARES-----------------------------

app.use(cors())
//Aca estoy indicando a express la carpeta donde se encuentran los archivos estaticos.
app.use(express.static(path.resolve(__dirname, "..", "public")));
//Aca indicamos que estamos usando el motor de plantillas EJS
app.set('view engine','ejs');
//URL encode  - Para que nos pueda llegar la información desde el formulario al req.body
app.use(express.urlencoded({ extended: false }));
//Middleware de aplicación el cual se encargue de controlar la posibilidad de usar otros métodos diferentes al GET y al POST, en nuestros formularios
app.use(methodOverride('_method'));

//Aca uso el Midddleware de session 
app.use(session({
  //Aca le pasamos un objeto literal que va a tener los siguientes elementos que son indispensables para que el middleware pueda trabajar:
  secret : 'TopSecret',//----> Este valor puede ser cualquiera. Actua como una especie de token unico que identifica la sesion en la que estamos trabajando 
  resave : true,//---> Cada vez que entramos a una pag se crea un espacio nuevo que seria una sesion .
  saveUninitialized : true 
}));

//Aqui coloco el Middleware para activar lo referido a las cookies. Aca se podria agregar dentro del parentesis se puede indicar el tiempo que va a durar la sesion de la cookie 
app.use(cookies());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});
//Aquí requiero el Middleware que controla si el usuario está o no Logueado
app.use(acceso);


//Aca llamo a mi middleware de aplicacion
// app.use(mantenimiento);


const webRouter = require("./routes/web.js")
const usuariosRouter = require("./routes/usuarios.js")
const productosRouter = require("./routes/productos.js")
const adminRouter = require("./routes/admin.js")
const carritoRoutes = require('./routes/carritoRoutes');



app.use(webRouter);
app.use(usuariosRouter);
app.use(productosRouter);
app.use(adminRouter);
app.use(carritoRoutes);
//Activar el servidor

app.listen(4000, "localhost", () => console.log("Servidor corriendo en el puerto 4000"));