const path = require("path");
const fs = require('fs');
const bcrypt = require('bcryptjs');
const multer = require('multer');

const db = require('../database/models')
const rols = db.Rol;
const users = db.User;

const {
    check,
    validationResult,
    body
  } = require('express-validator');



module.exports = {
  registro: (req, res) => {
    res.render(
      path.resolve(__dirname, "..", "views", "usuarios", "registro.ejs")
    );
  },

  create: (req, res) => {
    // Aca dentro de la variable  'Errors' tengo que guardar lo que me trae "validationResult" que es la variable que trae desde la ruta , el resultado de las variaciones del middleware. (Es uno de los valores que utilizamos con nuestro Express validator en la linea 8).
    let errors = validationResult(req);
    // En este caso si la variable 'errors' esta vacia , quiere decir que no hay errores. Entonces se empieza a ejecutar las lineas subsiguientes y se guarda la informacion del usuario.
    //Nota: toda la informacion vino viajando a traves del metodo 'Post' por el formulario es por eso que las recibimos con el.body.  A su vez todos los campos vienen de los atributos 'name' que estaban indicados en el formulario.
    if (errors.isEmpty()) {
      let nuevoUsuario = {
        first_name: req.body.nombre,
        last_name: req.body.apellido,
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10),
        rol_id: 2,
        avatar: req.file ? req.file.filename : "default.jpg",
      };
  
      users.create(nuevoUsuario)
      .then(() => res.redirect("/login"))
      .catch(error => {
        console.log('Error guardando usuario', error)
        return res.render(path.resolve(__dirname, "../views/usuarios/registro"), {
          errors: errors.errors,
          // Aca muestro lo que el usuario tipeo. Esta variable 'old' es la que juega en el lado de la vista del formulario
          old: req.body,
        });
      })
      //En el caso de que existan errores en la  validacion se va a empezar a ejecutar la siguiente linea de codigo.
    } else {
      //Aquí incoporé el old: req.body  --> Para poder enviar a la vista los datos que el usuario indique y no tienen errores entonces deben persistir lo que coloco el usuario

      //Si desean especificar debajo de cada input el mensaje de error específico, entonces deben enviar a la vista los errores de la siguiente manera: errors: errors.mapped()
      //Después en la vista para mostrar debajo del input el respectivo error sólo deben hacer lo siguiente:
      /*
          <div class="form-group">
              <input type="email" class="form-control" name="email" placeholder="Email" value="<%=typeof old == 'undefined' ? '':old.email %>">
              
                  <% if(typeof errors != 'undefined' && errors.email){%>
              <span class="text-danger" > <%= errors.email.msg %></span>
              <%}%>
          </div>         
          */

      // En esta parte del codigo llamo a la vista de registro y le paso los errores que ocurrieron.
      return res.render(path.resolve(__dirname, "../views/usuarios/registro"), {
        errors: errors.errors,
        // Aca muestro lo que el usuario tipeo. Esta variable 'old' es la que juega en el lado de la vista del formulario
        old: req.body,
      });
    }
  },

  login: (req, res) => {
    res.render(path.resolve(__dirname, "..", "views", "usuarios", "login.ejs"));
  },

  
  
  ingresar: (req, res) => {
    //En la variable errors vamos a guardar lo que viene en ValidationResult y precisamente dentro de ella lo que viene dentro del request. (Parecido a lo que hicimos a la hora de programar en el registro de usuarios)
    const errors = validationResult(req);
    // return res.send(errors.mapped()); ---> Esto es una forma de ver el error que vendria viajando si es que existiera uno

    // A partir de aca vamos a programar que pasa si NO existe ningun error.

    if (errors.isEmpty()) {
      //Aca tenemos que parsear el archivo Json antes de leerlo.

      users.findOne({
        where: {
          email: req.body.email
        },
        include: {
          model: rols
        }
      })
      .then(userEncontrado => {
        const usuarioLogueado = {
          nombre: userEncontrado.first_name,
          apellido: userEncontrado.last_name,
          role: userEncontrado.Rol.value,
          id: userEncontrado.id,
          avatar: userEncontrado.avatar,
          email: userEncontrado.email
        }

        //----Aquí voy a guardar en session al usuario. ACA Se crea la variable de sesion ----------
        //Aca en mi variable de sesion estaria guardando el usuario que se esta logueando
        //El req.session guarda la variable de sesion. Aca se guarda del lado del servidor
        req.session.usuario = usuarioLogueado;
        // ACA ESTOY PROGRAMANDO EL CASO DE QUE EL USUARIO HAGA CLICK EN EL CUADRITO DE 'RECORDARME' QUE ESTA EN LA VISTA DE LOGIN PARA QUE SE GUARDE LA SESION EN LA QUE ESTA ENTRANDO.
        //El 'recordarme' viene de la vista login.
        if (req.body.recordarme) {
          // Aca es donde se Crea la cookie de ese usuario. Esta sesion se guarda en la memoria del navedgador los datos que ingreso el usuario. Generalmente se mandan 3 datos:  'Email' representa el nombre que le voy a dar a la cookie, que a su vez representa el 'email' del usuario que quiero guardar. Luego tengo que pasar como parametro el usuario logueado. Luego como tercer parametro le paso un objeto literal que guardaria el tiempo que que permanezca activada la cookie (en este caso serian 24 hs)  , que seria el que viaja del formulario.
          res.cookie("email", usuarioLogueado.email, {
            maxAge: 1000 * 60 * 60 * 24,
          });
        }
        
        // Luego una vez logueado voy  a mandar al usuario a la vista del home.
        res.redirect("/");
      })
      // A partir de aca vamos a programar que pasa si  existe algun error.
      //En este caso voy a mandar al usuario a la vista del login , y en el caso de que existan errores quiero que pases a la vista de los mismos mapeados (resumidos) . Ademas en el caso de que existan datos esten correctos quiero que los muestre tambien. Para ello escribimos el codigo: {
      // errors: errors.mapped(),  old: req.body});
    } else {
      return res.render(path.resolve(__dirname, "../views/usuarios/login"), {
        errors: errors.mapped(),
        old: req.body,
      });
    }
  },
  //Aca estamos matando la sesion y la cookie
  logout: (req, res) => {
    req.session.destroy();
    res.cookie("email", null, { maxAge: -1 });
    res.redirect("/");
  },

  indexUsers: async (req, res) => {
    users.findAll()
    .then(usersEncontrados => {
      const allUsers = [];
      usersEncontrados.forEach(userEncontrado => {
        allUsers.push(
          {
            nombre: userEncontrado.first_name,
            apellido: userEncontrado.last_name,
            role: userEncontrado.rol_id,
            id: userEncontrado.id 
          }
        )
      })
      res.render(
        path.resolve(__dirname, "..", "views", "admin", "adminUsers.ejs"),
        { allUsers }
      );
    })
    .catch(error => {
      console.log('error index users', error)
      res.send(error)
    })

  },

  createUser: (req, res) => {
    rols.findAll().then(roles => {
      res.render(
        path.resolve(__dirname, "..", "views", "admin", "createUser.ejs"),
        { roles }
      );
    })

  },

  saveUsers: (req, res) => {  
    let nuevoUsuario = {
      first_name: req.body.nombre,
      last_name: req.body.apellido,
      username: req.body.username,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 10),
      rol_id: req.body.role,
      avatar: req.files.length > 0 ? req.files[0].filename : "default.jpg",
    };

    users.create(nuevoUsuario)
    .then(() => res.redirect("/adminUsers"))
    .catch(error => {
      console.log('Error guardando usuario', error)
      res.send(error)
    })
  },

  showUsers: (req, res) => {
    users.findByPk(req.params.id,
      {
        include: {
          model: rols
        }
      })
    .then(userEncontrado => {
      const miUsuario = {
        nombre: userEncontrado.first_name,
        apellido: userEncontrado.last_name,
        role: userEncontrado.Rol.label,
        id: userEncontrado.id,
        avatar: userEncontrado.avatar,
        email: userEncontrado.email
      }
    
      res.render(
        path.resolve(__dirname, "..", "views", "admin", "detailUsers.ejs"),
        { miUsuario }
      );
    })
  },

  destroyUsers: (req, res) => {
    users.destroy({
      where: {
        id: req.params.id
      }
    })
    .then(() => res.redirect("/adminUsers"))
    .catch(error => {
      console.log('error borrando usuario', error)
      res.send(error)
    })
  },

  editUsers: (req, res) => {

    users.findByPk(req.params.id,
      {
        include: {
          model: rols
        }
      })
    .then(userEncontrado => {
      const usuarioEditar = {
        nombre: userEncontrado.first_name,
        apellido: userEncontrado.last_name,
        password: userEncontrado.password,
        role: {
          label: userEncontrado.Rol.label,
          id: userEncontrado.Rol.id
        },
        id: userEncontrado.id,
        avatar: userEncontrado.avatar,
        email: userEncontrado.email
      }

      rols.findAll().then(roles => {
        res.render(
          path.resolve(__dirname, "..", "views", "admin", "editUsers.ejs"),
          { usuarioEditar, roles}
        );
      })
    })
  },

  updateUsers(req, res) {
    users.update(
      {
        rol_id: req.body.role,
        first_name: req.body.nombre,
        last_name: req.body.apellido,
        password: bcrypt.hashSync(req.body.password, 10),
        email: req.body.email,
        avatar: req.files.length > 0 ? req.files[0].filename: req.body.oldimagen,
      },
      {
        where: {
          id: req.body.id
        }
      }
    ).then(() => res.redirect('/adminUsers'))
    .catch(error => {
      console.log('Error updateUsers', error)
      res.send(error)
    })
    
  },
};

