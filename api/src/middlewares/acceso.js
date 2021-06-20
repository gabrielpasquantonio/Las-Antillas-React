const fs = require('fs');
const path = require('path');
const db = require('../database/models')
const users = db.User;
const rols = db.Rol;

module.exports = (req,res,next) =>{
    //Variable locals. (Es una variable super global que  vive en   las vistas )
    //va a contener informacion que va a viajar a traves de las vistas.
    //En este caso la variable local va a contener la informacion del usuario. Al ppio lo voy a inicializar con false , porque se que puede comportarse de manera bolleana. Si no tiene nada va a viajar como falsa y si tiene algo va a viajar como true.
    res.locals.usuario = false;
 
 
 // Esta parte del codigo controla si el usuario esta en sesion , si esta logueado yo le doy paso para que entre.
 
 //Si existe algo en esta condicion es porque el usuario esta logueado.
    if(req.session.usuario){

        //Si el usuario esta logueado, yo le voy a mandar a la vista los datos  en la variable locals los datos del usuario. Y le voy a mandar el usuario que tengo dentro de sesion que seria el 'session.usuario'.  La variable 'locals.usuarios' es como si fuera una variable de sesion, pero que su comportamiento va a estar sobre las vistas. Es una variable super global.  
        res.locals.usuario = req.session.usuario;
        //Una vez que se cumplen las condiciones vistas anteriormente , es necesario usar el 'next' para que el middleware avance. Si uno no se escapa de los middlewares va a quedar estancado ahi.
        return next();

    //En el caso de que no este en sesion le pregunto si tiene una cookie o no. En el caso de que si tenga una cookie , se va a ejecutar el siguiente codigo.          
    }else if (req.cookies.email){
        // En esta linea se busca al usuario ( que no esta logueado pero si tiene una cookie), y se toma el valor que tiene en la cookie y se pasa ese valor a la vista como si fuera una sesion, para que automaticamente en la vista sepamos que vamos a mostrar.  
        users.findOne({
            where: {
              email: req.cookies.email
            },
            include: {
                model: rols
            }
          })
          .then(userEncontrado => {
            if (userEncontrado) {
              const usuarioLogueado = {
                nombre: userEncontrado.first_name,
                apellido: userEncontrado.last_name,
                role: userEncontrado.Rol.value,
                id: userEncontrado.id,
                avatar: userEncontrado.avatar,
                email: userEncontrado.email
              }
              // En esta linea se busca al usuario ( que no esta logueado pero si tiene una cookie), y se toma el valor que tiene en la cookie y se pasa ese valor a la vista como si fuera una sesion, para que automaticamente en la vista sepamos que vamos a mostrar.  
              req.session.usuario = usuarioLogueado;
              // Aca tengo que mandar adicionalmente esto a la vista.
              res.locals.usuario = usuarioLogueado;
            }// Luego una vez logueado voy  a mandar al usuario a la vista del home.
            return next();
          })
    }else{
        return next();
    }
}